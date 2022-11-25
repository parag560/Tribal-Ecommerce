import numpy as np
import pandas as pd
import sklearn
import matplotlib.pyplot as plt
import seaborn as sns
import os
  
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)


#CSV Files

prod = "tribeProducts"
rate =  "tribeRatings" 

ratings = pd.read_csv(f'F:/FY-Project/ML/{rate}.csv')
ratings.head()
  
products = pd.read_csv(f'F:/FY-Project/ML/{prod}.csv')
products.head()

# Basic Evaluations
n_ratings = len(ratings)
n_products = len(ratings['productid'].unique())
n_users = len(ratings['userid'].unique())
  
print(f"Number of ratings: {n_ratings}")
print(f"Number of unique productid's: {n_products}")
print(f"Number of unique users: {n_users}")
print(f"Average ratings per user: {round(n_ratings/n_users, 2)}")
print(f"Average ratings per movie: {round(n_ratings/n_products, 2)}")
  
user_freq = ratings[['userid', 'productid']].groupby('userid').count().reset_index()
user_freq.columns = ['userid', 'n_ratings']
user_freq.head()
  
#getting the data from movie csv
movie_titles = dict(zip(products['productid'], products['title']))

# Find Lowest and Highest rated products:
mean_rating = ratings.groupby('productid')[['rating']].mean()
# Lowest rated products
lowest_rated = mean_rating['rating'].idxmin()
products.loc[products['productid'] == lowest_rated]
# Highest rated products
highest_rated = mean_rating['rating'].idxmax()
products.loc[products['productid'] == highest_rated]
print(f"Highest Rated Movie: {movie_titles[highest_rated]}")

# show number of people who rated products rated movie highest
ratings[ratings['productid']==highest_rated]
# show number of people who rated products rated movie lowest
ratings[ratings['productid']==lowest_rated]
  
## the above products has very low dataset. We will use bayesian average
movie_stats = ratings.groupby('productid')[['rating']].agg(['count', 'mean'])
movie_stats.columns = movie_stats.columns.droplevel()


# Now, we create user-item matrix using scipy csr matrix
from scipy.sparse import csr_matrix
  
def create_matrix(df):
      
    N = len(df['userid'].unique())
    M = len(df['productid'].unique())
      
    # Map Ids to indices
    user_mapper = dict(zip(np.unique(df["userid"]), list(range(N))))
    movie_mapper = dict(zip(np.unique(df["productid"]), list(range(M))))
      
    # Map indices to IDs
    user_inv_mapper = dict(zip(list(range(N)), np.unique(df["userid"])))
    movie_inv_mapper = dict(zip(list(range(M)), np.unique(df["productid"])))
      
    user_index = [user_mapper[i] for i in df['userid']]
    movie_index = [movie_mapper[i] for i in df['productid']]
  
    X = csr_matrix((df["rating"], (movie_index, user_index)), shape=(M, N))
      
    return X, user_mapper, movie_mapper, user_inv_mapper, movie_inv_mapper
  
X, user_mapper, movie_mapper, user_inv_mapper, movie_inv_mapper = create_matrix(ratings)

from sklearn.neighbors import NearestNeighbors
"""
Find similar products using KNN
"""
def find_similar_products(prod_id, X, k, metric='cosine', show_distance=False):
      
    neighbour_ids = []
      
    movie_ind = movie_mapper[prod_id]
    movie_vec = X[movie_ind]
    k+=1
    kNN = NearestNeighbors(n_neighbors=(k-2), algorithm="brute", metric=metric)
    kNN.fit(X)
    movie_vec = movie_vec.reshape(1,-1)
    neighbour = kNN.kneighbors(movie_vec, return_distance=show_distance)
    for i in range(0,(k-2)):
        n = neighbour.item(i)
        neighbour_ids.append(movie_inv_mapper[n])
    neighbour_ids.pop(0)
    return neighbour_ids
  
  
movie_titles = dict(zip(products['productid'], products['title']))