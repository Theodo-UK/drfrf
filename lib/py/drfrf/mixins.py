from rest_framework import status
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response


class ValidateCreateMixin(object):
    validate_url_path = "validate"

    @list_route(methods=["post"], url_path=validate_url_path)
    def validate_create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response({}, status=status.HTTP_200_OK)


class ValidateUpdateMixin(object):
    validate_url_path = "validate"

    @detail_route(methods=["put", "patch"], url_path=validate_url_path)
    def validate_update(self, request, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        return Response({}, status=status.HTTP_200_OK)
