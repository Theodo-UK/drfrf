from django.contrib import admin

from shop.models import CartItem


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("__str__", "amount", "created_at")
