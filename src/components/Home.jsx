import React, { useState } from "react";
import iconX from "../starter-code/assets/icon-x-outline.svg";
import iconO from "../starter-code/assets/icon-o-outline.svg";
import Logo from "../starter-code/assets/logo.svg";
import { Link } from "react-router-dom";

const Home = (props) => {
	const [activeBtn, setActiveBtn] = useState("1");
	const handleClick = (e) => {
		setActiveBtn(e.target.id);
		props.activePlayer(e);
	};
	return (
		<div className="home-page">
			<div className="home-page-top">
				<img src={Logo} alt="Logo Icon" />
			</div>
			<div className="home-page-mid">
				<p>PICK PLAYER 1'S MARK</p>
				<div className="home-page-mid-buttons">
					<div
						id="1"
						onClick={handleClick}
						className={activeBtn === "1" ? "active" : ""}>
						<button id="1" onClick={handleClick}>
							<img src={iconX} id="1" onClick={handleClick} alt="X Icon" />
						</button>
					</div>
					<div
						id="2"
						onClick={handleClick}
						className={activeBtn === "2" ? "active" : ""}>
						<button id="2" onClick={handleClick}>
							<img src={iconO} id="2" onClick={handleClick} alt="O Icon" />
						</button>
					</div>
				</div>
				<p>REMEMBER: X GOES FIRST</p>
			</div>
			<div className="home-page-bottom">
				<Link to="/solo">
					<button className="home-page-bottom-solo-btn">
						NEW GAME (VS CPU)
					</button>
				</Link>
				<Link to="/multiplayer">
					<button className="home-page-bottom-multiplayer-btn">
						NEW GAME (VS PLAYER)
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Home;
