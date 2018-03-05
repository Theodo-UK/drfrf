from django.contrib import admin
from testform.models import M33er


@admin.register(M33er)
class M33erAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'alias',
        'arrival_date',
        'startup'
    )
