import "./style.css"

interface Todo {
    title: string;
    isCompleted: boolean;
    readonly id: string;
}

const todos: Todo[] = []

const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement;
const todoInput = document.querySelector("form > input") as HTMLInputElement;
const myForm = document.getElementById("myForm") as HTMLFormElement;


myForm.onsubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const todo: Todo = {
        title: todoInput.value,
        isCompleted: false,
        id: String(Math.random() * 1000)
    };

    todos.push(todo);
    todoInput.value = "";
    renderTodo(todos);
}

const generateTodosItem = (title: string, isCompleted: boolean, id: string) => {
    const todo: HTMLDivElement = document.createElement("div");
    todo.className = "todo";

    // CheckBox Input
    const checkBox: HTMLInputElement = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.className = "isCompleted";
    checkBox.checked = isCompleted;

    checkBox.onchange = () => {
        todos.find((item)=>{
            if(item.id === id) item.isCompleted = checkBox.checked;
        })
        para.className = checkBox.checked ? "textCut" : "";
    }

    const para: HTMLParagraphElement = document.createElement("p");
    para.innerText = title;
    para.className = isCompleted ? "textCut" : "";

    // Creating delete btn
    const btn: HTMLButtonElement = document.createElement("button");
    btn.innerText = "X";
    btn.className = "deleteBtn";
    btn.onclick = () =>{
        deleteTodo(id)
        renderTodo(todos)
    }

    //Appending all to todoItem
    todo.append(checkBox, para, btn)

    todosContainer.append(todo)


}

const deleteTodo =(id:string)=>{
const idx = todos.findIndex(item=>item.id === id)
todos.splice(idx,1)
}

const renderTodo = (todos: Todo[]) => {
    todosContainer.innerText = "";
    todos.forEach(item => {
        generateTodosItem(item.title, item.isCompleted, item.id)
    })
}

