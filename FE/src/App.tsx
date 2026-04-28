import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Welcome</h1>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App
