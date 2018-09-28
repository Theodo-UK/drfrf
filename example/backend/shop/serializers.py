from rest_framework import serializers
from shop.models import CartItem


class CartItemSerializer(serializers.ModelSerializer):
    stock = 20
    unit_price = 2
    credit = 36

    class Meta:
        fields = "__all__"
        model = CartItem

    def validate_amount(self, value):
        if value > self.stock:
            raise serializers.ValidationError(
                f"There are currently only {self.stock} items in stock, please choose a value between 1 and {self.stock}."
            )

        price = value * self.unit_price
        if price > self.credit:
            raise serializers.ValidationError(
                f"Your current credit is {self.credit}€, please top-up your account before adding to your cart."
            )

        count = CartItem.objects.filter(amount=value).count()
        if count > 0:
            raise serializers.ValidationError(
                "An order for this quantity has already been placed."
            )

        return value
