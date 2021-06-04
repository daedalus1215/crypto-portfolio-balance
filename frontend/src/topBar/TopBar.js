import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router-dom";
import useGetPortfolios from "../hooks/useGetPortfolios";

function TopBar({ location }) {
    const { pathname } = location;
    const portfolios = useGetPortfolios();

    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Navbar.Brand href="/">Crypto Currency Portfolio App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {portfolios?.map(p => (<Nav.Link
                        href={"/" + p.code}
                        active={pathname.includes("/" + p.code)}>
                        {p.name}
                    </Nav.Link>))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default withRouter(TopBar);