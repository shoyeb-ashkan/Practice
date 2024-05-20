import { useState } from "react";

const usePasswordGenerator = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [password, setPassword] = useState("");

  const generatePassword = (checkers, length) => {
    let charSet = "";
    let generatedPassword = "";

    const selectedOption = checkers.filter((check) => check.state);
    if (selectedOption.length < 1) {
      setErrorMsg("Please Select atleast one Option");
      setPassword("");
      return;
    }

    selectedOption.forEach((option) => {
      switch (option.title) {
        case "Include UpperCase Letters": {
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          console.log("at");
          break;
        }
        case "Include LowerCase Letters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charSet += "0123456789";
          break;
        case "Include Special Character":
          charSet += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });

    for (let i = 0; i < length; i++) {
      const randoIndx = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randoIndx];
    }

    setPassword(generatedPassword);
    setErrorMsg("");
  };

  return { generatePassword, errorMsg, password };

  // const generatePassword = (checkboxData, length) => {
  //   let charset = "",
  //     generatedPassword = "";

  //   const selectedOption = checkboxData.filter((checkbox) => checkbox.state);

  //   console.log(selectedOption.length);
  //   if (selectedOption.length === 0) {
  //     setErrorMsg("Select at least one option.");
  //     setPassword("");
  //     return;
  //   }

  //   selectedOption.forEach((option) => {
  //     switch (option.title) {
  //       case "Include UpperCase Letters":{
  //           charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //           console.log('at');
  //         break;}
  //       case "Include LowerCase Letters":
  //         charset += "abcdefghijklmnopqrstuvwxyz";
  //         break;
  //       case "Include Numbers":
  //         charset += "0123456789";
  //         break;
  //       case "Include Special Character":
  //         charset += "!@#$%^&*()";
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  //   console.log(charset);

  //   for (let i = 0; i < length; i++) {
  //       const randomIndex = Math.floor(Math.random() * charset.length);
  //       generatedPassword += charset[randomIndex];
  //     }

  //   setPassword(generatedPassword);
  //   setErrorMsg("");
  // };

  // return { password, errorMsg, generatePassword };
};

export default usePasswordGenerator;
