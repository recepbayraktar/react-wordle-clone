import React from "react";
import Word from "./Word";
import { nanoid } from "nanoid";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Modal, Button, Alert } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { WORDS, wordle } from "./wordlist";

function App() {
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [wordData, setWordData] = React.useState(defaultWordData);
  const [round, setRound] = React.useState(0);
  const [input, setInput] = React.useState("");
  const keyboard = React.useRef();
  const [layout, setLayout] = React.useState(defaultLayout());
  const [show, setShow] = React.useState(false);
  const [alert, setAlert] = React.useState(false);

  console.log(wordle);

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
    return ["q w e r t y u i o p {bksp}", "a s d f g h j k l", "z x c v b n m"];
  }

  React.useEffect(() => {
    if (round >= 5) {
      setIsGameOver((prev) => !prev);
      handleResultShow();
    }
  }, [round]);

  function endRound() {
    if (WORDS.includes(input)) {
      const userInput = formatInput([...input], true);
      setWordData((prevData) =>
        prevData.map((word, index) => (index === round ? userInput : word))
      );
      checkWin(userInput);
      updateLayout(userInput);
      setRound((prevRound) => (prevRound = prevRound + 1));
      keyboard.current.clearInput();
    } else {
      setAlert((prev) => !prev);
    }
  }
  function formatInput(userInput, isSubmit = null) {
    while (5 > userInput.length) {
      userInput.push("");
    }
    return {
      wordId: wordData[round].wordId,
      letters: userInput.map((letter, index) => {
        return {
          id: nanoid(),
          value: letter,
          status: isSubmit
            ? checkLetterStatus(letter.toUpperCase(), index)
            : "default",
        };
      }),
    };
  }
  function checkWin(userInput) {
    if (
      userInput.letters[0].status === "correct" &&
      userInput.letters.every((v) => v.status === userInput.letters[0].status)
    ) {
      setIsGameOver((prev) => !prev);
      handleResultShow();
    }
  }
  function updateLayout(userInput) {
    var arr = layout;
    userInput.letters.map((letter) => {
      if (letter.status === "wrong") {
        arr = arr.map((layoutGroup) => layoutGroup.replace(letter.value, ""));
      }
    });
    setLayout(arr);
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

  const onChange = (userInput) => {
    setInput(userInput);
    userInput = userInput.toUpperCase();
    const formatedInput = formatInput([...userInput]);
    setWordData((prevData) =>
      prevData.map((word, index) => (index === round ? formatedInput : word))
    );
  };

  return (
    <div className="container app">
      {alert ? (
        <Alert variant="warning" onClose={() => setAlert((prev) => !prev)} dismissible>
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
            keyboardRef={(r) => (keyboard.current = r)}
            theme={"hg-theme-default"}
            onChange={onChange}
            layout={{
              default: layout,
              shift: [],
            }}
            maxLength={5}
            useButtonTag={true}
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
