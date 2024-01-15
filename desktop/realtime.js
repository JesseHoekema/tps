
    // JavaScript-code om de tijd en datum in realtime bij te werken
    function updateTimeAndDate() {
        var nu = new Date();
        var tijdEnDatumTekst = "Huidige tijd en datum: " + nu.toLocaleString();
        document.getElementById("tijdEnDatum").innerHTML = tijdEnDatumTekst;
    }

    updateTimeAndDate();

setInterval(updateTimeAndDate, 1000);
