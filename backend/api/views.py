from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
# allows to create the user itself, after creating the serializer 

class CreateUserView(generics.CreateAPIView):
# handles the creating of a new user 
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]