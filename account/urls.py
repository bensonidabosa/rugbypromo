from django.urls import path

from . import views

app_name = 'account'
urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("dashboard/", views.dashboard_view, name="dashboard"),
    path("edit_ticket/<ticket_id>/", views.edit_ticket_view, name="edit_ticket"),
    path("entry/<int:entry_id>/delete/", views.delete_entry_view, name="entry_delete"),
]