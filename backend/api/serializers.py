from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Entry, GeneratedPhoto

# a serializer class is a class that converts complex data types, 
# such as querysets and model instances, into native Python datatypes that can then be easily 
# rendered into JSON, XML, or other content types.

# so takes python objects like User and convers into json data 
# that can be used in communication with other apps

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(required=True, max_length=60)
    email = serializers.EmailField()
    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        full_name = validated_data.pop('full_name') 
        user = User.objects.create_user(**validated_data)
        user.full_name = full_name  # Setăm full_name-ul utilizatorului
        user.save()
        return user
    
class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ['id', 'content', 'image', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}}

class GeneratedPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedPhoto
        fields = '__all__'
