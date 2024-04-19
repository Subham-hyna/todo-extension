// Variables
let root = document.querySelector(":root");
let container = document.querySelector(".container");
let newTaskInput = document.getElementById("new_task_input");
let taskform = document.getElementById("new_task_form");
let tasksList = document.getElementById("tasksList");
let taskBtns = document.querySelectorAll(".task_check_btn");
let themeBtn = document.querySelector(".theme_toogle_btn");

async function initial(){
    const storage = await chrome.storage.local.get(["todos"]);

    if(storage.todos?.length === 0 || storage.todos === undefined){
        return;
    }
    else{
        container.classList.remove("task_list_empty");
        storage.todos.map((todo)=>{
        addTask(todo);
        })
    }
}

taskform.addEventListener("submit", async function (e) {
    e.preventDefault();
    var newtaskInputValue = taskform.elements.new_task_input;
    if(newtaskInputValue.value === ""){
        return;
    }
    addTask(newtaskInputValue.value);
    const storage = await chrome.storage.local.get(["todos"]);
    let todos = [];

    if(storage.todos === undefined){
        todos.push(newtaskInputValue.value);
        await chrome.storage.local.set({"todos" : todos});
    }
    else{
        await chrome.storage.local.set({"todos" : [...storage.todos,newtaskInputValue.value]});
    }

    newtaskInputValue.value = "";
    container.classList.remove("task_list_empty");
});

function addTask(newTask) {

    const newTaskItem = document.createElement("li");
    newTaskItem.setAttribute("class", "task_item");

    const newCheckBtn = document.createElement("div");
    newCheckBtn.setAttribute("class", "task_check_btn");

    const newTaskBio = document.createElement("span");
    newTaskBio.setAttribute("class", "task_bio");

    newTaskBio.innerText = newTask;

    tasksList.appendChild(newTaskItem);

    newTaskItem.appendChild(newCheckBtn);

    newTaskItem.appendChild(newTaskBio);

    onTaskComplete(newCheckBtn,newTask);

}


function onTaskComplete(btns,task) {
    btns.addEventListener("click", async function (e) {
        const storage = await chrome.storage.local.get(["todos"]);
        let todos = [...storage.todos];
        console.log(task);
        todos = todos.filter((todo)=>{
            console.log("first");
            return todo !== task;
        })

        await chrome.storage.local.set({"todos" : [...todos]});

        let parents = e.target.parentElement;

        parents.classList.add("task-completed"); 

        setTimeout(() => {
            parents.remove();
        }, 400);

        if (tasksList.childNodes.length === 1) {
            setTimeout(() => {
                container.classList.add("task_list_empty");
            }, 200);
        }
    });
}

// Dark mode

themeBtn.addEventListener("click", function () {
    var darkTheme = themeBtn.classList.toggle("dark");

    if (darkTheme) {
        root.style.setProperty("--theme-transition", "1s");
        root.style.setProperty("--primary-color", "#1E1E1E");
        root.style.setProperty("--secondary-color", "#3B3B3B");
        root.style.setProperty("--text-color", "#EAEAEA");
        root.style.setProperty("--task-color", "#3B3B3B");
        root.style.setProperty("--footer-color", "#1E1E1E");
        root.style.setProperty("--theme-btn",`url('assets/Light-theme-btn.svg')`);
        root.style.setProperty("--container-bg", `url('./assets/Dark-empty.svg')`);
        root.style.setProperty("--filter", "invert()");
    } else {
        root.style.setProperty("transition", "1s");
        root.style.setProperty("--primary-color", "#F3EEEA");
        root.style.setProperty("--secondary-color", "#1e1e1e");
        root.style.setProperty("--text-color", "black");
        root.style.setProperty("--task-color", "#EBE3D5");
        root.style.setProperty("--footer-color", "#776B5D");
        root.style.setProperty( "--theme-btn",  `url('assets/Dark-theme-btn.svg')`);
        root.style.setProperty("--container-bg",`url('./assets/Light-empty.svg')`);
    }
});

initial();