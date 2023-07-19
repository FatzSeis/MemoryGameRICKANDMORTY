const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

let firstCard = '';
let secondCard = '';

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi ${timer.innerHTML}`);
    }
}
const checkCards = () => {
    const firstCharacters = firstCard.getAttribute('data-characters');
    const secondCharacters = secondCard.getAttribute('data-characters');

    if (firstCharacters === secondCharacters){
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');
         
        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {

        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 1000);
    }
}
const revealCard = ({target}) => {
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if (firstCard === ''){

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
    } else if (secondCard === ''){
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

    }

}

const createCard = (characters) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../IMGASSETS/${characters}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-characters', characters);

    return card;
}

const loadGame = () => {

    const duplicate = [ ...characters, ...characters ];

    const sortido = duplicate.sort( () => Math.random() -0.5 );
    sortido.forEach((characters) => {
        const card = createCard(characters);
        grid.appendChild(card);
    });
}
 const startTime = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
 }


window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTime();
    loadGame();
}