// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBWJD_JZdODxyV4dYl811P-bMaT0kNvpKg",
    authDomain: "zippy-pad-382715.firebaseapp.com",
    projectId: "zippy-pad-382715",
    storageBucket: "zippy-pad-382715.appspot.com",
    messagingSenderId: "58937076992",
    appId: "1:58937076992:web:c33fd7a4ddd7bec22dd7e5"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const loginForm = document.getElementById('login-form');
  const dashboard = document.getElementById('dashboard');
  const emailDisplay = document.getElementById('email-display');
  const passwordDisplay = document.getElementById('password-display');
  const logoutBtn = document.getElementById('logout-btn');
  
  // Login form submit event listener
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    
    // Sign in with email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Show the dashboard and display user information
        dashboard.style.display = 'block';
        emailDisplay.textContent = `Email: ${user.email}`;
        passwordDisplay.textContent = `Password: ${password}`;
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to login. Please check your email and password.');
      });
  });
  
  // Logout button click event listener
  logoutBtn.addEventListener('click', () => {
    // Sign out
    firebase.auth().signOut()
      .then(() => {
        // Hide the dashboard and clear displayed user information
        dashboard.style.display = 'none';
        emailDisplay.textContent = '';
        passwordDisplay.textContent = '';
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to logout. Please try again.');
      });
  });
  