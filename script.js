let charList = []
let round2 = []
let round3 = []
let img1 = document.querySelector("#img1")
let img2 = document.querySelector("#img2")
let name1 = document.querySelector('#name1')
let name2 = document.querySelector('#name2')
let house1 = document.querySelector('#house1')
let house2 = document.querySelector('#house2')
let patronus1 = document.querySelector('#patronus1')
let patronus2 = document.querySelector('#patronus2')
let winScreen = document.querySelector('#winScreen')
let favList = document.querySelector('#favList')
let resetbtn = document.querySelector('#resetBtn')

//Gets 8 random characters from API
const start = async () => {
  const getChar = await axios.get(`https://hp-api.onrender.com/api/characters`)
  for (i = 0; i < 8; i++) {
    randomNum = Math.floor(Math.random()*90)
    charGrabbed = getChar.data[randomNum]
    
    //Rerolls any characters without an image
    while (charGrabbed.image === "") {
      randomNum = Math.floor(Math.random()*90)
      charGrabbed = getChar.data[randomNum]
    }

    //Puts all 8 characters in a list
    charList.push(charGrabbed)

  }
  firstRound()

}

function firstRound() {
  let roundTick = 0
  updateInfo(0,1)
    img1.onclick = () => {
      
      if (roundTick == 0) {
        updateInfo(2,3)
        round2.push(charList[0])
        console.log('click 1')
      }
      if (roundTick == 1) {
        updateInfo(4,5)
        round2.push(charList[2])
        console.log('click 2')
      } 
      if (roundTick == 2) {
        updateInfo(6,7)
        round2.push(charList[4])
        console.log('click 3')
      } 
      if (roundTick == 3) {
        round2.push(charList[6])
        console.log('click 4')
        secondRound()
      }
      roundTick++
    }
  
    img2.onclick = () => {
      
      if (roundTick == 0) {
        updateInfo(2,3)
        round2.push(charList[1])
      }
      if (roundTick == 1) {
        updateInfo(4,5)
        round2.push(charList[3])
      } 
      if (roundTick == 2) {
        updateInfo(6,7)
        round2.push(charList[5])
      } 
      if (roundTick == 3) {
        round2.push(charList[7])
        secondRound()
      }
      roundTick++
  }
}

function secondRound() {
  let roundTick = 0
  updateInfo2(0,1)
    img1.onclick = () => {
      
      if (roundTick == 0) {
        updateInfo2(2,3)
        round3.push(round2[0])
        console.log("Round2 1")
      }
      if (roundTick == 1) {
        round3.push(round2[2])
        console.log("Round2 2")
        finalRound()
      }
      roundTick++
    }
  
    img2.onclick = () => {
      
      if (roundTick == 0) {
        updateInfo2(2,3)
        round3.push(round2[1])
      }
      if (roundTick == 1) {
        round3.push(round2[3])
        finalRound()
      }
      roundTick++
  }
}

function finalRound() {
  updateInfo3(0,1)
    img1.onclick = () => {

      winGame(round3[0])
      console.log("RoundWinner")
      
    }
  
    img2.onclick = () => {

      winGame(round3[1])
      console.log("RoundWinner")
      
    }
}

function winGame(winner) {
  winScreen.innerHTML = `${winner.name} Wins! <br> <img src=${winner.image}>`
  winScreen.style.visibility = 'visible'
  favList.innerHTML += `<li class='winList'>${winner.name}</li>`
}

function reset() {
  resetbtn.onclick = () => {
    winScreen.style.visibility = 'hidden'
    charList = []
    round2 = []
    round3 = []

    start()
  }
}

function updateInfo(char1, char2) {
  //inserts images from API
  img1.innerHTML = `<img src=${charList[char1].image}>`
  img2.innerHTML = `<img src=${charList[char2].image}>`
  
  //inserts names from API
  name1.innerHTML = charList[char1].name
  name2.innerHTML = charList[char2].name

  //inserts house and patronus from API
  house1.innerHTML = `House: <br> - ${charList[char1].house}`
  house2.innerHTML = `House: <br> - ${charList[char2].house}`
  patronus1.innerHTML = `Patronus: <br> - ${charList[char1].patronus}`
  patronus2.innerHTML = `Patronus: <br> - ${charList[char2].patronus}`

  //fills in N/A when needed 
  if (charList[char1].house == "") {
    house1.innerHTML = `House: <br> - N/A`
  }
  if (charList[char2].house == "") {
    house2.innerHTML = `House: <br> - N/A`
  }
  if (charList[char1].patronus == "") {
    patronus1.innerHTML = `Patronus: <br> - N/A`
  }
  if (charList[char2].patronus == "") {
    patronus2.innerHTML = `Patronus: <br> - N/A`
  }
}

function updateInfo2(char1, char2) {
  //inserts images from API
  img1.innerHTML = `<img src=${round2[char1].image}>`
  img2.innerHTML = `<img src=${round2[char2].image}>`
  
  //inserts names from API
  name1.innerHTML = round2[char1].name
  name2.innerHTML = round2[char2].name

  //inserts house and patronus from API
  house1.innerHTML = `House: <br> - ${round2[char1].house}`
  house2.innerHTML = `House: <br> - ${round2[char2].house}`
  patronus1.innerHTML = `Patronus: <br> - ${round2[char1].patronus}`
  patronus2.innerHTML = `Patronus: <br> - ${round2[char2].patronus}`

  //fills in N/A when needed 
  if (round2[char1].house == "") {
    house1.innerHTML = `House: <br> - N/A`
  }
  if (round2[char2].house == "") {
    house2.innerHTML = `House: <br> - N/A`
  }
  if (round2[char1].patronus == "") {
    patronus1.innerHTML = `Patronus: <br> - N/A`
  }
  if (round2[char2].patronus == "") {
    patronus2.innerHTML = `Patronus: <br> - N/A`
  }
}

function updateInfo3(char1, char2) {
  //inserts images from API
  img1.innerHTML = `<img src=${round3[char1].image}>`
  img2.innerHTML = `<img src=${round3[char2].image}>`
  
  //inserts names from API
  name1.innerHTML = round3[char1].name
  name2.innerHTML = round3[char2].name

  //inserts house and patronus from API
  house1.innerHTML = `House: <br> - ${round3[char1].house}`
  house2.innerHTML = `House: <br> - ${round3[char2].house}`
  patronus1.innerHTML = `Patronus: <br> - ${round3[char1].patronus}`
  patronus2.innerHTML = `Patronus: <br> - ${round3[char2].patronus}`

  //fills in N/A when needed 
  if (round3[char1].house == "") {
    house1.innerHTML = `House: <br> - N/A`
  }
  if (round3[char2].house == "") {
    house2.innerHTML = `House: <br> - N/A`
  }
  if (round3[char1].patronus == "") {
    patronus1.innerHTML = `Patronus: <br> - N/A`
  }
  if (round3[char2].patronus == "") {
    patronus2.innerHTML = `Patronus: <br> - N/A`
  }
}

console.log(charList)

start()
reset()