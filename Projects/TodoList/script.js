const todoList=JSON.parse(localStorage.getItem('todoList'))||[];

renderTodoList(todoList);

function addTodo(){
 
  if (document.querySelector('.input-js').value
   && document.querySelector('.js-date').value){


    document.querySelector('.enterRequiredFields-js').innerHTML='';

    todoList.push({
      name:document.querySelector('.input-js').value,
      dueDate: document.querySelector('.js-date').value
    });

    localStorage.setItem('todoList',JSON.stringify(todoList));
    renderTodoList(todoList);
  }else{
    document.querySelector('.enterRequiredFields-js').innerHTML='Please enter all required fields';
  }
}

function renderTodoList(todoList){
  let todoListHTML='';
  for (let i = 0; i<todoList.length;i++){
    const todo=todoList[i];
    const html=`
    <div class="content">${todo.name}</div>
    <div class="content">${todo.dueDate}</div>
    <button onclick="
      todoList.splice(${i},1);
      localStorage.setItem('todoList',JSON.stringify(todoList));
      renderTodoList(todoList);
      " class="delete-todo-button">
    Delete
    </button>
    
    `;
    todoListHTML+=html;
  }
  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
}

function checkKey(key){
  if (key==='Enter'){
    addTodo();
  }
}
