import React from "react";
import '../css/question.css';

const optionsMap = ['A', 'B', 'C', 'D'];

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

export default ReportPage;