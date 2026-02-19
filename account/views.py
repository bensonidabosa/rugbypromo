from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.urls import reverse

from draw.models import Entry, Ticket
from draw.forms import TicketForm

def login_view(request):
    if request.user.is_authenticated:
        return redirect("account:dashboard")  

    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect("account:dashboard") 
        else:
            messages.error(request, "Invalid username or password")

    return render(request, "account/login.html")


@login_required(login_url="account:login")
def logout_view(request):
    logout(request)
    return redirect("account:login")


@login_required(login_url="account:login")
def dashboard_view(request):
    entries = Entry.objects.select_related("draw").prefetch_related("tickets").order_by("-created_at")

    return render(request, "account/dashboard.html", {
        "entries": entries
    })


@login_required(login_url="account:login")
def edit_ticket_view(request, ticket_id):
    ticket = get_object_or_404(Ticket, id=ticket_id)
    if request.method == "POST":
        form = TicketForm(request.POST, instance=ticket)
        if form.is_valid():
            form.save()
            messages.success(request, 'Ticket was Updated successfully')
            return redirect('account:dashboard')  # replace with your URL
    else:
        messages.error(request, 'Something went wrong, please try again')
        form = TicketForm(instance=ticket)

    return render(request, 'account/edit_ticket.html', {'form': form, 'ticket':ticket})


def delete_entry_view(request, entry_id):
    # Get the entry or return 404
    entry = get_object_or_404(Entry, id=entry_id)

    if request.method == "POST":
        # Delete the entry
        entry.delete()
        # Redirect to the entry list or home page
        messages.success(request, 'Entry was deleted successfully')
        return redirect(reverse("account:dashboard"))

    # If GET request, show confirmation page
    return render(request, "account/entry_confirm_delete.html", {"entry": entry})
