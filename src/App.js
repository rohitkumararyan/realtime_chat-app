
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from './Components/Chat/Chat';
import Join from './Components/Join/Join';
import React from 'react'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route  expact path="/" element={<Join />}/>
      <Route path="/chat" element={<Chat />}/>
      
        
  
      
    </Routes>

  </BrowserRouter>
   
  );
}

export default App;
