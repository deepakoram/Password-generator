import './App.css'
import { useState,useCallback,useEffect,useRef } from 'react'

function App() {
  const[length,setlength]=useState(8);
  const[numberAllowed,setNumberAllowed] = useState(false);
  const[charAllowed,setCharAllowed] = useState(false);
  const[password,setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*()_+";
    for(let i = 0 ; i<length ; i++){
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed]);
    const copyHandle = ()=>{
      window.navigator.clipboard.writeText(password);
      passwordRef.current?.select();
    };

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed])
  return (
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-3xl font-bold  text-center text-white'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type='text'
        value={password}
        className=' outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />
        <button
        className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        onClick={copyHandle}
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
         <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={0}
          max={100}
          value={length}
          className=' cursor-pointer'
          onChange={(e)=>setlength(e.target.value)}
          />
          <label htmlFor="length">Length: {length}</label>
         </div>
         <div className='flex items-center gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={numberAllowed}
          onChange={()=>setNumberAllowed((prev)=> !prev)}
          />
          <label htmlFor="number">Numbers</label>
         </div>
         <div className='flex items-center gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={charAllowed}
          onChange={()=>setCharAllowed((prev)=> !prev)}
          />
          <label htmlFor="charecter">Charecter</label>
         </div>
      </div>
   </div>
  )
}

export default App
