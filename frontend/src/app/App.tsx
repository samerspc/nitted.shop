import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AdminPanelPage from '../pages/AdminPanelPage';
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin Panel</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<>2</>} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="*" element={<h1>404: Not Found</h1>}/>
      </Routes>

      <div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Router>
  )
}

export default App
