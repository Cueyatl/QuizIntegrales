import { useRef, useState } from "react";
import { data } from "../assets/data";
import './quizStyle.css';
import MathJax from 'react-mathjax2';
function QuizTest() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const optionRefs = useRef([]);
  // took index from params inside checkAns, if it doesnt work, add it.
  const checkAns = (e, answer) => {
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
    <div className='myContainer  d-flex w-auto  col-sm-12 col-md-6 col-lg-8 mb-4 col-4'>
      <div className="   ">
        {result ? (
          <>
            <h2>Has acertado {score} de {data.length}</h2>
            <button className="btn btn-info" onClick={reset}>Reiniciar</button>
          </>
        ) : (
          <>
            <h3>{index + 1}.- Resuelve:
            <MathJax.Context  input='tex'>
              <MathJax.Node>
                {question.question}
              </MathJax.Node>
            </MathJax.Context>
             </h3>
            <hr className="" />
            <ul className="d-flex  flex-column   flex-lg-row  flex-md-row justify-content-around ">
              {Object.keys(question).filter(key => key.includes('option')).map((key, i) => (
                <div
                  id="optionContainer"
                  key={i}
                  ref={el => optionRefs.current[i] = el}
                  className=" justify-content-center  py-2 m-2 optionBtn w-100"
                  onClick={(e) => checkAns(e, i + 1, index)}
                >
                  <button
                    className="btn w-100    math"
                  >
                    <MathJax.Context input='tex'>
                      <MathJax.Node>{question[key]}</MathJax.Node>
                    </MathJax.Context>
                  </button>
                </div>
              ))}
            </ul>
            

            <button onClick={next} className="button-30">Siguiente</button>
            <div className='index my-3'>{index + 1} de {data.length} preguntas</div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuizTest;
