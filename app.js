var IncompleteIDNo = 0;
var CompleteIDNo = 0;
var CompleteTasks = JSON.parse(localStorage.getItem('complete')) || [];
var IncompleteTasks = JSON.parse(localStorage.getItem('incomplete')) || [];
var timestamp = new Date().toLocaleString();

function AddToLocalStorage(){
    localStorage.setItem('complete', JSON.stringify(CompleteTasks));
    localStorage.setItem('incomplete', JSON.stringify(IncompleteTasks));
    loading();
}

function loading(){
    var completeDom = document.querySelector('.complete');
    var incompleteDom = document.querySelector('.incomplete');
    var completeDomContent = '';
    var incompleteDomContent = '';
    var completeData = JSON.parse(localStorage.getItem('complete'));
    var incompleteData = JSON.parse(localStorage.getItem('incomplete'));
    if(completeData.length>0){
        document.querySelector('.clear-all').style.display = 'block';
        completeData.map(function(value){
            completeDomContent += 
            `
              <div class="content">
                <div>
                    <h5>${value.time}</h5>
                </div>
                <p>${value.task}</p>
                <div class="buttons">
                    <button class="button1" onclick= "deleteFromCompleted(${value.id})">Delete</button>
                    <button class="button2" onclick = "retrieveFromCompleted(${value.id})">Retrieve</button>
                </div>
             </div>

            `
        });
        completeDom.innerHTML = completeDomContent;
    }
    else{
        document.querySelector('.clear-all').style.display ='none';
        completeDom.innerHTML = '';
    }

    if(incompleteData.length>0){
        incompleteData.map(function(value){
            incompleteDomContent += 
            `
            <div class="content">
                <div>
                    <h5>${value.time}</h5>
                </div>
                <p>${value.task}</p>
                <div class="buttons">
                    <button class="button1" onclick="createCompletedTask(${value.id})">Complete</button>
                    <button class="button2" onclick = "EditTask(${value.id})">Edit</button>
                    <button class="button3" onclick = "deleteIncompleteTask(${value.id})">Delete</button>
                </div>
            </div>
            `
        });
        incompleteDom.innerHTML = incompleteDomContent;
    }
    else{
        incompleteDom.innerHTML = '';
    }
}

document.querySelector('.input-todo').addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault()
        createTask();
    }
});

document.querySelector('.edit-content').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        event.preventDefault()
        updateTask();
    }
})

function createTask(){
    var inputForm = document.querySelector('.input-todo').value;
    if(inputForm===''){
        warning();
    }
    else{
        var newtask = {id:IncompleteIDNo+=1, task: inputForm, time:timestamp};
        IncompleteTasks.push(newtask);
        document.querySelector('.input-todo').value = ''
        AddToLocalStorage();
    }
}

function deleteIncompleteTask(id){
    IncompleteTasks = IncompleteTasks.filter(rec => rec.id !== id);
    AddToLocalStorage();
}


function createCompletedTask(id){
    var completed = IncompleteTasks.find(rec =>rec.id===id);
    var newCompletedTask = {id:CompleteIDNo+=1, task:completed.task, time:timestamp};
    CompleteTasks.push(newCompletedTask);
    IncompleteTasks = IncompleteTasks.filter(rec=>rec.id !==id);
    AddToLocalStorage();
}

function EditTask(id){
    document.querySelector('.edit-section').style.display = 'flex';
    var edit = IncompleteTasks.find(rec=>rec.id===id);
    document.querySelector('.Task-id').value = edit.id;
    document.querySelector('.edit-content').value = edit.task;
}

function updateTask(){
    var id = parseInt(document.querySelector('.Task-id').value);
    var taskT = document.querySelector('.edit-content').value;
    var index = IncompleteTasks.findIndex(rec=>rec.id === id);
    IncompleteTasks[index] = {id:id, task:taskT, time:timestamp};
    AddToLocalStorage();
    document.querySelector('.edit-section').style.display = 'none';
}

function deleteFromCompleted(id){
    CompleteTasks = CompleteTasks.filter(rec=>rec.id!==id);
    AddToLocalStorage();
}

function retrieveFromCompleted(id){
    var retrieve = CompleteTasks.find(rec=>rec.id ===id);
    var newretrievedTask = {id:retrieve.id, task: retrieve.task, time:timestamp}
    IncompleteTasks.push(newretrievedTask);
    CompleteTasks = CompleteTasks.filter(rec=>rec.id !==id);
    AddToLocalStorage();
}

function clearAllcompleteTasks(){
    localStorage.removeItem('complete');
    CompleteTasks = [];
    AddToLocalStorage()
}

function warning(){
    document.querySelector('.warning').classList.add('warningAnimation');
    setTimeout(() => {
        document.querySelector('.warning').classList.remove('warningAnimation');
    }, 3000);
}