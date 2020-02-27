export default function(sessionId){
  return fetch(`https://pi-be.herokuapp.com/session-data/${sessionId}`);
}
