from flask import Flask,jsonify
from tribeRecom import *
import tribeRecom as tr 


app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<h1>Hi, this is flask server of our project.</h1><br><a href='http://127.0.0.1:5000/prods/69'>Result here</a>"


@app.route("/prods/<string:n1>")

def executeHoja(n1):
    similar_ids = find_similar_products(n1, X, k=5)
    movie_title = movie_titles[n1]
    movies=[]
    print(f"Since you watched {movie_title}")
    for i in similar_ids:
        movies.append(movie_titles[i])
    result ={
        "Recommended Movies" : movies,
        "Highest Rated Movie" : tr.movie_titles[highest_rated]
    }
    return jsonify(result)






if __name__=="__main__":
    app.run(debug=True)
   