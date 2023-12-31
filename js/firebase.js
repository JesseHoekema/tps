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
