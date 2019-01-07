#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: ljl
@file: urls.py 
@time: 2018/11/16 14:50
@desc:
"""

from django.conf.urls import url
from .views import *


urlpatterns=[
    url(r'^demo/$',demo,name='demo'),
    url(r'^login/$',login),
    url(r'^index/$',index),
    url(r'^userinfo/$',userinfo),
    url(r'^userinfo/add/$',userinfo_add),
    url(r'^order/$',order),
    url(r'^order/add/$',order_add),
    url(r'^userinfo/edit/$', userinfo_edit),
    url(r'^userinfo/del/$', userinfo_del),
]