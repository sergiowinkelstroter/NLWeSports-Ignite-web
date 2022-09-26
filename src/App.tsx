import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GameContext, GameProvider } from "./context/GameContext";
import Game from "./pages/Game";
import Home from "./pages/Home";

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:title/:id" element={<Game />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
