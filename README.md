# JobFinder 

## Overview
JobFinder is a professional social networking simulation designed to connect professionals with career opportunities. The application features a dynamic feed for sharing updates, a real-time "Who to Follow" suggestion sidebar powered by an external API. 

## Features

### 1. Dynamic Post System
* **Real-time Posting:** Users can share text updates and upload images, which are instantly prepended to the feed.
* **Media Handling:** Uses URL.createObjectURL to generate local previews of uploaded images without a backend.
* **State Validation:** The "Post" button is context-aware, enabling only when text or an image is present.


### 2. UI Components
* **Account Logout:** A custom dropdown menu for account settings and a secure logout redirection to the landing page.
* **Account Login:** Default login pre-coded to help interact with the web application mechanism 


### 3. Data Integration
* **External User API:** Integrates the RandomUser.me API to fetch and display real-time professional connections from a specific geographic region (Canada).
* **Asynchronous Logic:** Uses fetch with async/await and error handling to ensure a smooth user experience even during network delays.

## Technologies Used

* **HTML5** – Structure of the application
* **CSS** – Styling, layout, and responsiveness
* **JavaScript** – Game logic and interactivity
* **Font Awesome** – Icons for UI enhancement
* **Random User API** - Generates random user accounts in "Who to Follow" section

## How it Works

> 1. Open index.html in a modern web browser.
  2. Log in using the default credentials: Jane.Doe@email.    com / password123.
  3. Interact with the post form, by posting uploaded image files, or simple text.

## Login Details

### Option 1
- Username: Jane123
- Password: password123

### Option 2
- Email: Jane.Doe@email.com
- Password: password123

## LIVE DEMO
CClick here for [Live Demo](https://pattyruk.github.io/finder/)

## Developer
Manvir
Patrick