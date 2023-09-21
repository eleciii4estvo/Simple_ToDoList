const input = document.getElementById('input')
const addBtn = document.getElementById('addTask')
const taskEl = document.getElementById('list')
// const tasks = ['1 Task', '2 Task']
const tasks=[{
    title: 'Task 1',
    completed: false,
    },
        {
    title: 'Task 2',
    completed: true,
    }
]

taskEl.onclick = function(event){                           //event в аргументе означает что мы отслеживаем нажатия
    console.log(event.target.dataset)                       //отслеживаем на что пользователь нажал, если он попал на кнопки, выведится их
                                                            //data-index & data-type которые мы задавали в функции AddTask
 
    if (event.target.dataset.index){                        //проверяем, есть ли что то в поле index   
        const index = Number(event.target.dataset.index)    //так как мы получаем этот индекс (в случае если он есть) он является строкой,
        const type = event.target.dataset.type              //поэтому перетипизируем в число
        if (type === 'sucsess'){                            //если тип == значению data type sucsess, мы меняем значение completed на противоположное
            tasks[index].completed =!tasks[index].completed
        } else if (type === 'delete'){
            tasks.splice(index, 1)                          //удаление элемента, где splice(индекс элемента, количество элементов)
        }
        loadTasks(tasks)
    }                                                                            
}

function AddTask(val, index){
    taskEl.insertAdjacentHTML(
        'beforeend',                                        //способ добавления шаблона
        `
        <li>
            <div class="${val.completed ? 'buttons_task_suc': 'task-box'}" >                
                <span>${val.title}</span>
                <span class="buttons_task">
                    <button class="chek_button"><i class="${val.completed ? '':'fa-solid fa-check'}" style="color: #00fa9a;" data-index="${index}" data-type='sucsess'></i></button>
                    <button class="chek_button"><i class="fa-solid fa-xmark" style="color: #e03131;" data-index="${index}" data-type='delete'></i></button>
                </span>
            </div>
        </li>
    `
    )                                       //проверяем, что если class="${val.completed ? 'buttons_task_suc': 'task-box'}" 
                                            //значение val.completed(оно у нас булевое) верно, тогда задаем другой класс плашке, иначе оставляем текущий
}                                           //также в кнопки передаем data-index, которое получаем вторым аргументом из функции loadTasks(),
                                            //а также data-type в которое задаем произвольные значения для понимания что это за кнопка

function loadTasks(arr){
    taskEl.innerHTML=''                         //стриаем все задачи выведенные на экран
    if(tasks.length==0){
        taskEl.innerHTML='<p>Your tasks will be added here</p>'         //если массив с задачами пуст, выведится эта надпись
    }
    for (let i=0; i<arr.length; i++){
        AddTask(arr[i], i);                     //перебираем все элементы массива и передаем соотвтсвующие значения в функцию вывода на экран
    }
}

loadTasks(tasks)

addBtn.onclick = function(){

    if (input.value==''){            //если поле ввода пустое, функция просто скипнется
        return
    } else{
        const newTask={
            title: input.value,     //считываем значение поле input и присваем его ключу title
            completed: false,       //дефолтное значение
        }
        tasks.push(newTask)         //добавляем задачу в конец массива
        loadTasks(tasks)            //Вызываем функцию вывода массива на экран
    }
    input.value=''
}

