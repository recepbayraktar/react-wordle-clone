import './App.css'
import Word from './Word';
import React from 'react';
import { nanoid } from 'nanoid'
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
/* 
yanlış harflerden yanlızca biri siliniyor
direkt klavyeden input alma 
sonuç ekranı
virtual klavyede tuşları disable yapma 
kelimeleri api veya array'den rastgele çekme 
tasarım
*/
function App() {

  const [isGameOver, setIsGameOver] = React.useState(false)
  const [wordData, setWordData] = React.useState(defaultWordData)
  const [round, setRound] = React.useState(0)
  const [input, setInput] = React.useState("");
  const [layoutName, setLayoutName] = React.useState("default");
  const keyboard = React.useRef();
  const [layout, setLayout] = React.useState([
    "q w e r t y u i o p {bksp}",
    "a s d f g h j k l {enter}",
    "z x c v b n m"
  ]);
  
  const wordle = ["R","E","A","C","T"]

  function defaultWordData() {
    let wordArray = Array(5).fill(null).map(() => {
      return {
        wordId: nanoid(),
        letters: Array(5).fill(null).map(() => {
          return {
            id: nanoid(),
            letter: "",
            status: "default"
          }
        })
      }
    })
    return wordArray
  }

  React.useEffect(() => {
    if (round >= 5) {
      setIsGameOver((prev) => !prev)
    }
  }, [round])

  function generateWord(userInput) {
      
      while( 5 > userInput.length) {
          userInput.push("")
      }
    
      wordData[round].letters = userInput.map((letter) => {
        return ({
          id: nanoid(),
          value: letter,
          status: "default"
        })
      }) 
  }
  function endRound(){
    const userInput = checkInput()
    setWordData(prevData => prevData.map((word, index) => index === round ? userInput : word))
    checkWin(userInput)
    updateLayout(userInput)
    setRound((prevRound) => prevRound = prevRound + 1)
    keyboard.current.clearInput(); 
    console.log(typeof keyboard.current.buttonElements.a[0])
  }
  function checkInput() {
    return (
      {
        wordId:wordData[round].wordId,
        letters:[...input].map((letter, index) => {
          return ({
            id: nanoid(),
            value: letter,
            status: checkLetterStatus(letter.toUpperCase(),index)
          })
        }) 
      }
    ) 
  }
  function checkWin(userInput){
    
    if (userInput.letters[0].status === "correct" && userInput.letters.every( v => v.status === userInput.letters[0].status)) {
      setIsGameOver(prev => !prev)
    }
    else{
      console.log(isGameOver)
    }
  }
  function  updateLayout(userInput) {
    
    userInput.letters.map((item) => { 
      if (item.status === "wrong") {
        setLayout(layout.map((layoutGroup) => layoutGroup.replace(item.value,"").replace("  "," ")))
      }
    }) 
  }
  function checkLetterStatus(letter,index){
    if (wordle.includes(letter)) {
      if (wordle[index] === letter)
        return "correct"
      else 
        return "includes"
    }
    else{
      return "wrong"
    }
  }
  
  const wordElement = wordData.map(word => {
    return <Word 
    key={word.wordId}
    letters={word.letters}
    />
  })
  
  const onChange = userInput => {
      setInput(userInput); 
      userInput = userInput.toUpperCase()
      generateWord([...userInput])
      // size'ı 5 olan bir array'e userInput atanabilir
  };


  return (
    <div className='row'>

      {wordElement}

      {
        !isGameOver ? 
          <div className='col-sm-5 my-5 offset-sm-3'>
            <Keyboard
              keyboardRef={r => (keyboard.current = r)}
              layoutName={layoutName}
              onChange={onChange}
              layout={{
                default: layout,
                shift: []
              }}
              maxLength={5}
              buttonAttributes={
                {
                  attribute: "aria-label",
                  value: "bee",
                  buttons: "b B"
                }
              }
              
            />
            <button className='btn btn-info rounded mt-3 mr-auto' onClick={endRound}>Submit</button>  
          </div>
        :
        <div className='col-sm-5 my-5 offset-sm-3'>
          <h1>GAME OVER</h1>
        </div>

      }
    </div>
  )
}

export default App
