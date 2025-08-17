# ExchangeZone - Modern Marketplace Platform

[![React](https://img.shields.io/badge/React-17.0.2-blue.svg)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.15.6-0081CB.svg)](https://mui.com/)
[![Firebase](https://img.shields.io/badge/Firebase-9.1.1-orange.svg)](https://firebase.google.com/)

## Overview

ExchangeZone is a modern marketplace platform where users can buy and sell products. Built with React.js, Material-UI, and Firebase, it provides a responsive and intuitive user experience across all devices.

## Key Features

- **Product Marketplace** - Buy and sell various products with ease
- **User Authentication** - Secure login/signup with Firebase Auth
- **Real-time Updates** - Live product listings using Firestore
- **Advanced Search** - Smart search with filtering and autocomplete
- **Responsive Design** - Material-UI components optimized for all devices
- **Category Navigation** - Browse products by categories
- **Image Upload** - Product photos with preview functionality

## Tech Stack

- **Frontend:** React.js 17.0.2, Material-UI 5.15.6, React Router 5.3.0
- **Backend:** Firebase (Auth, Firestore, Storage, Hosting)
- **Styling:** Material-UI with custom theme, Emotion CSS-in-JS

## Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/exchangezone.git
cd exchangezone
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
- Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
- Enable Authentication, Firestore, and Storage
- Update `src/firebase/config.js` with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

4. **Start development server**
```bash
npm start
```

Visit `http://localhost:3000` to see the application.

## Material-UI Theme

The app uses a custom Material-UI theme with:
- **Primary Color:** #002f34 (OLX Dark Green)
- **Secondary Color:** #ffce32 (OLX Yellow)
- **Typography:** Roboto font family
- **Responsive Breakpoints:** xs (0px+), sm (600px+), md (900px+), lg (1200px+), xl (1536px+)

## Project Structure

```
src/
├── Components/
│   ├── Header/          # Navigation bar
│   ├── Login/           # Authentication
│   ├── PostCards/       # Product cards
│   ├── Create/          # Add new product
│   ├── Banner/          # Hero section
│   └── ...
├── Pages/               # Page components
├── contextStore/        # React Context
├── firebase/            # Firebase config
├── theme/              # Material-UI theme
└── App.js              # Main app component
```

## Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Other Options
- **Netlify:** Deploy the `build/` folder
- **Vercel:** Connect your GitHub repository
- **GitHub Pages:** Enable in repository settings

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -am 'Add feature'`
5. Push: `git push origin feature-name`
6. Submit a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

Built with ❤️ using React and Material-UI
