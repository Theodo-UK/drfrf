from drfrf import ValidateCreateMixin
from rest_framework import viewsets
from shop.models import CartItem
from shop.serializers import CartItemSerializer


class CartItemViewSet(ValidateCreateMixin, viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
