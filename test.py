from flask import Flask

app = Flask(__name__)

@app.before_first_request
def before_first_request():
    print("Before first request")

@app.route('/')
def index():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
