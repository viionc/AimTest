import {TargetProps, useGameStatus} from "../context/useGameStatusContext";

type Target = {
    x: number;
    y: number;
    size: number;
};

const Target = (props: {target: TargetProps}) => {
    const {updateTargets, setTargetsClicked, setScore, gameStarted} = useGameStatus();
    const handleClick = (target: TargetProps) => {
        if (!gameStarted) return;
        target.growing = false;
        target.size = 0;
        target.clicked = true;
        updateTargets();
        setTargetsClicked((prev: number) => (prev += 1));
        setScore((prev: number) => prev + 1);
    };
    return (
        <div
            className="bg-danger rounded-circle target"
            style={{
                position: "absolute",
                top: props.target.position.y,
                left: props.target.position.x,
                height: props.target.size,
                width: props.target.size,
                //transition: `all ease 0.1s`,
            }}
            onClick={() => handleClick(props.target)}
        ></div>
    );
};

export default Target;
