import {Col} from "react-bootstrap";
import Game from "./Game";

export default function GameWindow() {
    return (
        <Col xs={10} className="d-flex flex-column justify-content-center align-items-center">
            <Game></Game>
        </Col>
    );
}
