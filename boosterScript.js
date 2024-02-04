var boosterTasks = ["Eat a snack", "Take a nap", "Wash your face", 
                    "Go outside", "Stretch your limbs and back", 
                    "Drink some water", "Do a hobby"];
var boosterEnergy = [15, 50, 10, 15, 10, 15, 25];
var placeTasks = [];
var placeEnergy = [];

function energyNeeded() {
    var num1 = Math.floor(Math.random() * 7);
    var num2 = Math.floor(Math.random() * 7);
    while (num2 == num1){
        num2 = Math.floor(Math.random() * 7);
    }
    var num3 = Math.floor(Math.random() * 7);
    while (num3 == num1 || num3 == num2){
        num3 = Math.floor(Math.random() * 7);
    }

    placeTasks = [boosterTasks[num1], boosterTasks[num2], boosterTasks[num3]];
    placeEnergy = [boosterEnergy[num1], boosterEnergy[num2], boosterEnergy[num3]];
    
    var taskList = document.getElementById("boosterList");
    while (taskList.hasChildNodes()) {
        taskList.removeChild(taskList.firstChild);
    }

    for (let i = 0; i < 3; i++) {
        var newTask = document.createElement('input');
        newTask.type = "checkbox";
        var newTaskLabel = document.createElement('label');
        newTaskLabel.htmlFor = newTask;
        newTaskLabel.appendChild(document.createTextNode(placeTasks[i] + "ᅟᅟᅟᅟ+" + placeEnergy[i] + "%"));
        newTaskLabel.style.color = "#394e6b";
        var space = document.createElement('br');
        taskList.appendChild(newTask);
        taskList.appendChild(newTaskLabel);
        taskList.appendChild(space);
    }
}

function energyNotNeeded() {
    var taskList = document.getElementById("boosterList");
    while (taskList.hasChildNodes()) {
        taskList.removeChild(taskList.firstChild);
    }
}

function clearIssueList(){
    var issues = document.getElementById("issueCenter");
    while (issues.hasChildNodes()) {
        issues.removeChild(issues.firstChild);
    }
}

function isChecked() {
    var boosterList = document.getElementById("boosterList");
    var boosterTasksDelete = boosterList.querySelectorAll('input');
    for (let x = 0; x < boosterTasksDelete.length; x++)
    {
        if (boosterTasksDelete[x].checked)
        {
            removeBooster();
            break;
        }
    }
}

function removeBooster() {
    var reportIssue = document.getElementById("issueCenter");
    var issue = document.createElement('label');
    issue.appendChild(document.createTextNode("Cannot remove booster tasks."));
    var space = document.createElement('br');
    reportIssue.appendChild(issue);
    reportIssue.appendChild(space);
}

function calculateBooster() {
    var taskList = document.getElementById("boosterList");
    
    var tasks = taskList.querySelectorAll('input');
    for (let x = 0; x < tasks.length; x++)
    {
        if (tasks[x].checked)
        {
            userEnergy = userEnergy + Number.parseInt(placeEnergy[x]);
            if (userEnergy > 100)
            {
                userEnergy = 100;
            }
        }
    }
}