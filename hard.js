let correctCount = 0;
let incorrectCount = 0;
let userAnswered = false;


function displayWelcomeMessage() {
  var username = sessionStorage.getItem('username');
  document.getElementById('welcome_text').innerHTML = 'Welcome, <strong>' + username + '</strong>!';
}

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-question');

let currentQuestionIndex = 0;

async function fetchTrivia() {
  const apiUrl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const currentQuestion = data.results[0];
        const correctans = currentQuestion.correct_answer;
  
        questionElement.textContent = currentQuestion.question;
  
        const answersList = document.getElementById('answers');
        answersList.innerHTML = ''; // Clear previous options
  
        const allAnswers = [...currentQuestion.incorrect_answers, correctans];
        allAnswers.sort(() => Math.random() - 0.5);
  
        allAnswers.forEach(answer => {
          const optionElement = document.createElement('li');
          optionElement.textContent = answer;
          optionElement.classList.add('answers_options');
          optionElement.addEventListener('click', () => checkAnswer(optionElement, currentQuestion.correct_answer, correctans));
          answersList.appendChild(optionElement);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }

function checkAnswer(selectedOptionElement, correctAnswer, correctans) {
  if (userAnswered) {
    return;
  }

  userAnswered = true;

  const options = document.querySelectorAll('.answers_options');

  options.forEach(option => {
    if (option === selectedOptionElement) {
      if (option.textContent === correctAnswer) {
        option.classList.add('correct');
        correctCount++;
      } else {
        option.classList.add('incorrect');
        incorrectCount++;
      }
    } else {
      option.classList.add('disabled');
      option.removeEventListener('click', () => checkAnswer(option, correctAnswer, correctans));
    }
  });

  showNextButton();
  updateScore();
  showCorrectAnswer(correctans); // Display correct answer when an option is clicked
}

function updateScore() {
  document.getElementById('correctCount').textContent = `Correct: ${correctCount}`;
  document.getElementById('incorrectCount').textContent = `Incorrect: ${incorrectCount}`;
}

function showNextButton() {
  nextButton.style.display = 'block';
}

function hideNextButton() {
  nextButton.style.display = 'none';
}

function resetOptions() {
  const options = document.querySelectorAll('.answers_options');
  options.forEach(option => {
    option.classList.remove('correct', 'incorrect', 'disabled'); 
  });
}

function showCorrectAnswer(correctans) { 
  if (correctans == undefined){ 
    correctans = correctans.filter(function(element){ 
      return element !== undefined; 
    })
  }
  document.getElementById("correctAnswerText").innerHTML = `<span>Correct Answer is: ${correctans}</span>`;
}

function nextQuestion() {
  hideNextButton();
  resetOptions();
  userAnswered = false;
  currentQuestionIndex++;
  fetchTrivia(); 
  showCorrectAnswer();
} 


document.getElementById('next-question').addEventListener('click', function() {
  document.getElementById('correctAnswerText').innerHTML = '';
});


// answersElement.addEventListener('click', showCorrectAnswer);
nextButton.addEventListener('click', nextQuestion);
// nextButton.addEventListener('click',clearAnswer);

fetchTrivia();
hideNextButton();
displayWelcomeMessage();
