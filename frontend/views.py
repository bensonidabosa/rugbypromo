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
            first_ticket = tickets[0] if tickets else None
            return render(request, "frontend/success.html", {
                "tickets": tickets,
                "entry": entry,
                "first_ticket":first_ticket
            })
    else:
        form = EntryForm()

    return render(request, "frontend/enter_draw.html", {"form": form, "draw": draw})

def success(request, tracking_code):
    return render(request, "frontend/success.html", {"tracking_code": tracking_code})


def track_ticket_view(request):
    ticket = None
    error = None

    if request.method == "POST":
        tracking_code = request.POST.get("tracking_code", "").strip().upper()

        if not tracking_code:
            error = "Please enter a tracking code."
        else:
            try:
                ticket = Ticket.objects.select_related("draw", "entry").get(
                    tracking_code=tracking_code
                )
            except Ticket.DoesNotExist:
                error = "Invalid tracking code. Please check the code and try again."

    context = {
        "ticket": ticket,
        "error": error
    }

    return render(request, 'frontend/track_ticket.html', context)


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
