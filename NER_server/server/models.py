from django.db import models

# Create your models here.


class GeoInfo(models.Model):
    latitude = models.TextField(verbose_name='위도')
    longitude = models.TextField(verbose_name='경도')
    # registered_dttm = models.DateTimeField(auto_now_add=True,
    #                                        verbose_name='등록시간')

    # def __str__(self):
    #     return self.title

    class Meta:
        db_table = 'fastcampus_board'
        verbose_name = '패스트캠퍼스 게시글'
        verbose_name_plural = '패스트캠퍼스 게시글'
