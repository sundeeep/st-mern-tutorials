// React component is just a normal js function, which returns/ renders JSX Expression.

import CounterApp from "./components/CounterApp.jsx";

function App(){

  return (
    <>
      <h1>Class Based Component</h1>
      <CounterApp username={"Sundeeep Dasari"}/> 
    </>
  )
}

export default App;