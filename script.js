let charList = []


//Gets a 8 random characters from API
const grabRandom = async () => {
  const getChar = await axios.get(`https://hp-api.onrender.com/api/characters`)
  for (i = 0; i < 8; i++) {
    randomNum = Math.floor(Math.random()*90)
    charGrabbed = getChar.data[randomNum]
    
    //Rerolls any characters without an image
    while (charGrabbed.image === "") {
      randomNum = Math.floor(Math.random()*90)
      charGrabbed = getChar.data[randomNum]
    }
    
    charList.push(charGrabbed)
  }
}

console.log(charList)

grabRandom()