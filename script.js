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

  //inserts images from API
  img1.innerHTML = `<img src=${charList[0].image}>`
  img2.innerHTML = `<img src=${charList[1].image}>`
  
  //inserts names from API
  name1.innerHTML = charList[0].name
  name2.innerHTML = charList[1].name

  //inserts house and patronus from API
  house1.innerHTML = `House: <br> - ${charList[0].house}`
  house2.innerHTML = `House: <br> - ${charList[1].house}`
  patronus1.innerHTML = `Patronus: <br> - ${charList[0].patronus}`
  patronus2.innerHTML = `Patronus: <br> - ${charList[1].patronus}`

  //fills in N/A when needed 
  if (charList[0].house == "") {
    house1.innerHTML = `House: <br> - N/A`
  }
  if (charList[1].house == "") {
    house2.innerHTML = `House: <br> - N/A`
  }
  if (charList[0].patronus == "") {
    patronus1.innerHTML = `Patronus: <br> - N/A`
  }
  if (charList[1].patronus == "") {
    patronus2.innerHTML = `Patronus: <br> - N/A`
  }

  img1.onclick = () => {
    round2.push(charList[0])
  }
}

console.log(charList)

start()