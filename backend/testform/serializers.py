from rest_framework import serializers
from testform.models import M33er


class M33erSerializer(serializers.ModelSerializer):
    class Meta:
        model = M33er
        fields = ('id', 'alias', 'arrival_date', 'startup')
