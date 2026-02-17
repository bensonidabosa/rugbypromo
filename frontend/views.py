from django.shortcuts import render, get_object_or_404
from django.db import transaction

from draw.models import Entry, Ticket, Draw
from draw.forms import EntryForm

def home_view(request):
    return render(request, 'frontend/index.html')

def contact_view(request):
    return render(request, 'frontend/contact.html')

@transaction.atomic
def enter_draw_view(request):
    # Fetch the first active draw
    draw = get_object_or_404(Draw, is_active=True)

    if request.method == "POST":
        form = EntryForm(request.POST)
        if form.is_valid():
            entry = form.save(commit=False)
            entry.draw = draw
            entry.total_amount = entry.ticket_quantity * draw.ticket_price
            entry.payment_verified = True  # change later when adding real payment
            entry.save()

            tickets = []
            for _ in range(entry.ticket_quantity):
                ticket = Ticket.objects.create(entry=entry, draw=draw)
                tickets.append(ticket)

            return render(request, "frontend/success.html", {
                "tickets": tickets,
                "entry": entry,
            })
    else:
        form = EntryForm()

    return render(request, "frontend/enter_draw.html", {"form": form, "draw": draw})

def success(request, tracking_code):
    return render(request, "frontend/success.html", {"tracking_code": tracking_code})




# @transaction.atomic
# def enter_draw_view(request, draw_id):
#     draw = get_object_or_404(Draw, id=draw_id, is_active=True)

#     if request.method == "POST":
#         form = EntryForm(request.POST)
#         if form.is_valid():
#             entry = form.save(commit=False)
#             entry.draw = draw
#             entry.total_amount = entry.ticket_quantity * draw.ticket_price
#             entry.payment_verified = True  # change later when adding real payment
#             entry.save()

#             tickets = []
#             for _ in range(entry.ticket_quantity):
#                 ticket = Ticket.objects.create(entry=entry, draw=draw)
#                 tickets.append(ticket)

#             return render(request, "frontend/success.html", {
#                 "tickets": tickets,
#                 "entry": entry,
#             })
#     else:
#         form = EntryForm()

#     return render(request, "frontend/enter_draw.html", {"form": form, "draw": draw})
