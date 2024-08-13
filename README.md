## MemoraSphere

**Bachelor's project**

## Description

This project aims to develop an innovative application that transforms textual memories into visual representations using artificial intelligence.
Inspired by my passion for documenting daily experiences and the nostalgic value of preserving moments from my childhood, this application allows users to record their daily events in text form and convert them into images. These images are then stored in a digital album, adding a vivid visual dimension to their memories.

## Technologies Used

- **Languages:**
  - Frontend: JavaScript
  - Backend: Python

- **Frameworks and Libraries:**
  - TensorFlow / PyTorch (for AI and image generation)
  - Hugging Face Transformers (for BART model)
  - Frontend: React
  - Backend: Django

## Database

  For this project, I chose to use the integrated SQLite3 database provided by Django. SQLite3 offers several advantages that align well with the needs of the application: it's a lightweight, serverless database engine that is easy to set up and use, minimizes the need for additional setup, it's well-suited for development and prototyping, where ease of setup and quick iteration are crucial.

## Features

- **Text Summarization:**
  Users can input daily memories or journal entries, which are then processed using an AI summarization model. This model, based on the BART (Bidirectional and Auto-Regressive Transformers) architecture, has been fine-tuned to handle personal and informal text.
  Unlike traditional datasets, which often contain overly formal or non-representative summaries, our model leverages a dataset of Reddit posts, which closely mirrors the personal and conversational tone of journal entries. This ensures more accurate and contextually relevant image generation from textual inputs.
  The application uses a refined version of the BART model  (`facebook/bart-large-xsum`) which is well-suited for summarizing and paraphrasing lengthy texts. By summarizing the input text, the application captures the essence of the user's memories and translates it into visual content, preserving the core message and emotional tone.

- **Text-to-Image Conversion:**
  Users can input daily memories or journal entries, which are then processed using an AI summarization model to extract key details, as described before. The summary is then converted into a corresponding image using a text-to-image AI model.
  This model, Stable-Diffusion-XL-Base (SDXL) developed by Stability AI, generates images based on text prompts, creating a visual representation of the user's memories.
  For running the AI model, we utilized Google Colab, a cloud computing service provided by Google. This choice was driven by the high computational resources required, which exceeded the capabilities of our local system. Google Colab offers an interactive environment that supports Python code execution in the browser and provides free access to high-performance computing resources, such as GPUs and TPUs, ideal for intensive processing tasks.

  The SDXL model was selected after testing several models available on the Hugging Face platform. This model demonstrated superior performance in generating coherent and contextually appropriate images from clear and concise text prompts. Although some prompts resulted in less suitable images, SDXL consistently produced high-quality visuals, effectively complementing our summarization process.

- **Digital Album:**
  The generated images are organized into digital albums, allowing users to save their visual memories in a structured manner. Each album can be downloaded locally, providing users with the ability to keep a personal, offline archive of their journal entries. This feature not only transforms textual memories into vivid and engaging visual formats but also allows users to organize and access their memories anytime, even without an internet connection. By turning written reflections into interactive visual content, the digital album significantly enhances the personal journaling experience, offering both convenience and a tangible connection to their memories.

- **Interactive Experience:**
  - Provides an engaging and interactive way to revisit past experiences through visual storytelling.
