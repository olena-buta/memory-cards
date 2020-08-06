const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const newCard = document.getElementById('new-card');
const close = document.getElementById('close');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear-cards');
const addContainer = document.getElementById('add-container');

const cardsEl = [];
let currentActiveCard = 0;

const cards = localStorage.getItem('cards') !== null ? JSON.parse(localStorage.getItem('cards')) : [];

init();

function updateCurrentText() {
  if (cards.length) {
    currentEl.innerText = `${currentActiveCard + 1} / ${cards.length}`;
  }
}

function createNewCard() {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const card = {
      question: question,
      answer: answer
    }

    cards.push(card);

    addCardDOM(card, index = 0);

    hideNewCard();
    setCards();
  }
}

function addCardDOM(card, index) {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');

  if (index === 0) {
    cardEl.className = 'card active';
  }

  cardEl.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <div class="btn-container">
          <button class="btn sound-card">
            <i class="fas fa-volume-up"></i>
          </button>
          <button class="btn edit-card">
            <i class="fas fa-pen"></i>
          </button>
          <button class="btn delete-card">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <p>${card.question}</p>
      </div>
      <div class="inner-card-back">
        <div class="btn-container">
          <button class="btn edit-card">
            <i class="fas fa-pen"></i>
          </button>
          <button class="btn delete-card">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <p>${card.answer}</p>
      </div>
    </div>
  `;

  cardEl.addEventListener('click', () => cardEl.classList.toggle('show-answer'));

  cardsEl.push(cardEl);
  cardsContainer.appendChild(cardEl);

  updateCurrentText();
}

function init() {
  cards.forEach((card, index) => addCardDOM(card, index));
}

function showNextCard() {
  cardsEl[currentActiveCard].className = 'card left';
  console.log(cardsEl[currentActiveCard].className);
  currentActiveCard += 1;

  if (currentActiveCard > cards.length - 1) {
    currentActiveCard = cards.length - 1;
  }
  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
}

function showPrevCard() {
  cardsEl[currentActiveCard].className = 'card right';
  currentActiveCard -= 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
}

function showNewCard() {
  addContainer.classList.add('show');

  document.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
      hideNewCard();
      questionEl.value = '';
      answerEl.value = '';
    }
  });
}

function hideNewCard() {
  addContainer.classList.remove('show');
  questionEl.value = '';
  answerEl.value = '';
}

function setCards() {
  localStorage.setItem('cards', JSON.stringify(cards));
}

function clearAllCards() {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
}

nextBtn.addEventListener('click', showNextCard);
prevBtn.addEventListener('click', showPrevCard);

newCard.addEventListener('click', showNewCard);

close.addEventListener('click', hideNewCard);

addCardBtn.addEventListener('click', () => {
  createNewCard();
});

clearBtn.addEventListener('click', clearAllCards);
