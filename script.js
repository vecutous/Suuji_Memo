let questions = [];            
let randomizedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Shuffle function (Fisher–Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Load questions from JSON before quiz starts
function loadQuestions() {
  return fetch("questions.json")
    .then(response => response.json())
    .then(data => {
      questions = data;
    })
    .catch(err => {
      console.error("Error loading questions:", err);
      document.getElementById("question").textContent = "⚠️ Failed to load quiz.";
    });
}

function startQuiz() {
  if (questions.length === 0) {
    loadQuestions().then(() => {
      beginQuiz();
    });
  } else {
    beginQuiz();
  }
}

function beginQuiz() {
  randomizedQuestions = shuffle([...questions]);
  currentQuestionIndex = 0;
  score = 0; // reset score

  document.getElementById("answer").style.display = "inline-block";
  document.getElementById("submit-btn").style.display = "inline-block";
  document.getElementById("restart-btn").style.display = "none";

  loadQuestion();
}

function loadQuestion() {
  const q = randomizedQuestions[currentQuestionIndex];
  document.getElementById("question").textContent = q.question;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").textContent = "";
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer").value.trim();
  const correct = randomizedQuestions[currentQuestionIndex].answer;

  if (userAnswer.toLowerCase() === correct.toLowerCase()) {
    document.getElementById("feedback").textContent = "✅ Correct!";
    document.getElementById("feedback").style.color = "green";
    score++; // add to score
  } else {
    document.getElementById("feedback").textContent =
      `❌ Incorrect. The correct answer is: ${correct}`;
    document.getElementById("feedback").style.color = "red";
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < randomizedQuestions.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }, 1500);
}

function endQuiz() {
  const total = randomizedQuestions.length;
  document.getElementById("question").textContent = "🎉 Quiz complete!";
  document.getElementById("answer").style.display = "none";
  document.getElementById("submit-btn").style.display = "none";
  document.getElementById("feedback").textContent = `Your score: ${score}/${total}`;
  document.getElementById("feedback").style.color = "blue";
  document.getElementById("restart-btn").style.display = "inline-block";
}

// Event listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("submit-btn").addEventListener("click", checkAnswer);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
