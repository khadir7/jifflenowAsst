import { questionService } from "../services";

export const saveQuestionResponse = (dispatch, questionResponse) => {
  dispatch({
    type: "SAVE_QUESTION_RESPONSE",
    questionResponse
  })
}

export const fetchQuestions = dispatch => {
  return questionService
    .fetchQuestions()
    .then(res =>
      dispatch({
        type: "FETCH_QUESTIONS_SUCCESS",
        questions: res.data
      })
    )
    .catch(() =>
      dispatch({
        type: "FETCH_QUESTIONS_ERROR"
      })
    );
};
