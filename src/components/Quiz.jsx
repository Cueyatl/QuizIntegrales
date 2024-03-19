import  { useRef, useState } from "react";
import { data } from "../assets/data";
import './quizStyle.css'; // Make sure to have your CSS file for styling
import MathJax from 'react-mathjax2';

function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const optionRefs = useRef([]);

  const checkAns = (e, answer, index) => {
    if (!lock) {
      if (question.answer === answer) {
        e.currentTarget.classList.add("correct");
        setLock(true);
        setScore(prevScore => prevScore + 1);
      } else {
        e.currentTarget.classList.add("wrong");
        optionRefs.current[question.answer - 1].classList.add("correct");
        setLock(true);
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
      } else {
        setIndex(prevIndex => prevIndex + 1);
        setQuestion(data[index + 1]);
        setLock(false);
        // Reset button styles
        optionRefs.current.forEach(ref => {
          ref.classList.remove("correct", "wrong");
        });
      }
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className='myContainer'>
      <div className="container mx-auto">
        {result ? (
          <>
            <h2>You scored {score} out of {data.length}</h2>
            <button className="btn btn-info" onClick={reset}>Reiniciar</button>
          </>
        ) : (
          <>
            <h1>{index + 1}.- {question.question}</h1>
            <hr className="" />
            <ul className="list-group">
              {Object.keys(question).filter(key => key.includes('option')).map((key, i) => (
                <div
                  key={i}
                  ref={el => optionRefs.current[i] = el}
                  className="button-wrapper"
                  onClick={(e) => checkAns(e, i + 1, index)}
                >
                  <button
                    className="btn btn-outline-info rounded-2 math"
                  >
                    <MathJax.Context input='tex'>
                      <MathJax.Node>{question[key]}</MathJax.Node>
                    </MathJax.Context>
                  </button>
                </div>
              ))}
            </ul>
            <button onClick={next} className="btn btn-primary">Next</button>
            <div className='index'>{index + 1} of {data.length} questions</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
