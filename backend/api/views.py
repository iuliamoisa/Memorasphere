from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, EntrySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Entry

# Create your views here.
# allows to create the user itself, after creating the serializer 

class EntryListCreate(generics.ListCreateAPIView):
    serializer_class = EntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Entry.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            user = self.request.user
            serializer.save(author=user)
        else:
            print(serializer.errors)

class EntryDelete(generics.DestroyAPIView):
    serializer_class = EntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Entry.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
# handles the creating of a new user 
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]