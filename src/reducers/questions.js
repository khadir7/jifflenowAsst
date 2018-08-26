const questions = (state = [], action) => {
  switch (action.type) {
    // case "ADD_TODO":
    //   return [
    //     ...state,
    //     {
    //       id: action.id,
    //       text: action.text,
    //       completed: false
    //     }
    //   ];
    case "FETCH_QUESTIONS_SUCCESS":
      return Object.assign({}, state, {
        questions : action.questions
      });
case "SAVE_QUESTION_RESPONSE":
return Object.assign({}, state, {
  questionResponse : action.questionResponse
})
    // case "TOGGLE_TODO":
    //   return state.map(
    //     todo =>
    //       todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
    //   );
    default:
      return state;
  }
};

export default questions;
