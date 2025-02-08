# COVID-19 Prediction Project - Deployment Guide

A complete web application for COVID-19 prediction using CT scans and X-rays, deployed with Netlify (frontend) and Render (backend).

## Project Structure

```
covid_project/
│── frontend/          # Frontend (Netlify)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── assets/        # Images, Icons
│── backend/           # Backend (Render)
│   ├── app.py
│   ├── models/        # Trained ML Models
│   ├── uploads/       # User-uploaded images
│   ├── train_model.py
│   ├── requirements.txt
│── dataset/           # Training data
│── README.md
```

## Deployment Guide

### 1. GitHub Repository Setup

1. Create a GitHub repository (e.g., covid-prediction)
2. Push your frontend and backend code to GitHub using these commands:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/asunm295222204758/Covidpredictor.git
git push -u origin main
```

### 2. Frontend Deployment (Netlify)

#### Step 1: Create a Netlify Account
- Sign up at [Netlify](https://www.netlify.com/)

#### Step 2: Deploy from GitHub
1. Go to Netlify Dashboard → Click "New Site from Git"
2. Select your GitHub repository (covid_project/frontend)
3. Set build settings:
   - Build command: None (Since it's static HTML, CSS, JS)
   - Publish directory: frontend/
4. Click Deploy

Your frontend will be live at a URL like: `https://covid-prediction.netlify.app`

### 3. Backend Deployment (Render)

#### Step 1: Create a Render Account
- Sign up at [Render](https://render.com/)

#### Step 2: Deploy Flask Backend
1. Go to Render Dashboard → Click "New Web Service"
2. Connect your GitHub repository (covid_project/backend)
3. Select the backend folder for deployment
4. Set deployment settings:
   - Runtime: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python app.py`
5. Click Deploy

Your backend API will be available at: `https://your-render-backend.onrender.com`

### 4. Connect Frontend to Backend

1. Open `script.js` in frontend
2. Update the API URL:
```javascript
let response = await fetch("https://your-render-backend.onrender.com/predict", {
    method: "POST",
    body: formData
});
```
3. Push changes to GitHub and Netlify will update automatically

### 5. Final Testing

1. Visit your Netlify site (`https://covid-prediction.netlify.app`)
2. Upload a CT scan or X-ray
3. Click Upload & Predict
4. Verify the prediction result from Render backend

### 6. Deployment Links

- GitHub Repository: `https://github.com/your-username/covid-prediction`
- Frontend (Netlify): `https://covid-prediction.netlify.app`
- Backend (Render): `https://your-render-backend.onrender.com`

## Status 🎉

The project is fully deployed with:
- Frontend hosted on Netlify
- Backend running on Render
- Version control through GitHub

For any issues or questions, please open an issue in the GitHub repository.
