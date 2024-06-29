from django.urls import path
from . import views
from .views import sumarizare, download_image
urlpatterns = [
    path('entries/', views.EntryListCreate.as_view(), name='entry-list'),
    path('entries/delete/<int:pk>/', views.EntryDelete.as_view(), name='delete-entry'),
    path('sumarizare/', sumarizare, name='sumarizare'),
    path('download_image/', download_image, name='download_image'),
    path('albums/', views.AlbumViewSet.as_view(), name='album-list'),
    path('albums/delete/<int:pk>/', views.AlbumDelete.as_view(), name='delete-album'),
    path('entries/<int:entry_id>/add_to_albums/', views.AddEntryToAlbumsView.as_view(), name='add-to-albums'),
]