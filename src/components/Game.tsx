import {Button, Container} from "react-bootstrap";
import {TargetProps, useGameStatus} from "../context/useGameStatusContext";
import Target from "../components/Target";
import {useEffect, useState} from "react";

export default function Game() {
    const {
        gameResolution,
        createNewTarget,
        targets,
        setTargets,
        speed,
        setSpeed,
        updateTargets,
        targetsClicked,
        setMissedClicks,
        score,
        gameStarted,
        setGameStarted,
    } = useGameStatus();
    const [timer, setTimer] = useState(15);
    const [lastSpeedChange, setLastSpeedChange] = useState(0);

    function gameAreaClicked(e) {
        if (e.target.closest(".target")) return;
        setMissedClicks((prev: number) => prev + 1);
    }

    useEffect(() => {
        if (!gameStarted) return;
        const interval = setInterval(() => {
            setTargets((prev: TargetProps[]) => {
                prev.forEach(target => {
                    if (target.growing) {
                        target.size += speed;
                    } else {
                        target.size -= speed;
                    }
                    if (target.size >= 90) target.growing = false;
                });
                return prev;
            });
        }, 100);
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [gameStarted]);

    useEffect(() => {
        if (!gameStarted) return;
        console.log(1000 / speed);
        const interval = setInterval(() => {
            setTargets((prev: TargetProps[]) => {
                let newTarget = createNewTarget();
                if (prev.length >= 3 + Math.floor(targetsClicked / 10)) return prev;
                return [...prev, newTarget];
            });
        }, 1000 / speed);
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [gameStarted, speed]);

    useEffect(() => {
        if (targetsClicked % 4 == 0 && targetsClicked != lastSpeedChange && targetsClicked) {
            setSpeed((prev: number) => (prev += 0.3));
            setLastSpeedChange(prev => (prev = targetsClicked));
        }
    }, [targetsClicked]);

    useEffect(() => {
        if (!gameStarted) return;
        const interval = setInterval(() => {
            setTimer((prev: number) => {
                if (prev <= 0) setGameStarted(false);
                return (prev -= 0.1);
            });
            updateTargets();
        }, 100);
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [gameStarted]);

    return (
        <Container
            id="game"
            className="position-relative border border-white"
            style={{height: gameResolution.y, width: gameResolution.x}}
            onClick={e => gameAreaClicked(e)}
        >
            <div className="d-flex justify-content-between">
                <h1 className="text-white">{Math.floor(timer)}</h1>{" "}
                <h1 className="text-white">{score}</h1>
            </div>

            {!gameStarted && (
                <Button
                    className="position-absolute"
                    style={{
                        top: gameResolution.y / 2,
                        left: gameResolution.x / 2,
                        transform: "translate(-50%, -50%)",
                        padding: "15px",
                        fontSize: "2rem",
                    }}
                    onClick={() => setGameStarted(true)}
                >
                    Start Game
                </Button>
            )}
            {targets.map(target => {
                return (
                    <Target target={target} key={target.position.x * target.position.y}></Target>
                );
            })}
        </Container>
    );
}
