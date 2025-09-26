let questions = [];
let currentQuestionIndex = 0;

function loadQuizData(jsonPath) {
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            questions = data;
            loadQuestion();
        })
        .catch(error => {
            console.error("Error loading quiz data:", error);
            document.getElementById("question").textContent = "Failed to load quiz.";
        });
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById("question").textContent = q.question;
    document.getElementById("answer").value = "";
    document.getElementById("feedback").textContent = "";
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const correct = questions[currentQuestionIndex].answer;

    if (userAnswer === correct) {
        document.getElementById("feedback").textContent = "✅ Correct!";
        document.getElementById("feedback").style.color = "green";
    } else {
        document.getElementById("feedback").textContent = `❌ Incorrect. The correct answer is: ${correct}`;
        document.getElementById("feedback").style.color = "red";
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            document.getElementById("question").textContent = "Quiz complete!";
            document.getElementById("answer").style.display = "none";
            document.querySelector("button").style.display = "none";
        }
    }, 2000);

// Fisher–Yates shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // pick a random index
    [array[i], array[j]] = [array[j], array[i]];   // swap elements
  }
  return array;
}

// Shuffle the questions before using them
let randomizedQuestions = shuffle(questions);

// Example of showing the questions in random order
randomizedQuestions.forEach((q, index) => {
  console.log(`Q${index + 1}: ${q.question}`);
});
}
