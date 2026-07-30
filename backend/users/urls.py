from django.urls import path
from users.views import RegisterView, UserProfileView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="user_register"),
    path("me/", UserProfileView.as_view(), name="user_profile"),
]