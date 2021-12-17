import React, { useState } from "react";
import "./App.css";
import BASICWords from "./BASICWords.json";
function App() {

  const [text, setText] = useState([]);
  const [wordsChecked, setWordsChecked] = useState([]);
  const [wordsNumPre, setWordsNumPre] = useState(0);

  const handleChange = (event) => {
    if (event.nativeEvent.inputType !== "deleteContentBackward") {
      setText(event.target.value);
      let str = event.target.value;
      let words = str.split(" ");
     words.splice(-1);
      if (words.length !== wordsNumPre) {
        setWordsNumPre(wordsNumPre + 1);
        words.map((word) => {
          const lowCase = word.toLowerCase();
          let st = lowCase.replace(/[!@();:\'\".,\/?-_]/g, "");
          BASICWords.includes(st) || word == "I"
            ? setWordsChecked(wordsChecked.concat({ word: word, spell: true }))
            : setWordsChecked(
                wordsChecked.concat({ word: word, spell: false })
              );
        });
      }

    } else {
      setText(event.target.value);
      let words = event.target.value.split(" ");
      words.length < wordsChecked.length && wordsChecked.splice(-1);
      words.length == 1 && wordsChecked.splice(-1);
    }
    // words.map((word) => { BASICWords.includes(word)});
    // setText(words.join(","));
    // words.map((word)=>{
    // if ( !BASICWords.includes(word)) return <u> {word} </u>

    // })
    // console.log(words);
    // for (let i=0;i<words.length;i++){
    //   if (! BASICWords.includes(words[i]) && words[i]!="")
    //     words[i] = `<span className="App-word">` + words[i] + `</span>`;

    // }
    // const stringWord = Array.from(words).join(" ");
    // console.log(stringWord);
    // setText(stringWord);
    // document.write(stringWord);

    // document.write("<textarea></textarea>");
    // for (let i = 0; i < words.length; i++) {
    //   if (!BASICWords.includes(words[i]) && words[i] != "")
    //   words[i]=  words[i].fontcolor("red")+" ";
    //   else words[i]= words[i].fontcolor("black")+" ";
    // }
    //const stringWord = words.join("  ");
    //setText(stringWord);
  };

  return (
    <div className="App">
      <h1>spell checker</h1>
      <textarea
        className="wrapped-text"
        id="review"
        name="review"
        rows="10"
        cols="80"
        value={text}
        onChange={handleChange}
      ></textarea>
      <div className="wrapped-text">
        {wordsChecked.map((word, index) => {
          return (
            <span
              key={index}
              className={!word.spell ? "false-word" : "true-word"}
            >
              {word.word}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default App;
