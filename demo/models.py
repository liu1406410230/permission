from django.db import models

# Create your models here.

class Role(models.Model):
    '''角色表'''
    title=models.CharField(max_length=32)
    permissions = models.ManyToManyField(to='Permissions',verbose_name='具有的所有权限',blank=True)

    class Meta:
        verbose_name_plural='角色表'

    def __str__(self):
        return self.title


class UserInfo(models.Model):
    username=models.CharField(max_length=32,verbose_name='用户名')
    password=models.CharField(max_length=32,verbose_name='密码')
    email=models.CharField(max_length=32,verbose_name='邮件')
    roles=models.ManyToManyField(to='Role',verbose_name='现有的所有角色',blank=True)

    class Meta:
        verbose_name_plural='用户表'

    def __str__(self):
        return self.username

class Permissions(models.Model):
    title=models.CharField(max_length=64,verbose_name='标题')
    url=models.CharField(max_length=64,verbose_name='含规则url')
    is_menu=models.BooleanField(verbose_name='是否是菜单')

    class Meta:
        verbose_name_plural='权限表'

    def __str__(self):
        return self.title
