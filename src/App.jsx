import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const genPassword = useCallback(()=>{
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed===true) str += "123456789";
    if(characterAllowed===true) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random()*(str.length));
      pass += str.charAt(index);
      
    }
    setPassword(pass);
  },[length,numberAllowed,characterAllowed])

  useEffect(()=>{
    genPassword();

  },[length,numberAllowed,characterAllowed] )


  //UseRef Hook
  const passwordRef = useRef(null);
  
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,4);
    window.navigator.clipboard.writeText(password);
  })
 


  


  return (
    <>
    <div className='h-auto w-auto bg-gray-700 p-5'>
      

      <input className=' mt-2 m-2 w-96 h-20 border-2 border-black text-4xl bg-white text-red-700' 
      readOnly 
      value={password}
      ref={passwordRef}
      ></input>
      
      
      <button 
      className='bg-blue-700 border-2 m-2 border-black w-20 h-20 rounded-3xl'
      onClick={copyPasswordToClipboard}
      >Copy</button>
      <br/>
      
      

      <input
      style={{display:'inline'}}
      type="range"
      min={8}
      max={16}
      value={length}
      className='cursor-pointer'
      onChange={(e)=>{setLength(e.target.value)}}
      />
      
      

      <label className='text-yellow-400 ml-2'>Length : {length}</label>
      
      

      <input type='checkbox' className='ml-4'
        defaultChecked={numberAllowed}
        onChange={()=>setNumberAllowed((prev)=>!prev)}
      ></input>
      
      

      <label className='text-yellow-400 ml-2'>Numbers</label>
      
      

      <input type='checkbox' className='ml-4'
        defaultChecked={characterAllowed}
        onChange={()=>setCharacterAllowed((prev)=>!prev)}></input>
      
      

      <label className='text-yellow-400 ml-2'>Characters</label>

    </div>
    </> 
  )
}

export default App

