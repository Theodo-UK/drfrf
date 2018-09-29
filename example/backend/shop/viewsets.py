from drfrf import ValidateCreateMixin
from rest_framework import viewsets
from rest_framework.decorators import list_route
from shop.models import CartItem
from shop.serializers import CartItemSerializer


class CartItemViewSet(ValidateCreateMixin, viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    @list_route(methods=["post"], url_path="validate")
    def validate(self, request):
        return self.validate_create(request)
