import {Button, Col} from "react-bootstrap";
import {useGameStatus} from "../context/useGameStatusContext";
import {useState} from "react";

export default function Menu() {
    const {
        changeGameResolution,
        setSpeed,
        setSelectedTimer,
        selectedTimer,
        setCurrentTimer,
        setSelectedSpeed,
        selectedSpeed,
        gameStarted,
        targetMode,
        setTargetMode,
    } = useGameStatus();
    const [size, setSize] = useState(2);

    function handleClick(w: number, h: number, size: number) {
        changeGameResolution(w, h);
        setSize(size);
    }

    function handleDisabled(key: string, value: number | string) {
        if (gameStarted) return true;
        switch (key) {
            case "size":
                if (size === value) return true;
                return false;
            case "speed":
                if (selectedSpeed === value) return true;
                return false;
            case "timer":
                if (selectedTimer === value) return true;
                return false;
            case "target":
                if (targetMode === value) return true;
                return false;
        }
    }

    return (
        <Col className="d-flex flex-column justify-content-center align-items-center">
            <span className="pb-2 text-white fs-3">Resolution</span>
            <div className="input-group mb-3">
                <Button
                    disabled={handleDisabled("size", 0)}
                    onClick={() => handleClick(800, 400, 0)}
                >
                    Small
                </Button>
                <Button
                    disabled={handleDisabled("size", 1)}
                    onClick={() => handleClick(1000, 600, 1)}
                >
                    Medium
                </Button>
                <Button
                    disabled={handleDisabled("size", 2)}
                    onClick={() => handleClick(1200, 800, 2)}
                >
                    Big
                </Button>
            </div>
            <span className="pb-2 text-white fs-3">Starting Speed:</span>
            <div className="input-group mb-3">
                <Button
                    disabled={handleDisabled("speed", 1)}
                    onClick={() => {
                        setSpeed(1);
                        setSelectedSpeed(1);
                    }}
                >
                    Slow
                </Button>
                <Button
                    disabled={handleDisabled("speed", 2)}
                    onClick={() => {
                        setSpeed(2);
                        setSelectedSpeed(2);
                    }}
                >
                    Medium
                </Button>
                <Button
                    disabled={handleDisabled("speed", 3)}
                    onClick={() => {
                        setSpeed(3);
                        setSelectedSpeed(3);
                    }}
                >
                    Fast
                </Button>
            </div>
            <span className="pb-2 text-white fs-3">Time:</span>
            <div className="input-group mb-3">
                <Button
                    disabled={handleDisabled("timer", 30)}
                    onClick={() => {
                        setCurrentTimer(30);
                        setSelectedTimer(30);
                    }}
                >
                    30s
                </Button>
                <Button
                    disabled={handleDisabled("timer", 60)}
                    onClick={() => {
                        setCurrentTimer(60);
                        setSelectedTimer(60);
                    }}
                >
                    60s
                </Button>
                <Button
                    disabled={handleDisabled("timer", 90)}
                    onClick={() => {
                        setCurrentTimer(90);
                        setSelectedTimer(90);
                    }}
                >
                    90s
                </Button>
            </div>
            <span className="pb-2 text-white fs-3">Target:</span>
            <div className="input-group mb-3">
                <Button
                    disabled={handleDisabled("target", "dynamic")}
                    onClick={() => setTargetMode("dynamic")}
                >
                    Dynamic
                </Button>
                <Button
                    disabled={handleDisabled("target", "static")}
                    onClick={() => setTargetMode("static")}
                >
                    Static
                </Button>
            </div>
        </Col>
    );
}
