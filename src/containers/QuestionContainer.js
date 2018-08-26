import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionComponent from "../components/QuestionComponent.js";
import AnswerComponent from "../components/AnswerComponent.js";
import ReportPage from "../components/ReportPage.js";
import NextButton from "../components/NextButton.js";
import '../css/question.css';

import * as actions from "../actions";

class QuestionContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qNum: 0,
      showNextBtn: false,
      showReportPage: false,
      activeOption: ''
    };

    this.renderNextQuestion = this.renderNextQuestion.bind(this);
    this.renderNextBtn = this.renderNextBtn.bind(this);
  }

  componentWillMount() {
    this.props.fetchQuestions();
  }
  
  renderNextQuestion(){
    let {qNum, answerAttempted, correctAnswer} = this.state;
    let {questions, questionResponse} = this.props;
    
    questionResponse.push({
      qNum: qNum + 1,
      answerAttempted,
      correctAnswer: correctAnswer,
      isCorrect: answerAttempted === (correctAnswer)
      })
    this.props.saveQuestionResponse(questionResponse);
    if(questions.length > qNum + 1){
      this.setState({
        showNextBtn:false,
        qNum: qNum + 1,
        activeOption:''
      })      
    }else{
      this.setState({
        showReportPage: true
      })
    }
  }

  renderNextBtn(answerAttempted){
    let {questions} = this.props;
    let {qNum} = this.state;
    this.setState({
      showNextBtn: true,
      answerAttempted,
      activeOption: answerAttempted,
      correctAnswer: questions[qNum]['answer']
    })
  }

  render() {
     let { qNum, showNextBtn, showReportPage, activeOption } = this.state;
     let { questions, questionResponse } = this.props;
     if(!questions){
       return null;
     }

    return (
      <div className="parentContainer">
        {!showReportPage ?
          (<div className="container">
            <QuestionComponent 
                questionData={questions[qNum]}
                qCount={questions.length} 
                seqNum={qNum+1}
            />
            <AnswerComponent 
                activeOption={activeOption}
                handleClick={this.renderNextBtn}
                options={questions[qNum]['options']}
            />
            <NextButton 
                showNextBtn={showNextBtn}
                handleClick={this.renderNextQuestion}
            />
          </div>)
        : <ReportPage report={questionResponse}/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions && state.questions.questions,
    questionResponse: (state.questions && state.questions.questionResponse) || []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    fetchQuestions: () => {
      return actions.fetchQuestions(dispatch);
    },
    saveQuestionResponse: (questionResponse) => {
      return actions.saveQuestionResponse(dispatch, questionResponse);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionContainer);
