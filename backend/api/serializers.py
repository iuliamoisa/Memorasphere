from django.contrib.auth.models import User
from rest_framework import serializers

# a serializer class is a class that converts complex data types, 
# such as querysets and model instances, into native Python datatypes that can then be easily 
# rendered into JSON, XML, or other content types.

# so takes python objects like User and convers into json data 
# that can be used in communication with other apps

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'full_name', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user