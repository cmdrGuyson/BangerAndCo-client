//MODULE IMPORT
import React from "react";
import { Container } from "react-bootstrap";
//CSS IMPORT
import "./home.scss";
//COMPONENT IMPORT
import RentNow from "../../components/rent_now/rent_now";
import Navbar from "../../components/navbar/navbar";

export default function home() {
	return (
		<div className="top_image">
			<Navbar />
			<Container style={{ textAlign: "center" }}>
				<h2 className="title">Rent Now!</h2>
				<p className="description">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
				</p>

				<RentNow />
				<h2 className="about-title">About us</h2>
				<p className="about-description">
					Fringilla ut morbi tincidunt augue interdum velit euismod in
					pellentesque. At risus viverra adipiscing at in tellus integer. Id
					aliquet lectus proin nibh nisl condimentum id venenatis. Laoreet id
					donec ultrices tincidunt. Bibendum at varius vel pharetra. Viverra
					adipiscing at in tellus integer. Amet volutpat consequat mauris nunc
					congue nisi vitae suscipit. Pretium viverra suspendisse potenti nullam
					ac tortor. Et egestas quis ipsum suspendisse. Cursus in hac habitasse
					platea dictumst quisque. Mi proin sed libero enim sed faucibus turpis
					in eu.
				</p>
			</Container>
		</div>
	);
}
