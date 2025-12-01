import { Client, TablesDB, ID } from "appwrite";



const client = new Client()
    .setProject("692d1fd2001bfcf9de42")
    .setEndpoint("https://sgp.cloud.appwrite.io/v1")

const tablesDB = new TablesDB(client);

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
let isTodoListEmpty = true;

const BASE_URL = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", loadTodos)

async function loadTodos() {
    const tasksData = await tablesDB.listRows({
        databaseId: '692d3e9e0007fc22d43d',
        tableId: 'tasks'
    });
    console.log(tasksData)
    renderTodos(tasksData.rows)
}

todoForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Form is submitted!")

    const newTaskText = todoInput.value.trim(); // Assigning the value of input to variable "newTaskText"

    if (newTaskText === "") {
        alert("Please enter a task!")
        return;
    }

    const newTaskResult = await tablesDB.createRow({
        databaseId: '692d3e9e0007fc22d43d',
        tableId: 'tasks',
        rowId: ID.unique(),
        data: {
            "taskText": newTaskText,
            "isTaskDone": false
        }
    });

    console.log(newTaskResult);



    const newListItem = createListItem(newTaskResult);

    if (isTodoListEmpty) {
        todoList.innerHTML = "";
        isTodoListEmpty = false;
    }

    todoList.prepend(newListItem); // <ul></ul>
    todoInput.value = "";
})


async function deleteTask($idToBeDeleted) {
    console.log(`Deleting the task with ${$idToBeDeleted}`)
    const response = await fetch(`${BASE_URL}/api/v1/todos/${$idToBeDeleted}`, {
        method: "DELETE"
    })
    if (!response.ok) {
        alert("Pass the valid fetch url to delete")
    }
    const data = await response.json();
    console.log(data);
    if (data.success) {
        const listItemToBeRemoved = document.getElementById($idToBeDeleted);
        listItemToBeRemoved.remove();
        const listItems = document.querySelectorAll(".taskContainer")
        // console.log(listItems);
        if (!listItems.length) {
            console.log("TodoList is Empty!")
            todoList.innerHTML = "<p>No todos. Please add some tasks.</p>"
        }
    }
}

async function toggleTask($idTobeToggled) {
    const response = await fetch(`${BASE_URL}/api/v1/todos/toggle/${$idTobeToggled}`, {
        method: "PATCH"
    });
    if (!response.ok) {
        alert("Pass the valid fetch url to toggle patch")
    }
    const data = await response.json();
    console.log(data);
}

function createListItem(taskObject) {
    const newListItem = document.createElement("li"); // <li></li>
    newListItem.setAttribute("class", "taskContainer")
    newListItem.setAttribute("id", taskObject.$id)


    const isTaskDoneCheckBox = document.createElement('input');
    isTaskDoneCheckBox.setAttribute("type", "checkbox")

    isTaskDoneCheckBox.addEventListener("change", () => toggleTask(taskObject.$id))

    console.log(isTaskDoneCheckBox.checked)
    isTaskDoneCheckBox.checked = taskObject.isTaskDone;

    // isTaskDoneCheckBox.checked -> true/ false


    const p = document.createElement('p');
    p.setAttribute("id", "taskContent")

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskObject.taskText;

    const $createdAtSpan = document.createElement('span');
    $createdAtSpan.textContent = taskObject.$createdAt;
    console.log(taskObject.$createdAt)

    p.appendChild(taskTextSpan)
    p.appendChild($createdAtSpan)

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute("id", "taskDeleteBtn")
    deleteBtn.textContent = "X"

    deleteBtn.addEventListener("click", () => deleteTask(taskObject.$id))

    newListItem.appendChild(isTaskDoneCheckBox);
    newListItem.appendChild(p);
    newListItem.appendChild(deleteBtn);

    return newListItem;  //<li>Go to Market</li>
}

function renderTodos(todos) {
    todoList.innerHTML = "";

    // I am rendering the UI for the Empty State / Data from the server.
    if (!todos.length) {
        todoList.innerHTML = "<p>No todos found. Please add some tasks.</p>"
        return;
    }

    isTodoListEmpty = false;
    todos.map((todo) => {
        const newListItem = createListItem(todo)
        todoList.prepend(newListItem) // <ul><li>Go to School</li> <li>Go to Market</li> </ul>
    })
}