let question;
let form;
let res;
let qno;
let score;

// answer : 'n - 1' - правильный ответ (то есть если 1 вариант правильный пишешь '0')

const questions = [
    {
        title : 'Какой казачий чин относится к современному званию старшего лейтенанта Российской армии?',
        options : [
            'Хорунжий', // 0
            'Подъесаул', // 1
            'Сотник', // 2
            'Военный старшина'  // 3
        ],
        answer : '2',
        score : 1
    },
    {
        title : 'В чем отличие офицерской шашки от солдатской',
        options : [
            'Офицерская легче', 
            'Офицерская длиннее', 
            'Офицерскую можно окрашивать', 
            'Отличий нет'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'Излюбленное оружие казаков',
        options : [
            'Сабля', 
            'Дубинка', 
            'Арбалет', 
            'Охотничий нож'
        ],
        answer : '0',
        score : 1
    },
    {
        title : 'Пластуны - это',
        options : [
            'Этнословная группа русских, украинцев и беларусов', 
            'Казачья пешая разведовательно-сторожевая воинская часть', 
            'Военно-служащие сухопутных войск, относящиеся к составу основных боевых сил на земле',
            'Казачье упражнения для развития мускулатуры'      
        ],
        answer : '1',
        score : 1
    },
    {
        title : 'Как называется казачий рукопашный бой?',
        options : [
            'Казачий удар', 
            'Казачий приклад', 
            'Казачий вынос', 
            'Казачье искусство'
        ],
        answer : '1',
        score : 1
    }
    
];

function restartScreen() {
    document.querySelector('.quiz-heading').innerHTML = `Счёт: ${score}`
    const card = document.querySelector('.question-card');
    card.innerHTML = "<ul>";
    questions.forEach((ques) => {
        const html = `
        <li>${ques.title} <div class="answer-label">${ques.options[ques.answer]}</div></li>
        `;
        card.innerHTML += html;
    });
    card.innerHTML += "</ul>";
    document.querySelector('.answer-key').style.display ='block';
    document.querySelector('button').style.display ='block';
}

function resetradio() {
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.removeAttribute("disabled");
    });
    res.setAttribute("class","idle");
    res.innerHTML = "Пусто";
}

function evaluate() {
    if(form.op.value == questions[qno].answer) {
        res.setAttribute("class","correct");
        res.innerHTML = "Верно";
        score += questions[qno].score;

    } 
    else {
        res.setAttribute("class","incorrect");
        res.innerHTML = "Не верно";
    }
    document.querySelectorAll('[type="radio"]').forEach((radio) => {
        radio.setAttribute("disabled","");
    })
}

function getNextQuestion() {
    qno++;
    ques = questions[qno];
    question.innerHTML = ques.title;
    const labels = document.querySelectorAll('label');
    labels.forEach((label, idx) => {
        label.innerHTML = ques.options[idx];
    }); 
}

function handleSubmit(e) {
    e.preventDefault();
    if(!form.op.value) {
        alert('Пожалуйста выберите вариант ответа!');
    }
    else if(form.submit.classList.contains('submit')) {
        evaluate();
        form.submit.classList.remove('submit');
        form.submit.value = "Дальше"
        form.submit.classList.add('next');
    }
    else if(qno < questions.length - 1 && form.submit.classList.contains('next')) {
        getNextQuestion();
        resetradio();
        form.submit.classList.remove('next');
        form.submit.value = "Отправить"
        form.submit.classList.add('submit');
        form.reset();
    }
    else if(form.submit.classList.contains('next')) {
        restartScreen();
        form.submit.classList.remove('next');
        form.submit.value = "Отправить"
        form.submit.classList.add('submit');
        form.reset();
    }
}
function init() {
    document.body.innerHTML = `
        <h1 class="quiz-heading">Название теста</h1>
        <div class="app-body">
            <h1 class="answer-key">Правильные ответы</h1>
            <div class="question-card">
                <h2 id='question'>Вопросы</h2>
                <form>
                    <input type="radio" id="op1" name="op" value="0">
                    <label for="op1">op1</label><br>
                    <input type="radio" id="op2" name="op" value="1">
                    <label for="op2">op2</label><br>
                    <input type="radio" id="op3" name="op" value="2">
                    <label for="op3">op3</label><br>
                    <input type="radio" id="op4" name="op" value="3">
                    <label for="op4">op4</label><br>
                    <div id = "res" class="idle">Пусто</div><br>
                    <input type="submit" name="submit" value = 'Отправить' class = "submit"/>
                </form>
            </div>
            <button>Начать заново</button>
        </div>
    `;
   question = document.querySelector('#question');
   form = document.querySelector('form');
   res = document.querySelector('#res');
   qno = -1;
   score = 0;
   form.addEventListener('submit', handleSubmit);
   document.querySelector('button').addEventListener('click', init);
   getNextQuestion();
}
document.querySelector('button').addEventListener('click', init);
init();


