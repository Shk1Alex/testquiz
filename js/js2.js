// Данные викторины
const quizData = [
    {
        question: "Как зовут этого персонажа", 
        a: "Rush",
        b: "Ambush",
        c: "SEEK",
        correct: "a",
    },
    {
        question: "Какое достижение самое редкое?",
        a: "A-1000",
        b: "Hotel Hell",
        c: "see you soon",
        correct: "b",
    },
    {
        question: "Кто из этих монстров самый сложный?", 
        a: "",
        b: "",
        c: "",
        correct: "a",
    },
    {
        question: "Сколько монстров в Doors можно изгнать и получить за это достижение?",
        a: "11",
        b: "12",
        c: "13",
        correct: "b",
    },
    {
        question: "какое описание у достижения 'На самом дне'?",
        a: "пройти The Hotel",
        b: "пройти The Mines",
        c: "пройти Backdoor",
        correct: "a",
    },
    {
        question: "сколько надо конфет что-бы пройти ивент 'Sugar Crash'?",
        a: "500",
        b: "100",
        c: "1000",
        correct: "a",
    },
    {
        question: "что делает модификатор 'Faster-Faster-Faster'?",
        a: "ускоряет",
        b: "замедляет",
        c: "спавнит предметы",
        d: "хз:(",
        correct: "a",
    },
    {
        question: "как получить достижение 'Технический эксперт'?",
        a: "пройти пазл на 100-ой двери",
        b: "пройти пазл на 100-ой двери за 1 минуту",
        c: "пройти Отель",
        correct: "b",
    },
    {
        question: "что такое'Разлом'?",
        a: "трещина между играми",
        b: "просто трещина",
        c: "трещина отправляющяя любой ваш предмет который вы положите в другую игру",
        correct: "c",
    },
];

// DOM Элементы
const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const submit = document.getElementById('submit');
const usernameInput = document.getElementById('usernameInput');
const usernameContainer = document.getElementById('usernameContainer');
const startQuizButton = document.getElementById('startQuiz');
const usernameWarning = document.getElementById('usernameWarning');

let currentQuiz = 0;
let score = 0;
let username = '';

// Загружаем викторину
function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;

    const questionImage = document.getElementById('questionImage');
    const imageContainer = document.getElementById('imageContainer');

    // Проверка: если текущий вопрос третий, подставляем изображения в радиоэлементы
    if (currentQuiz === 2) {
        questionImage.style.display = "none"; // Скрываем изображение для других вопросов
        imageContainer.style.display = "block"; // Показываем контейнер с изображениями

        // Устанавливаем изображения для каждого радиоэлемента
        a_text.innerHTML = `<img src="images/rush.jpg" alt="Option A" class="option-image">`;
        b_text.innerHTML = `<img src="images/halt.jfif" alt="Option B" class="option-image">`;
        c_text.innerHTML = `<img src="images/ambush.webp" alt="Option C" class="option-image">`;
    } else {
        // Если вопрос не третий, отображаем текстовые ответы
        a_text.innerText = currentQuizData.a;
        b_text.innerText = currentQuizData.b;
        c_text.innerText = currentQuizData.c;

        // Скрываем изображение для всех вопросов, кроме первого
        questionImage.style.display = currentQuiz === 0 ? "block" : "none";
        imageContainer.style.display = "none"; // Скрываем контейнер изображений
    }
}

// Снятие выбора предыдущих ответов
function deselectAnswers() {
    answerElements.forEach(answerEl => answerEl.checked = false);
}

// Получить выбранный ответ
function getSelected() {
    let answer;
    answerElements.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

// Начать викторину с ввода имени
startQuizButton.addEventListener('click', () => {
    const usernameValue = usernameInput.value.trim();
    
    // Регулярное выражение для проверки имени
    const nameRegex = /^[A-Za-zА-Яа-яЁё]{1,15}$/;

    if (nameRegex.test(usernameValue)) {
        username = usernameValue; // Сохраняем имя пользователя
        usernameContainer.style.display = 'none'; // Скрываем поле ввода
        loadQuiz(); // Загружаем викторину
    } else {
        usernameWarning.style.display = 'block'; // Показываем предупреждение
    }
});

// Отправка ответов и переход по вопросам
submit.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>${username}, ты верно ответил на ${score}/${quizData.length} вопросов</h2>
            <button onclick="location.reload()">Пройти снова</button>`;
        }
    }
});

// Загружаем викторину в первый раз
loadQuiz();
