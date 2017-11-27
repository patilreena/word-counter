function Counter({ count }) {
  return <p className="mb2">word Count: {count}</p>;
}

function ProgressBar({ completion }) {
  const percentage = completion * 100;
  return (
    <div className="mv2 flex flex-column">
      <label htmlFor="progress" className="mv2">
        progress
      </label>
      <progress value={completion} id="progress" className="bn">
        {percentage}%
      </progress>
    </div>
  );
}

function Editor({ text, onTextChange }) {
  function handleChange(event) {
    onTextChange(event.target.value);
  }
  return (
    <div className="flex flex-column mv2">
      <label htmlFor="editor" className="mv2">
        Enter your text
      </label>
      <textarea value={text} onChange={handleChange} id="editor" />
    </div>
  );
}

function countWords(text) {
  return text ? text.match(/\w+/g).length : 0;
}

class WordCounter extends React.Component {
  constructor() {
    super();
    this.state = { text: '' };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(currentText) {
    // const obj = {text: currentText}
    // const func = () => {obj}
    // this.setState(fun);
    this.setState(() => {
      {
        return { text: currentText };
      }
    });
  }

  render() {
    const { targetWordCount } = this.props;
    const { text } = this.state;
    const wordCount = countWords(text);
    const progress = wordCount / targetWordCount;
    return (
      <form className="measure pa4 sans-serif">
        <Editor text={text} onTextChange={this.handleTextChange} />
        <Counter count={wordCount} />
        <ProgressBar completion={progress} />
      </form>
    );
  }
}

// function WordCounter({text, targetWordCount}) {
// 	const wordCount = countWords(text);
// 	const progress = wordCount / targetWordCount;
// 	return (
// 		<form className="measure pa4 sans-serif">
// 		 <Editor text={text}/>
// 		 <Counter count={wordCount}/>
// 		 <ProgressBar completion={progress}/>
// 		</form>
//    )
//   }

ReactDOM.render(
  <WordCounter targetWordCount={10} />,
  document.getElementById('app')
);


class Sum extends React.Component {
	render() {
		return (
			<div>
			
			</div>
		)
	}
}