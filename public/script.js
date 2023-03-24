const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  addTask(form.elements.taskName.value, form.elements.taskType.value, form.elements.taskRate.value, form.elements.taskTime.value, form.elements.taskClient.value, form.elements.taskBillable.value);
console.log(taskList);})

console.log(form.elements);

var taskList = [];


function addTask(name, type, rate, time, client){

let task = {
  name:	
name,
  type:	
type,
  id:Date.now(), 
  date: new Date().toISOString(),
  rate:rate,
  time:time,
  client:client,
};

taskList.push(task);
displayTask(task);
  
}

// Call the function with test values for the input paramaters

addTask("Initial Sketches", "Concept Ideation", 50, 5, "Google");

// Log the array to the console.
function displayTask(task) {
  let item = document.createElement("li");
  item.setAttribute("data-id", task.id);
  item.innerHTML =`<p><strong>${task.name}</strong><br>${task.type}</p>`;
  tasklist.appendChild(item);
  form.reset();

  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton);

  // Listen for when the delete button is clicked
delButton.addEventListener("click", function(event) {
  item.remove(); // Remove the task item from the page when button clicked
  // Because we used 'let' to define the item, this will delete the right element
  // Loop through the array and remove the element corresponding with the list item\
taskList.forEach(function(taskArrayElement, taskArrayindex) {
  if (task.id == item.getAttribute('data-id')) {
    taskList.splice(index, 1)
  }
})

// Make sure the deletion worked by logging out the whole array\
console.log(taskList)
  
})
}