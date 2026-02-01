import { useState,useEffect } from 'react'



function App() {
  const [message, setMessage] = useState(0)
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/")
    .then(response=>response.json())
    .then(data=>setMessage(data.message))
    .then(err=>console.log("fetching error" , err))
  },[]);

  return (
    <>
    <h1>Welcome to store</h1>
    <p> {message || 'loading..' }</p>
    </>
  )
}

export default App
