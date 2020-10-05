# -*- coding: utf-8 -*-
"""
Created on Sun Nov 10 07:42:20 2019

@author: $I4R000-IS802DT6HDAA
"""

from content_based import compute_content_based
from db_manager import get_all_user, get_all_wine
import sched, time

s = sched.scheduler(time.time, time.sleep)
listWine = get_all_wine()

def startScripts():
    print("Start content based")
    users = get_all_user()
    
    for user in users:
        compute_content_based(user['_id'], user['wineLiked'], listWine)
    s.enter(10, 0, startScripts)

if __name__ == '__main__':
    
    s.enter(10, 0, startScripts)
    s.run()