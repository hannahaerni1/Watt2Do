var userEnergy = 50;
var chargeHeight = 260 * (1 - userEnergy/100);
const battery = document.getElementById("battery");
const ctx = battery.getContext("2d");

function drawRoundedRectangle(x, y, width, height, cornerRadius) {
    if (cornerRadius >= height)
    {
        cornerRadius = height/3;
    }
    
    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, y);
    ctx.arcTo(x + width, y, x + width, y + height, cornerRadius);
    ctx.arcTo(x + width, y + height, x, y + height, cornerRadius);
    ctx.arcTo(x, y + height, x, y, cornerRadius);
    ctx.arcTo(x, y, x + width, y, cornerRadius);
    ctx.closePath();
    
    // Fill or stroke the rectangle as needed
    //ctx.fillStyle = "#3498db"; // Set fill color
    ctx.fill(); // Fill the rectangle
}

function drawBattery()
{
    ctx.fillStyle = "#9CAEE8";
    drawRoundedRectangle(0,20,150,280,15);
    drawRoundedRectangle(37.5,0,75,30,10);  
    ctx.fillStyle = "#5a70b0";
    drawRoundedRectangle(10,30,130,260,10);
}

drawBattery();

//ctx.fillStyle = "#008000";
ctx.fillStyle = "#EEE8E5";
drawRoundedRectangle(10,30 + chargeHeight,130,260 - chargeHeight,10);

function changeEnergy()
{
    var currentEnergy = newEnergy.value.trim();
    if (currentEnergy <= 100 && currentEnergy >= 0){
        userEnergy = currentEnergy;
        chargeHeight = 260 * (1 - userEnergy/100);
        ctx.clearRect(0,0,150,300);

        drawBattery();

        if (userEnergy <= 25)
        {
            ctx.fillStyle = "#F4CAD5";
        }
        else if (userEnergy <= 50)
        {
            ctx.fillStyle = "#EEE8E5";
        }
        else
        {
            ctx.fillStyle = "#aad9ff";
        }

        
        drawRoundedRectangle(10,30 + chargeHeight,130,260 - chargeHeight,10);

    }

    newEnergy.value = "";

    
    document.getElementById("energyPercent").innerHTML = userEnergy + "%";
}






//ctx.fillRect(0, 20, 150, 280);
//ctx.fillRect(37.5, 0, 75, 20);