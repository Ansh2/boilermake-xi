import requests
from bs4 import BeautifulSoup
from flask import Flask, redirect, url_for, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")
CORS(app, origins=['http://localhost:3000'])

query = ""
product_urls = [
    "https://www.walmart.com/ip/AT-T-iPhone-14-128GB-Midnight/1756765288",
    "https://www.walmart.com/ip/Straight-Talk-Apple-iPhone-14-Pro-12 8GB-Silver-Prepaid-Smartphone-Locked-to-Straight-Talk/1667543930"
]
@app.route("/search", methods=["POST","GET"])
def search():
    if (request.method == "POST"):
        #insert whatever element for form here
        query = request.form[""]
        return redirect(url_for("scrape"))
    else:
        return render_template("temp.html")


@app.route('/post_data', methods=['POST', 'OPTIONS'])
def handle_post_data():
    if request.method == 'OPTIONS':
        # Respond to preflight request
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    # Handle actual POST request here
    try:
        print('request recieved')
        print(request.data.decode())
        data = request.json['key2']
        print(jsonify(data))
        # Process the data and return a response

        response = jsonify({'message': data})
        print(response)
        return response

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route("/data")
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