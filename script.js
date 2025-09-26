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

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let randomizedQuestions = [];

// Start the quiz
randomizedQuestions.forEach((q, index) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <p>Q${index + 1}: ${q.question}</p>
    <input type="text" id="answer-${index}" placeholder="Your answer">
    <span id="feedback-${index}"></span>
  `;
  quizContainer.appendChild(div);
});

// ✅ only once after all questions are rendered
document.getElementById("submit-btn").style.display = "block";


// Check answers
function checkAnswers() {
  randomizedQuestions.forEach((q, index) => {
    const userAnswer = document.getElementById(`answer-${index}`).value.trim();
    const feedback = document.getElementById(`feedback-${index}`);

    if (userAnswer.toLowerCase() === q.answer.toLowerCase()) {
      feedback.textContent = " ✅ Correct!";
      feedback.style.color = "green";
    } else {
      feedback.textContent = ` ❌ Incorrect (Answer: ${q.answer})`;
      feedback.style.color = "red";
    }
  });
}

// Event listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("submit-btn").addEventListener("click", checkAnswers);

}
