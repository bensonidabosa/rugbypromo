import uuid
import random
import string
from django.db import models
from django.utils import timezone


class DrawEntry(models.Model):
    # User Information (from form)
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    # Ticket Info
    ticket_quantity = models.PositiveIntegerField(default=1)
    tracking_code = models.CharField(max_length=20, unique=True, editable=False)
    ticket_number = models.CharField(max_length=20, unique=True, editable=False)

    # Payment Info (optional for now)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)

    # Status
    is_winner = models.BooleanField(default=False)
    prize_amount = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)

    created_at = models.DateTimeField(default=timezone.now)

    def generate_tracking_code(self):
        return str(uuid.uuid4()).replace("-", "").upper()[:12]

    def generate_ticket_number(self):
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))

    def save(self, *args, **kwargs):
        if not self.tracking_code:
            self.tracking_code = self.generate_tracking_code()

        if not self.ticket_number:
            self.ticket_number = self.generate_ticket_number()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.full_name} - {self.tracking_code}"
