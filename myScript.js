function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    // Check if the input is not empty
    if (taskText !== "") {
        // Create a new list item
        var newTask = document.createElement("li");
        newTask.textContent = taskText;

        // Append the new task to the task list
        var taskList = document.getElementById("taskList");
        taskList.appendChild(newTask);

        // Clear the input field
        taskInput.value = "";
    }
  }