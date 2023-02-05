import './App.css';
import { Route, Routes } from "react-router-dom"
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
import MovieList from './components/MovieList'


function App() {
  return (
    <div>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies/:id" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
    </div>
  );
}

export default App;
