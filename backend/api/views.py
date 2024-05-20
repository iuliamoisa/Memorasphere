from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, EntrySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Entry
from api.summarizer import sumarizare_text
import json
import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from PIL import Image
from io import BytesIO
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from googleapiclient.http import MediaIoBaseDownload
import io
from django.http import HttpResponse
# Create your views here.


# @csrf_exempt
# def check_image_status(request):
#     try:
#         # Încărcați cheia de serviciu JSON și autentificați-vă cu Google Drive API
#         SERVICE_ACCOUNT_FILE = "api/licenta-419216-0b00d36b19da.json"
#         SCOPES = ['https://www.googleapis.com/auth/drive']
#         credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
#         drive_service = build('drive', 'v3', credentials=credentials)

#         # Căutați imaginea în directorul specific
#         folder_id = get_folder_id(drive_service)
#         image_exists = check_image_in_drive(drive_service, folder_id)

#         # Returnați un răspuns corespunzător în funcție de starea imaginii
#         if image_exists:
#             return JsonResponse({"status": "ready"})
#         else:
#             return JsonResponse({"status": "pending"})
#     except Exception as e:
#         print("Error checking image status:", e)
#         return JsonResponse({"status": "error"})

def get_folder_id(drive_service):
    # Verificați dacă există un director cu numele 'licenta'
    query = f"name='licenta' and mimeType='application/vnd.google-apps.folder' and trashed=false"
    existing_folders = drive_service.files().list(q=query, fields='files(id)').execute().get('files', [])
    
    # Întoarceți ID-ul directorului 'licenta' dacă acesta există
    if existing_folders:
        return existing_folders[0]['id']
    else:
        # Creați directorul 'licenta' dacă nu există
        folder_metadata = {
            'name': 'licenta',
            "mimeType": "application/vnd.google-apps.folder",
            'parents': []
        }
        created_folder = drive_service.files().create(body=folder_metadata, fields='id').execute()
        return created_folder["id"]

# def check_image_in_drive(drive_service, folder_id):
#     # Verificați dacă există o imagine în directorul specific
#     query = f"'{folder_id}' in parents and mimeType='image/jpeg' and trashed=false"
#     image_files = drive_service.files().list(q=query, fields='files(id)').execute().get('files', [])
#     return len(image_files) > 0

@csrf_exempt
def download_image(request):
    try:
        SERVICE_ACCOUNT_FILE = "api/licenta-419216-0b00d36b19da.json"
        SCOPES = ['https://www.googleapis.com/auth/drive']
        credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        drive_service = build('drive', 'v3', credentials=credentials)

        folder_id = "1mBzAFNkjilJub5SyK0JMNQb6zJXTsBOU"
        image_list = drive_service.files().list(q=f"'{folder_id}' in parents and name = 'generated_image.jpg' and trashed=false").execute().get('files', [])

        if not image_list:
            return JsonResponse({"error": "Image file not found in the specified directory"}, status=404)

        image_id = image_list[0]['id']
        request = drive_service.files().get_media(fileId=image_id)
        fh = io.BytesIO()
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
        fh.seek(0)

        response = HttpResponse(fh.read(), content_type='image/jpeg')
        response['Content-Disposition'] = 'attachment; filename="generated_image.jpg"'

        # Optional: Delete the image file after serving it
        drive_service.files().delete(fileId=image_id).execute()

        return response

    except Exception as e:
        print("Error downloading image:", e)
        return JsonResponse({"error": str(e)}, status=500)


def download_image_from_drive(drive_service, file_id):
    request = drive_service.files().get_media(fileId=file_id)
    fh = io.BytesIO()
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while done is False:
        status, done = downloader.next_chunk()
    fh.seek(0)
    return fh.read()

def get_image_file_id(drive_service, folder_id):
    # Verificați dacă există o imagine în directorul specific
    query = f"'{folder_id}' in parents and mimeType='image/jpeg' and trashed=false"
    image_files = drive_service.files().list(q=query, fields='files(id)').execute().get('files', [])
    if image_files:
        return image_files[0]['id']
    else:
        raise Exception("Image file not found in the specified directory")
@csrf_exempt
def sumarizare(request):
    if request.method == 'POST':
        # text = request.POST.get('text', '') 
        data = json.loads(request.body)
        text = data.get('text', '')
        print("TEXTUL INTRODUS DE USER ESTE URMATORUL: --------------------", text)
        summary = sumarizare_text(text)
        # comentariile de mai jos sunt pt versiunea cu google search api
        # indice_virgula = summary.find(',')

        # if indice_virgula != -1:  
        #     text_pana_la_virgula = summary[:indice_virgula]
        #     summary = text_pana_la_virgula

        print("SUMARIZAREA OBTINUTA ESTE URMATOAREA: -------------------- ",summary)
        
        trimite_sumarizare(summary) # USE CASE 1 : cu google colab - ai preantrenat text-to-img
        # trimite_sumarizare2(summary) # USE CASE 2 : cu google search api pt obtinere imagini
        return JsonResponse({'text': summary}) 
    else:
        return JsonResponse({'error': 'Metoda HTTP necunoscută'})

@csrf_exempt
def trimite_sumarizare(summary):
    with open('sumarizare.txt', 'w') as file:
        file.write(summary)
    SCOPES = ['https://www.googleapis.com/auth/drive']
    SERVICE_ACCOUNT_FILE = "api/licenta-419216-0b00d36b19da.json"
    credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    drive_service = build('drive', 'v3', credentials=credentials)

    query = f"name='licenta' and mimeType='application/vnd.google-apps.folder' and trashed=false"
    existing_folders = drive_service.files().list(q=query, fields='files(id)').execute().get('files', [])
    
    if existing_folders:
        print(f"Directorul cu numele 'licenta' există deja în Google Drive.")
        folder_id = existing_folders[0]['id']
        print("*************************** folder id este: ")
        
    else:
        folder_metadata = {
            'name': 'licenta',
            "mimeType": "application/vnd.google-apps.folder",
            'parents': []
        }

        created_folder = drive_service.files().create(
            body=folder_metadata,
            fields='id'
        ).execute()

        folder_id = created_folder["id"]
        print(f'Created Folder ID: {created_folder["id"]}')
    
    file_metadata = {
        'name': 'sumarizare.txt',
        'parents': [folder_id]
    }
    media = MediaFileUpload('sumarizare.txt', mimetype='text/plain')
    uploaded_file = drive_service.files().create(body=file_metadata, media_body=media, fields='id').execute()

    print(f"Fișierul sumarizare.txt a fost încărcat cu succes în directorul 'licenta'.")
    response = drive_service.files().list(q=query, fields='files(id, name)').execute()
    # image_list = drive_service.files().list(q=f"'{folder_id}' in parents and name = 'generated_image.jpg' and trashed=false").execute().get('files', [])
    # if image_list:
    #     image_id = image_list[0]['id']
    #     drive_service.files().delete(fileId=image_id).execute()
    #     print("Fișierul generated_image.jpg a fost găsit și șters cu succes.")
    # else:
    #     print("Fișierul generated_image.jpg nu a fost găsit în directorul 'licenta'.")
    # Verifică dacă s-au găsit rezultate
    if 'files' in response:
        for file in response['files']:
            print(f"ID: {file['id']}, Nume: {file['name']}")
    else:
        print("Nu s-au găsit rezultate pentru directorul 'licenta'.")


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