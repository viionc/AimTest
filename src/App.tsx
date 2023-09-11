import {Container, Nav, Navbar, Row} from "react-bootstrap";
import GameWindow from "./components/GameWindow";
import Menu from "./components/Menu";
import {GameStatusProvider} from "./context/useGameStatusContext";

function App() {
    return (
        <>
            <GameStatusProvider>
                <Navbar className="bg-primary shadow-lg mb-4 text-white">
                    <Container>
                        <Nav className="me-auto">
                            <h1>Aim Test</h1>
                        </Nav>
                    </Container>
                </Navbar>
                <Container>
                    <Row>
                        <Menu></Menu>
                        <GameWindow></GameWindow>
                    </Row>
                </Container>
            </GameStatusProvider>
        </>
    );
}

export default App;
