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
    //#d5daf2
    var battGrad = ctx.createLinearGradient(0,0,0,300);
    battGrad.addColorStop(1,"#9CAEE8");
    battGrad.addColorStop(0,"#d5daf2");
    ctx.fillStyle = battGrad;
    drawRoundedRectangle(0,20,150,280,15);
    drawRoundedRectangle(37.5,0,75,30,10);  
    ctx.fillStyle = "#374c89";
    drawRoundedRectangle(7,27,136,266,13);
    ctx.fillStyle = "#5a70b0";
    drawRoundedRectangle(10,30,130,260,10);
}

drawBattery();

//ctx.fillStyle = "#008000";
var grdStart = ctx.createLinearGradient(0, 30 + chargeHeight, 0, 300);
grdStart.addColorStop(0,"#d9babf");
grdStart.addColorStop(1,"#EEE8E5");
ctx.fillStyle = grdStart;

drawRoundedRectangle(10,30 + chargeHeight,130,260 - chargeHeight,10);

function buttonEnergy(){
    var currentEnergy = newEnergy.value.trim();
    if (currentEnergy <= 100 && currentEnergy >= 0){
        userEnergy = currentEnergy;
        changeEnergy();
    }

    newEnergy.value = "";
    document.getElementById("energyPercent").innerHTML = userEnergy + "%";
}

function changeEnergy()
{
    chargeHeight = 260 * (1 - userEnergy/100);
       ctx.clearRect(0,0,150,300);

    drawBattery();
    var grd = ctx.createLinearGradient(0, 30 + chargeHeight, 0, 300);
    if (userEnergy <= 25)
    {
        grd.addColorStop(0,"#d7a3b2");
        grd.addColorStop(1,"#F4CAD5");
    }
    else if (userEnergy <= 50)
    {
            

        grd.addColorStop(0,"#d9babf");
        grd.addColorStop(1,"#EEE8E5");
           
    }
    else
    {
        grd.addColorStop(0,"#7ba6df");
        grd.addColorStop(1,"#aad9ff");
           
    }
    ctx.fillStyle = grd;
        
    drawRoundedRectangle(10,30 + chargeHeight,130,260 - chargeHeight,10);
}






//ctx.fillRect(0, 20, 150, 280);
//ctx.fillRect(37.5, 0, 75, 20);