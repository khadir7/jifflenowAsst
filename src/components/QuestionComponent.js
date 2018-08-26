import React from "react";
import '../css/question.css';

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

export default QuestionComponent;