// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");
//and the variable for the new modal thing that I'm trying out
const modal = document.querySelector("[data-modal]");
// const addFilm = document.querySelector("[data-open-modal]");
const addFilm = document.getElementById("addFilmButton");
const closeForm = document.getElementById("closeFormButton");

// opening the add film dialogue on clicking the button

addFilm.addEventListener("click", () => {
  modal.showModal();

})

//closing the dialogue on clicking the appropriate button

closeForm.addEventListener("click", () => {
  modal.close();
  document.getElementById("taskform").reset();

})

//also, closing the form if you click outside its bounds. Adapted from https://blog.webdevsimplified.com/2023-04/html-dialog/

modal.addEventListener("click", e => {
  const dialogDimensions = modal.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close()
    document.getElementById("taskform").reset();
  }
})


form.addEventListener("submit", function (event) {
    event.preventDefault();

    addTask(
        form.elements.taskName.value,
        form.elements.taskType.value,
        form.elements.taskRate.value,
        form.elements.taskTime.value,
        form.elements.taskClient.value,
        form.elements.filmRating.value,
    )
    modal.close();
})

function displayTasks() {

    tasklist.innerHTML = "";

    let localTasks = JSON.parse(localStorage.getItem('tasks'));

    //checking if the localTasks element is empty

    if (localTasks !== null) { 

      localTasks.forEach((task) => {
        //all the code for generating items for the page happens here

        console.log(task)
      
        // Create task items for the DOM and add to the list
        let item = document.createElement("li");
        item.className = "film";
        item.setAttribute("data-id", task.id);
        item.innerHTML = `<p><strong>${task.name}</strong><br>${task.type}<br>${task.filmRating}<br><img src ='../images/iconaction.png'></p>`;
        //make an if statement to select an appropriate image and then have it come up here
        tasklist.appendChild(item);

        // Clear the value of the input once the task has been added to the page
        form.reset();

        // Setup delete button DOM elements
        let delButton = document.createElement("button");
        let delButtonText = document.createTextNode("Delete");
        delButton.appendChild(delButtonText);
        item.appendChild(delButton); // Adds a delete button to every task

        // Listen for when the delete button is clicked
        delButton.addEventListener("click", function (event) {

            localTasks.forEach(function (taskArrayElement, taskArrayIndex) {
                if (taskArrayElement.id == item.getAttribute('data-id')) {
                    localTasks.splice(taskArrayIndex, 1)
                }
            })

            localStorage.setItem('tasks', JSON.stringify(localTasks));

            item.remove(); // Remove the task item from the page when button clicked
            // Because we used 'let' to define the item, 
            // this will always delete the right element
        })

      }) //closing bracket for for loop
    }//closing bracket for if statement
}

// Function to add task to the list
function addTask(name, type, rate, time, client, filmRating) {

  

    // Creating the object, directly passing in the input parameters. 
    // This is kept the same from the first time its introduced in the tutorial.
    let task = {
        name,
        type,
        id: Date.now(),
        date: new Date().toISOString(),
        rate,
        time,
        client,
        filmRating,
    }

    //first check localstorage to see if an item exists
      //fetching and parsing the localstorage value

      let localTasks = JSON.parse(localStorage.getItem('tasks'));


    //then place the value into a JS data structure 
    //then check to see if its a null value (if localstorage is empty). If it is then add task. 

      if (localTasks == null) {

        localTasks = [task];        
      } else {
        //check for existing task. in this case using the ID bc u could have multiple tasks with the same name
        if (localTasks.find(element => element.id === task.id)){
          console.log('Task ID already exists.');
        } else {
          //if theres no existing task then push the element to the array. this is a temporary array instead of the global one at the top
          localTasks.push(task); 
        }
      }

      //set the new item into localstorage
      localStorage.setItem('tasks', JSON.stringify(localTasks));

    // if it isnt then check if the task is already there 
    // and add if not

    displayTasks();

}



// Call the function with test values for the input paramaters
addTask("Alvin & the Chipmunks", "Concept Ideation", 50, 5, "Google", "1");
addTask("Alvin & the Chipmunks 2: The Squeekwel", "Concept Ideation", 50, 5, "Google");
addTask("Alvin & the Chipmunks 3: Chipwrecked", "Concept Ideation", 50, 5, "Google");
displayTasks();
