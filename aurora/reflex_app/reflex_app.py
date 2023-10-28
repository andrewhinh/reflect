"""Welcome to Reflex!."""

from reflex_app import styles

# Import all the pages.
from reflex_app.pages import *

import reflex as rx

# Create the app and compile it.
app = rx.App(style=styles.base_style)
app.compile()
