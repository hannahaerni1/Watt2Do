var userEnergy = 50;

function changeEnergy()
{
    var currentEnergy = newEnergy.value.trim();
    if (currentEnergy <= 100 && currentEnergy >= 0){
        userEnergy = currentEnergy;
    }

    newEnergy.value = "";

    
    document.getElementById("energyPercent").innerHTML = userEnergy + "%";
}

const battery = document.getElementById("battery");
const ctx = battery.getContext("2d");

ctx.fillRect(0, 20, 150, 280);