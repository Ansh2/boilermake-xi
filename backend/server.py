import pandas as pd
import requests
from bs4 import BeautifulSoup, SoupStrainer
from flask import Flask, redirect, url_for, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")
CORS(app, origins=['http://localhost:3000'])

term = ""
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
        print(request.json)
        term = request.json
        print(term)
        # print(jsonify(data))
        # Process the data and return a response

        #response = jsonify({'message': term})
        #print(response)
        return redirect(url_for("scrape", word=term))
        #return response

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route("/data/<word>", methods=['GET'])
def scrape(word):
    df = pd.DataFrame(columns=["product", "title", "price"])
    items = word.split(",")
    for product in items:
        query = "https://www.walmart.com/search?q=" + str(product)
        print(query)
        headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'}
        response = requests.get(query, headers=headers)
        soup = BeautifulSoup(response.content, 'html.parser')
        #print(soup.prettify())
        product_urls = []
        product_data = []
        for a in soup.find_all('a', {'class': 'absolute w-100 h-100 z-1 hide-sibling-opacity'}, href=True):
            if ("walmart" not in a['href']):
                base = "https://www.walmart.com" + a['href']
                product_urls.append(base)
        # Search url: https://www.walmart.com/search?q=

        for url in product_urls:
            response = requests.get(url, headers=headers)
            soup = BeautifulSoup(response.content, 'html.parser')
            title = soup.find("h1").text
            price = soup.find("span", {"itemprop": "price"}).text
            temp = {
                "product": product,
                "title": title,
                "price": price,
            }
            df.loc[len(df)] = temp


    df.to_csv("result.csv", index=False)
    return jsonify({'message': term})

if __name__ == "__main__":
    app.run(debug=True)