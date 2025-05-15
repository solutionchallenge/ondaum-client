
# Ondaum client - Web App
> Hello👋 This is team Ondaum. ***Ondaum*** is a pure Korean word, meaning ***'a warm and genuine self'***.

![Google Gemini](https://img.shields.io/badge/google%20gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## 🌍 OVERVIEW
We want to help people around the world live healthier lives by being with Um, an AI professional psychological counseling companion, anytime and anywhere.

In the past year, 73.6% of Korean young adults experienced mental health challenges. In addition, global statistics reveal that 66% of individuals aged 18-24 report experiencing moderate to severe.

Ondaum provides accessible, mental health support anytime, anywhere, reducing financial and stigma barriers. The chatbot analyzes conversations in real time to detect risk signals and offer timely support, while its friendly interface keeps users engaged and lowers resistance.



Let's start https://ondaum.revimal.me/

#### 📱 FEATURES
- AI Counseling With Um
  - Personalized Psychological Assessments & Real-Time Crisis Response
- Psychological Assessments
  - International standard tests(PHQ-9 / GAD-7 / PSS)
  - Deliver tailored insights and links to support upon risk detection
- AI Analysis of Conversation Content
  - Summary and organization of the conversation
  - extracting key emotions and keywords
  - visualize the recommends using charts

#### ✨ VALUES
- Available for consultation anytime, anywhere
- Personalized consultation possible
- Reduced barriers to seeking counseling
- Access to a pre-trained professional psychological counseling AI

## 🛠 SKILLS
- **Web**: React, Typescript, Zustand, web socket
- **Mobile**: Flutter, Dart
- **AI**: Gemini-2.5-Pro
- **Auth**: Google Oauth, jwt
- **Bundler**: Vite, 
- **Package Manager**: NPM
- **Logging System**: Google Analytics

## CLIENT ARCHITECTURE
```mermaid
graph TD
    Web[Web]
    iOS[iOS]
    Android[Android]
    Ondaum[ondaum-client]
    Flutter[ondaum-application]

    Flutter --> iOS
    Flutter --> Android
    Ondaum --> Web
    Ondaum --> Flutter
```
  
## 📁 DIRECTORY
```
src/
├── api/           # server API list
│   ├── auth
│   ├── chat
│   ├── onboarding
│   ├── report
│   └── test
├── assets/        # static assets
│   ├── images
│   └── lotties    
├── commons/       # common components (like metaial UI)
│   ├── data-display
│   ├── feedback
│   ├── inputs
│   ├── mui-x/DatePickers
│   ├── navigation
│   └── surfaces
├── hooks/         # custom hooks
├── services/      # service components
│   ├── auth
│   ├── error
│   ├── home
│   ├── onboarding
│   ├── report
│   └── setting
├── styles/        # reset css
├── store/         # zustand store
│   ├── auth
│   ├── chat
│   ├── keyboard
│   └── onboarding
```

## 🚀 INSTALLATION

1. Set Node LTS Version (As of May 15, 2025)
```bash
node -v v 22.15.0
nvm install 22
nvm use 22
```

3. Install packages
```bash
npm install
```

3. Run dev mode
```bash
npm run dev
```

## 🖥️ SCREENS

| | | |
|:--:|:--:|:--:|
| ![image](https://github.com/user-attachments/assets/3e7d64d3-84f7-4aff-bbce-4b72713454f9) | ![image](https://github.com/user-attachments/assets/5b93c969-adae-48a8-ac65-6bcd7f013367) | ![image](https://github.com/user-attachments/assets/7dd486a3-fed0-412b-935d-372717ecdf34) |
| ![image](https://github.com/user-attachments/assets/84bec7ae-0be4-4b39-b381-69ef3705cc50) | ![image](https://github.com/user-attachments/assets/e242d6a7-5e0a-4f80-9c5a-ee0b1d7522cc) | ![image](https://github.com/user-attachments/assets/8c682e7a-3f8f-455e-b532-34ca9730aa5d) |
| ![image](https://github.com/user-attachments/assets/a87b3875-c0b3-4d28-8272-f71f48428446) | ![image](https://github.com/user-attachments/assets/aba49ac6-59ad-48d6-94c8-115eb3036c85) | ![image](https://github.com/user-attachments/assets/3af15c50-82e7-451f-8b4e-e9af0eb02922) |
| ![image](https://github.com/user-attachments/assets/c9bdaaef-66ea-48a4-834f-9cc0f794b919) | ![image](https://github.com/user-attachments/assets/b0724e62-8126-4051-a162-c0b8ce41048e) | ![image](https://github.com/user-attachments/assets/88f8a6f2-1339-42c6-9d53-75ab74f39446) |
| ![image](https://github.com/user-attachments/assets/fff9d63a-1816-4ad3-b8da-1eed2a890849) | | |


📅 This README was written on **May 15, 2025**.
