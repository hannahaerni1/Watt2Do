var listOfTasks = [];
var listOfEnergy = [];
var indexTooMuchEnergy = -1;

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

    sortTasks();

    for (let i = 0; i < listOfTasks.length; i++) {
        if (i == indexTooMuchEnergy){
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
        newTaskLabel.appendChild(document.createTextNode(listOfTasks[i] + " " + listOfEnergy[i]));
        var space = document.createElement('br');
        taskList.appendChild(newTask);
        taskList.appendChild(newTaskLabel);
        taskList.appendChild(space);
    }
}

function sortTasks() {
    var newTaskList = [];
    var newEnergyList = [];
    
    var noMoreLeft = false;
    while (listOfTasks.length != 0) {
        var mostEnergy = 0;
        for (let i = 0; i < listOfTasks.length; i++) {
            if (!noMoreLeft){
                if (listOfEnergy[i] > listOfEnergy[mostEnergy] && listOfEnergy[i] <= userEnergy) {
                    mostEnergy = i;
                }
            }
            else {
                if (listOfEnergy[i] > listOfEnergy[mostEnergy]) {
                    mostEnergy = i;
                }
            }
            if (i == listOfTasks.length - 1 && listOfEnergy[mostEnergy] > userEnergy && !noMoreLeft){
                noMoreLeft = true;
                indexTooMuchEnergy = newTaskList.length;
                i = 0;
            }
        }
        newTaskList.push(listOfTasks[mostEnergy]);
        newEnergyList.push(listOfEnergy[mostEnergy]);
        listOfTasks.splice(mostEnergy, 1);
        listOfEnergy.splice(mostEnergy, 1);
    }

    if (!noMoreLeft){
        indexTooMuchEnergy = -1;
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
            listOfTasks.splice(x, 1);
            listOfEnergy.splice(x, 1);
            x--;
            taskLen--;
        }

    }
}
