import {Col} from "react-bootstrap";
import Game from "./Game";
import ScoreBoard from "./ScoreBoard";

export default function GameWindow() {
    return (
        <Col xs={10} className="d-flex flex-column justify-content-center align-items-center">
            <ScoreBoard></ScoreBoard>
            <Game></Game>
        </Col>
    );
}
