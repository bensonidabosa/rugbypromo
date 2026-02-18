from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from draw.models import Entry

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
