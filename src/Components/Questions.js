import Options from "./Options";
function Questions({ question,dispatch,answer }) {
  return <Options question={question} dispatch={dispatch} answer={answer} />;
}

export default Questions;
