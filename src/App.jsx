import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import NoData from './pages/NoData'
import Footer from './components/Footer'

function App() {
  return (
    <Router basename="/my-app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/no-data" element={<NoData />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
