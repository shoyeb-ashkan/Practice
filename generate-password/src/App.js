import "./App.css";
import { useState } from "react";
import usePasswordGenerator from "./hook/use-password-generator";
import StrengthPart from "./components/StrengthPart";
import Button from "./components/Button";
import CheckBox from "./components/CheckBox";

function App() {
  const [checkers, setCheckers] = useState([
    { title: "Include UpperCase Letters", state: false },
    { title: "Include LowerCase Letters", state: false },
    { title: "Include Special Character", state: false },
    { title: "Include Numbers", state: false },
  ]);
  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false);

  const { generatePassword, errorMsg, password } = usePasswordGenerator();

  const handleCheckboxChange = (index) => {
    const updateChangeData = [...checkers];
    updateChangeData[index].state = !updateChangeData[index].state;
    setCheckers(updateChangeData);
  };

  const handleCopy = () => {
    setCopied(true);

    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(password);
    } else {
      document.execCommand("copy", true, password);
    }

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="container">
      {/* Password Text and Copy */}

      {password && (
        <div className="header">
          <span>{password}</span>
          <Button
            customClassName={"copyBtn"}
            onClickhandler={handleCopy}
            title={copied ? "Copied" : "copy"}
          />
        </div>
      )}

      {/* Character Length */}
      <div className="charLength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min={4}
          max={20}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
      </div>

      {/* Checkboxes  */}
      <div className="checkbox">
        {checkers.map((checkbox, index) => {
          return (
            <span key={index}>
              <CheckBox
                onChange={() => {
                  handleCheckboxChange(index);
                }}
                title={checkbox.title}
                checked={checkbox.state}
              />
            </span>
          );
        })}
      </div>
      {/* Strength part  */}
      <StrengthPart password={password} />
      {/* error Message */}
      {errorMsg && <div className="errorMsg">{errorMsg}</div>}
      {/* Generate button  */}
      <Button
        customClassName={"generateBtn"}
        onClickhandler={() => {
          generatePassword(checkers, length);
        }}
        title={"Generate Password"}
      />
    </div>
  );
}

export default App;
