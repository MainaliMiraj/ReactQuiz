function FinishedScreen({ points, dispatch }) {
  return (
    <>
      <p className="result">You scored {points} points.</p>
      <button
        style={{
          padding: "10px",
          width: "inherit",
          background: " #1098ad",
          borderRadius: "10px",
          color: "white",
          fontSize: "large",
          fontFamily: "fantasy",
          cursor: "pointer",
        }}
        onClick={dispatch}
      >
        Restart the Quiz
      </button>
    </>
  );
}

export default FinishedScreen;
