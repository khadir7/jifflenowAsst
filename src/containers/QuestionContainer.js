import React, { Component } from "react";
import { connect } from "react-redux";
import '../css/question.css';

import * as actions from "../actions";

const optionsMap = ['A', 'B', 'C', 'D'];

const Option = ({text, index}) => {
  return (
    <div style={{marginBottom:'10px'}}>
      <span>{`${optionsMap[index]} - `}</span>
      <span>{text}</span>
    </div>
  )
}

const QuestionComponent = ({questionData, seqNum, qCount}) => {
  return (
    <div style={{paddingLeft:'25px'}}>
      <div style={{fontSize:'12px'}}>{`JavaScript Quiz ${seqNum} out of ${qCount}`}</div>
      <div style={{marginBottom:'20px'}}> {questionData.text} </div>
      {questionData.options && questionData.options.map((option, key)=>
         <Option key={key} index={key} text={option}/>
      )}
    </div>
  )
}

const AnswerComponent = ({handleClick, options, activeOption}) => {
return(
  <div style={{position:'absolute',left:'25%',bottom:'30px'}}>
    {optionsMap.map((item, i) => 
      <span className={`option ${(activeOption === i) ? 'active' : ''}`} key={i} onClick={() => handleClick(i)}>{item}</span>
    )}
  </div>
)
}

const NextButton = ({showNextBtn, handleClick}) => {
  if(!showNextBtn){
    return null;
  }

  return(
    <div className="option nextBtn" onClick={() => handleClick()}>
      Next
    </div>
  )

}
const ResponseField = ({item}) => {
  return(
    <tr>
      <td>{item.qNum}</td>
      <td>{optionsMap[item.answerAttempted]}</td>
      <td>{optionsMap[item.correctAnswer]}</td>
      <td>{item.isCorrect ? 'Yes' : 'No'}</td>
    </tr>
  )
}
const ReportPage = ({report}) => {
  
return(
  <div className="container">
  <table>
    <tbody>
      <tr>
        <th>Q.No.</th>
        <th>Attempted</th>
        <th>Correct Answer</th>
        <th>isCorrect</th>
      </tr>
      {report && report.map((item, key) => 
        <ResponseField item={item} key={key}/>
      )}
    </tbody>
  </table>
  </div>
)

}
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
