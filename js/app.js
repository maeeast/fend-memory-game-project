/*
 * Create a list that holds all of your cards
 */

let selectedCards = [];
let picks = 0;
let pairs = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const cards = document.querySelectorAll('.card');
console.log(cards);
const deck = document.querySelector('.deck');

for (card of cards) {
    card.addEventListener('click', ()=>{
    });
}

deck.addEventListener('click', ()=>{
    const clickTarget = event.target;
    if (okToClick(clickTarget
    )) {
        selectCard(clickTarget);
        addSelectCard(clickTarget);
        if (selectedCards.length === 2) {
            areWeTwinning(clickTarget);
            addPick();
            checkPicks();
            console.log(picks);
        }
    }
});

shuffleDeck();

document.querySelector('.restart').addEventListener('click', refreshGame);

function okToClick(clickTarget) {
    return(
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        selectedCards.length < 2 &&
        !selectedCards.includes(clickTarget)
    );
}

function selectCard(clickTarget){
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
}

function addSelectCard(clickTarget){
    selectedCards.push(clickTarget);
    console.log(selectedCards);
}

function areWeTwinning() {
    if (
        selectedCards[0].firstElementChild.className ===
        selectedCards[1].firstElementChild.className
    ) {
        selectedCards[0].classList.toggle('match');
        selectedCards[1].classList.toggle('match');
        selectedCards = [];
    } else {
        setTimeout(() => {
            selectCard(selectedCards[0]);
            selectCard(selectedCards[1]);
            selectedCards = [];
        }, 1000);
    }
}

function shuffleDeck() {
    const shuffleUs = Array.from(document.querySelectorAll('.deck li'));
    const mixItUp = shuffle(shuffleUs);
    for (card of mixItUp) {
        deck.appendChild(card);
    }
}


function addPick(){
    picks++;
    const pickText = document.querySelector('.moves');
    pickText.innerHTML = picks;
}

function checkPicks() {
    if (picks === 16 || picks === 24) {
        hideStar();
    }
}

function hideStar(){
    const starList = document.querySelectorAll('.stars li')
    for (star of starList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}

function refreshGame() {
    refreshPicks();
    refreshStars();
    shuffleDeck();
    refreshCards();
}

function refreshPicks() {
    picks = 0;
    document.querySelector('.moves').innerHTML = picks;
}

function refreshStars(){
    stars = 0;
    const   starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
}

function refreshCards() {
    const   cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}
