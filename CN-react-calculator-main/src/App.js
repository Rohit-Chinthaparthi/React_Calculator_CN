import { useState } from 'react';
import { evaluate } from 'mathjs';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [isResultSet, setResultState] = useState(false);
  const buttons = ["0", ".", "DEL", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const inputHandler = (char) => {
    if (char === "DEL") {
      deleteHandler(input);
    } else {
      setValidatedInput(input + char);
    }
  }

  const setValidatedInput = (val) => {
    const regex = /(\d+[%]?[+-/*]?)+$/;
    const isInputValid = regex.test(val);
    if (isInputValid) {
      if (!isResultSet) {
        setInput(val);
      } else if (isMathOp(lastCharOf(val)) || lastCharOf(val) == "%") {
        setInput(val);
        setResultState(false);
      } else {
        setInput(lastCharOf(val));
        setResultState(false);
      }
    }
  }

  const resultHandler = (val) => {
    if (!isMathOp(lastCharOf(val)) && val !== "") {
      const result = Number(evaluate(val).toFixed(3));
      setInput(result);
      setResultState(true);
    }
  }

  const deleteHandler = (val) => {
    if (typeof val === "string") {
      setInput(val.slice(0, -1));
    } else {
      setInput("");
    }
  }

  const isMathOp = (char) => "+-*/".includes(char);
  const lastCharOf = (str) => str[str.length - 1];

  return (
    <div className="calculator">
      <div className="input-section">
        <input type="text" onChange={(e) => setValidatedInput(e.target.value)} placeholder="0" autocomplete="off" value={input} />
      </div>
      <div className="buttons-section">
        <div>
          <div className="grey-section">
            <Button icon="C" idName="reset-button" onClickEvent={() => setInput("")} />
            <Button icon="%" onClickEvent={() => inputHandler("%")} />
          </div>
          <div className="white-section">
            {buttons.map((icon) => {
              return <Button icon={icon} onClickEvent={() => inputHandler(icon)} />
            })}
          </div>
        </div>
        <div className="orange-section">
          <Button icon="=" idName="equal" onClickEvent={() => resultHandler(input)} />
          <Button icon="+" onClickEvent={() => inputHandler("+")} />
          <Button icon="-" onClickEvent={() => inputHandler("-")} />
          <Button icon="&#215;" onClickEvent={() => inputHandler("*")} />
          <Button icon="&#247;" onClickEvent={() => inputHandler("/")} />
        </div>
      </div>
    </div>
  );
}

const Button = (props) => {
  return <button id={props.idName} onClick={props.onClickEvent}>{props.icon}</button>
}

export default App;