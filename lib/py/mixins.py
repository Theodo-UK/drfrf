from rest_framework import status
from rest_framework.decorators import list_route
from rest_framework.response import Response


class ValidateMixin(object):
    @list_route(methods=['post'])
    def validate(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response({}, status=status.HTTP_200_OK)
