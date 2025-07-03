import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AdminPanelPage from '../pages/AdminPanelPage';
import './App.css'
import Header from '../shared/ui/header';
import CatalogPage from '../pages/Catalog';
import ProductPage from '../pages/ProductPage';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:gender" element={<CatalogPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<h1>404: Not Found</h1>}/>
      </Routes>
    </Router>
  )
}

export default App
