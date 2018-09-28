import uuid

from django.db import models


class CartItem(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    amount = models.IntegerField()

    class Meta:
        get_latest_by = "created_at"
        ordering = ("-created_at",)

    def __str__(self):
        return "%s:%s" % (self.__class__.__name__.lower(), str(self.uuid)[:6])
