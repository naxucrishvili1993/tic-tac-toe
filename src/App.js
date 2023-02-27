import "./css/main.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Multiplayer from "./components/Multiplayer";
import Solo from "./components/Solo";
import { useState } from "react";

const App = () => {
	const [player, setPlayer] = useState("X");
	const [cpuPlayer, setCpuPlayer] = useState("O");
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							activePlayer={(e) => {
								e.target.id === "1" ? setPlayer("X") : setPlayer("O");
								e.target.id === "1" ? setCpuPlayer("O") : setCpuPlayer("X");
							}}
						/>
					}
				/>
				<Route
					path="/solo"
					element={
						<Solo
							setXPlayer={player === "X" ? "P1" : "P2"}
							setOPlayer={player === "O" ? "P1" : "P2"}
							xPlayer={player === "X" ? "1" : "2"}
							oPlayer={player === "O" ? "1" : "2"}
							resetPlayer={() => {
								setPlayer("X");
								setCpuPlayer("O");
							}}
							xWinningCpu={
								cpuPlayer === "O" ? "YOU WON!" : "OH NO, YOU LOST..."
							}
							oWinningCpu={
								cpuPlayer === "X" ? "YOU WON!" : "OH NO, YOU LOST..."
							}
							cpuPlayer={cpuPlayer}
						/>
					}
				/>
				<Route
					path="/multiplayer"
					element={
						<Multiplayer
							setXPlayer={player === "X" ? "P1" : "P2"}
							setOPlayer={player === "O" ? "P1" : "P2"}
							xPlayer={player === "X" ? "1" : "2"}
							oPlayer={player === "O" ? "1" : "2"}
							resetPlayer={() => setPlayer("X")}
						/>
					}
				/>
			</Routes>
		</>
	);
};

export default App;
