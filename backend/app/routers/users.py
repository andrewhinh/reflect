"""User routes."""
from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from ..dependencies.users import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    authenticate_user,
    create_access_token,
    create_user,
    get_current_active_user,
    Token,
    update_email,
    update_password,
    update_username,
    User,
)

router = APIRouter(
    prefix="/users/me",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


@router.post("/signup")
async def signup(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> dict[str, str]:
    """Signup."""
    username = form_data.username
    password = form_data.password
    confirm_password = form_data.confirmPassword
    if password != confirm_password:
        raise HTTPException(
            status_code=400,
            detail="Passwords do not match",
        )
    user = authenticate_user(username, password)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists",
        )
    user = create_user(username, password)
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Error creating user",
        )
    return {"message": "User created"}


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> dict[str, str]:
    """Login for access token.

    Parameters
    ----------
    form_data
        Form data

    Returns
    -------
    dict[str, str]
        Access token

    Raises
    ------
    HTTPException
        Incorrect username or password
    """
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/", response_model=User)
async def read_users_me(current_user: Annotated[User, Depends(get_current_active_user)]) -> User:
    """Get current user.

    Parameters
    ----------
    current_user
        Current user

    Returns
    -------
    User
        Current user
    """
    return current_user


@router.get("/items/")
async def read_own_items(current_user: Annotated[User, Depends(get_current_active_user)]) -> list[dict[str, str]]:
    """Get current user's items.

    Parameters
    ----------
    current_user
        Current user

    Returns
    -------
    list[dict[str, str]]
        Current user's items
    """
    return [{"owner": current_user.username}]


# Route to change username
@router.put("/username")
async def change_username(
    new_username: str,
    current_user: Annotated[User, Depends(get_current_active_user)],
) -> dict[str, str]:
    """Change username.

    Parameters
    ----------
    new_username
        New username
    current_user
        Current user

    Returns
    -------
    dict[str, str]
        Message

    Raises
    ------
    HTTPException
        Username already exists
    """
    user = authenticate_user(new_username, current_user.password)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists",
        )
    success = update_username(current_user, new_username)
    if not success:
        raise HTTPException(
            status_code=400,
            detail="Error updating username",
        )
    return {"message": "Username updated"}


# Route to change email
@router.put("/email")
async def change_email(
    new_email: str,
    current_user: Annotated[User, Depends(get_current_active_user)],
) -> dict[str, str]:
    """Change email.

    Parameters
    ----------
    new_email
        New email
    current_user
        Current user

    Returns
    -------
    dict[str, str]
        Message

    Raises
    ------
    HTTPException
        Email already exists
    """
    success = update_email(current_user, new_email)
    if not success:
        raise HTTPException(
            status_code=400,
            detail="Error updating email",
        )
    return {"message": "Email updated"}


# Route to change password
@router.put("/password")
async def change_password(
    new_password: str,
    current_user: Annotated[User, Depends(get_current_active_user)],
) -> dict[str, str]:
    """Change password.

    Parameters
    ----------
    new_password
        New password
    current_user
        Current user

    Returns
    -------
    dict[str, str]
        Message

    Raises
    ------
    HTTPException
        Password is same
    """
    user = authenticate_user(current_user.username, new_password)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Password is same",
        )
    success = update_password(current_user, new_password)
    if not success:
        raise HTTPException(
            status_code=400,
            detail="Error updating password",
        )
    return {"message": "Password updated"}
