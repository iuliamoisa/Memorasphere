from django.db import models
from django.contrib.auth.models import User

# # Create your models here.
# class Entry(models.Model):
#     content = models.TextField()
#     image = models.ImageField(upload_to='images/', null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='entries')

#     def __str__(self):
#         return self.content[:60]
    
class Entry(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    image = models.TextField(blank=True, null=True)  # Assuming image is stored as a base64 string
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content[:60]


class GeneratedPhoto(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='generated_photos/')
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo generated by {self.user.username} on {self.created_at}"
