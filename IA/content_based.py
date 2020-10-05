# -*- coding: utf-8 -*-
"""
Created on Mon Nov  4 09:40:08 2019

@author: $I4R000-IS802DT6HDAA
"""

import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.feature_extraction.text import CountVectorizer
from rake_nltk import Rake

flavors = []

# Retrieve list of flavors
flavors = [line.rstrip('\n') for line in open("flavors.txt")]

# Clean a row, remove space and make the string lowercase
def clean_row(row):
     
    if (str(row['description']) != 'nan'):
        plot = str(row['description'])    
        r = Rake()
        r.extract_keywords_from_text(plot)
        key_words_dict_scores = r.get_word_degrees()
        row['DescrpitionKeyWords'] = " ".join(list(set(flavors) & set(key_words_dict_scores)))
        
    if (str(row['Country']) != 'nan'):
        row['KeyWords'] += row['Country'].replace(' ', '').lower()
    
    if (str(row['Province']) != 'nan'):
        row['KeyWords'] += ' ' + row['Province'].replace(' ', '').lower()
        
    if (str(row['variety']) != 'nan'):
        row['KeyWords'] += ' ' + str(row['variety']).replace(' ', '').lower()
    
    return row


# Compute cosine similarity for each wine keywords
def compute_cosine_sim(df):
    count = CountVectorizer()
    count_matrix = count.fit_transform(df['KeyWords'])
    cosine_sim = cosine_similarity(count_matrix, count_matrix)
    
    return cosine_sim;

# Use TFID to measure the description similarity for each wine
def compute_descrpition_TFID(df):
    vect = TfidfVectorizer(min_df=1, stop_words="english")                                                                                                                                                                                      
    tfidf = vect.fit_transform(df['DescrpitionKeyWords'])      
    pairwise_similarity = tfidf * tfidf.T 
    matrix_tfid = pairwise_similarity.toarray()
    
    return matrix_tfid


def prepare_user_preference(userWineLiked):
    return 
    
    
    
def compute_content_based(userId, userWineLiked, wineList):
    #dfU = pd.DataFrame(userWineLiked)
    #dfW = pd.DataFrame(wineList)
    
    # Retrieve data from file
    df = pd.read_excel('wines.xlsx')
    
    # Select usefull column
    df = df[['Country', 'Province', 'description', 'variety', 'title']]
    
    # Create a column of KeyWord that will represent a bag of words based on 
    # the country, province and variety
    df['KeyWords'] = ''
    
    # Create a column descriptionKeyWords that will represent the keywords of
    # the description
    df['DescrpitionKeyWords'] = ''
    
    # Clean each row
    for index, row in df.iterrows():
        row = clean_row(row)
       
       
    # Compute the cosine similarity between every wine
    cosine_sim = compute_cosine_sim(df)
    # Use TFID algo to measure the similarity between 2 descriptions
    matrix_tfid = compute_descrpition_TFID(df)
         
    
    # Search for similar wine for the first wine
    indices = pd.Series(df['title'])
    bags_of_words = pd.Series(df['KeyWords'])

    i = 0
    print('wine similar to : ' )
    print(indices[0])
    print(bags_of_words[0])
    print('-------------------------')
    for elem in cosine_sim[0]:
        if ((elem * 0.5) + (matrix_tfid[0][i] * 0.5) > 0.6):
            print(indices[i])
            print("score = " + str((elem * 0.5) + (matrix_tfid[0][i] * 0.5)))
            print('-------------------------')
        i += 1

    print("End of computing")
# X = User's wines
# Y = All wines 