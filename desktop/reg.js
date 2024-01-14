// Configure Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA2bw4Qy4J93x62-MnAGwbHs2a0hdSxsgo",
    authDomain: "the-personal-site.firebaseapp.com",
    projectId: "the-personal-site",
    storageBucket: "the-personal-site.appspot.com",
    messagingSenderId: "1064113948040",
    appId: "1:1064113948040:web:04a8a7b563999e9e7c663d"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

// DOM elements
const userContainer = document.getElementById('user-container');
const userEmail = document.getElementById('user-email');
const userEmailTitle = document.getElementById('user-email-title');

// Auth state observer
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        var destinationPage = "dashboard.html";
        window.location.href = destinationPage;
    } else {
        // User is signed out
        localStorage.clear();
        userContainer.classList.add('hidden');
        document.querySelector('.navbar').style.display = 'none';
        var mijnDiv = document.getElementById("hidden");
        mijnDiv.style.display = "none";
        userContainer.classList.add('hidden');
    }
});

// Authentication functions
function logout() {
    auth.signOut();
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password-login').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Gebruiker is ingelogd
            console.log('User logged in:', userCredential.user.email);
        })
        .catch(error => {
            // Er is een fout opgetreden bij het inloggen
            console.error('Login error:', error.message);
        });
}

// Credit card functions
function saveCreditCardInfo() {
    const user = auth.currentUser;
    const creditCardInfo = {
        cardNumber: '1234 5678 9012 3456',
        expirationDate: '12/23',
        cvv: '123',
    };

    // Voeg creditcardgegevens toe aan Firestore
    firestore.collection('users').doc(user.uid).collection('creditcards').add(creditCardInfo)
        .then(() => alert('Credit card info saved successfully'))
        .catch(error => alert('Error saving credit card info: ' + error.message));
}

function getCreditCardInfo() {
    const user = auth.currentUser;

    // Haal alle creditcardgegevens op van de gebruiker uit Firestore
    firestore.collection('users').doc(user.uid).collection('creditcards').get()
        .then(querySnapshot => {
            let infoText = 'Credit Card Info:\n';
            querySnapshot.forEach(doc => {
                const creditCardInfo = doc.data();
                infoText += `\nCard Number: ${creditCardInfo.cardNumber}\nExpiration Date: ${creditCardInfo.expirationDate}\nCVV: ${creditCardInfo.cvv}\n`;
            });
            alert(infoText || 'No credit card info found');
        })
        .catch(error => alert('Error getting credit card info: ' + error.message));
}

// Password functions
function savePasswordInfo() {
    const user = auth.currentUser;
    const passwordInfo = {
        website: 'example.com',
        username: 'user123',
        password: 'secretpassword',
    };

    // Voeg wachtwoordgegevens toe aan Firestore
    firestore.collection('users').doc(user.uid).collection('passwords').add(passwordInfo)
        .then(() => alert('Password info saved successfully'))
        .catch(error => alert('Error saving password info: ' + error.message));
}

function getPasswordInfo() {
    const user = auth.currentUser;

    // Haal alle wachtwoordgegevens op van de gebruiker uit Firestore
    firestore.collection('users').doc(user.uid).collection('passwords').get()
        .then(querySnapshot => {
            let infoText = 'Password Info:\n';
            querySnapshot.forEach(doc => {
                const passwordInfo = doc.data();
                infoText += `\nWebsite: ${passwordInfo.website}\nUsername: ${passwordInfo.username}\nPassword: ${passwordInfo.password}\n`;
            });
            alert(infoText || 'No password info found');
        })
        .catch(error => alert('Error getting password info: ' + error.message));
}

function savePasswordInfoFromForm() {
    const user = auth.currentUser;
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const passwordInfo = {
        website: website,
        username: username,
        password: password,
    };

    // Voeg wachtwoordgegevens toe aan Firestore
    firestore.collection('users').doc(user.uid).collection('passwords').add(passwordInfo)
        .then(() => {
            alert('Password info saved successfully');
            // Reset het formulier
            document.getElementById('password-form').reset();
        })
        .catch(error => alert('Error saving password info: ' + error.message));
}

function saveCreditCardInfoFromForm() {
    const user = auth.currentUser;
    const cardNumber = document.getElementById('cardNumber').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const cvv = document.getElementById('cvv').value;

    const creditCardInfo = {
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvv: cvv,
    };

    // Voeg creditcardgegevens toe aan Firestore in de map 'creditcards'
    firestore.collection('users').doc(user.uid).collection('creditcards').add(creditCardInfo)
        .then(() => {
            alert('Credit card info saved successfully');
            // Reset het formulier
            document.getElementById('creditcard-form').reset();
        })
        .catch(error => alert('Error saving credit card info: ' + error.message));
}

function updateCreditCardInfo() {
    const user = auth.currentUser;
    const creditCardInfoElement = document.getElementById('credit-card-info');

    // Haal creditcardgegevens op uit Firestore in de submap 'info/creditcards'
    firestore.collection('users').doc(user.uid).collection('creditcards').get()
        .then(querySnapshot => {
            let infoText = 'Credit Card Info:\n';
            querySnapshot.forEach(doc => {
                const creditCardInfo = doc.data();
                infoText += `\nCard Number: ${creditCardInfo.cardNumber}\nExpiration Date: ${creditCardInfo.expirationDate}\nCVV: ${creditCardInfo.cvv}\n`;
            });
            creditCardInfoElement.textContent = infoText || 'No credit card info found';
        })
        .catch(error => console.error('Error getting credit card info:', error));
}
// Registratiefunctie
function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Gebruiker is geregistreerd en ingelogd
            console.log('User registered:', userCredential.user.email);
            var destinationPage = "dashboard.html";
            window.location.href = destinationPage;
        })
        .catch(error => {
            // Er is een fout opgetreden bij het registreren
            console.error('Registration error:', error.message);
            alert('Registration error: ' + (error && error.message ? error.message : 'Unknown error'));
        });
}

// Toon het registratieformulier
function showRegisterForm() {
    document.getElementById('register-container').classList.remove('hidden');
    document.getElementById('user-container').classList.add('hidden');
}

// Verberg het registratieformulier en toon het inlogformulier
function showLoginForm() {
    document.getElementById('register-container').classList.add('hidden');
    document.getElementById('user-container').classList.add('hidden');
    document.getElementById('login-container').classList.remove('hidden');
}
// not show login/registrer
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        userContainer.classList.remove('hidden');
        userEmail.innerText = user.email;
        updateCreditCardInfo();

        // Verberg het inlog- en registratieformulier als de gebruiker is ingelogd
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('register-container').classList.add('hidden');
    } else {
        // User is signed out
        userContainer.classList.add('hidden');

        // Toon het inlogformulier als de gebruiker is uitgelogd
        document.getElementById('login-container').classList.remove('hidden');
    }
});
// Voeg deze functie toe aan je app.js-bestand
function saveNote() {
    const user = auth.currentUser;
    const noteTitle = document.getElementById('note-title').value;
    const noteContent = document.getElementById('note-content').value;

    const noteInfo = {
        title: noteTitle,
        content: noteContent,
    };

    // Voeg notitiegegevens toe aan Firestore in de map 'notes'
    firestore.collection('users').doc(user.uid).collection('notes').add(noteInfo)
        .then(() => {
            alert('Note saved successfully');
            // Reset het formulier
            document.getElementById('note-form').reset();
        })
        .catch(error => alert('Error saving note: ' + error.message));
}

function getNotes() {
    const user = auth.currentUser;
    const notesBox = document.getElementById('notes-box');
    // Haal alle notities op van de gebruiker uit Firestore in de map 'notes'
    firestore.collection('users').doc(user.uid).collection('notes').get()
        .then(querySnapshot => {
            notesBox.innerHTML = ''; // Leeg de notitiesbox voordat we nieuwe notities toevoegen
            querySnapshot.forEach(doc => {
                const noteInfo = doc.data();
                const noteElement = document.createElement('div');
                noteElement.innerHTML = `<strong>${noteInfo.title}:</strong><br>${noteInfo.content}<br><br>`;
                notesBox.appendChild(noteElement);
            });
        })
        .catch(error => alert('Error getting notes: ' + error.message));
}

// Voeg deze functie toe aan je app.js-bestand om de notities-container weer te geven bij inloggen
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        userContainer.classList.remove('hidden');
        userEmail.innerText = user.email;
        updateCreditCardInfo();
        document.getElementById('notes-container').classList.remove('hidden'); // Toon de notities-container
    } else {
        // User is signed out
        userContainer.classList.add('hidden');
        document.getElementById('notes-container').classList.add('hidden'); // Verberg de notities-container
    }
});
// Voeg deze functie toe aan je app.js-bestand
function getAllPasswords() {
    const user = auth.currentUser;
    const passwordsBox = document.getElementById('passwords-box');

    // Haal alle wachtwoordgegevens op van de gebruiker uit Firestore in de map 'passwords'
    firestore.collection('users').doc(user.uid).collection('passwords').get()
        .then(querySnapshot => {
            passwordsBox.innerHTML = ''; // Leeg de wachtwoordbox voordat we nieuwe wachtwoorden toevoegen
            querySnapshot.forEach(doc => {
                const passwordInfo = doc.data();
                const passwordElement = document.createElement('div');
                passwordElement.innerHTML = `<strong>Website:</strong> ${passwordInfo.website}<br><strong>Username:</strong> ${passwordInfo.username}<br><strong>Password:</strong> ${passwordInfo.password}<br><br>`;
                passwordsBox.appendChild(passwordElement);
            });
        })
        .catch(error => alert('Error getting passwords: ' + error.message));
}

function getAllCreditCards() {
    const user = auth.currentUser;
    const creditcardsBox = document.getElementById('creditcards-box');

    // Haal alle creditcardgegevens op van de gebruiker uit Firestore in de map 'creditcards'
    firestore.collection('users').doc(user.uid).collection('creditcards').get()
        .then(querySnapshot => {
            creditcardsBox.innerHTML = ''; // Leeg de creditcardbox voordat we nieuwe creditcards toevoegen
            querySnapshot.forEach(doc => {
                const creditCardInfo = doc.data();
                const creditCardElement = document.createElement('div');
                creditCardElement.innerHTML = `<strong>Card Number:</strong> ${creditCardInfo.cardNumber}<br><strong>Expiration Date:</strong> ${creditCardInfo.expirationDate}<br><strong>CVV:</strong> ${creditCardInfo.cvv}<br><br>`;
                creditcardsBox.appendChild(creditCardElement);
            });
        })
        .catch(error => alert('Error getting credit cards: ' + error.message));
}
// Voeg deze functie toe aan je app.js-bestand
function deleteAllInfo() {
    const user = auth.currentUser;

    // Verwijder alle wachtwoordgegevens uit Firestore in de map 'passwords'
    firestore.collection('users').doc(user.uid).collection('passwords').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                doc.ref.delete();
            });
        })
        .catch(error => alert('Error deleting passwords: ' + error.message));

    // Verwijder alle creditcardgegevens uit Firestore in de map 'creditcards'
    firestore.collection('users').doc(user.uid).collection('creditcards').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                doc.ref.delete();
            });
        })
        .catch(error => alert('Error deleting credit cards: ' + error.message));

    // Verwijder alle notities uit Firestore in de map 'notes'
    firestore.collection('users').doc(user.uid).collection('notes').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                doc.ref.delete();
            });
        })
        .catch(error => alert('Error deleting notes: ' + error.message));

    // Optioneel: Leeg de velden in de HTML
    document.getElementById('passwords-box').innerHTML = '';
    document.getElementById('creditcards-box').innerHTML = '';
    document.getElementById('notes-box').innerHTML = '';

    alert('All info deleted successfully');
}
// Voeg deze functie toe aan je app.js-bestand
function deleteAccount() {
    const user = auth.currentUser;

    // Verwijder de gebruiker uit Firebase Authentication
    user.delete()
        .then(() => {
            // Verwijder de gebruiker uit Firestore
            firestore.collection('users').doc(user.uid).delete()
                .then(() => {
                    alert('Account deleted successfully');
                    // Redirect naar de inlogpagina (of een andere pagina naar keuze)
                    window.location.replace("login.html");
                })
                .catch(error => alert('Error deleting user data: ' + error.message));
        })
        .catch(error => alert('Error deleting user account: ' + error.message));
}
// Voeg deze functie toe aan je app.js-bestand
function setCustomBackgroundColor() {
    const user = auth.currentUser;
    const backgroundColorInput = document.getElementById('background-color');
    const customBackgroundColor = backgroundColorInput.value;

    // Stel de aangepaste achtergrondkleur in voor het hele lichaam
    document.body.style.backgroundColor = customBackgroundColor;

    // Sla de aangepaste achtergrondkleur op in Firestore voor de huidige gebruiker
    firestore.collection('users').doc(user.uid).set({
        backgroundColor: customBackgroundColor,
    }, { merge: true })
        .then(() => alert('Custom background color set successfully'))
        .catch(error => alert('Error setting custom background color: ' + error.message));
}

// Voeg deze functie toe aan je app.js-bestand
function applyCustomBackgroundColor() {
    const user = auth.currentUser;

    // Haal de aangepaste achtergrondkleur op uit Firestore voor de huidige gebruiker
    firestore.collection('users').doc(user.uid).get()
        .then(doc => {
            const userData = doc.data();
            if (userData && userData.backgroundColor) {
                // Stel de opgeslagen achtergrondkleur in voor het hele lichaam
                document.body.style.backgroundColor = userData.backgroundColor;
            } else {
                // Stel standaard achtergrondkleur in (bijv. rood)
                document.body.style.backgroundColor = 'red';
            }
        })
        .catch(error => console.error('Error getting custom background color:', error));
}

// Auth state observer
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        userContainer.classList.remove('hidden');
        userEmail.innerText = user.email;
        updateCreditCardInfo();
        applyCustomBackgroundColor(); // Pas de aangepaste achtergrondkleur toe bij inloggen
    } else {
        // User is signed out
        userContainer.classList.add('hidden');
    }
});
// profile picture
// Voeg deze functie toe aan je app.js-bestand
function setProfilePicture() {
    const user = auth.currentUser;
    const profilePictureUrlInput = document.getElementById('profile-picture-url');
    const profilePictureUrl = profilePictureUrlInput.value;

    // Sla de profielfoto-URL op in Firestore voor de huidige gebruiker
    firestore.collection('users').doc(user.uid).set({
        profilePicture: profilePictureUrl,
    }, { merge: true })
        .then(() => {
            alert('Profile picture set successfully');
            // Toon de profielfoto op de pagina
            displayProfilePicture(profilePictureUrl);
        })
        .catch(error => alert('Error setting profile picture: ' + error.message));
}

// Voeg deze functie toe aan je app.js-bestand om de profielfoto op de pagina weer te geven
function displayProfilePicture(profilePictureUrl) {
    const profilePictureElement = document.getElementById('profile-picture');
    profilePictureElement.src = profilePictureUrl;
}

// Voeg deze functie toe aan je app.js-bestand om de profielfoto van Firestore op te halen bij inloggen
function getProfilePicture() {
    const user = auth.currentUser;

    // Haal de profielfoto-URL op uit Firestore voor de huidige gebruiker
    firestore.collection('users').doc(user.uid).get()
        .then(doc => {
            const userData = doc.data();
            if (userData && userData.profilePicture) {
                // Toon de profielfoto op de pagina
                displayProfilePicture(userData.profilePicture);
            }
        })
        .catch(error => console.error('Error getting profile picture:', error));
}

// Auth state observer
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        userContainer.classList.remove('hidden');
        userEmail.innerText = user.email;
        updateCreditCardInfo();
        applyCustomBackgroundColor();
        getProfilePicture(); // Haal de profielfoto op bij inloggen
    } else {
        var mijnDiv = document.getElementById("hidden");
        mijnDiv.style.display = "none";
        userContainer.classList.add('hidden');
    }
});
// Voeg deze functie toe aan je app.js-bestand
function saveContactInfo() {
    const user = auth.currentUser;
    const contactName = document.getElementById('contact-name').value;
    const contactEmail = document.getElementById('contact-email').value;
    const contactPhone = document.getElementById('contact-phone').value;

    const contactInfo = {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
    };

    // Voeg contactgegevens toe aan Firestore in de map 'contacts'
    firestore.collection('users').doc(user.uid).collection('contacts').add(contactInfo)
        .then(() => alert('Contact info saved successfully'))
        .catch(error => alert('Error saving contact info: ' + error.message));
}

// Voeg deze functie toe aan je app.js-bestand om de contactinformatie op te halen en weer te geven
function getContactInfo() {
    const user = auth.currentUser;
    const contactInfoContainer = document.getElementById('contact-info-container');

    // Haal alle contactgegevens op van de gebruiker uit Firestore in de map 'contacts'
    firestore.collection('users').doc(user.uid).collection('contacts').get()
        .then(querySnapshot => {
            contactInfoContainer.innerHTML = ''; // Leeg de container voordat we nieuwe contactgegevens toevoegen
            querySnapshot.forEach(doc => {
                const contactInfo = doc.data();
                const contactElement = document.createElement('p');
                contactElement.innerHTML = `<strong>Name:</strong> ${contactInfo.name}<br><strong>Email:</strong> ${contactInfo.email}<br><strong>Phone:</strong> ${contactInfo.phone}<br><br>`;
                contactInfoContainer.appendChild(contactElement);
            });
        })
        .catch(error => alert('Error getting contact info: ' + error.message));
}
// time
function toonTijdEnDatum() {
    // Maak een nieuw Date-object voor de huidige tijd en datum
    var nu = new Date();
    
    // Haal de uren, minuten en seconden op
    var uren = nu.getHours();
    var minuten = nu.getMinutes();
    var seconden = nu.getSeconds();
    
    // Haal de datum op
    var datum = nu.toDateString();
    
    // Opmaak voor enkele cijfers (voeg een 0 toe voor getallen < 10)
    uren = uren < 10 ? "0" + uren : uren;
    minuten = minuten < 10 ? "0" + minuten : minuten;
    seconden = seconden < 10 ? "0" + seconden : seconden;
    
    // Bouw de tijdstring
    var tijdString = uren + ":" + minuten + ":" + seconden;
    
    // Bouw de begroeting met tijd en datum
    var begroeting = "it's " + tijdString + " on " + datum + ".";
    
    // Plaats de begroeting in het HTML-element met id "begroeting"
    document.getElementById("begroeting").innerHTML = begroeting;
}

// Roep de functie om de tijd en datum te tonen na het laden van de pagina
window.onload = function() {
    toonTijdEnDatum();
    
    // Herhaal de functie elke seconde met behulp van setInterval
    setInterval(toonTijdEnDatum, 1000);
};