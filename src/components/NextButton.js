import React from "react";
import '../css/question.css';

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

export default NextButton;