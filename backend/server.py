import requests
from bs4 import BeautifulSoup
from flask import Flask, redirect, url_for, render_template, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'], supports_credentials=True, expose_headers="*", allow_headers="*")

query = ""
product_urls = [
    "https://www.walmart.com/ip/AT-T-iPhone-14-128GB-Midnight/1756765288",
    "https://www.walmart.com/ip/Straight-Talk-Apple-iPhone-14-Pro-12 8GB-Silver-Prepaid-Smartphone-Locked-to-Straight-Talk/1667543930"
]
@app.route('/')
@cross_origin()
def home():
    return render_template("")

@app.route('/data')
@cross_origin()
def home2():
    return render_template("")
@app.route("/post_data", methods=["POST"])
@cross_origin()
def handle_post_data():
    data = request.get_json()
    return "<h1>POST DATA</h1>"

@app.route("/get_data", methods=["GET"])
@cross_origin()
def get_data():
    #insert whatever element for form here
    query = request.form[""]
    return jsonify({'query': 'something here'})

@app.route("/scrape")
@cross_origin()
def scrape():
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'}

    product_data = []

    # Search url: https://www.walmart.com/search?q=

    for url in product_urls:
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.content, 'html.parser')
        title = soup.find("h1").text
        price = soup.find("span", {"itemprop": "price"}).text
        product_data.append({
            "title": title,
            "price": price,
        })

    return str(product_data)

if __name__ == "__main__":
    app.run(debug=True)