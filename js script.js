/* =========================
   DATA SOAL
========================= */

const questions = [

    // LEVEL 1
    [
        {
            question: "Which word means 'rumah'?",
            emoji: "🏠",
            answers: [
                "House",
                "School",
                "Market",
                "Garden"
            ],
            correct: 0
        },

        {
            question: "Which one is a color?",
            emoji: "🎨",
            answers: [
                "Blue",
                "Chair",
                "Tiger",
                "Bread"
            ],
            correct: 0
        },

        {
            question: "Which word means 'buku'?",
            emoji: "📖",
            answers: [
                "Book",
                "Bag",
                "Door",
                "Table"
            ],
            correct: 0
        }
    ],


    // LEVEL 2
    [
        {
            question: "Which animal says 'meow'?",
            emoji: "🐱",
            answers: [
                "Dog",
                "Cat",
                "Cow",
                "Lion"
            ],
            correct: 1
        },

        {
            question: "Who is the king of the jungle?",
            emoji: "🦁",
            answers: [
                "Lion",
                "Rabbit",
                "Fish",
                "Horse"
            ],
            correct: 0
        },

        {
            question: "Which animal can fly?",
            emoji: "🪽",
            answers: [
                "Bird",
                "Tiger",
                "Elephant",
                "Cow"
            ],
            correct: 0
        }
    ],


    // LEVEL 3
    [
        {
            question: "Which one is an apple?",
            emoji: "🍎",
            answers: [
                "Apple",
                "Car",
                "Cat",
                "Book"
            ],
            correct: 0
        },

        {
            question: "Which fruit is yellow and long?",
            emoji: "🍌",
            answers: [
                "Orange",
                "Banana",
                "Grape",
                "Watermelon"
            ],
            correct: 1
        },

        {
            question: "Which fruit is orange?",
            emoji: "🍊",
            answers: [
                "Orange",
                "Pear",
                "Kiwi",
                "Mango"
            ],
            correct: 0
        }
    ],


    // LEVEL 4
    [
        {
            question: "Which vehicle has two wheels?",
            emoji: "🏍️",
            answers: [
                "Motorcycle",
                "Bus",
                "Train",
                "Boat"
            ],
            correct: 0
        },

        {
            question: "Which vehicle travels on rails?",
            emoji: "🚆",
            answers: [
                "Train",
                "Car",
                "Plane",
                "Bicycle"
            ],
            correct: 0
        },

        {
            question: "Which vehicle flies?",
            emoji: "✈️",
            answers: [
                "Airplane",
                "Bus",
                "Ship",
                "Taxi"
            ],
            correct: 0
        }
    ]

];


const levelNames = [
    "VOCABULARY",
    "ANIMALS",
    "FRUITS",
    "VEHICLES"
];


/* =========================
   VARIABLE GAME
========================= */

let currentLevel = 0;

let currentQuestion = 0;

let score = 0;

let totalXP =
    Number(
        localStorage.getItem("inglistXP") || 0
    );


/* =========================
   GANTI HALAMAN
========================= */

function showPage(id) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    document
        .getElementById(id)
        .classList.add("active");
}


/* =========================
   MULAI GAME
========================= */

function startGame() {

    const input =
        document.getElementById(
            "playerInput"
        );


    const name =
        input.value.trim();


    const message =
        document.getElementById(
            "nameMessage"
        );


    if (name === "") {

        message.textContent =
            "⚠️ Masukkan nama kamu terlebih dahulu!";

        input.focus();

        return;
    }


    // Simpan nama

    localStorage.setItem(
        "inglistPlayer",
        name
    );


    // Tampilkan nama

    document
        .getElementById("playerName")
        .textContent = name;


    document
        .getElementById("welcomeName")
        .textContent =
        name.toUpperCase();


    // Tampilkan XP

    document
        .getElementById("xp")
        .textContent =
        totalXP;


    // Masuk game

    showPage("gamePage");
}


/* =========================
   MULAI QUIZ
========================= */

function startQuiz(level) {

    currentLevel = level;

    currentQuestion = 0;

    score = 0;


    document
        .getElementById("levelTitle")
        .textContent =
        levelNames[level];


    showPage("quizPage");


    renderQuestion();
}


/* =========================
   TAMPILKAN SOAL
========================= */

function renderQuestion() {

    const data =
        questions[currentLevel]
        [currentQuestion];


    document
        .getElementById("questionEmoji")
        .textContent =
        data.emoji;


    document
        .getElementById("questionText")
        .textContent =
        data.question;


    document
        .getElementById("quizScore")
        .textContent =
        score;


    // Progress

    const progress =
        (
            (currentQuestion + 1) /
            questions[currentLevel].length
        ) * 100;


    document
        .getElementById("progressBar")
        .style.width =
        progress + "%";


    // Jawaban

    const answers =
        document
        .getElementById("answers");


    answers.innerHTML = "";


    data.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer";


            button.textContent =
                String.fromCharCode(
                    65 + index
                )
                + ". "
                + answer;


            button.onclick =
                () => checkAnswer(
                    index,
                    button
                );


            answers.appendChild(
                button
            );

        }
    );
}


/* =========================
   CEK JAWABAN
========================= */

function checkAnswer(
    selected,
    clickedButton
) {

    const data =
        questions[currentLevel]
        [currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".answer"
        );


    // Matikan tombol

    buttons.forEach(button => {

        button.disabled = true;

    });


    // Jawaban benar

    if (
        selected === data.correct
    ) {

        clickedButton
            .classList
            .add("correct");


        score += 100;

    }


    // Jawaban salah

    else {

        clickedButton
            .classList
            .add("wrong");


        buttons[data.correct]
            .classList
            .add("correct");

    }


    document
        .getElementById("quizScore")
        .textContent =
        score;


    // Soal berikutnya

    setTimeout(() => {

        currentQuestion++;


        if (
            currentQuestion <
            questions[currentLevel].length
        ) {

            renderQuestion();

        }

        else {

            finishLevel();

        }

    }, 800);
}


/* =========================
   SELESAI LEVEL
========================= */

function finishLevel() {

    totalXP += score;


    localStorage.setItem(
        "inglistXP",
        totalXP
    );


    document
        .getElementById("finalScore")
        .textContent =
        score;


    showPage("resultPage");
}


/* =========================
   KEMBALI KE MAP
========================= */

function backToGame() {

    document
        .getElementById("xp")
        .textContent =
        totalXP;


    showPage("gamePage");
}


/* =========================
   LOAD NAMA PEMAIN
========================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const savedName =
            localStorage.getItem(
                "inglistPlayer"
            );


        if (savedName) {

            document
                .getElementById(
                    "playerInput"
                )
                .value =
                savedName;

        }

    }
);




