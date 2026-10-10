import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieSearch from "./components/pages/MovieSearch";
import Home from "./components/pages/Home";
import MovieInfo from "./components/pages/MovieInfo";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";


library.add(faMagnifyingGlass, faSpinner)

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies" element={<MovieSearch />}></Route>
        <Route path="/movies/:id" element={<MovieInfo />} />

      </Routes>
    </div>
    </Router>
  );
}

export default App;
