/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from "react";
import Logo from "../starter-code/assets/logo.svg";
import Restart from "../starter-code/assets/icon-restart.svg";
import iconX from "../starter-code/assets/icon-x.svg";
import iconO from "../starter-code/assets/icon-o.svg";
import { Link } from "react-router-dom";

const Multiplayer = (props) => {
	const starterBoard = Array(9).fill(null);
	const [board, setBoard] = useState(starterBoard);
	const cpuPlayerRef = useRef(props.cpuPlayer);
	const [turn, setTurn] = useState("X");
	const turnRef = useRef("X");
	const winnerFoundRef = useRef(false);
	const [winnerFound, setWinnerFound] = useState(false);
	const [xWon, setXWon] = useState(false);
	const [oWon, setOWon] = useState(false);
	const xWinningLineRef = useRef([]);
	const oWinningLineRef = useRef([]);
	const [roundTied, setRoundTied] = useState(false);
	const [xCounter, setXCounter] = useState(0);
	const [oCounter, setOCounter] = useState(0);
	const [tieCounter, setTieCounter] = useState(0);
	const [restartPage, setRestartPage] = useState(false);
	const randomNumberRef = useRef(Math.floor(Math.random() * 9));
	let realPlayer = cpuPlayerRef.current === "X" ? "O" : "X";

	const winnerIsX = () => {
		return (
			<div className="winner">
				<p>{props.xWinningCpu}</p>
				<div className="winner-info">
					<img src={iconX} alt="X Logo" />
					<h1 className="winner-x">TAKES THE ROUND</h1>
				</div>
				<div className="winner-buttons">
					<Link to="/" onClick={props.resetPlayer}>
						<button className="winner-buttons-quit">QUIT</button>
					</Link>
					<button className="winner-buttons-next-round" onClick={nextGame}>
						NEXT ROUND
					</button>
				</div>
			</div>
		);
	};
	const winnerIsO = () => {
		return (
			<div className="winner">
				<p>{props.oWinningCpu}</p>
				<div className="winner-info">
					<img src={iconO} alt="O Logo" />
					<h1 className="winner-o">TAKES THE ROUND</h1>
				</div>
				<div className="winner-buttons">
					<Link to="/" onClick={props.resetPlayer}>
						<button className="winner-buttons-quit">QUIT</button>
					</Link>
					<button className="winner-buttons-next-round" onClick={nextGame}>
						NEXT ROUND
					</button>
				</div>
			</div>
		);
	};
	const roundTiedFunc = () => {
		return (
			<div className="winner">
				<h1 className="winner-tied">ROUND TIED</h1>
				<div className="winner-buttons">
					<Link to="/" onClick={props.resetPlayer}>
						<button className="winner-buttons-quit">QUIT</button>
					</Link>
					<button className="winner-buttons-next-round" onClick={nextGame}>
						NEXT ROUND
					</button>
				</div>
			</div>
		);
	};
	const restartPageDiv = () => {
		return (
			<div className="winner">
				<h1 className="winner-tied">RESTART GAME?</h1>
				<div className="winner-buttons">
					<button
						className="winner-buttons-quit"
						onClick={() => setRestartPage(false)}>
						NO, CANCEL
					</button>
					<button
						className="winner-buttons-next-round"
						onClick={() => {
							nextGame();
							setXCounter(0);
							setOCounter(0);
							setTieCounter(0);
							setRestartPage(false);
							setOWon(false);
							setXWon(false);
							xWinningLineRef.current = [];
							oWinningLineRef.current = [];
						}}>
						YES, RESTART
					</button>
				</div>
			</div>
		);
	};
	const nextGame = () => {
		setOWon(false);
		setXWon(false);
		xWinningLineRef.current = [];
		oWinningLineRef.current = [];
		winnerFoundRef.current = false;
		setWinnerFound(winnerFoundRef.current);
		setRoundTied(false);
		setTurn("X");
		turnRef.current = "X";
		setBoard(starterBoard);
	};
	useEffect(() => {
		if (turnRef.current !== realPlayer && !winnerFoundRef.current) {
			makeCpuTurn();
		}
	}, [turnRef.current, board]);

	const makeCpuTurn = () => {
		let newBoard = board;
		const nullIndexes = newBoard
			.map((el, index) => {
				if (el === null) return index;
			})
			.filter((el) => el !== undefined);
		randomNumberRef.current =
			nullIndexes[Math.floor(Math.random() * nullIndexes.length)];
		newBoard[randomNumberRef.current] = cpuPlayerRef.current;
		setBoard(newBoard);
		setTurn(realPlayer);
		turnRef.current = realPlayer;
		calculateWinner(newBoard);
	};

	const handleClick = (el) => {
		let newBoard = board;
		if (newBoard[el] === null) {
			if (turn !== cpuPlayerRef.current) {
				newBoard[el] = realPlayer;
				turnRef.current = cpuPlayerRef.current;
				setTurn(cpuPlayerRef.current);
			}
		}
		calculateWinner(newBoard);
		if (!newBoard.includes(null) && !winnerFoundRef.current) {
			setRoundTied(true);
			setTieCounter(tieCounter + 1);
		}
		setBoard(newBoard);
	};
	const calculateWinner = (el) => {
		const winningLanes = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < winningLanes.length; i++) {
			const [a, b, c] = winningLanes[i];
			if (el[a] !== null) {
				if (el[a] === el[b] && el[a] === el[c]) {
					winnerFoundRef.current = true;
					setWinnerFound(winnerFoundRef.current);
					if (el[a] === "X") {
						setXWon(true);
						setXCounter(xCounter + 1);
						const newArr = [a.toString(), b.toString(), c.toString()];
						xWinningLineRef.current = newArr;
					} else if (el[a] === "O") {
						setOWon(true);
						setOCounter(oCounter + 1);
						const newArr = [a.toString(), b.toString(), c.toString()];
						oWinningLineRef.current = newArr;
					}
				}
			}
		}
		if (el.every((el) => el !== null) && !winnerFoundRef.current) {
			setRoundTied(true);
			setTieCounter(tieCounter + 1);
		}
	};

	const handleRestart = () => {
		setRestartPage(true);
	};

	return (
		<>
			<div className="multiplayer">
				<div className="multiplayer-header">
					<img src={Logo} className="multiplayer-header-logo" alt="Logo Icon" />
					<p>
						{turn === "X" ? (
							<img
								src={iconX}
								className="multiplayer-header-turn"
								alt="X Logo"
							/>
						) : (
							<img
								src={iconO}
								className="multiplayer-header-turn"
								alt="O Logo"
							/>
						)}
						<span>TURN</span>
					</p>
					<img
						onClick={handleRestart}
						src={Restart}
						className="multiplayer-header-restart"
						alt="Restart Icon"
					/>
				</div>
				<table className={winnerFound ? "no-click" : ""}>
					<tbody>
						<tr>
							<td
								onClick={() => handleClick(0)}
								className={
									xWon
										? xWinningLineRef.current.includes("0")
											? "active-x"
											: ""
										: oWon
										? oWinningLineRef.current.includes("0")
											? "active-o"
											: ""
										: ""
								}>
								{board[0] === "X" && (
									<img src={iconX} className="game-icon" alt="X Logo" />
								)}
								{board[0] === "O" && (
									<img src={iconO} className="game-icon" alt="O Logo" />
								)}
							</td>
							<td
								onClick={() => handleClick(1)}
								className={
									xWon
										? xWinningLineRef.current.includes("1")
											? "active-x"
											: ""
										: oWon
										? oWinningLineRef.current.includes("1")
											? "active-o"
											: ""
										: ""
								}>
								{board[1] === "X" && (
									<img src={iconX} className="game-icon" alt="X Logo" />
								)}
								{board[1] === "O" && (
									<img src={iconO} className="game-icon" alt="O Logo" />
								)}
							</td>
							<td
								onClick={() => handleClick(2)}
								className={
									xWon
										? xWinningLineRef.current.includes("2")
											? "active-x"
											: ""
										: oWon
										? oWinningLineRef.current.includes("2")
											? "active-o"
											: ""
										: ""
								}>
								{board[2] === "X" && (
									<img src={iconX} className="game-icon" alt="X Logo" />
								)}
								{board[2] === "O" && (
									<img src={iconO} className="game-icon" alt="O Logo" />
								)}
							</td>
						</tr>
						<tr>
							<td
								onClick={() => handleClick(3)}
								className={
									xWon
										? xWinningLineRef.current.includes("3")
											? "active-x"
											: ""
										: oWon
										? oWinningLineRef.current.includes("3")
											? "active-o"
											: ""
										: ""
								}>
								{board[3] === "X" && (
									<img src={iconX} className="game-icon" alt="X Logo" />
								)}
								{board[3] === "O" && (
									<img src={iconO} className="game-icon" alt="O Logo" />
								)}
							</td>
							<td
								onClick={() => handleClick(4)}
								className={
									xWon
										? xWinningLineRef.current.includes("4")
											? "active-x"
											: ""
										: oWon
										? oWinningLineRef.current.includes("4")
											? "active-o"
											: ""
										: ""
								}>
								{board[4] === "X" && (
									<img src={iconX} className="game-icon" alt="X Logo" />
								)}
								{board[4] === "O" && (
									<img src={iconO} className="game-icon" alt="O Logo" />
								)}
							</td>
							<td
								onClick={() => handleClick(5)}
								className={
									xWon
										? xWinningLineRef.current.includes("5")
											? "active-x"
											: ""
										: oWon
										? oWinningLineRef.current.includes("5")
											? "active-o"
											: ""
										: ""
								}>
								{board[5] === "X" && (
									<img src={iconX} className="game-icon" alt="X Logo" />
								)}
								{board[5] === "O" && (
									<img src={iconO} className="game-icon" alt="O Logo" />
								)}
							</td>
						</tr>
						<tr>
							<td
								onClick={() => handleClick(6)}
								className={
									xWon
										? xWinningLineRef.current.includes("6")
											? "active-x"
											: ""
										: oWon
										? oWinningLineRef.current.includes("6")
											? "active-o"
											: ""
										: ""
								}>
								{board[6] === "X" && (
									<img src={iconX} className="game-icon" alt="X Logo" />
								)}
								{board[6] === "O" && (
									<img src={iconO} className="game-icon" alt="O Logo" />
								)}
							</td>
							<td
								onClick={() => handleClick(7)}
								className={
									xWon
										? xWinningLineRef.current.includes("7")
											? "active-x"
											: ""
										: oWon
										? oWinningLineRef.current.includes("7")
											? "active-o"
											: ""
										: ""
								}>
								{board[7] === "X" && (
									<img src={iconX} className="game-icon" alt="X Logo" />
								)}
								{board[7] === "O" && (
									<img src={iconO} className="game-icon" alt="O Logo" />
								)}
							</td>
							<td
								onClick={() => handleClick(8)}
								className={
									xWon
										? xWinningLineRef.current.includes("8")
											? "active-x"
											: ""
										: oWon
										? oWinningLineRef.current.includes("8")
											? "active-o"
											: ""
										: ""
								}>
								{board[8] === "X" && (
									<img src={iconX} className="game-icon" alt="X Logo" />
								)}
								{board[8] === "O" && (
									<img src={iconO} className="game-icon" alt="O Logo" />
								)}
							</td>
						</tr>
					</tbody>
				</table>
				<div className="multiplayer-counter">
					<div>
						<p>X ({props.cpuPlayer === "O" ? "YOU" : "CPU"})</p>
						<h3>{xCounter}</h3>
					</div>
					<div>
						<p>TIES</p>
						<h3>{tieCounter}</h3>
					</div>
					<div>
						<p>O ({props.cpuPlayer === "X" ? "YOU" : "CPU"})</p>
						<h3>{oCounter}</h3>
					</div>
				</div>
				{restartPage && restartPageDiv()}
				{winnerFound
					? turn === "O"
						? winnerIsX()
						: winnerFound && turn === "X" && winnerIsO()
					: roundTied && roundTiedFunc()}
			</div>
		</>
	);
};

export default Multiplayer;
