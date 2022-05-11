import React from "react";
import { nanoid } from "nanoid";
import { Modal, Button, Alert } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Word from "./Word";
import Keyboard from "./Keyboard";
import { WORDS, randomWordle } from "./wordlist";

function App() {
  const [wordData, setWordData] = React.useState(defaultWordData);
  const [round, setRound] = React.useState(0);
  const [input, setInput] = React.useState([]);
  const [layout, setLayout] = React.useState(defaultLayout());
  const [show, setShow] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [wordle, setWordle] = React.useState(randomWordle());
  
  
  console.log(wordle)
  const handleResultClose = () => {
    setShow(false);
    setWordData(defaultWordData());
    setRound(0);
    setLayout(defaultLayout());
  };
  const handleResultShow = () => setShow(true);

  function defaultWordData() {
    let wordArray = Array(5)
      .fill(null)
      .map(() => {
        return {
          wordId: nanoid(),
          letters: Array(5)
            .fill(null)
            .map(() => {
              return {
                id: nanoid(),
                letter: "",
                status: "default",
              };
            }),
        };
      });
    return wordArray;
  }

  function defaultLayout() {
    return {
      keys: [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["enter","z", "x", "c", "v", "b", "n", "m", "backspace"],
      ],
      disabledKeys: [],
    };
  }

  React.useEffect(() => {
    if (round >= 5) {
      handleResultShow();
    }
  }, [round]);

  function endRound() {
    if (WORDS.includes(input.join(""))) {
      const userInput = formatInput(input, true);
      setWordData((prevData) =>
        prevData.map((word, index) => (index === round ? userInput : word)))

      if (
        userInput.letters[0].status === "correct" &&
        userInput.letters.every((v) => v.status === userInput.letters[0].status))
      {
        handleResultShow()
        setWordle(randomWordle())
      }
      else{
      updateLayout(userInput);
      setRound((prevRound) => (prevRound = prevRound + 1));
      
      }
      setInput([])

    } else {
      setAlert((prev) => !prev);
    }
  }
  function formatInput(userInput, isSubmit = null) {
    while (userInput.length < 5) {
      userInput = [...userInput, ""];
    }

    return {
      wordId: wordData[round].wordId,
      letters: userInput.map((letter, index) => {
        return {
          id: nanoid(),
          value: letter,
          status: isSubmit ? checkLetterStatus(letter, index) : "default",
        };
      }),
    };
  }

  function updateLayout(userInput) {
    userInput.letters.map((letter) => {
      if (letter.status === "wrong") {
        setLayout((prev) => {
          return {
            ...prev,
            disabledKeys: [...prev.disabledKeys, letter.value],
          }
        })
      }
    })
  }

  function checkLetterStatus(letter, index) {
    if (wordle.includes(letter)) {
      if (wordle[index] === letter) return "correct";
      else return "includes";
    } else {
      return "wrong";
    }
  }

  const wordsElement = wordData.map((word) => {
    return <Word key={word.wordId} letters={word.letters} />;
  });

  function handleClick(e) {

    var userInput
    if (e.target.value === "enter") {
      endRound()
    }
    else if (e.target.value === "backspace") {
     input.pop()
     userInput = [...input]
    }
    else{
      userInput = [...input, e.target.value];
    }

    if (userInput.length <= 5) {
       setInput(userInput);
       const formatedInput = formatInput(userInput);
       setWordData((prevData) =>
        prevData.map((word, index) => (index === round ? formatedInput : word))
       );
     }
    
  }

  return (
    <div className="container app">
      {alert ? (
        <Alert
          variant="warning"
          onClose={() => setAlert((prev) => !prev)}
          dismissible
        >
          <Alert.Heading>Please enter valid word</Alert.Heading>
        </Alert>
      ) : (
        ""
      )}
      <div className="">{wordsElement}</div>
      <div className="col-sm-6 offset-lg-3">
        <div className="">
          <Button
            disabled={input.length < 5 ? "disabled" : ""}
            className="mt-3 ml-5 submit-button"
            onClick={endRound}
          >
            Submit{" "}
          </Button>
        </div>
        <div className="mt-3">
          <Keyboard
            handleSubmit={endRound}
            handleClick={handleClick} 
            layout={layout} 
          />

        </div>
      </div>

      <Modal show={show} onHide={handleResultClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>
        <Modal.Body>Result</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleResultClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
