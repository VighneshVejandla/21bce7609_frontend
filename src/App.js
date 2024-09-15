import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import './App.css'; // Main app styling

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

  }, [searchTerm])

  return (
    <div className="App">
      <Header setSearchTerm={setSearchTerm}  searchTerm={searchTerm}/>
      <Home searchTerm={searchTerm}/>
      <Footer />
    </div>
  );
}

export default App;
