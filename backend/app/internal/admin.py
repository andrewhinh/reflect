"""Admin module."""
from fastapi import APIRouter

router = APIRouter()


@router.post("/")
async def update_admin() -> dict[str, str]:
    """Update admin.

    Returns
    -------
    dict[str, str]
        Message
    """
    return {"message": "Admin"}
