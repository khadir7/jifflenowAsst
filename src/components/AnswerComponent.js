import React from "react";
import '../css/question.css';

const optionsMap = ['A', 'B', 'C', 'D'];

const AnswerComponent = ({handleClick, options, activeOption}) => {
return(
  <div style={{position:'absolute',left:'25%',bottom:'30px'}}>
    {optionsMap.map((item, i) => 
      <span className={`option ${(activeOption === i) ? 'active' : ''}`} key={i} onClick={() => handleClick(i)}>{item}</span>
    )}
  </div>
)
}

export default AnswerComponent;