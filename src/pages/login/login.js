import React from "react";

import "./login.scss";

import Navbar from "../../components/navbar/navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function login() {
	return (
		<div className="main">
			<Navbar />
			<Container className="container-main">
				<Row>
					<Col>
						<h2 className="title">SIGN IN </h2>
						<p className="description">
							Fringilla ut morbi tincidunt augue interdum velit euismod in
							pellentesque. At risus viverra adipiscing at in tellus integer. Id
							aliquet lectus proin nibh nisl condimentum id venenatis. Laoreet
							id donec ultrices tincidunt. Bibendum at varius vel pharetra.
							Viverra adipiscing at in tellus integer. Amet volutpat consequat
							mauris nunc congue nisi vitae suscipit. Pretium viverra
							suspendisse potenti nullam ac tortor. Et egestas quis ipsum
							suspendisse. Cursus in hac habitasse platea dictumst quisque. Mi
							proin sed libero enim sed faucibus turpis in eu.
						</p>
					</Col>
					<Col>
						<Card className="card">
							<Card.Body>
								<h2 className="logo">Banger&Co</h2>
								<Form>
									<Form.Group controlId="formBasicEmail">
										<Form.Label className="label">Email address</Form.Label>
										<Form.Control
											type="email"
											placeholder="Enter email"
											className="form"
										/>
									</Form.Group>

									<Form.Group controlId="formBasicPassword">
										<Form.Label className="label">Password</Form.Label>
										<Form.Control
											type="password"
											placeholder="Password"
											className="form"
										/>
									</Form.Group>
									<Button
										variant="primary"
										type="submit"
										className="submit-button"
									>
										Submit
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
