const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submit = document.getElementById('submit');
const usernameInput = document.getElementById('usernameInput');
const inputContainer = document.getElementById('inputContainer');

let currentQuiz = 0;
let score = 0;
let username = "";

const quizData = [
    {
        question: "Введите свое имя",
        input: true,
        correct: null,
    },
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
        correct: "c",
    },
    {
        question: "Сколько монстров в Doors можно изгнать и получить за это достижение?",
        a: "11",
        b: "12",
        c: "13",
        correct: "b",
    },
    {
        question: "Какое описание у достижения 'На самом дне'?",
        a: "пройти The Hotel",
        b: "пройти The Mines",
        c: "пройти Backdoor",
        correct: "a",
    },
    {
        question: "Сколько надо конфет, чтобы пройти ивент 'Sugar Crash'?",
        a: "500",
        b: "100",
        c: "1000",
        correct: "a",
    },
    {
        question: "Что делает модификатор 'Faster-Faster-Faster'?",
        a: "ускоряет",
        b: "замедляет",
        c: "спавнит предметы",
        correct: "a",
    },
    {
        question: "Как получить достижение 'Технический эксперт'?",
        a: "пройти пазл на 100-ой двери",
        b: "пройти пазл на 100-ой двери за 1 минуту",
        c: "пройти Отель",
        correct: "b",
    },
    {
        question: "Что такое 'Разлом'?",
        a: "трещина между играми",
        b: "просто трещина",
        c: "трещина, отправляющая любой ваш предмет, который вы положите в другую игру",
        correct: "c",
    },
];

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;

    // Получаем ссылки на изображение и контейнер
    const questionImage = document.getElementById('questionImage');
    const imageContainer = document.getElementById('imageContainer');

    // Показываем поле ввода для первого вопроса
    if (currentQuizData.input) {
        inputContainer.style.display = "flex"; // Показываем поле ввода
        document.querySelector('ul').style.display = "none"; // Скрываем варианты ответов
        return; // Выходим для вопроса с вводом
    } else {
        inputContainer.style.display = "none"; // Скрываем поле ввода
        document.querySelector('ul').style.display = "block"; // Показываем варианты ответов

        if (currentQuiz === 3) {
            document.querySelector('ul').style.display = "flex"; // Отображаем варианты ответов в flex-расположении для четвертого вопроса
        }

        // Устанавливаем текст ответов для обычных вопросов
        a_text.innerText = currentQuizData.a || "";
        b_text.innerText = currentQuizData.b || "";
        c_text.innerText = currentQuizData.c || "";
        d_text.innerText = currentQuizData.d || ""; // Убедимся, что d_text используется, если он присутствует

        // Логика для показа изображений
        if (currentQuiz === 1) { // Второй вопрос
            questionImage.style.display = "block"; // Показываем изображение для второго вопроса
            questionImage.src = "images/rush.jpg"; // Путь к изображению для второго вопроса
            imageContainer.style.display = "none"; // Скрываем контейнер с изображениями
        } else if (currentQuiz === 3) { // Четвертый вопрос
            questionImage.style.display = "none"; // Скрываем изображение для вопроса
            // Устанавливаем изображения для вариантов ответов в контейнере
            a_text.innerHTML = `<img src="images/rush.jpg" alt="Option A" class="option-image">`;
            b_text.innerHTML = `<img src="images/halt.jfif" alt="Option B" class="option-image">`;
            c_text.innerHTML = `<img src="images/ambush.webp" alt="Option C" class="option-image">`;
        } else {
            questionImage.style.display = "none"; // Скрываем изображение для всех остальных вопросов
            imageContainer.style.display = "none"; // Скрываем контейнер с изображениями
        }
    }
}

function deselectAnswers() {
    answerElements.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;

    answerElements.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function isValidUsername(username) {
    const regex = /^[A-Za-zА-Яа-яЁё]{1,15}$/; // Проверка на латинские и русские буквы, 1-15 символов
    return regex.test(username);
}

submit.addEventListener('click', () => {
    if (currentQuiz === 0) { // Если первый вопрос (ввод имени)
        username = usernameInput.value.trim(); // Удаляем пробелы с начала и конца
        if (!username || !isValidUsername(username)) { // Проверка на пустоту и правильность
            usernameInput.value = ""; // Очищаем поле ввода
            alert("Пожалуйста, введите корректное имя (только буквы латинского или русского алфавита, до 15 символов).");
            return; // Не продолжаем, если имя пустое или некорректное
        }
        currentQuiz++;
        loadQuiz();
    } else {
        const answer = getSelected();

        if (answer) {
            if (answer === quizData[currentQuiz].correct) {
                score++;
            }

            currentQuiz++;

            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                // Вычисляем процент правильных ответов, исключая первый вопрос
                const totalQuestions = quizData.length - 1; // Всего вопросов без первого
                const percentage = (score / totalQuestions) * 100; // Процент правильных ответов
                let resultMessage;

                if (percentage <= 30) {
                    resultMessage = `${username}, всё-таки ты плохо знаешь игру...`;
                } else if (percentage > 30 && percentage < 90) {
                    resultMessage = `${username}, ты молодец, но знаешь не так много...`;
                } else {
                    resultMessage = `${username}, да ты профи!`;
                }

                quiz.innerHTML = `
                    <h2 class="result">${resultMessage} Ты верно ответил на ${score}/${quizData.length - 1} вопросов</h2>
                    <button onclick="location.reload()">Пройти снова</button>
                `;
            }
        }
    }
});
