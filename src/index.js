import React from 'react';
import ReactDOM from 'react-dom';
import WordCounter from './wordcounter.js';

ReactDOM.render(
  <WordCounter targetWordCount={10}/>,
  document.getElementById('app'));

