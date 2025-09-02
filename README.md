# 💪 True Effects - Application that allows you to manage your training  

🌍 **Demo**: [https://www.true-effects.pl](https://www.true-effects.pl)  

---

## 🔑 Test Account

### 👤 Login: **testuser**  
### 🔒 Password: **testuser**  

---

## 🛠️ Technology Stack

### ⚙️ DevOps & Infrastructure
- 🐳 **Docker** - containerized deployment  
- 🌐 **Nginx** - serving static files & reverse proxy  
- ☁️ **Terraform** - Infrastructure as Code (Azure resource provisioning)  
- 🔷 **Microsoft Azure** - cloud hosting (App Services, Container Apps, Storage, Networking)  
- 🤖 **GitHub Actions** - CI/CD automation  

### 🔙 Backend
- 🐍 **Django** - core backend framework  
- 🔌 **WebSockets** - real-time updates (achievements system, training progress)  

### 🎨 Frontend
- ⚛️ **React** - component-based UI  
- 📦 **Redux** - global state management  
- 📝 **Formik** - form handling  
- ✅ **Yup** - form validation  

---

## 📖 Application Description

The backend of this application is built with the **Django framework**.  
- Users can **register and log in** - authentication is required to use the app.  
- **Frontend** is written in **React**, with **Redux** for centralized state management.  
- Forms are validated via **Formik** + **Yup** to ensure proper data input.  
- **Docker** is used for seamless deployment.  
- **Nginx** serves static files and proxies requests.  
- **Terraform** provisions **Azure infrastructure** (App Services, Container Apps, Storage Accounts, Networking) as code, ensuring reproducibility and scalability.  
- The app is hosted on **Azure** and automatically rebuilt & reloaded with every approved PR using **GitHub Actions**.  
- **WebSockets** are integrated to provide **real-time updates** (mainly for achievements and progress tracking).  

---

## 🚀 Features

- 🔑 **User Authentication** - login & registration system  
- 🗓️ **Calendar with Trainings** - display all trainings, preview details, modify or start workouts  
- 🏋️ **Create Trainings** - build fully customized workouts with rest times, reps, phases etc.  
- ✏️ **Modify Trainings** - update every detail of your workout to fit your needs  
- 📚 **Exercise Library** - use predefined exercises or create your own in just a few clicks  
- 🎯 **Goals System** - set goals with deadlines, names, descriptions and track completion status  
- 📏 **Dimensions Tracking** - log your body measurements and compare progress over time  
- ⚙️ **User Settings** - customize app display, manage visible fields in dimensions, change password etc.  
- 🏆 **Achievements System (NEW!)** - unlock badges & milestones as you progress through your training  
- 🔴 **WebSocket Integration** - get real-time updates (achievements, training progress, notifications)  
- 💪 **Training Mode** - most important feature: after each workout, all data is saved so the user can review results in the calendar  
- 🚀 And much more!  

---

## 🏗️ Architecture

🔹 **Frontend (React + Redux)** - deployed in Azure App Service  
🔹 **Backend (Django + WebSockets)** - deployed in Azure Container Apps  
🔹 **Nginx** - reverse proxy & static file serving  
🔹 **Terraform** - defines Azure infrastructure as code (App Services, Container Apps, Storage, Networking, CI/CD integration)  
🔹 **GitHub Actions** - builds & deploys Docker images to Azure  

