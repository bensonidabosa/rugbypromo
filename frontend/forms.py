from django import forms
from .models import DrawEntry

class DrawEntryForm(forms.ModelForm):
    class Meta:
        model = DrawEntry
        fields = [
            "full_name",
            "email",
            "phone_number",
            "country",
            "city",
            "ticket_quantity",
            "amount_paid",
        ]
