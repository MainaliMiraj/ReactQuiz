function StartScreen({questions,dispatch}) {
    

    return (
        <div className="start">
            <h2>Welcome to the react Quiz!</h2>
            <h3>{questions.length} questions to test your react mastery</h3>
            <button className="btn btn-ui"
            onClick={()=>dispatch({type:'start'})}
            >Let's go</button>
        </div>
    )
}

export default StartScreen
