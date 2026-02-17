from django.urls import path

from . import views

app_name = 'frontend'
urlpatterns = [
    path('', views.home_view, name="home"),
    path('contact', views.contact_view, name="contact"),
    path('Enter-lottery/', views.enter_draw_view, name="apply"),
    path("success/<str:tracking_code>/", views.success, name="success"),
    path("track-ticket/", views.track_ticket_view, name="track_ticket"),
]
