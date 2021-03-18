import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router-dom";
function TopBar({ location }) {
    const { pathname } = location;
    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Navbar.Brand href="#home">Crypto Currency Portfolio App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/" active={pathname == "/"}
                        href="/">
                        Bitcoin Historical Rate
                    </Nav.Link>
                    <Nav.Link 
                        href="/historicBtcPurchases"
                        active={pathname.includes("/historicBtcPurchases")}>
                        Btc Purchases
                    </Nav.Link>
                    <Nav.Link
                        href="/bitcoin-portfolio"
                        active={pathname.includes("/bitcoin-portfolio")}>
                        Bitcoin Portfolio
                    </Nav.Link>
                    <Nav.Link
                        href="/ether-portfolio"
                        active={pathname.includes("/ether-portfolio")}>
                        Ether Portfolio
                    </Nav.Link>
                    <Nav.Link
                        href="/combine-portfolio"
                        active={pathname.includes("/combine-portfolio")}>
                        Combine Portfolio
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default withRouter(TopBar);