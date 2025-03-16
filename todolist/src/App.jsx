import { useState } from 'react'
import './App.css'
import Home from './Home'
// import Create from './Create'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home />
      {/* <Create /> */}
    </>
  )
}

export default App
