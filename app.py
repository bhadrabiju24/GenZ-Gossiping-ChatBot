from flask import Flask
app = Flask(__name__)
@app.route('/')
def home():
    return "Welcome to my home page!"
if __name__ == '__main__':
    debug = True
    app.run(debug=debug)