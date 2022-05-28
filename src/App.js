import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CatsList from './components/CatsList';
import CatsListLiked from './components/CatsListLiked';
import { CatsProvider } from './context/CatsContext';

function App() {
  return (
    <CatsProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<CatsList />} />
            <Route path="/liked" element={<CatsListLiked />} />
          </Routes>
        </div>
      </Router>
    </CatsProvider>
  );
}

export default App;
