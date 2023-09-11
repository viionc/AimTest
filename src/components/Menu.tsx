import {Button, Col} from "react-bootstrap";
import {useGameStatus} from "../context/useGameStatusContext";
import {useState} from "react";

export default function Menu() {
    const {changeGameResolution, setSpeed, speed} = useGameStatus();
    const [size, setSize] = useState(2);
    const [menuSpeed, setMenuSpeed] = useState(speed);

    function handleClick(w: number, h: number, size: number) {
        changeGameResolution(w, h);
        setSize(size);
    }

    return (
        <Col className="d-flex flex-column justify-content-center align-items-center">
            <span className="pb-2 text-white fs-3">Resolution</span>
            <div className="input-group mb-3">
                <Button
                    disabled={size == 0 ? true : false}
                    onClick={() => handleClick(800, 400, 0)}
                >
                    Small
                </Button>
                <Button
                    disabled={size == 1 ? true : false}
                    onClick={() => handleClick(1000, 600, 1)}
                >
                    Medium
                </Button>
                <Button
                    disabled={size == 2 ? true : false}
                    onClick={() => handleClick(1200, 800, 2)}
                >
                    Big
                </Button>
            </div>
            <span className="pb-2 text-white fs-3">Starting Speed:</span>
            <div className="input-group mb-3">
                <Button
                    disabled={menuSpeed == 1 ? true : false}
                    onClick={() => {
                        setSpeed(1);
                        setMenuSpeed(1);
                    }}
                >
                    Slow
                </Button>
                <Button
                    disabled={menuSpeed == 2 ? true : false}
                    onClick={() => {
                        setSpeed(2);
                        setMenuSpeed(2);
                    }}
                >
                    Medium
                </Button>
                <Button
                    disabled={menuSpeed == 3 ? true : false}
                    onClick={() => {
                        setSpeed(3);
                        setMenuSpeed(3);
                    }}
                >
                    Fast
                </Button>
            </div>
        </Col>
    );
}
