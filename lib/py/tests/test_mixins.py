import unittest

from django.db.models.query import QuerySet
from rest_framework import exceptions, generics, serializers

from drfrf import ValidateCreateMixin, ValidateUpdateMixin

# Mock classes


class MockSerializer(serializers.Serializer):
    value = serializers.IntegerField()

    def validate_value(self, data):
        if data > 5:
            raise serializers.ValidationError("meh")
        return data


class MockView(ValidateCreateMixin, ValidateUpdateMixin, generics.GenericAPIView):
    format_kwarg = ""
    queryset = QuerySet()
    serializer_class = MockSerializer

    def get_object(self):
        return {}


class Req(object):
    def __init__(self, value):
        self.data = {"value": value}


# Tests


class ValidateMixinTestMixin(object):
    def setUp(self):
        self.view = MockView()
        self.request = Req(2)
        self.view.request = self.request

    def test_no_errors(self):
        response = self.call()
        self.assertEqual(response.status_code, 200)

    def test_errors(self):
        self.request.data["value"] = 6
        with self.assertRaises(serializers.ValidationError) as cm:
            self.call()

        self.assertEqual(cm.exception.status_code, 400)
        self.assertIn("value", cm.exception.detail)
        self.assertIsInstance(cm.exception.detail["value"], list)
        self.assertTrue(len(cm.exception.detail["value"]), 1)
        self.assertIsInstance(cm.exception.detail["value"][0], exceptions.ErrorDetail)
        self.assertEqual(cm.exception.detail["value"][0].code, "invalid")
        self.assertEqual(str(cm.exception.detail["value"][0]), "meh")


class ValidateCreateMixinTestCase(ValidateMixinTestMixin, unittest.TestCase):
    def call(self):
        return self.view.validate_create(self.request)


class ValidateUpdateMixinTestCase(ValidateMixinTestMixin, unittest.TestCase):
    def call(self):
        return self.view.validate_update(self.request)


if __name__ == "__main__":
    unittest.main()
