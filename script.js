// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let randomizedQuestions = [];

// Start quiz
function startQuiz() {
  randomizedQuestions = shuffle([...questions]); // copy + shuffle
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";

  randomizedQuestions.forEach((q, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>Q${index + 1}: ${q.question}</p>
      <input type="text" id="answer-${index}" placeholder="Your answer">
      <span id="feedback-${index}"></span>
    `;
    quizContainer.appendChild(div);
  });

  // Show submit button
  document.getElementById("submit-btn").style.display = "block";
}

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