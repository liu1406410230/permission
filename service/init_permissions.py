#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: ljl
@file: init_permissions.py 
@time: 2019/1/3 11:11
@desc:
"""

def init_permissions(user,request):
    url_list=[]
    # 获取user中所有的url权限
    permission_url_list=user.roles.values('permissions__url','permissions__title','permissions__is_menu').distinct()
    print('111',user.roles.all())
    # 将url权限去重添加到url_list列表中
    for item in permission_url_list:
        url_list.append(item['permissions__url'])
    print('url_list:',url_list)
    #定制session
    request.session['permission_url_list']=url_list
