import React from "react";
import { Nav, Container, Navbar, Button } from "react-bootstrap";

import "./navbar.scss";

export default function navbar() {
	return (
		<Container>
			<Navbar collapseOnSelect expand="lg" variant="dark" className="navbar">
				<Navbar.Brand href="/" className="logo">
					Banger&Co
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto"></Nav>
					<Nav>
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link>View Fleet</Nav.Link>
						<Nav.Link>Rent Car</Nav.Link>
						<Button
							variant="outline-light"
							size="sm"
							href="/login"
							className="button"
						>
							Login
						</Button>
						<Button
							variant="outline-light"
							size="sm"
							href="#"
							className="button"
						>
							Register
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);
}
