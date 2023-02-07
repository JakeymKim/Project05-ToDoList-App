let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let tabsMode = "all";
let underLine = document.getElementById("under-line");

addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", function(){taskInput.value=""});
taskInput.addEventListener("keypress",function(event) {
    if(event.key === "Enter") {
        event.preventDefault();
        document.getElementById("add-button").click();
        taskInput.value="";
    }
});

for(let i=0; i<tabs.length; i++) {
    tabs[i].addEventListener("click", function(event){filter(event)});
}

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    taskInput.value = "";
    render();
}

function render() {
    let list = [];
    if(tabsMode == "all") {
        list = taskList;
    } else {
        list = filterList;
    }

    let resultHTML = "";
    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += 
            `<div class="task task-done">
                <span>${list[i].taskContent}</span>
                <div class="task-button-box">
                    <button onclick="toggleComplete('${list[i].id}')" class="task-button"><i class="fa-solid fa-arrow-rotate-right"></i></button>
                    <button onclick="deleteTask('${list[i].id}')" class="task-button"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`;
        } else {
            resultHTML += 
            `<div class="task">
                <span>${list[i].taskContent}</span>
                <div class="task-button-box">
                    <button onclick="toggleComplete('${list[i].id}')" class="task-button"><i class="fa-solid fa-check"></i></button>
                    <button onclick="deleteTask('${list[i].id}')" class="task-button"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteTask(id) {
    for(let i=0; i<taskList.length; i++) {
        if(taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    filter();
}

function filter(event) {
    if(event) {
        tabsMode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }

    filterList = [];
    if(tabsMode == "ongoing") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
    } else if(tabsMode == "done") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}

function randomIDGenerate() {
    return "_" + Math.random().toString(36).substr(2, 16);
}