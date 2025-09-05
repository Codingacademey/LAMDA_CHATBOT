import requests
from bs4 import BeautifulSoup

url = "www.vylnex.com"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

products = []
for item in soup.find_all("div", class_="product"):
    title = item.find("h2").text.strip()
    price = item.find("span", class_="price").text.strip()
    link = item.find("a")["href"]
    
    products.append({"title": title, "price": price, "link": link})

print(products)
