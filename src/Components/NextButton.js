function NextButton({ dispatch, answer, question, index }) {
  if (answer === null) return null;

  if (index < question.length - 1) {
    console.log(index);
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  }
  


    if (index === question.length-1);
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
