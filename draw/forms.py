from django import forms
from .models import Entry, Ticket

class EntryForm(forms.ModelForm):
    # ticket_quantity = forms.IntegerField(
    #     min_value=1,                 
    #     max_value=100,              
    #     required=True,
    #     widget=forms.NumberInput(attrs={
    #         "class": "form-control custom-input",
    #         "placeholder": "Number of Tickets",
    #         "step": 1,
    #         "value": "",           
    #         "required": True
    #     }),
    #     error_messages={
    #         "required": "Please enter the number of tickets you want to buy.",
    #         "min_value": "You must buy at least 1 ticket.",
    #         "max_value": "You cannot buy more than 100 tickets."
    #     }
    # )

    class Meta:
        model = Entry
        fields = [
            "full_name",
            "email",
            "phone_number",
            "country",
            "state",
            "city",
            "zipcode"
            # "ticket_quantity",
        ]

        widgets = {
            "full_name": forms.TextInput(attrs={
                "class": "form-control custom-input",
                "placeholder": "Full Name"
            }),
            "email": forms.EmailInput(attrs={
                "class": "form-control custom-input",
                "placeholder": "Email Address"
            }),
            "phone_number": forms.TextInput(attrs={
                "class": "form-control custom-input",
                "placeholder": "Phone Number"
            }),
            "country": forms.TextInput(attrs={
                "class": "form-control custom-input",
                "placeholder": "Country"
            }),
            "state": forms.TextInput(attrs={
                "class": "form-control custom-input",
                "placeholder": "State"
            }),
            "city": forms.TextInput(attrs={
                "class": "form-control custom-input",
                "placeholder": "City"
            }),
            "zipcode": forms.TextInput(attrs={
                "class": "form-control custom-input",
                "placeholder": "Zip Code"
            }),
        }

    # def clean_ticket_quantity(self):
    #     qty = self.cleaned_data.get("ticket_quantity")
    #     if qty is None:
    #         raise forms.ValidationError("Please enter the number of tickets.")
    #     if qty < 1:
    #         raise forms.ValidationError("You must buy at least 1 ticket.")
    #     if qty > 100:
    #         raise forms.ValidationError("Maximum 100 tickets per purchase.")
    #     return qty



class TicketForm(forms.ModelForm):
    class Meta:
        model = Ticket
        # Only include fields that make sense to edit
        fields = ['status', 'prize_amount']
        widgets = {
            'status': forms.Select(attrs={'class': 'form-control'}),
            'prize_amount': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01'}),
        }
        labels = {
            'status': 'Ticket Status',
            'prize_amount': 'Prize Amount',
        }
        widgets = {
            'status': forms.Select(
                attrs={
                    'class': 'form-select',  # Bootstrap select
                }
            ),
            'prize_amount': forms.NumberInput(
                attrs={
                    'class': 'form-control',  # Bootstrap input
                    'step': '0.01',
                    'placeholder': 'Enter prize amount'
                }
            ),
        }

