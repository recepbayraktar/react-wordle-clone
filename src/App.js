import './App.css'
import Word from './Word';
import React from 'react';
import { nanoid } from 'nanoid'
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

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
    let wordArray = Array(5).fill({
        wordId: "",
        letters: Array(5).fill({
          letterId: "",
          letter: "",
          letterStatus: "default"
        })
      })
    wordArray = wordArray.map(word => {
      return (
        {
          wordId:nanoid(),
          letters: word.letters.map(letter => {
          return (
            {
              letterId : nanoid(),
              letter : "",
              letterStatus : "default"
            }
          )
        })
        }
      )
    })
    return wordArray
  }

  React.useEffect(() => {
    if (round >= 5) {
      setIsGameOver((prev) => !prev)
    }

  }, [round])

  function gameStatus(params) {
    
    
  }

  function generateWord(userInput) {
      
      while( 5 > userInput.length) {
          userInput.push("")
      }
      wordData[round].letters = userInput.map((letter) => {
        return ({
          letterId: nanoid(),
          letter: letter,
          letterStatus: "default"
        })
      }) 
  
  }

  function checkInput(){
    wordData[round].letters = [...input].map((letter, index) => {
      return ({
        letterId: nanoid(),
        letter: letter,
        letterStatus: setLetterStatus(letter.toUpperCase(),index)
      })
    })
    wordData[round].letters.map((item) => { 
      if (item.letterStatus === "wrong") {
        setLayout(layout.map((layoutGroup) => layoutGroup.replace(item.letter,"").replace("  "," ")))
      }
    })
    setRound((prevRound) => prevRound = prevRound + 1)
    keyboard.current.clearInput(); 
  }
  
  function setLetterStatus(letter,index){
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
      generateWord([...userInput], [...wordle], round)

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
            />
            <button className='btn btn-info rounded mt-3 mr-auto' onClick={checkInput}>Submit</button>  
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
