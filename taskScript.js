var listOfTasks = [];
var listOfEnergy = [];
var listOfTasksNo = [];
var listOfEnergyNo = [];
var wattSpeaks = ["Good job!", "Keep up the good work!", "You're doing great!"];

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    var energyNum = energyInput.value.trim();

    if (taskText !== "" && energyNum > 0 && energyNum < 100 && taskText.length <= 56) {
        listOfTasks.push(taskText);
        listOfEnergy.push(energyNum);
    }
    if (taskText == "") {
        var reportIssue = document.getElementById("issueCenter");
        var issue = document.createElement('label');
        issue.appendChild(document.createTextNode("No title for task."));
        var space = document.createElement('br');
        reportIssue.appendChild(issue);
        reportIssue.appendChild(space);
    }
    if (energyNum <= 0 || energyNum >= 100) {
        var reportIssue = document.getElementById("issueCenter");
        var issue = document.createElement('label');
        issue.appendChild(document.createTextNode("Energy level out of bounds."));
        var space = document.createElement('br');
        reportIssue.appendChild(issue);
        reportIssue.appendChild(space);
    }
    if (taskText.length > 56)
    {
        var reportIssue = document.getElementById("issueCenter");
        var issue = document.createElement('label');
        issue.appendChild(document.createTextNode("Too many characters in title, please shorten."));
        var space = document.createElement('br');
        reportIssue.appendChild(issue);
        reportIssue.appendChild(space);
    }
    taskInput.value = "";
    energyInput.value = "";
}

function displayTasks() {
    var taskList = document.getElementById("taskList");
    while (taskList.hasChildNodes()) {
        taskList.removeChild(taskList.firstChild);
    }

    sortTasks();

    if (userEnergy <= 25 || (listOfTasks.length < listOfTasksNo.length && listOfTasks.length < 3)){
        energyNeeded();
    }
    else {
        energyNotNeeded();
    }

    for (let i = 0; i < listOfTasks.length; i++) {
        var newTask = document.createElement('input');
        newTask.type = "checkbox";
        var newTaskLabel = document.createElement('label');
        newTaskLabel.htmlFor = newTask;
        newTaskLabel.appendChild(document.createTextNode(listOfTasks[i] + "ᅟᅟᅟᅟ-" + listOfEnergy[i] + "%"));
        var space = document.createElement('br');
        taskList.appendChild(newTask);
        taskList.appendChild(newTaskLabel);
        taskList.appendChild(space);
    }

    for (let i = 0; i < listOfTasksNo.length; i++) {
        if (i == 0) {
            var spacer = document.createElement('br');
            var line = document.createElement('hr');
            var header = document.createElement('h4');
            header.textContent = "Not Enough Energy";
            taskList.appendChild(spacer);
            taskList.appendChild(line);
            taskList.appendChild(header);
        }
        var newTask = document.createElement('input');
        newTask.type = "checkbox";
        var newTaskLabel = document.createElement('label');
        newTaskLabel.htmlFor = newTask;
        newTaskLabel.appendChild(document.createTextNode(listOfTasksNo[i] + "ᅟᅟᅟᅟ-" + listOfEnergyNo[i] + "%"));
        newTaskLabel.style.color = "#93686f";
        var space = document.createElement('br');
        taskList.appendChild(newTask);
        taskList.appendChild(newTaskLabel);
        taskList.appendChild(space);
    }
}

function sortTasks() {
    for (let i = 0; i < listOfTasksNo.length; i++) {
        listOfTasks.push(listOfTasksNo[i]);
        listOfEnergy.push(listOfEnergyNo[i]);
    }
    listOfTasksNo.splice(0, listOfTasksNo.length);
    listOfEnergyNo.splice(0, listOfEnergyNo.length);
    var newTaskList = [];
    var newEnergyList = [];
    
    while (listOfTasks.length != 0) {
        var mostEnergy = 0;
        for (let i = 0; i < listOfTasks.length; i++) {
            if (listOfEnergy[i] > listOfEnergy[mostEnergy]) {
                mostEnergy = i;
            }
        }
        var numMostEnergy = Number.parseInt(listOfEnergy[mostEnergy]);
        if (numMostEnergy > userEnergy)
        {
            listOfTasksNo.push(listOfTasks[mostEnergy]);
            listOfEnergyNo.push(listOfEnergy[mostEnergy]);
            listOfTasks.splice(mostEnergy, 1);
            listOfEnergy.splice(mostEnergy, 1);
        }
        else {
            newTaskList.push(listOfTasks[mostEnergy]);
            newEnergyList.push(listOfEnergy[mostEnergy]);
            listOfTasks.splice(mostEnergy, 1);
            listOfEnergy.splice(mostEnergy, 1);
        }
    }

    listOfTasks = newTaskList;
    listOfEnergy = newEnergyList;
}

function removeTask()
{
    var taskList = document.getElementById("taskList");
    
    var tasks = taskList.querySelectorAll('input');
    var taskDeleteIndex = [];
    var taskDeleteIndexNo = [];
    for (let x = 0; x < tasks.length; x++)
    {
        if (tasks[x].checked)
        {
            if (x > listOfTasks.length - 1){
                taskDeleteIndexNo.push(x - listOfTasks.length);
            }
            else {
                taskDeleteIndex.push(x);
            }
        }
    }

    for (let i = taskDeleteIndex.length - 1; i >= 0; i--) {
        var deleteIndex = Number.parseInt(taskDeleteIndex[i]);
        listOfTasks.splice(deleteIndex, 1);
        listOfEnergy.splice(deleteIndex, 1);
    }

    for (let i = taskDeleteIndexNo.length - 1; i >= 0; i--) {
        var deleteIndex = Number.parseInt(taskDeleteIndexNo[i]);
        console.log(taskDeleteIndexNo);
        listOfTasksNo.splice(deleteIndex, 1);
        listOfEnergyNo.splice(deleteIndex, 1);
    }

    isChecked();
}

function calculateTask() {
    calculateBooster();
    var taskList = document.getElementById("taskList");
    
    var tasks = taskList.querySelectorAll('input');
    var taskCalculateIndex = [];
    var issue = false;
    for (let x = 0; x < tasks.length; x++)
    {
        if (tasks[x].checked)
        {
            if (x < listOfTasks.length){
                taskCalculateIndex.push(x);
            }
            else {
                issue = true;
            }
        }
    }

    if (issue) {
        var reportIssue = document.getElementById("issueCenter");
        var issue = document.createElement('label');
        issue.appendChild(document.createTextNode('Cannot complete tasks under "Not Enough Energy".'));
        var space = document.createElement('br');
        reportIssue.appendChild(issue);
        reportIssue.appendChild(space);
    }

    var sum = 0;
    for (let i = 0; i < taskCalculateIndex.length; i++) {
        sum += Number.parseInt(listOfEnergy[taskCalculateIndex[i]]);
        console.log(sum);
    }

    if (sum <= userEnergy){
        for (let i = taskCalculateIndex.length - 1; i >= 0; i--) {
            var deleteIndex = Number.parseInt(taskCalculateIndex[i]);
            userEnergy = userEnergy - listOfEnergy[i];
            listOfTasks.splice(deleteIndex, 1);
            listOfEnergy.splice(deleteIndex, 1);
        }
    }
    else {
        var reportIssue = document.getElementById("issueCenter");
        var issue = document.createElement('label');
        issue.appendChild(document.createTextNode("Not enough energy to complete all tasks."));
        var space = document.createElement('br');
        reportIssue.appendChild(issue);
        reportIssue.appendChild(space);
    }
    
    document.getElementById("energyPercent").innerHTML = userEnergy + "%";
    changeEnergy();
}

function wattersonSpeaks() {
    var speak = Math.floor(Math.random() * 3);
    var words = wattSpeaks[speak];
    alert(words);
}