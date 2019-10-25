from util import HtmlManager
from pathlib import Path
from flask import Flask, send_from_directory, render_template

app = Flask(__name__)
html_manager = HtmlManager("templates/", "base.html")

# -------------
# -- General --
# -------------
@app.route("/")
def index():
    return html_manager.get("index.html")

@app.route("/editor/")
def editor():
    return html_manager.get("editor.html")

@app.route("/about/")
def about():
    return html_manager.get("about.html")
# -----

if __name__ == "__main__":
    app.run(port=1337, debug=True)