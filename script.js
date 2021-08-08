//Setting the date in the app.
var t = new Date();
var today = t.getDate() +" - "+ (1+t.getMonth()) +" - "+ t.getFullYear();
document.getElementById("today").innerHTML = today;

//Adding Event Listners
document.getElementById("add").addEventListener("click", addTask);

//Intitializing Arrays and counter for localStorage.
var tasksList = [];
var totalTasks = tasksList.length;

//To initialize the localStorage variables if the app is ran for the first time.
if(JSON.parse(localStorage.getItem("tasksList")==null)){
    localStorage.setItem("tasksList",JSON.stringify(tasksList));
}


//Initial call to fill all the tasks stored in the memory.
//I need some advice on this statement. I am not able to make the project work without it.
var tasksList = JSON.parse(localStorage.getItem("tasksList"));

setTasks();


//Functions
function setTasks(){
    var tasksList= JSON.parse(localStorage.getItem("tasksList"));
    var totalTasks = tasksList.length;
    if(tasksList==null){
        return;
    }
    else{
        tasksList.forEach((task, index)=>{
            document.querySelector(".tasks").innerHTML += `
            <span class="list-item">
                <span class="task" id="task-${index}">
                    ${task.value}
                </span>
                <button class="delete" id="${index}"><img src="res/trash-solid.svg" alt="" srcset="" height="20px"></button>
            </span>
        `;
        });

        tasksList.forEach((task, index)=>{
            if(task.status=="C"){
                document.getElementById(`task-${index}`).classList.toggle("completed");
            }
        });
    }
    //Adding event listeners to the added tasks. 
    var tasks=document.querySelectorAll(".task");
    tasks.forEach((task,index)=>{
        task.addEventListener('click',toggleTask);
    });

    var tasks=document.querySelectorAll(".delete");
    tasks.forEach((task,index)=>{
        task.addEventListener('click',removeTask);
    });
}

function addTask(){
    //Checking for blank value.
    var task={
        value:" ",
        status:" "
    };
    task.value = document.getElementById("new-task-text-field").value;
    if(task.value.length == 0){
        alert("Blank Task !\nPlease Enter a Task")
    }

    //Appending innerHTML of div (class=tasks).
    else{
        //Adding tasks to local storage.
        totalTasks = tasksList.push(task);
        localStorage.setItem("tasksList",JSON.stringify(tasksList));
        
        //Adding task to the html, with Unique IDs.
        document.querySelector(".tasks").innerHTML="";
        setTasks();
    }

    document.getElementById("new-task-text-field").value="";
}

function removeTask(){
    //Removing HTML Elements.
    this.parentNode.remove();

    //Getting the current task list in array and removing the selected element from it.
    var updatedTaskList = JSON.parse(localStorage.getItem("tasksList"));
    updatedTaskList.splice(this.id,1);

    //Updating local storage with the new updated list.
    localStorage.setItem("tasksList",JSON.stringify(updatedTaskList));
    
    //Updating local variables.
    tasksList=updatedTaskList;
    totalTasks--;
    
    //Calling setTasks() to setting the updated list.
    document.querySelector(".tasks").innerHTML="";
    setTasks();
}

function toggleTask(){
    this.classList.toggle("completed");
    
    //Getting the Id of the Task clicked on (It will be in the form task-n [n=0,1,2...n]).
    var fullId = this.id;
    
    //Using the slice(-1) function to1 get the last character of the id.
    var id = fullId.slice(-1);
      
    //Getting the current task list in array and setting the status value of selected element.
    var updatedTaskList = JSON.parse(localStorage.getItem("tasksList"));
    
    //Looping through all the entries to find whose value to toggle.
    updatedTaskList.forEach((task,index)=>{
        if(index==id){
            console.log(task.value);
            if(task.status=="C"){
                task.status=" ";
            }
            else if(task.status==" "){
                task.status="C";
            }  
        }
    });

    //Updating local storage with the new updated list.
    localStorage.setItem("tasksList",JSON.stringify(updatedTaskList));
}