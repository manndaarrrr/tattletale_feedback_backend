# Turtle Tales Backend Deployment Guide

This guide explains how to deploy the Node.js backend to **Render.com** as a live, 24/7 API, and how to connect your GoDaddy frontend to it.

## 1. How to Deploy Backend to Render (Free)
1. Push this folder to a GitHub repository.
2. Create an account at [Render.com](https://render.com/).
3. Click **New +** > **Web Service**.
4. Connect your GitHub account and select your repository.
5. Configure the Web Service:
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
6. Render will build and launch your server. It will give you a live URL like `https://turtle-backend.onrender.com`.

## 2. What Environment Variables to Set in Render
You **must not** upload your `.env` file to GitHub for security reasons. Instead, you enter the variables directly into the Render dashboard.

On the Render dashboard for your Web Service:
1. Go to **Environment** > **Environment Variables**.
2. Add the following keys and your exact values:
   - `SMTP_HOST`: `smtp.gmail.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: `tattletale2026@gmail.com`
   - `SMTP_PASS`: `[YOUR 16-LETTER GOOGLE APP PASSWORD]`
   - `MAIL_TO`: `tattletale2026@gmail.com`
   - `ALLOWED_ORIGINS`: `*` (Or put your exact GoDaddy domain later, e.g. `https://www.turtletales.com`)

*Note: You do not need to add `PORT`. Render automatically injects its own port.*

## 3. Where to put Gmail SMTP Credentials
As described above, your sensitive 16-letter App Password goes into the **Environment Variables** section on the Render dashboard for production. For local development, it stays in the `.env` file on your laptop.

## 4. How to Connect Local Frontend to the Render Backend
Once Render successfully deploys your backend, you can test it directly from your local laptop!

1. Open `index.html`.
2. Scroll to the very bottom to the `<script id="tt-custom-feedback-script">`.
3. Look for the configuration block at the top:
   ```javascript
   var API_BASE_URL = 'http://localhost:3000';
   ```
4. Change it to your new Render URL:
   ```javascript
   var API_BASE_URL = 'https://turtle-backend.onrender.com';
   ```
5. Save the file. Your local frontend will now submit forms to the live internet backend!

## 5. How to keep using it when Frontend goes live on GoDaddy
When you are ready to upload your frontend files (`index.html`, CSS, images) to your GoDaddy server, **you don't have to change the backend at all!**

Just make sure `API_BASE_URL` is set to your Render URL (Step 4), and then upload `index.html` to GoDaddy. The GoDaddy website will instantly talk to your Render backend, and emails will continue to work perfectly.
