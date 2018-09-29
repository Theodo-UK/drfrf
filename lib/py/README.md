# drfrf

[![CircleCI](https://circleci.com/gh/Theodo-UK/drfrf.svg?style=svg)](https://circleci.com/gh/Theodo-UK/drfrf)
[![PyPI](https://badgen.net/badge/pypi/v/drfrf)](https://pypi.org/project/drfrf/)

Django REST framework - redux-form connector

## Installation

`$ pipenv install drfrf`

## Usage

Import and use one of `ValidateCreateMixin` or `ValidateUpdateMixin`:

```py
from drfrf import ValidateCreateMixin, ValidateUpdateMixin
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from shop.models import CartItem
from shop.serializers import CartItemSerializer


class CartItemViewSet(ValidateCreateMixin, ValidateUpdateMixin, viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

    @list_route(methods=["post"], url_path="validate")
    def validate_list(self, request):
        return self.validate_create(request)

    @detail_route(methods=["post"], url_path="validate")
    def validate_detail(self, request, **kwargs):
        return self.validate_update(request, **kwargs)
```

Posting invalidate data to `/items/validate` would return error messages:

```http
HTTP/1.1 400 Bad Request
Content-Length: 99
Content-Type: application/json

{
    "amount": [
        "Your current credit is 36€, please top-up your account before adding to your cart."
    ]
}
```

Browse the complete example here: https://github.com/Theodo-UK/drfrf/tree/master/example/backend/shop

## API

### `ValidateCreateMixin`

Exposes one method: `validate_create` takes [Request](http://www.django-rest-framework.org/api-guide/requests/), validates the input data against the provided serializer and returns a [Response](http://www.django-rest-framework.org/api-guide/responses/).

### `ValidateUpdateMixin`

Exposes one method: `validate_update` takes [Request](http://www.django-rest-framework.org/api-guide/requests/) with kwargs, validates the input data against the provided serializer and returns a [Response](http://www.django-rest-framework.org/api-guide/responses/).

## Frontend integration

If you're using redux-form in your frontend, check out [drfrf for the front](../js).
