import { useState } from "react";

function App() {

  return (
    <div>
      <Component />
    </div>
  )
}

function Component(){
  const [ans , setAns] = useState("yes");
  console.log("rendered")
  return (
    <>
      <button onClick={() => {ans=="yes" ? setAns("no") : setAns("yes")}}>Click to change</button>
      <div>
        AM I BAD? {ans}
      </div>
      <Cup />
    </>
  )
}

let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable! 
  // We shouldn't change some pre existing variable inside a component. because we don't know how many times it would re render and change that particular value and maybe it was used somewhere else so that would affect the DOM.
  // Therefore, each component should look only for themselves, not use any value related to some other component.
  // Consider, props, state, contexts as read-only. Don't change directly, rather change it by what is given, like the set function.
  guest = guest + 1;
  return <h2>Tea cup for guest {guest}</h2>;
}

export default App
