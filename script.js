const startBtn = document.querySelector('.start-quiz-btn')
const startMessage = document.querySelector('.start-message')
const questionDisplay = document.querySelector('.question')
const optionsDisplay = document.querySelector('.options')
const currentScoreDisplay = document.querySelector('.score')
const nextBtn = document.querySelector('.next-question')
const prevBtn = document.querySelector('.prev-question');
const resultDisplay = document.querySelector('.Result-display')
const totalScore = document.querySelector('.total-score')
const quizContainer = document.querySelector('.quiz-container')
const restartBtn = document.querySelector('.restart-button')
const knowMore = document.querySelector('.know-more') 

const question = [    
  { 
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["link", "a", "href", "url"],
    answer: "a",
    explanation: "The anchor tag is used to create links. The 'href' attribute is the target, but 'a' is the actual tag."
  },
  { 
    question: "Which tag is used for the largest heading?",
    options: ["head", "h6", "header", "h1"],
    answer: "h1",
    explanation: "h1 defines the most important heading, while h6 defines the least important."
  },
  { 
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of these"],
    answer: "Hyper Text Markup Language",
    explanation: "HTML stands for Hyper Text Markup Language."
  },
  { 
    question: "Which character is used to indicate an end tag?",
    options: ["^", "<", "/", "*"],
    answer: "/",
    explanation: "A forward slash is placed before the tag name in a closing tag."
  },
  { 
    question: "Which HTML element is used for the site title?",
    options: ["head", "meta", "title", "header"],
    answer: "title",
    explanation: "The title element defines the title of the document, shown in the browser's title bar."
  },
];

let currentQuestionIndex = 0;
let score = 0;
let lockedQuestions = new Array(question.length).fill(false);
let userAnswers = new Array(question.length).fill(null);

startBtn.addEventListener('click', ()=>{
  startMessage.classList.add('hidden');
  displayQuestion();   
});

nextBtn.addEventListener('click', ()=> displayNextQuestion ());
prevBtn.addEventListener('click', ()=> displayPreviousQuestion());
restartBtn.addEventListener('click', ()=> restart() );

//function to display question
function displayQuestion(){
  const currentQ = question[currentQuestionIndex];

  questionDisplay.textContent = currentQ.question;
  optionsDisplay.innerHTML = '';
  knowMore.classList.add('hidden'); // Hide explanation box by default

  startBtn.classList.add('hidden');
  nextBtn.classList.remove('hidden');
  prevBtn.classList.toggle('hidden', currentQuestionIndex === 0);

  currentQ.options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;

    if (userAnswers[currentQuestionIndex]) {
      li.style.pointerEvents = 'none';
      if (option === currentQ.answer) li.classList.add('bgGreen');
      if (option === userAnswers[currentQuestionIndex] && option !== currentQ.answer) {
        li.classList.add('bgRed');
      }
    }

    li.addEventListener('click', () => {
      if (lockedQuestions[currentQuestionIndex]) return;
      selectAnswer(option, li);
    });
    optionsDisplay.appendChild(li);
  });

  currentScoreDisplay.innerHTML = `Score: ${score}/${question.length}`;

  if (lockedQuestions[currentQuestionIndex]) {
    knowMore.classList.remove('hidden');
    knowMore.textContent = currentQ.explanation;
  }  
}

//function to check for correct answer
function selectAnswer(choice, clickedOption){
  if (lockedQuestions[currentQuestionIndex]) return;

  let correctAnswer = question[currentQuestionIndex].answer;
  userAnswers[currentQuestionIndex] = choice;
  
  if (choice === correctAnswer) {
    score++
    clickedOption.classList.add('bgGreen');
    lockedQuestions[currentQuestionIndex] = true; // Lock on correct answer too
  } else {
    clickedOption.classList.add('bgRed');
    showExplanation();
  }
  currentScoreDisplay.innerHTML = `Score: ${score}/${question.length}`;
  
  // Disable other options after clicking
  document.querySelectorAll('.options li').forEach(li => li.style.pointerEvents = 'none');
}

//function to show explanation
function showExplanation() {
  knowMore.classList.remove('hidden');
  const explanationBtn = document.createElement('button');
  explanationBtn.className = 'explanation-btn';
  explanationBtn.textContent = 'Why is this wrong?';

  explanationBtn.addEventListener('click', () => {
    knowMore.innerHTML = `<strong>Explanation:</strong> ${question[currentQuestionIndex].explanation}`;
    lockedQuestions[currentQuestionIndex] = true;
  });

  knowMore.innerHTML = '';
  knowMore.appendChild(explanationBtn);
}

//function to display next question
function displayNextQuestion (){
  currentQuestionIndex ++;
  if(currentQuestionIndex < question.length){
    displayQuestion();
  } else{
    displayResult();
  }
}

//function to display previous question
function displayPreviousQuestion() {
  if (currentQuestionIndex === 0) return;
  currentQuestionIndex--;
  displayQuestion();
}

//function to display result
function displayResult(){
  resultDisplay.classList.remove('hidden');
  quizContainer.classList.add('hidden');
  currentScoreDisplay.classList.add('hidden')
  totalScore.innerHTML = `${score} / ${question.length}`;
}

//function to restart quiz
function restart (){
  currentQuestionIndex = 0;
  score = 0;
  lockedQuestions.fill(false);
  userAnswers.fill(null);
  resultDisplay.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  currentScoreDisplay.classList.remove('hidden');
  displayQuestion();
}
