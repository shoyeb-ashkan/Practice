import logo from './logo.svg';
import './App.css';
import Progressbar from './components/Progressbar';
import { useEffect, useState } from 'react';

function App() {

  const [value, setValue] = useState(0)
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    setInterval(()=>{
      setValue((val)=>val+0.01)
    }, 20)
    
  }, [])
  
  return (
    <div className="App">
     <span>Progress Bar</span>
     <Progressbar value={value} onComplete={()=>{setSuccess(true)}}/>
     <span>{success?'Successful':'Loading...'}</span>
    </div>
  );
}

export default App;
