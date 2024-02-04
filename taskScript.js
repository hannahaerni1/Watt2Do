var listOfTasks = [];
var listOfEnergy = [];
var listOfTasksNo = [];
var listOfEnergyNo = [];

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    var energyNum = energyInput.value.trim();

    if (taskText !== "" && energyNum > 0 && energyNum < 100) {
        listOfTasks.push(taskText);
        listOfEnergy.push(energyNum);
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
        newTaskLabel.appendChild(document.createTextNode(listOfTasksNo[i] + " ~ -" + listOfEnergyNo[i] + "%"));
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
    var taskLen = tasks.length;
    for (let x = 0; x < taskLen; x++)
    {
        if (tasks[x].checked)
        {
            if (x > listOfTasks.length - 1){
                x -= listOfTasks.length;
                listOfTasksNo.splice(x, 1);
                listOfEnergyNo.splice(x, 1);
            }
            else {
                listOfTasks.splice(x, 1);
                listOfEnergy.splice(x, 1);
            }

            x--;
            taskLen--;
        }

    }
}

function calculateTask() {
    var taskList = document.getElementById("taskList");
    
    var tasks = taskList.querySelectorAll('input');
    var taskLen = tasks.length;
    for (let x = 0; x < taskLen; x++)
    {
        if (tasks[x].checked)
        {
            if (x < listOfTasks.length){
                userEnergy = userEnergy - listOfEnergy[x];
                document.getElementById("energyPercent").innerHTML = userEnergy + "%";
                changeEnergy();
                listOfTasks.splice(x, 1);
                listOfEnergy.splice(x, 1);
                x--;
                taskLen--;
            }
        }

    }
}