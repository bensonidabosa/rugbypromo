import uuid
import secrets
from django.db import models
from django.utils import timezone


# ---------------------------------
# Draw Model
# ---------------------------------
class Draw(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2)
    jackpot_amount = models.DecimalField(max_digits=15, decimal_places=2)
    draw_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# ---------------------------------
# Purchase Entry (One Form Submission)
# ---------------------------------
class Entry(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField(db_index=True)
    phone_number = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    draw = models.ForeignKey(Draw, on_delete=models.CASCADE, related_name="entries")

    ticket_quantity = models.PositiveIntegerField(default=1)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)

    payment_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.full_name} - {self.email}"


# ---------------------------------
# Individual Tickets (Important!)
# ---------------------------------
class Ticket(models.Model):
    entry = models.ForeignKey(Entry, on_delete=models.CASCADE, related_name="tickets")
    draw = models.ForeignKey(Draw, on_delete=models.CASCADE, related_name="tickets")

    tracking_code = models.CharField(max_length=20, unique=True, editable=False)
    ticket_number = models.CharField(max_length=20, unique=True, editable=False)

    is_winner = models.BooleanField(default=False)
    prize_amount = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def generate_unique_code(self):
        return secrets.token_hex(6).upper()

    def save(self, *args, **kwargs):
        if not self.tracking_code:
            code = self.generate_unique_code()
            while Ticket.objects.filter(tracking_code=code).exists():
                code = self.generate_unique_code()
            self.tracking_code = code

        if not self.ticket_number:
            number = secrets.token_hex(5).upper()
            while Ticket.objects.filter(ticket_number=number).exists():
                number = secrets.token_hex(5).upper()
            self.ticket_number = number

        super().save(*args, **kwargs)

    def __str__(self):
        return self.tracking_code
