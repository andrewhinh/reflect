import Webcam from "react-webcam";

const videoConstraints = {
    facingMode: "user",
    width: 1280,
    height: 720,
};

const WebcamForm = ({ webcamRef }) => {
    return (
        <Webcam
            audio={true}
            videoConstraints={videoConstraints}
            mirrored={true}
            className="max-w-[75%] mx-auto border-8 border-white rounded-2xl"
            ref={webcamRef}
        />
    );
};

export default WebcamForm;
