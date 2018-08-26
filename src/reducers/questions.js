const questions = (state = [], action) => {
  switch (action.type) {
    case "FETCH_QUESTIONS_SUCCESS":
      return Object.assign({}, state, {
        questions : action.questions
      });
      
    case "SAVE_QUESTION_RESPONSE":
    return Object.assign({}, state, {
      questionResponse : action.questionResponse
    })
    
    default:
      return state;
  }
};

export default questions;
