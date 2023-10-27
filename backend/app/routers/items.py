"""Feature routes."""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from websockets.exceptions import ConnectionClosedOK

from ..dependencies.items import (
    send_answer,
    send_error,
    WebSocketStreamingCallback,
)

router = APIRouter()


@router.websocket("/fact")
async def fact_websocket(websocket: WebSocket) -> None:
    """Websocket endpoint for continuing text."""
    await websocket.accept()
    stream_handler = WebSocketStreamingCallback(websocket)

    while True:
        try:
            await send_answer(
                websocket,
                prompt="Write an extremely unknown but interesting fact, explaining the origins, significance, and more.",
                system="Do not write anything more than what is asked, and do what is asked using three sentences at most: {prompt}",
                callbacks=[stream_handler],
            )
        except (WebSocketDisconnect, ConnectionClosedOK):
            break
        except Exception as e:
            send_error(websocket, e)
            raise e
