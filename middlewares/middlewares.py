#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: ljl
@file: middlewares.py 
@time: 2019/1/3 11:24
@desc:
"""

import re
from django.shortcuts import render,redirect,HttpResponse
from django.conf import settings

class MiddlewareMixin(object):
    def __init__(self,get_response=None):
        self.get_response=get_response
        super(MiddlewareMixin,self).__init__()

    def __call__(self, request):
        response=None
        if hasattr(self,'process_request'):
            response=self.process_request(request)
        if not response:
            response=self.get_response(request)
        if hasattr(self,'process_response'):
            response=self.process_response(request,response)
        return response

class DemoMiddleware(MiddlewareMixin):
    def process_request(self,request):
        current_url=request.path_info
        # 当前不需要执行权限验证
        for url in settings.VALID_URL:
            if re.match(url,current_url):
                return None
        permission_list=request.session.get("permission_url_list")
        print('permission_list',permission_list)

        if not permission_list:
            return redirect('/login/')

        flag=False
        for db_url in permission_list:
            regax="^{0}$".format(db_url)
            if re.match(regax,current_url):
                flag=True
                break
        if not flag:
            return HttpResponse('无权限访问')
