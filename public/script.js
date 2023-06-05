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

        // Assigning the taskImage variable to the correct Icon for the genre via a switch case
        let taskImage = null;
        switch (task.filmGenre[0]) {
          case 'Action':
            taskImage = icons['iconaction']
            break;
          case 'Adventure':
            taskImage = icons['iconadventure']
            break;
          case 'Comedy':
            taskImage = icons['iconcomedy']
            break;
          case 'Crime':
            taskImage = icons['iconcrime']
            break;
          case 'Documentary':
            taskImage = icons['icondocumentary']
            break;
          case 'Drama':
            taskImage = icons['icondrama']
            break;
          case 'Family':
            taskImage = icons['iconfamily']
            break;
          case 'Fantasy':
            taskImage = icons['iconfantasy']
            break;
          case 'History':
            taskImage = icons['iconhistory']
            break;
          case 'Horror':
            taskImage = icons['iconhorror']
            break;
          case 'Music':
            taskImage = icons['iconmusic']
            break;
          case 'Mystery':
            taskImage = icons['iconmystery']
            break;
          case 'Romance':
            taskImage = icons['iconromance']
            break;
          case 'Science Fiction':
            taskImage = icons['iconscifi']
            break;
          case 'TV Movie':
            taskImage = icons['icontv']
            break;
            case 'Thriller':
            taskImage = icons['iconthriller']
            break;
          case 'War':
            taskImage = icons['iconwar']
            break;
          case 'Western':
            taskImage = icons['iconwestern']
            break;
          default:
            break;
        }

        // if (task.filmGenre[1] !== "") {
        let taskImage2 = null;
        switch (task.filmGenre[1]) {
          case 'Action':
            taskImage2 = icons['iconaction']
            break;
          case 'Adventure':
            taskImage2 = icons['iconadventure']
            break;
          case 'Comedy':
            taskImage2 = icons['iconcomedy']
            break;
          case 'Crime':
            taskImage2 = icons['iconcrime']
            break;
          case 'Documentary':
            taskImage2 = icons['icondocumentary']
            break;
          case 'Drama':
            taskImage2 = icons['icondrama']
            break;
          case 'Family':
            taskImage2 = icons['iconfamily']
            break;
          case 'Fantasy':
            taskImage2 = icons['iconfantasy']
            break;
          case 'History':
            taskImage2 = icons['iconhistory']
            break;
          case 'Horror':
            taskImage2 = icons['iconhorror']
            break;
          case 'Music':
            taskImage2 = icons['iconmusic']
            break;
          case 'Mystery':
            taskImage2 = icons['iconmystery']
            break;
          case 'Romance':
            taskImage2 = icons['iconromance']
            break;
          case 'Science Fiction':
            taskImage2 = icons['iconscifi']
            break;
          case 'TV Movie':
            taskImage2 = icons['icontv']
            break;
          case 'Thriller':
            taskImage2 = icons['iconthriller']
            break;
          case 'War':
            taskImage2 = icons['iconwar']
            break;
          case 'Western':
            taskImage2 = icons['iconwestern']
            break;
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
        item.innerHTML = `<p id ="text"><strong>${task.filmName}</strong><br><em>${task.filmRelease}</em></p>`;
        //make an if statement to select an appropriate image and then have it come up here
        tasklist.appendChild(item);

        // Clear the value of the input once the task has been added to the page
        form.reset();

        let taskrating = null;
        switch (task.filmRating) {
          case '1':
            taskrating = icons['half']
            break;
          case '2':
            taskrating = icons['1']
            break;
          case '3':
            taskrating = icons['1half']
            break;
          case '4':
            taskrating = icons['2']
            break;
          case '5':
            taskrating = icons['2half']
            break;
          case '6':
            taskrating = icons['3']
            break;
          case '7':
            taskrating = icons['3half']
            break;
          case '8':
            taskrating = icons['4']
            break;
          case '9':
            taskrating = icons['4half']
            break;
          case '10':
            taskrating = icons['5']
            break;
            default:
            break;
        }

        var ratingIcon = document.createElement("img");
        ratingIcon.src = taskrating;
        ratingIcon.id = "dbRating";
        item.appendChild(ratingIcon);

        //now let's add our little genre sticker icons!
  var genreIcon = document.createElement("img");
  genreIcon.src = taskImage;
  genreIcon.id = "sticker1";
  item.appendChild(genreIcon);

  // since the second genre is optional, let's check that the array isn't empty first
  if (task.filmGenre[1] !== "") { 
  var genreIcon2 = document.createElement("img");
  // genreIcon.src = 'https://i.imgur.com/FyHOGba.png';
  genreIcon2.src = taskImage2;
  genreIcon2.id = "sticker2";
  item.appendChild(genreIcon2);
  }






        // Setup delete button DOM elements
        // let delButton = document.createElement("button");
        // let delButtonText = document.createTextNode("Delete");
        // delButton.appendChild(delButtonText);
        // item.appendChild(delButton); // Adds a delete button to every task

        // // Listen for when the delete button is clicked
        // delButton.addEventListener("click", function (event) {

        //     localTasks.forEach(function (taskArrayElement, taskArrayIndex) {
        //         if (taskArrayElement.id == item.getAttribute('data-id')) {
        //             localTasks.splice(taskArrayIndex, 1)
        //         }
        //     })

        //     localStorage.setItem('tasks', JSON.stringify(localTasks));

        //     item.remove(); // Remove the task item from the page when button clicked
        //     // Because we used 'let' to define the item, 
        //     // this will always delete the right element
        // })

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

    // EXPERIMENTAL POTENTIALLY FUCKED CONTENT

    // Constructing a string which will then be fed into the innerhtml at the end
    let entryContent = `<div class ="entry-row"><div class ="entry-label"><em>Title:</em></div><div class ="entry-text">${selectedTask.filmName}</div></div>`;

    //each form element is checked with an if statement so it can be omitted if it wasn't submitted
    //since there is always at least one genre submitted, we will instead check if the second string in the array was left blank and omit the comma if it is
    
    if (selectedTask.filmGenre.length > 0) {
      entryContent += `<div class ="entry-row"><div class ="entry-label"><em>Genre:</em></div><div class ="entry-text"> ${selectedTask.filmGenre[0]}`;
      
      if (selectedTask.filmGenre[1] !== "") {
        entryContent += `, ${selectedTask.filmGenre[1]}`;
      }
      
      entryContent += `</div></div>`;
    }
    
    if (selectedTask.filmRelease) {
      entryContent += `<div class ="entry-row"><em class ="entry-label">Release Date:</em><div class ="entry-text"> ${selectedTask.filmRelease}</div></div>`;
    }
    
    if (selectedTask.filmDirector) {
      entryContent += `<div class ="entry-row"><em class ="entry-label">Director:</em><div class ="entry-text"> ${selectedTask.filmDirector}</div></div>`;
    }
    
    //since the filmCast is supposed to be an entry with three arrays, we will instead check if the filmCast array only has a blank string as an entry
    if (selectedTask.filmCast[0] !== "") {
      //slicing the 'cast' array to omit entries past the third, for cleanliness
      const cast = selectedTask.filmCast.slice(0, 3).join(", ");
      entryContent += `<div class ="entry-row"><em class ="entry-label">Cast:</em><div class ="entry-text"> ${cast}</div></div>`;
    }
    
    if (selectedTask.filmOriginalTitle) {
      entryContent += `<div class ="entry-row"><em class ="entry-label">Original Title:</em><div class ="entry-text"> ${selectedTask.filmOriginalTitle}</div></div>`;
    }
    
    let taskrating = null;
        switch (selectedTask.filmRating) {
          case '1':
            taskrating = icons['blankhalf']
            break;
          case '2':
            taskrating = icons['blank1']
            break;
          case '3':
            taskrating = icons['blank1half']
            break;
          case '4':
            taskrating = icons['blank2']
            break;
          case '5':
            taskrating = icons['blank2half']
            break;
          case '6':
            taskrating = icons['blank3']
            break;
          case '7':
            taskrating = icons['blank3half']
            break;
          case '8':
            taskrating = icons['blank4']
            break;
          case '9':
            taskrating = icons['blank4half']
            break;
          case '10':
            taskrating = icons['blank5']
            break;
            default:
            break;
        }


    // if (selectedTask.filmRating) {
    //   entryContent += `<div class ="entry-row"><em class ="entry-label">Rating:</em><div class ="entry-text"> ${selectedTask.filmRating}</div></div>`;
    // }

    if (selectedTask.filmRating) {
      entryContent += `<div class ="entry-row"><em class ="entry-label">Rating:</em><div class ="entry-text"> <img src ="${taskrating}.png"></div></div>`;
    }

    // NON FUCKED JS

    // // Constructing a string which will then be fed into the innerhtml at the end
    // let entryContent = `<div class ="entry-row"><em class ="entry-label">Title:</em>${selectedTask.filmName}</div>`;

    // //each form element is checked with an if statement so it can be omitted if it wasn't submitted
    // //since there is always at least one genre submitted, we will instead check if the second string in the array was left blank and omit the comma if it is
    
    // if (selectedTask.filmGenre.length > 0) {
    //   entryContent += `<div class ="entry-row"><em class ="entry-label">Genre:</em> ${selectedTask.filmGenre[0]}`;
      
    //   if (selectedTask.filmGenre[1] !== "") {
    //     entryContent += `, ${selectedTask.filmGenre[1]}`;
    //   }
      
    //   entryContent += `</div>`;
    // }
    
    // if (selectedTask.filmRelease) {
    //   entryContent += `<div class ="entry-row"><em class ="entry-label">Release Date:</em> ${selectedTask.filmRelease}</div>`;
    // }
    
    // if (selectedTask.filmDirector) {
    //   entryContent += `<div class ="entry-row"><em class ="entry-label">Director:</em> ${selectedTask.filmDirector}</div>`;
    // }
    
    // //since the filmCast is supposed to be an entry with three arrays, we will instead check if the filmCast array only has a blank string as an entry
    // if (selectedTask.filmCast[0] !== "") {
    //   //slicing the 'cast' array to omit entries past the third, for cleanliness
    //   const cast = selectedTask.filmCast.slice(0, 3).join(", ");
    //   entryContent += `<div class ="entry-row"><em class ="entry-label">Cast:</em> ${cast}</div>`;
    // }
    
    // if (selectedTask.filmOriginalTitle) {
    //   entryContent += `<div class ="entry-row"><em class ="entry-label">Original Title:</em> ${selectedTask.filmOriginalTitle}</div>`;
    // }
    
    // if (selectedTask.filmRating) {
    //   entryContent += `<div class ="entry-row"><em class ="entry-label">Rating:</em> ${selectedTask.filmRating}</div>`;
    // }

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
    () => addTask("Alvin & the Chipmunks", "Drama", "Comedy", "Alan Smithee", "(2009)", "Alvin", "Salo", '1'),
    () => addTask("Alvin & the Chipmunks 2: The Squeekwel", "Action", "Crime", "Alan Smithee", "(2011)", "Alvin", "Salo", '2'),
    () => addTask("Alvin & the Chipmunks 3: Chipwrecked", "Drama", "Western", "Alan Smithee", "(2013)", "Alvin", "Salo", '3'),
    () => addTask("Alvin & the Chipmunks 4: Alvin Goes to Hell", "Horror", "Thriller", "Alan Smithee", "(2018)", "Alvin", "Salo", '4'),
    () => addTask("Alvin & the Chipmunks 5: The Revenge", "War", "Horror", "Alan Smithee", "(2022)", "Alvin", "Salo", '5'),
    () => addTask("Alvin & the Chipmunks 6: The Final Alvin", "TV Movie", "Adventure", "Alan Smithee", "(2026)", "Alvin", "Salo", '6'),
    () => addTask("Alvin & the Chipmunks 7: A New Beginning", "TV Movie", "Music", "Alan Smithee", "(2030)", "Alvin", "Salo", '7'),
    () => addTask("Alvin & the Chipmunks 8: Alvin's Return", "TV Movie", "Horror", "Alan Smithee", "(2033)", "Alvin", "Salo", '8'),
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

// randomlyChooseTasks(1);


displayTasks();
