import React from 'react';
import Timer from './Timer';
import {clearInterval} from 'timers';

const SUCCESS = 'SUCCESS';
const FAILURE ='FAILURE';
const WAITING ='WAITING';
const IDLE ='IDLE';


function makeFakeRequest(){
  return new Promise((resolve, reject)=> {
    setTimeout (() => {
      if (Math.random() > 0.5){
        resolve('success!')
      } else{
        reject('failed')
      }
    },3000);
  });
}

function SaveButton({ onClick }){
  return (
    <button className="pv2 ph3" onClick={onClick}>Save </button>
  )
}

function AlertBox ({ status }){
  if (status === FAILURE){
    return <div className="mv2">Save failed</div>
  } else if (status === SUCCESS){
    return <div className="mv2">Save successful</div>
  } else if (status === WAITING){
    return <div className="mv2">Saving...</div>
  } else{
    return null

  }
}

class SaveManeger extends React.Component{
  constructor(){
    super();
    this.state = { saveStatus: IDLE};
    this.save = this.save.bind(this);
  }
  save(event){
    event.preventDefault();
    this.setState(()=>({saveStatus: WAITING}));
    this.props.saveFunction(this.props.data).then(
    success => this.setState(()=>({saveStatus:SUCCESS })),
    failure => this.setState(()=>({saveStatus:FAILURE }))
  );
  }

  render(){
    return (
<div className="mv2 flex flex-column">
      <SaveButton onClick={this.save}/>
      <AlertBox status= {this.state.saveStatus}/>
      </div>
    )
  }
}


function Counter({ count }){
  return(
    <p className="mb2" >
    Word Count: {count}
    </p>
  )
}


function ProguressBar({ completion }){
  const percentage = completion * 100;
  return(
    <div className="mv2 flex flex-column">
    <label htmlFor="progress" className="mv2">
    Progress
    </label>
    <progress value={completion} id="progress" className="bn">
    {percentage}%
    </progress>
    </div>
  )
}

function Editor({ text,onTextChange }){
  function handleChange(event){
    onTextChange(event.target.value);

  }
  return(
    <div className="mv2 flex flex-column">
    <label htmlFor="editor" className="mv2">
    Enter your text;
    </label>
    <textarea value={text} onChange={handleChange}  id="editor"/>
    </div>
  )
}

function countWords(text){
  return text ? text.match(/\w+/g).length : 0
}

export default class WordCounter extends React.Component {
  constructor(){
    super();
    // this.state = {text: ''};
    // this.handleTextChange = this.handleTextChange.bind(this);
    //

    this.state = {text:'',timeNow:  new Date()}
  }

  handleTextChange(currentText){
    this.setState(() => { return {text: currentText}})
    this.timer = null;
  }

  componentDidMount(){
this.timer = setInterval(()=>{
this.setState({ timeNow: new Date()})
},1000);
  }

  componentWillUnmount(){
clearInterval(this.timer)
  }

  render() {
    const {targetWordCount} = this.props;
    const{ text } = this.state;
    const wordCount = countWords(text);
    const progress = wordCount / targetWordCount;
    const timeNow = new Date;
    return (
      <form className="measure pa4 sans-serif">
      <Editor text={text} onTextChange={this.handleTextChange}/>
      <Counter count={wordCount}/>
      <ProguressBar completion={progress}/>
      <SaveManeger saveFunction={makeFakeRequest} data={this.state}/>
      <Timer timeNow={timeNow}/>
      </form>
    )
  }
}


function WordCounter({text,targetWordCount}){
  const wordCount = countWords(text);
  const progress = wordCount / targetWordCount;
  return(
    <form className="measure pa4 sans-serif">
    <Editor text={text}/>
    <Counter count={wordCount}/>
    <ProguressBar completion={progress}/>
     <SaveManeger saveFunction={makeFakeRequest} data={this.state}/>
    </form>
  )
}




