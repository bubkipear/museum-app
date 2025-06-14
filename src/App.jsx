import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Search from './pages/Search'
import Results from './pages/Results'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-primary">
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
