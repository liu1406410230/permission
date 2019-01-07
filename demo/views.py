# coding:utf-8
from django.shortcuts import render,HttpResponse,redirect,reverse,Http404
# from numpy import *
from .models import *
from service.init_permissions import init_permissions
from rest_framework.generics import GenericAPIView
import random

# Create your views here.
# 参考：https://www.cnblogs.com/supery007/p/7800755.html

def demo(request):
    return HttpResponse('你好，django!')

def login(request):
    if request.method=='GET':
        return render(request,'login.html')
    else:
        username=request.POST.get('user')
        password = request.POST.get('pwd')
        user = UserInfo.objects.filter(username=username,password=password).first()
        if not user:
            return render(request,'login.html')
        else:
            init_permissions(user,request)   # 定制session模板
            return redirect('/index/')

def index(request):
    return HttpResponse('首页页面')

def userinfo(request):
    return HttpResponse('用户管理')

def userinfo_add(request):
    return HttpResponse('添加用户')

def order(request):
    return HttpResponse('订单管理')

def order_add(request):
    return HttpResponse('添加订单')

def userinfo_edit(request):
    return HttpResponse('修改用户')

def userinfo_del(request):
    return HttpResponse('删除用户')



#
# if __name__=='__main__':
#     print(eye(4))