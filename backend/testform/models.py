from django.core.validators import RegexValidator
from django.db import models


class M33er(models.Model):
    STARTUP_CHOICES = (
        ('thfr', 'Theodo FR'),
        ('bam', 'BAM'),
        ('thuk', 'Theodo UK'),
        ('sic', 'Sicara'),
        ('sip', 'Sipios'),
    )

    alias = models.CharField(
        max_length=16,
        validators=[RegexValidator(r'^[a-z]+$')],
        unique=True
    )
    arrival_date = models.DateField()
    startup = models.CharField(max_length=10, choices=STARTUP_CHOICES)
