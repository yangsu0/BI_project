# -*- coding: utf-8 -*-
"""
Created on Mon Nov 11 09:24:07 2019

@author: $I4R000-IS802DT6HDAA
"""

from db_manager import addWineToDb
import pandas as pd
from datetime import datetime

df = pd.read_excel('wines.xlsx')

wineList = []

for index, row in df.iterrows():
    
    dic = {}
    
    dic['liked'] = 0
    
    if (str(row['Country']) != 'nan'):
        dic['country'] = row['Country']
    else:
        dic['country'] = ""
    
    if (str(row['Province']) != 'nan'):
        dic['province'] = row['Province']
    else:
        dic['province'] = ""
        
    if (str(row['description']) != 'nan'):
        dic['description'] = row['description']
    else:
        dic['description'] = ""
    
    if (str(row['variety']) != 'nan'):
        dic['variety'] = row['variety']
    else:
        dic['variety'] = ""
    
    if (str(row['title']) != 'nan'):
        dic['title'] = row['title']
    else:
        dic['title'] = ""

    
    if (str(row['Vintage']) != 'nan'):
        datetimeObj = datetime.strptime(str(row['Vintage']), '%Y-%m-%d %H:%M:%S') 
        dic['vintage'] = str(datetimeObj.year)
    else:
        dic['vintage'] = ""
        
    if (str(row['Price']) != 'nan'):
        dic['price'] = row['Price']
    else:
        dic['price'] = ""
    
        
    wineList.append(dic)
        
        
 
addWineToDb(wineList)