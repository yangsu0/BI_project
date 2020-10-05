# -*- coding: utf-8 -*-
"""
Created on Sun Nov 10 05:00:57 2019

@author: $I4R000-IS802DT6HDAA
"""

from pymongo import MongoClient
from bson.objectid import ObjectId


client = MongoClient('mongodb+srv://test:test@winecluster-sijpk.mongodb.net/test?retryWrites=true&w=majority')

db = client.test

# return all the user from the database
def get_all_user():
    userCol = db["users"]
    wineCol = db["wine"]
    listUser = list(userCol.find({}))
    for user in listUser:
        for index, wineId in enumerate(user['wineLiked']):
            user['wineLiked'][index] = wineCol.find_one({"_id": ObjectId(wineId)})
    
    return listUser


def get_all_wine():
    wineCol = db["wine"]
    return list(wineCol.find())

# Update list of recommendation for content based filtering 
# The listToUpdate parameter must be a list of dic that must follow this 
# format [{ id: 767TYDH8768, score: 10 }, { id: 767TYDH8768, score: 80 }, ...]
def update_list(userId, listToUpdate):
    userCol = db["users"]
    select = { "_id": ObjectId(userId) }    
    userCol.update_one(select,  { "$set": { "recommendationWineCB": listToUpdate } }, upsert=True)



def addWineToDb(listWine):
    wineCol = db["wine"]
    wineCol.insert_many(listWine)
    

#updateList("5dc62699c000a325009fb5d8", [{ "id": ObjectId("5dc62699c000a325009fb5d8"), "score": 90 }, 
#                                       { "id": ObjectId("5dc62699c000a325009fb5d8"), "score": 70 }])