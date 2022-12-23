const cardArray = [
  {
    name: 'img1',
    img: 'img/1.png'
  },
  {
    name: 'img2',
    img: 'img/2.png'
  },
  {
    name: 'img3',
    img: 'img/3.png'
  },
  {
    name: 'img4',
    img: 'img/4.png'
  },
  {
    name: 'img5',
    img: 'img/5.png'
  },
  {
    name: 'img6',
    img: 'img/6.png'
  },
  {
    name: 'img7',
    img: 'img/7.png'
  },
  {
    name: 'img8',
    img: 'img/8.png'
  },
  {
    name: 'img9',
    img: 'img/9.png'
  },
  {
    name: 'img10',
    img: 'img/10.png'
  },
  {
    name: 'img11',
    img: 'img/11.png'
  },
  {
    name: 'img12',
    img: 'img/12.png'
  },
  {
    name: 'img13',
    img: 'img/13.png'
  },
  {
    name: 'img14',
    img: 'img/14.png'
  },
  {
    name: 'img15',
    img: 'img/15.png'
  },
  {
    name: 'img16',
    img: 'img/16.png'
  }
]

cardArray.sort(() => 0.5 - Math.random())

let cardArrayNew = []
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []
const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
const congratulations = document.querySelector('#congrats')
const popupMatch = document.querySelector('#popup')
const gridField = document.querySelector('#grid')
const btnContainer = document.querySelector('.btnContainer')
const btnEasy = document.querySelector('#easy')
const btnMedium = document.querySelector('#medium')
const btnHard = document.querySelector('#hard')

btnEasy.addEventListener('click', startEasyGame)
btnMedium.addEventListener('click', startMediumGame)
btnHard.addEventListener('click', startHardGame)

function chooseLevel(n) {
  for (let i = 0; i < n; i++) {
    cardArrayNew.push(cardArray[i]);
  }

  for (let i = 0; i < 1; i++) {
    cardArrayNew.forEach(el => {
      cardArrayNew.push(el);
    })
  }
  cardArrayNew.sort(() => 0.5 - Math.random())
  //console.log(cardArrayNew)
  startGame()
}

function startEasyGame() {
  chooseLevel(6)
  gridField.setAttribute('class', 'gridEasyLvl')
}

function startMediumGame() {
  chooseLevel(10)
  gridField.setAttribute('class', 'gridMediumLvl')
}

function startHardGame() {
  chooseLevel(15)
  gridField.setAttribute('class', 'gridHardLvl')
}

function startGame() {
  const txtScore = document.querySelector('#txtScore')
  txtScore.style.visibility = "visible"

  createBoard()
}

function createBoard() {
  btnEasy.style.visibility = "hidden"
  btnMedium.style.visibility = "hidden"
  btnHard.style.visibility = "hidden"
  btnContainer.style.visibility = "hidden"

  for (let i = 0; i < cardArrayNew.length; i++) {
    const card = document.createElement('img')
    card.setAttribute('src', 'img/blank.png')
    card.setAttribute('data-id', i)
    card.setAttribute('width', '150px')
    card.setAttribute('heigth', '150px')
    card.addEventListener('click', flipCard)
    gridDisplay.appendChild(card)
  }
}

function checkMatch() {
  const cards = document.querySelectorAll('img')
  const optionOneId = cardsChosenIds[0]
  const optionTwoId = cardsChosenIds[1]

  if (optionOneId == optionTwoId) {
    console.log('press the same card')
  }

  if (cardsChosen[0] == cardsChosen[1] && optionOneId != optionTwoId) {
    cards[optionOneId].setAttribute('src', 'img/white.png')
    cards[optionTwoId].setAttribute('src', 'img/white.png')
    cards[optionOneId].removeEventListener('click', flipCard)
    cards[optionTwoId].removeEventListener('click', flipCard)
    cardsWon.push(cardsChosen)
    showPopup('url(img/cool.png)')

    console.log('match', cards[optionOneId], cards[optionTwoId])

    cards[optionOneId].style.animationName = 'none'
    cards[optionOneId].style.transform = 'none'
    cards[optionOneId].style.borderRadius = '2px'
    cards[optionOneId].style.border = 'solid 1px rgb(79, 63, 50)'
    cards[optionOneId].style.margin = '4px'

    cards[optionTwoId].style.animationName = 'none'
    cards[optionTwoId].style.transform = 'none'
    cards[optionTwoId].style.borderRadius = '2px'
    cards[optionTwoId].style.border = 'solid 1px rgb(79, 63, 50)'
    cards[optionOneId].style.margin = '4px'
  } else {
    cards[optionOneId].setAttribute('src', 'img/blank.png')
    cards[optionTwoId].setAttribute('src', 'img/blank.png')
    showPopup('url(img/tryAgain.png)')

    //console.log("нет совпадений", cards[optionOneId], cards[optionTwoId])
    cards[optionOneId].style.animationName = 'animWrongCard'
    cards[optionTwoId].style.animationName = 'animWrongCard'
    cards[optionOneId].style.animationDuration = '0.2s'
    cards[optionTwoId].style.animationDuration = '0.2s'

    setTimeout(function () {
      cards[optionOneId].style.animationName = null
      cards[optionTwoId].removeAttribute("style")
      //console.log('setTimeout is working', cards[optionOneId], cards[optionTwoId])
    }, 200)
  }

  resultDisplay.textContent = cardsWon.length
  cardsChosen = []
  cardsChosenIds = []

  if (cardsWon.length == cardArrayNew.length / 2) {
    resultDisplay.textContent = 'Congratulations, You found them all!'
    popupMatch.style.visibility = "hidden"
    congratulations.style.visibility = "visible"
    setTimeout(function () { location.reload() }, 5000)
  }
}

function flipCard() {
  const cardId = this.getAttribute('data-id')

  if (cardsChosen.length < 2) {
    cardsChosen.push(cardArrayNew[cardId].name)
    cardsChosenIds.push(cardId)
    //console.log(cardsChosen, cardId)
    this.setAttribute('src', cardArrayNew[cardId].img)

    if (cardsChosen.length === 2) {
      setTimeout(checkMatch, 500)
    }
  }
}

function showPopup(urlImg) {
  popupMatch.style.visibility = "visible"
  popupMatch.style.backgroundImage = urlImg
  setTimeout(function () { popupMatch.style.visibility = "hidden" }, 1000)
}

