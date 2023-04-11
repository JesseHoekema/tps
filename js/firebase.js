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

const registrationForm = document.getElementById('registration-form');

// Registration form submit event listener
registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = registrationForm.email.value;
  const password = registrationForm.password.value;

  // Create a new user with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('Registration successful! Please login.');
      // Clear the registration form
      registrationForm.reset();
    })
    .catch((error) => {
      console.error(error);
      alert('Please enter a longer password or try to login');
    });
});
