import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";
import Footer from "./Footer";


const SECS_PER_QUESTION=30;
const initalState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondRemaining:null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" ,secondRemaining:state.questions.length*SECS_PER_QUESTION};

    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case "finish":
      return {
        ...state,
        status: "finished",
      };

    case "reset": {
      return { ...initalState, questions: state.questions, status: "ready" };
    }

    case "nextQuestion": {
      return { ...state, index: state.index + 1, answer: null };
      
    }
    case 'tick':{
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status:state.secondRemaining===0?'finished':state.status
      };
    }

    default:
      throw new Error("Unknown action.");
  }
}

function App() {
  const [{ questions, status, index, answer, points,secondRemaining }, dispatch] = useReducer(
    reducer,
    initalState
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questions={questions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              questions={questions}
              index={index}
              points={points}
              answer={answer}
            />
            <Questions
              question={questions[[index]]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>

            <Timer dispatch={dispatch} secondRemaining={secondRemaining}/>
            <NextButton
              dispatch={dispatch}
              answer={answer}
              question={questions}
              index={index}
              />
              </footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            dispatch={() => dispatch({ type: "reset" })}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
