import {useGameStatus} from "../context/useGameStatusContext";

export default function StatsScreen() {
    const {missedClicks, targetsClicked, score, targetsMissed, gameResolution} = useGameStatus();
    function calcAccuracy() {
        return ((targetsClicked / (targetsClicked + missedClicks)) * 100).toFixed(2) || 0;
    }
    return (
        <div
            className="border border-white position-relative border rounded text-white p-3"
            style={{
                top: "200px",
                left: gameResolution.x / 2,
                transform: "translate(-50%, -50%)",
                fontSize: "2rem",
                width: "40%",
                backgroundColor: "rgb(33 91 64)",
            }}
        >
            <h2>Stats:</h2>
            <div className="d-flex justify-content-between">
                <span>Score: </span>
                <span>{score}</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Targets Hit: </span>
                <span>{targetsClicked}</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Accuracy: </span>
                <span>{calcAccuracy()}%</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Missed Clicks: </span>
                <span>{missedClicks}</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Unclicked targets: </span>
                <span>{targetsMissed}</span>
            </div>
        </div>
    );
}
