// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2bw4Qy4J93x62-MnAGwbHs2a0hdSxsgo",
  authDomain: "the-personal-site.firebaseapp.com",
  projectId: "the-personal-site",
  storageBucket: "the-personal-site.appspot.com",
  messagingSenderId: "1064113948040",
  appId: "1:1064113948040:web:04a8a7b563999e9e7c663d"
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
  
