const listOfTasks = [];
const listOfEnergy = [];
const userEnergy = 50;

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    var energyNum = energyInput.value.trim();

    // Check if the input is not empty
    if (taskText !== "" && energyNum > 0 && energyNum < 100) {
        // Create a new list item
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

    for (let i = 0; i < listOfTasks.length; i++) {
        var newTask = document.createElement('input');
        newTask.type = "checkbox";
        var newTaskLabel = document.createElement('label');
        newTaskLabel.htmlFor = newTask;
        newTaskLabel.appendChild(document.createTextNode(listOfTasks[i] + " " + listOfEnergy[i]));
        var space = document.createElement('br');
        taskList.appendChild(newTask);
        taskList.appendChild(newTaskLabel);
        taskList.appendChild(space);
    }
}

function changeEnergy()
{
    var currentEnergy = newEnergy.value.trim();
    if (currentEnergy <= 100 && currentEnergy >= 0){
        userEnergy = currentEnergy;
    }

    newEnergy.value = "";
    
    var energyPercent = document.getElementById("energyPercent");
    energyPercent.innerText = userEnergy + "%";
}

function removeTask()
{
    var taskList = document.getElementById("taskList");
    
    const tasks = taskList.querySelectorAll('input');

    for (let x = 0; x < tasks.length; x++)
    {
        if (tasks[x].checked)
        {
            listOfTasks.splice(x, 1);
            listOfEnergy.splice(x, 1);
        }

    }
}

const battery = document.getElementById("battery");
const ctx = battery.getContext("2d");

ctx.fillRect(0, 0, 150, 300);