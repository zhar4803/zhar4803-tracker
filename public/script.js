// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");
//the variable for the add film modal
const modal = document.querySelector("[data-modal]");
// const addFilm = document.querySelector("[data-open-modal]");
const addFilm = document.getElementById("addFilmButton");
const closeForm = document.getElementById("closeFormButton");
//the variable for the individual film modal!
const filmModal = document.getElementById("filmModal");
const closeEntry = document.getElementById("closeEntryButton");


import icons from './images/icons/*.png';

const iconAction = 'https://i.imgur.com/FyHOGba.png';
const iconDrama = 'https://i.imgur.com/psQIgtI.png';



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

//and closing individual database entries by clicking on their button

closeEntry.addEventListener("click", () => {
  filmModal.close();

})

//or by clicking outsider of their bounds!

filmModal.addEventListener("click", e => {
  const dialogDimensions = filmModal.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    filmModal.close()
    document.getElementById("taskform").reset();
  }
})

form.addEventListener("submit", function (event) {
    event.preventDefault();

    addTask(
        form.elements.filmName.value,
        form.elements.filmGenre.value,
        form.elements.filmGenre2.value,
        form.elements.filmDirector.value,
        form.elements.filmRelease.value,
        form.elements.filmCast.value,
        form.elements.filmOriginalTitle.value,
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

        let taskImage = null;
        switch (task.filmGenre[0]) {
            case 'Action':
                taskImage = icons['iconaction']
                break;
            case 'Drama':
                taskImage = icons['icondrama']
                break;
            // case 'Application Coding':
            //     taskImage = images['code']
            //     break;
            default:
                break;
        }

        // if (task.filmGenre[1] !== "") {
        let taskImage2 = null;
        switch (task.filmGenre[1]) {
            case 'Action':
                taskImage2 = icons['iconaction']
                break;
            case 'Drama':
                taskImage2 = icons['icondrama']
                break;
            // case 'Application Coding':
            //     taskImage = images['code']
            //     break;
            default:
                break;
        }
      // }

        //all the code for generating items for the page happens here

        console.log(task)
      
        // Create task items for the DOM and add to the list
        let item = document.createElement("li");
        item.className = "film";
        item.id = "film";
        item.setAttribute("data-id", task.id);
        item.innerHTML = `<p><strong>${task.filmName}</strong><br><em>${task.filmRelease}</em></p>`;
        //make an if statement to select an appropriate image and then have it come up here
        tasklist.appendChild(item);

        // Clear the value of the input once the task has been added to the page
        form.reset();


        //now let's add our little genre sticker icons!
  var genreIcon = document.createElement("img");
  genreIcon.src = taskImage;
  item.appendChild(genreIcon);

  var genreIcon2 = document.createElement("img");
  // genreIcon.src = 'https://i.imgur.com/FyHOGba.png';
  genreIcon2.src = taskImage2;
  item.appendChild(genreIcon2);


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

        //adding a listener to open a separate modal with the item attributes on click. see function below
        item.addEventListener("click", function () {
          openfilmModal(task.id);
        });
        //--------

      }) //closing bracket for for loop
    }//closing bracket for if statement
}

// Function to add task to the list
function addTask(filmName, filmGenre1, filmGenre2, filmDirector, filmRelease, filmCast, filmOriginalTitle, filmRating) {

  

    // Creating the object, directly passing in the input parameters. 
    // This is kept the same from the first time its introduced in the tutorial.
    let task = {
        filmName,
        filmGenre: [filmGenre1, filmGenre2],
        id: Date.now(),
        date: new Date().toISOString(),
        filmRelease,
        filmDirector,
        filmCast: filmCast.split(","),
        filmOriginalTitle,
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

//my function for filling out the film detail modal with details from each individual attribute on the form

function openfilmModal(taskId) {


    // Opening the tasks from local storage
    let localTasks = JSON.parse(localStorage.getItem('tasks'));

    // searching our tasks for the correct ID, if nothing is found, it returns -1
    let selectedTaskIndex = localTasks.findIndex(task => task.id === taskId);
  
    if (selectedTaskIndex !== -1) { //so lets check if it hasn't returned -1.
      const selectedTask = localTasks[selectedTaskIndex]; //if it's all good, then let's make a selectedtask object that we will build this modal from!

    // Populating the modal with the attributes of the selected film
    const filmDetails = document.getElementById("filmDetails");

    // Constructing a string which will then be fed into the innerhtml at the end
    let entryContent = `<div class ="entry-row"><em class ="entry-label">Title:</em>${selectedTask.filmName}</div>`;

    //each form element is checked with an if statement so it can be omitted if it wasn't submitted
    //since there is always at least one genre submitted, we will instead check if the second string in the array was left blank and omit the comma if it is
    
    if (selectedTask.filmGenre.length > 0) {
      entryContent += `<div class ="entry-row"><em class ="entry-label">Genre:</em> ${selectedTask.filmGenre[0]}`;
      
      if (selectedTask.filmGenre[1] !== "") {
        entryContent += `, ${selectedTask.filmGenre[1]}`;
      }
      
      entryContent += `</div>`;
    }
    
    if (selectedTask.filmRelease) {
      entryContent += `<div class ="entry-row"><em class ="entry-label">Release Date:</em> ${selectedTask.filmRelease}</div>`;
    }
    
    if (selectedTask.filmDirector) {
      entryContent += `<div class ="entry-row"><em class ="entry-label">Director:</em> ${selectedTask.filmDirector}</div>`;
    }
    
    //since the filmCast is supposed to be an entry with three arrays, we will instead check if the filmCast array only has a blank string as an entry
    if (selectedTask.filmCast[0] !== "") {
      //slicing the 'cast' array to omit entries past the third, for cleanliness
      const cast = selectedTask.filmCast.slice(0, 3).join(", ");
      entryContent += `<div class ="entry-row"><em class ="entry-label">Cast:</em> ${cast}</div>`;
    }
    
    if (selectedTask.filmOriginalTitle) {
      entryContent += `<div class ="entry-row"><em class ="entry-label">Original Title:</em> ${selectedTask.filmOriginalTitle}</div>`;
    }
    
    if (selectedTask.filmRating) {
      entryContent += `<div class ="entry-row"><em class ="entry-label">Rating:</em> ${selectedTask.filmRating}</div>`;
    }

    filmDetails.innerHTML = entryContent;
    
      // now let's add the delete button, adapted from the code given before 
      let delButton = document.createElement("button");
      let delButtonText = document.createTextNode("Delete");
      delButton.appendChild(delButtonText);
      filmDetails.appendChild(delButton); // Adds a delete button to the modal
  
      // Listen for when the delete button is clicked
      delButton.addEventListener("click", function (event) {
        localTasks.splice(selectedTaskIndex, 1); // Remove the selected task from the localTasks array
        localStorage.setItem('tasks', JSON.stringify(localTasks)); // Update the localStorage
        filmModal.close(); // Close the modal
        displayTasks(); // Refresh the task list
      });

    filmModal.showModal();
  } 
}



// function for randomly choosing a bunch of films and adding them for testing purposes
function randomlyChooseTasks(numberOfTasks) {
  const tasks = [
    () => addTask("Alvin & the Chipmunks", "Drama", "Drama", "Alan Smithee", "(1939)", "Alvin", "Salo", "1"),
    () => addTask("Alvin & the Chipmunks 2: The Squeekwel", "Action", "Crime", "Alan Smithee", "(1500bc)", "Alvin", "Salo", "1"),
    () => addTask("Alvin & the Chipmunks 3: Chipwrecked", "Drama", "Adventure", "Alan Smithee", "(40,000)", "Alvin", "Salo", "1"),
    () => addTask("Alvin & the Chipmunks 4: Alvin Goes to Hell", "Action", "Adventure", "Alan Smithee", "(40,000)", "Alvin", "Salo", "1"),
    () => addTask("Alvin & the Chipmunks 5: The Revenge", "Drama", "Adventure", "Alan Smithee", "(40,000)", "Alvin", "Salo", "1"),
    () => addTask("Alvin & the Chipmunks 6: The Final Alvin", "Action", "Adventure", "Alan Smithee", "(40,000)", "Alvin", "Salo", "1"),
    () => addTask("Alvin & the Chipmunks 7: A New Beginning", "Drama", "Adventure", "Alan Smithee", "(40,000)", "Alvin", "Salo", "1"),
    () => addTask("Alvin & the Chipmunks 8: Alvin's Return", "Action", "Adventure", "Alan Smithee", "(40,000)", "Alvin", "Salo", "1"),
  ];

  // Shuffle the tasks array using the Fisher-Yates algorithm
  for (let i = tasks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tasks[i], tasks[j]] = [tasks[j], tasks[i]];
  }

  // Call the specified number of randomly chosen tasks
  for (let i = 0; i < numberOfTasks; i++) {
    if (tasks[i]) {
      tasks[i]();
    }
  }
}

randomlyChooseTasks(5);

displayTasks();
