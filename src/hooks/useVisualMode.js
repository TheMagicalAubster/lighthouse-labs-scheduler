import React, { useState } from 'react';

export default function useVisualMode(initial) {
 const [mode, setMode] = useState(initial);
 const [history, setHistory] = useState([initial]);
 
 function transition(newMode, replace = false) {
   //needs to add mode to history array
   if(replace){
    const newHistory = [...history];
    newHistory.pop();
    newHistory.push(mode);
    setHistory(newHistory);
    setMode(newMode);
  } else {
    setHistory([...history, newMode]);
    setMode(newMode);

  }
  
 }

 function back() {
   //set mode to the previous item in the history array
   if (history.length > 1){
    setMode(history[history.length - 2]);
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
   }
 }

  return { mode, transition, back };
}