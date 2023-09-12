import {ReactNode, createContext, useContext, useState} from "react";

export type TargetProps = {
    position: Position;
    size: number;
    growing: boolean;
    clicked: boolean;
};

type Position = {
    x: number;
    y: number;
};

type GameStatusContext = {
    targets: Array<TargetProps>;
    setTargets: Function;
    score: number;
    speed: number;
    setSpeed: Function;
    clicks: number;
    setScore: Function;
    missedClicks: number;
    startGame: () => void;
    gameResolution: Position;
    changeGameResolution: (x: number, y: number) => void;
    createNewTarget: () => TargetProps;
    setMissedClicks: Function;
    setClicks: Function;
    updateTargets: () => void;
    targetsClicked: number;
    setTargetsClicked: Function;
    gameStarted: boolean;
    setGameStarted: Function;
    targetsMissed: number;
    currentTimer: number;
    setCurrentTimer: Function;
    setSelectedTimer: Function;
    selectedTimer: number;
    restartStats: () => void;
    setSelectedSpeed: Function;
    selectedSpeed: number;
};

const GameStatusContext = createContext({} as GameStatusContext);

type GameStatusProviderProps = {
    children: ReactNode;
};

export function useGameStatus() {
    return useContext(GameStatusContext);
}

export function GameStatusProvider({children}: GameStatusProviderProps) {
    const [score, setScore] = useState(0);
    const [selectedSpeed, setSelectedSpeed] = useState(1);
    const [speed, setSpeed] = useState(selectedSpeed);
    const [missedClicks, setMissedClicks] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [targetsClicked, setTargetsClicked] = useState(0);
    const [targetSize, setTargetSize] = useState(10);
    const [targets, setTargets] = useState([] as TargetProps[]);
    const [gameStarted, setGameStarted] = useState(false);
    const [targetsMissed, setTargetsMissed] = useState(0);
    const [selectedTimer, setSelectedTimer] = useState(60);
    const [currentTimer, setCurrentTimer] = useState(selectedTimer);

    const [gameResolution, setGameResolution] = useState({x: 1200, y: 800} as Position);

    function startGame() {
        setScore(0);
        setTargets([]);
        setSpeed(1);
    }

    const getNewPosition = (x: number, y: number): Position => {
        let maxX = x - targetSize * 3;
        let maxY = y - targetSize * 3;
        let positionX = Math.floor(Math.random() * maxX);
        let positionY = Math.floor(Math.random() * maxY);
        return {x: positionX, y: positionY};
        setTargetSize(0);
    };

    const createNewTarget = () => {
        let newPosition = getNewPosition(gameResolution.x, gameResolution.y);
        let newTarget = {
            position: {
                x: newPosition.x,
                y: newPosition.y,
            },
            size: 10,
            growing: true,
            clicked: false,
        };

        return newTarget;
    };

    function updateTargets() {
        setTargets((prev: TargetProps[]) => {
            prev.forEach((target: TargetProps) => {
                if (target.size <= 0 && !target.clicked) setTargetsMissed(prev => prev + 1);
            });
            return (prev = prev.filter(t => t.size > 0));
        });
    }

    function changeGameResolution(x: number, y: number) {
        setGameResolution({x, y});
    }

    function restartStats() {
        setCurrentTimer(selectedTimer);
        setTargets([]);
        setScore(0);
        setMissedClicks(0);
        setTargetsMissed(0);
        setSpeed(selectedSpeed);
        setTargetsClicked(0);
    }

    return (
        <GameStatusContext.Provider
            value={{
                targets,
                setTargets,
                score,
                speed,
                clicks,
                missedClicks,
                startGame,
                changeGameResolution,
                gameResolution,
                createNewTarget,
                setMissedClicks,
                setClicks,
                setSpeed,
                updateTargets,
                targetsClicked,
                setTargetsClicked,
                setScore,
                gameStarted,
                setGameStarted,
                targetsMissed,
                currentTimer,
                setCurrentTimer,
                setSelectedTimer,
                selectedTimer,
                restartStats,
                setSelectedSpeed,
                selectedSpeed,
            }}
        >
            {children}
        </GameStatusContext.Provider>
    );
}
