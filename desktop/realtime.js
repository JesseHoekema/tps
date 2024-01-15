    // JavaScript-code om de begroeting met tijd en datum in realtime bij te werken
    function updateGreeting() {
        var nu = new Date();
        var tijd = nu.toLocaleTimeString();
        var datum = nu.toLocaleDateString();
        var begroetingTekst = "Hello user, it's " + tijd + " on " + datum;
        document.getElementById("groet").innerHTML = begroetingTekst;
    }

    // Roep de functie een keer aan om de initiële weergave te hebben
    updateGreeting();

    // Stel een interval in om de functie elke seconde bij te werken
    setInterval(updateGreeting, 1000);
