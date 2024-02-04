const listOfTasks = [];

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    // Check if the input is not empty
    if (taskText !== "") {
        // Create a new list item
        listOfTasks.push(taskText);
    }
    taskInput.value = "";
}

function displayTasks() {
    var taskList = document.getElementById("taskList");
    while (taskList.hasChildNodes()) {
        taskList.removeChild(taskList.firstChild);
    }

    for (let i = 0; i < listOfTasks.length; i++) {
        var newTask = document.createElement('li');
        newTask.textContent = listOfTasks[i];

        taskList.appendChild(newTask);
    }
}