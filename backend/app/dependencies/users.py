"""Dependencies for user endpoints."""
from datetime import datetime, timedelta
import os
from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from passlib.context import CryptContext
from pydantic import BaseModel

USERS_DB = {
    "example": {
        "username": "example",
        "email": "example@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/me/token")


# Models
class Token(BaseModel):
    """Token model."""

    access_token: str
    token_type: str


class TokenData(BaseModel):
    """Token data model."""

    username: str | None = None


class User(BaseModel):
    """User model."""

    username: str
    email: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    """User in database model."""

    hashed_password: str


# Helper fns
def get_password_hash(password: str) -> str:
    """
    Get password hash.

    Parameters
    ----------
    password : str
        Password

    Returns
    -------
    str
        Hashed password
    """
    return pwd_context.hash(password)


def create_user(username: str, password: str) -> UserInDB:
    """
    Create user.

    Parameters
    ----------
    username : str
        Username
    password : str
        Password

    Returns
    -------
    UserInDB
        User
    """
    hashed_password = get_password_hash(password)
    USERS_DB[username] = {
        "username": username,
        "email": None,
        "hashed_password": hashed_password,
        "disabled": False,
        "conversations": {},
    }
    return authenticate_user(username, password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password.

    Parameters
    ----------
    plain_password: str
        Plain text password
    hashed_password: str
        Hashed password

    Returns
    -------
    bool
        True if password is verified, else False
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_user(db: dict, username: str) -> UserInDB | None:
    """
    Get user.

    Parameters
    ----------
    db : dict
        Database
    username : str
        Username

    Returns
    -------
    UserInDB | None
        User if found, else None
    """
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def authenticate_user(username: str, password: str) -> UserInDB | None:
    """
    Authenticate user.

    Parameters
    ----------
    username : str
        Username
    password : str
        Password

    Returns
    -------
    UserInDB | None
        User if authenticated, else None
    """
    user = get_user(USERS_DB, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """
    Create access token.

    Parameters
    ----------
    data : dict
        Data
    expires_delta : timedelta | None, optional
        Expiration delta, by default None

    Returns
    -------
    str
        Access token
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> UserInDB:
    """
    Get current user.

    Parameters
    ----------
    token : str
        Token

    Returns
    -------
    UserInDB
        Current user

    Raises
    ------
    credentials_exception
        If credentials are invalid
    """
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(USERS_DB, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: Annotated[User, Depends(get_current_user)]) -> UserInDB:
    """
    Get current active user.

    Parameters
    ----------
    current_user : User
        Current user

    Returns
    -------
    UserInDB
        Current active user

    Raises
    ------
    HTTPException
        If user is inactive
    """
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


async def update_username(current_user: Annotated[User, Depends(get_current_active_user)], new_username: str) -> bool:
    """
    Update username.

    Parameters
    ----------
    current_user : User
        Current user
    new_username : str
        New username

    Returns
    -------
    bool
        True if username updated, else False
    """
    try:
        USERS_DB[new_username] = USERS_DB.pop(current_user.username)
        return True
    except Exception:
        return False


async def update_email(current_user: Annotated[User, Depends(get_current_active_user)], new_email: str) -> bool:
    """
    Update email.

    Parameters
    ----------
    current_user : User
        Current user
    new_email : str
        New email

    Returns
    -------
    bool
        True if email updated, else False
    """
    try:
        USERS_DB[current_user.username]["email"] = new_email
        return True
    except Exception:
        return False


async def update_password(current_user: Annotated[User, Depends(get_current_active_user)], new_password: str) -> bool:
    """
    Update password.

    Parameters
    ----------
    current_user : User
        Current user
    new_password : str
        New password

    Returns
    -------
    bool
        True if password updated, else False
    """
    try:
        USERS_DB[current_user.username]["hashed_password"] = get_password_hash(new_password)
        return True
    except Exception:
        return False
