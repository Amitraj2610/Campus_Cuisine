# 🍽️ Campus Cuisine 2.0

A modern campus food ordering web application that allows students to browse restaurants, view menus, add items to cart, and place orders — all with Firebase-powered authentication.

---

## 🚀 Live Demo

> Coming soon — deploy on GitHub Pages or Firebase Hosting.

---

## 📁 Project Structure

```
campus-cuisine-2.0/
├── index.html          # Main HTML file
├── main.css            # Combined CSS (style.css + login.css)
├── main.js             # Combined JavaScript (app.js + login.js + logindb.js)
├── img/                # All images and icons
├── images/             # Additional images
└── README.md
```

---

## ✨ Features

- 🔐 **Firebase Authentication** — Register & login with email/password or Google
- 🛒 **Cart System** — Add items to cart, view modal, place order
- 🔔 **Toast Notifications** — Real-time feedback for actions
- 📱 **Responsive Design** — Works on mobile, tablet, and desktop
- 💬 **FAQ Section** — Accordion-style FAQ
- 🎞️ **Review Slider** — Auto-rotating customer reviews
- 🎨 **AOS Animations** — Smooth scroll-triggered animations
- 🔄 **Dish Slide Rotation** — Animated food carousel in discount banner

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure |
| CSS3 (Vanilla) | Styling & Animations |
| JavaScript (ES6+) | Interactivity |
| Firebase (v8) | Auth + Realtime Database |
| AOS.js | Scroll animations |
| Boxicons / Font Awesome | Icons |
| Toastify.js | Toast notifications |
| Swiper.js | Slider (included) |

---

## ⚙️ Setup & Run

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/campus-cuisine-2.0.git
cd campus-cuisine-2.0
```

### 2. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing campus-cuisine2024)
3. Enable **Authentication** (Email/Password + Google)
4. Enable **Realtime Database**
5. Update the irebaseConfig object in main.js with your own credentials

### 3. Run Locally
Simply open index.html in your browser — no build step required!

```bash
# Or use a local server (recommended)
npx serve .
# OR
python -m http.server 8080
```

---

## 🔒 Firebase API Key Note

> ⚠️ The Firebase config in main.js contains API keys. For production, restrict them in the [Firebase Console](https://console.firebase.google.com/) under **Project Settings > API restrictions**.

---

## 📸 Screenshots

| Home Page | Login Popup | Cart Modal |
|---|---|---|
| *(Add screenshots here)* | *(Add screenshots here)* | *(Add screenshots here)* |

---

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (git checkout -b feature/my-feature)
3. Commit your changes (git commit -m 'Add my feature')
4. Push to the branch (git push origin feature/my-feature)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👥 Authors

- **Campus Cuisine Team** — [@Campus Cuisine](https://github.com/YOUR_USERNAME)
