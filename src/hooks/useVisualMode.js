import React, { useState, useEffect } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([]);

  let transitionFnc = (input, replace) => {
    if (replace) {
      setMode(input)  
    } 
    else {
      setHistory([...history, mode])
      setMode(input)
    }
  }

  let backFnc = () => {
    if (history.length > 0) {
    let newMode = history.pop()
    setHistory([...history]) 
    setMode(newMode)
    } 
  }

  return {
    mode,
    transition: transitionFnc,
    back: backFnc
  }
}