/* ============================================================
   main.js - Campus Cuisine
   Combines: login.js + logindb.js + app.js
   ============================================================ */

/* ----------------------------------------------------------
   SECTION 1 - Firebase Configuration & Initialization
   (from logindb.js)
---------------------------------------------------------- */

const firebaseConfig = {
  apiKey: "AIzaSyCV_UkRna0dpsaGS5cF2gWiSC8IK9cQn94",
  authDomain: "campus-cuisine2024.firebaseapp.com",
  projectId: "campus-cuisine2024",
  storageBucket: "campus-cuisine2024.appspot.com",
  messagingSenderId: "337522707956",
  appId: "1:337522707956:web:75bca90131c0582d0c3da1"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

/* ----------------------------------------------------------
   SECTION 2 - Google Sign-In
   (from logindb.js)
---------------------------------------------------------- */

function googleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  firebase.auth().signOut().then(() => {
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);

        Toastify({
          text: "Logged in as " + user.displayName + " from Google login",
          duration: 3000,
          gravity: "bottom",
          position: 'center',
          backgroundColor: "green",
          className: "success",
        }).showToast();

        var profilePic = document.createElement('img');
        profilePic.src = user.photoURL;
        profilePic.style.width = '2.5rem';
        profilePic.style.height = '2.5rem';
        profilePic.style.borderRadius = '50%';

        var logoutOption = document.createElement('div');
        logoutOption.id = 'logoutOption';
        logoutOption.innerHTML = 'Logout';
        logoutOption.style.position = 'absolute';
        logoutOption.style.top = '.7rem';
        logoutOption.style.left = '94%';
        logoutOption.style.transform = 'translateX(-50%)';
        logoutOption.style.padding = '0.5rem';
        logoutOption.style.backgroundColor = '#fff';
        logoutOption.style.border = '1px solid #ccc';
        logoutOption.style.borderRadius = '0.5rem';
        logoutOption.style.cursor = 'pointer';
        logoutOption.addEventListener('click', signOut);

        var btnLoginPopup = document.getElementById('btnLogin-popup');
        btnLoginPopup.innerHTML = '';
        btnLoginPopup.appendChild(profilePic);
        btnLoginPopup.appendChild(logoutOption);
      }).catch((error) => {
        console.error("Google Sign-In Error:", error.code, error.message);
      });
  }).catch((error) => {
    console.error("Sign-out error before Google Sign-In:", error);
  });
}

function signOut() {
  firebase.auth().signOut().then(() => {
    console.log('User signed out');
    var btnLoginPopup = document.getElementById('btnLogin-popup');
    btnLoginPopup.innerHTML = '';
    btnLoginPopup.classList.add('userlogin');
    btnLoginPopup.classList.add('bx-user');
  }).catch((error) => {
    console.log(error);
  });
}

/* ----------------------------------------------------------
   SECTION 3 - Validation Helpers
   (from logindb.js)
---------------------------------------------------------- */

function validate_email(email) {
  const expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expression.test(String(email).toLowerCase());
}

function validate_password(password) {
  return password.length >= 8;
}

function validate_field(field) {
  return field && field.trim().length > 0;
}

/* ----------------------------------------------------------
   SECTION 4 - Register Function
   (from logindb.js)
---------------------------------------------------------- */

function register() {
  if (!navigator.onLine) {
    Toastify({
      text: 'Internet connection is required to register.',
      duration: 2000,
      gravity: "bottom",
      position: 'center',
      className: "error",
      backgroundColor: "red",
    }).showToast();
    return;
  }

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const username = document.getElementById("username").value;

  if (!validate_email(email) || !validate_password(password) || !validate_field(username)) {
    Toastify({
      text: "Please provide valid email, password, and username.",
      duration: 2000,
      gravity: "bottom",
      position: 'center',
      className: "toast",
      backgroundColor: "orange",
    }).showToast();
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userRef = database.ref('users/' + user.uid);
      userRef.set({ email: email, username: username });

      Toastify({
        text: 'User registration successful!',
        duration: 2000,
        gravity: "bottom",
        position: 'center',
        className: "success",
        backgroundColor: "green",
      }).showToast();
    })
    .catch((error) => {
      Toastify({
        text: error.message,
        duration: 2000,
        gravity: "bottom",
        position: 'center',
        className: "error",
        backgroundColor: "red",
      }).showToast();
    });
}

/* ----------------------------------------------------------
   SECTION 5 - Login Function (extend with Firebase auth)
   (from index.html inline reference)
---------------------------------------------------------- */

function login() {
  console.log("Login function called.");
}

/* ----------------------------------------------------------
   SECTION 6 - Get User Display Name
   (from app.js)
---------------------------------------------------------- */

function getUserDisplayName() {
  const user = firebase.auth().currentUser;
  if (user && user.displayName) {
    return user.displayName;
  }
  return "Guest";
}

/* ----------------------------------------------------------
   SECTION 7 - DOMContentLoaded — all UI logic
   Combines login.js + app.js event listeners
---------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Login Popup UI (from login.js) --- */
  const wrapper = document.querySelector('.wrapper');
  const loginLink = document.querySelector('.login-link');
  const registerLink = document.querySelector('.register-link');
  const btnPopup = document.getElementById('btnLogin-popup');
  const iconClose = document.querySelector('.icon-close');
  const emailInput = document.getElementById('email');
  const inputField = document.querySelector('.input-box input');

  if (emailInput) {
    emailInput.addEventListener('focus', () => {
      emailInput.classList.add('placeholder-style');
      emailInput.placeholder = "example@campus_cuisine.com";
    });
    emailInput.addEventListener('blur', () => {
      emailInput.classList.remove('placeholder-style');
      emailInput.placeholder = "";
    });
  }

  if (registerLink && wrapper) {
    registerLink.addEventListener('click', () => wrapper.classList.add('active'));
  }

  if (loginLink && wrapper) {
    loginLink.addEventListener('click', () => {
      wrapper.classList.remove('active');
      if (inputField) inputField.focus();
    });
  }

  if (btnPopup && wrapper) {
    btnPopup.addEventListener('click', () => {
      wrapper.classList.add('active-popup');
      if (inputField) inputField.focus();
    });
  }

  const btnheaderlogin = document.querySelector('.Navigationbarbutton');
  if (btnheaderlogin && wrapper) {
    btnheaderlogin.addEventListener('click', () => wrapper.classList.add('active-popup'));
  }

  if (iconClose && wrapper) {
    iconClose.addEventListener('click', () => {
      wrapper.classList.remove('active-popup');
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        input.value = '';
        input.disabled = true;
      });
      setTimeout(() => {
        inputs.forEach(input => { input.disabled = false; });
      }, 100);
      if (loginLink) loginLink.click();
    });
  }

  /* --- Google Login button --- */
  const googleLoginBtn = document.getElementById('googlelogin');
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', function (event) {
      event.preventDefault();
      googleSignIn();
    });
  }

  /* --- Password Visibility Toggle --- */
  const passwordField = document.getElementById("password");
  const togglePassword = document.querySelector(".password-toggle-icon i");
  if (passwordField && togglePassword) {
    togglePassword.addEventListener("click", function () {
      if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");
      } else {
        passwordField.type = "password";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");
      }
    });
  }

  /* --- Nav Toggler (from app.js) --- */
  const navtoggler = document.querySelector('.nav-toggler');
  const linksContainer = document.querySelector('.links-container');
  if (navtoggler && linksContainer) {
    navtoggler.addEventListener('click', () => {
      navtoggler.classList.toggle('active');
      linksContainer.classList.toggle('active');
    });
  }

  /* --- Review Slider (from app.js) --- */
  const reviews = document.querySelectorAll('.review-wrapper');
  let currentReviews = [0, 2];

  const updateReviewSlider = (cards) => {
    cards.forEach((card_index) => {
      if (reviews[card_index]) reviews[card_index].classList.add('active');
    });
  };

  if (reviews.length > 0) {
    updateReviewSlider(currentReviews);
    setInterval(() => {
      currentReviews.forEach((card_index, i) => {
        if (reviews[card_index]) reviews[card_index].classList.remove('active');
        currentReviews[i] = card_index >= reviews.length - 1 ? 0 : card_index + 1;
      });
      setTimeout(() => updateReviewSlider(currentReviews), 250);
    }, 5000);
  }

  /* --- FAQ Accordion (from app.js) --- */
  const faqs = [...document.querySelectorAll('.faq')];
  faqs.forEach(faq => {
    const ques = faq.querySelector('.question-box');
    if (ques) ques.addEventListener('click', () => faq.classList.toggle('active'));
  });

  /* --- Dish Slide Rotation (from app.js) --- */
  const dishSlider = document.querySelector('.dish-slide');
  if (dishSlider) {
    let rotationVal = 0;
    setInterval(() => {
      rotationVal += 120;
      dishSlider.style.transform = `translateY(-50%) rotate(${rotationVal}deg)`;
    }, 3000);
  }

  /* --- Cart & Modal (from app.js + logindb.js) --- */
  const addToCartButton = document.querySelector('.aboutMe');
  const cartCountElement = document.querySelector('.cart-count');
  const cartIcon = document.querySelector('.cart');
  const modal = document.getElementById("cartModal");
  const closeModal = document.querySelector(".close");
  const cartItemsList = document.getElementById("cartItemsList");
  let cartCount = 0;
  let cartItems = [];
  const menuItems = ["Burger", "Fries", "Nuggets"];

  if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
      const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)];
      cartItems.push(randomItem);
      cartCount++;
      if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = 'inline';
      }
    });
  }

  if (cartIcon) {
    cartIcon.addEventListener('click', (event) => {
      event.preventDefault();
      if (cartItemsList) {
        cartItemsList.innerHTML = '';
        cartItems.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          cartItemsList.appendChild(li);
        });
      }
      if (modal) modal.style.display = "block";
    });
  }

  if (closeModal) closeModal.addEventListener('click', () => { if (modal) modal.style.display = "none"; });

  window.addEventListener('click', (event) => {
    if (modal && event.target === modal) modal.style.display = "none";
  });

  /* --- Place Order Button --- */
  const placeOrderButton = document.getElementById('placeOrderButton');
  if (placeOrderButton) {
    placeOrderButton.addEventListener('click', () => {
      const userDisplayName = getUserDisplayName();
      const orderData = {
        user: userDisplayName,
        items: cartItems,
        totalItems: cartCount,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };

      firebase.database().ref('orders').push(orderData)
        .then(() => {
          alert('Order placed successfully!');
          cartCount = 0;
          cartItems = [];
          if (cartCountElement) { cartCountElement.textContent = 0; cartCountElement.style.display = 'none'; }
          if (modal) modal.style.display = "none";
        })
        .catch((error) => {
          console.error('Error placing order:', error);
          alert('Error placing order. Please try again.');
        });
    });
  }

  /* --- Download Receipt Button --- */
  const downloadReceiptButton = document.getElementById('downloadReceiptButton');
  if (downloadReceiptButton) {
    downloadReceiptButton.addEventListener('click', () => {
      const userDisplayName = getUserDisplayName();
      const receiptDetails = `Restaurant: Campus Cuisine\nItems: ${cartItems.join(", ")}\nTotal Items: ${cartCount}\nUser: ${userDisplayName}`;
      const receiptUrl = `https://via.placeholder.com/300x150?text=${encodeURIComponent(receiptDetails)}`;
      const link = document.createElement('a');
      link.href = receiptUrl;
      link.download = 'receipt.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  /* --- AOS Init (from app.js) --- */
  if (typeof AOS !== 'undefined') {
    AOS.init();
  }

}); // end DOMContentLoaded
