

export default function getAppointmentsForDay(state, day) {
  let appointmentIDs = [];
  for(let dayObj of state.days){
    if(day === dayObj.name) {
      appointmentIDs = dayObj.appointments;
    }
  }

  const appointmentObjs = [];
  for(let appointmentID of appointmentIDs) {
    appointmentObjs.push(state.appointments[appointmentID]);
  }
  return appointmentObjs;
}

export function getInterviewersForDay(state, selectedDay) {
  const [ dayObject = { interviewers: [] } ] = state.days.filter(day => selectedDay === day.name);
  return dayObject.interviewers.map(interviewerID => state.interviewers[interviewerID]);
  }


export function getInterview(state, interview) {
  if (interview) {
    return {...interview, interviewer: state.interviewers[interview.interviewer]};
  }
  return null;
}




















  
// //getInterview below (left for now for potential code comparison):
// export function getInterview(state, interview) {
//   if(interview === null) {
//     return null;
//   }

//   let student;
//   let interviewerID;
//   let interviewInfo = {
//       "interviewer":  {
//         "avatar": "",
//         "id": -1,
//         "name": "",
//       },
//       "student": ""
//     };
  
  
//   for(let interviewObj in state.appointments){
//     //finding the interviewer id in state.appointments.interview
//     //matching the interview with the given interview from state.
//     if(interview === state.appointments[interviewObj].interview) {
//       //setting interviewID = "number of the interviewer"
//       interviewerID = state.appointments[interviewObj].interview.interviewer;
//       interviewInfo.student = state.appointments[interviewObj].interview.student;
//     }
//   }
  

//   for (let Iid in Object.keys(state.interviewers)){
//     // console.log("Iid is here >>>> ", Iid )
//     if(interviewerID === Iid){

//       interviewInfo.interviewer = state.interviewers[Iid];

//     }
//   }

// return interviewInfo;

// }




