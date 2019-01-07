#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: ljl
@file: forms.py 
@time: 2018/12/25 15:44
@desc:
"""
from django import forms
from django.core.validators import RegexValidator

role_regex_validator=RegexValidator(r"[a-zA-Z0-9]","角色标识字母、数字、下划线")
PMS_MAP = (
    ('PM_ADD_USER', '新增用户'),
    ('PM_SET_MAIL', '编辑邮箱'),
    ...
)
class RoleForm(forms.Form):
    role_row_code=forms.IntegerField(required=False,widget=forms.HiddenInput())
    role_code = forms.CharField(label='角色标记', min_length=3, max_length=64,validators=[role_regex_validator])
    role_name = forms.CharField(label='角色名', min_length=3, max_length=64)
    OPTIONS=PMS_MAP
    pms=forms.MultipleChoiceField(label='权限列表', widget=forms.SelectMultiple(choices=OPTIONS))
