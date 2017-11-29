import React from 'react';
import ReactDOM from 'react-dom';
import WordCounter from "./WordCounter.js";
import Timer from "./Timer.js";

ReactDOM.render(
  <WordCounter  targetWordCount={10}/>,
  document.getElementById('app')
)
