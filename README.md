
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
- **Web**: React, Typescript, Zustand, WebSocket, TailwindCSS
- **Mobile**: Flutter, Dart
- **AI**: Gemini-2.5-Pro
- **Auth**: Google Oauth, jwt
- **Bundler**: Vite, 
- **Package Manager**: NPM
- **Logging System**: Google Analytics

## 🏛️ CLIENT ARCHITECTURE
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

| |
|:--:|
| <img width="543" alt="image" src="https://github.com/user-attachments/assets/fb658963-0ce9-46b9-b7b0-ca5014c4156d" /> | 
 | <img width="540" alt="image" src="https://github.com/user-attachments/assets/5b469fb4-a23b-4e9c-b432-75d81669a94e" /> | 
 | <img width="881" alt="image" src="https://github.com/user-attachments/assets/d931f45b-afc1-49bb-8481-96ccbce65b3a" /> | 
 | <img width="313" alt="image" src="https://github.com/user-attachments/assets/95f52feb-708f-4112-a668-5b4eada0990d" /> | 


📅 This README was written on **May 15, 2025**.
