import { useState } from 'react'
import PracticeComponent from "./components/Script";
import Script from './components/Script';
import Performance from './components/performance/Performance';
import StopWatch from './components/stopwatch/StopWatch';
import StWatch from './components/stopwatch/StWatch';
import "./components/stopwatch/style/style.css"

function App() {

  const time = new Date().getTime();

  return (
    <>
      {/* <PracticeComponent/> */}
      {/* <Performance/> */}
      <StopWatch/>
      <StWatch/>
    </>
  )
}

export default App
