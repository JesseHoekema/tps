
    // JavaScript-code om de tijd en datum in realtime bij te werken
    function updateTimeAndDate() {
        var nu = new Date();
        var tijdEnDatumTekst = "Hello User Its" + nu.toLocaleString();
        document.getElementById("tijdEnDatum").innerHTML = tijdEnDatumTekst;
    }

    updateTimeAndDate();

setInterval(updateTimeAndDate, 1000);
