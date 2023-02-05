import { Route, Routes } from "react-router-dom"
import Home from './components/Home'
import MovieDetails from './components/MovieDetails'


function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
        
        
    )
}

export default Routing