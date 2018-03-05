from drfrf_py.mixins import ValidateMixin
from rest_framework import viewsets
from testform.models import M33er
from testform.serializers import M33erSerializer


class M33erViewSet(ValidateMixin, viewsets.ModelViewSet):
    queryset = M33er.objects.all()
    serializer_class = M33erSerializer
