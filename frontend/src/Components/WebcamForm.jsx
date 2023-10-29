import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    facingMode: "user",
};

const WebcamForm = () => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [recordingURL, setRecordingURL] = useState(null);

    // MediaPlayer API webcam recording
    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start(10);
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm",
            });
            const url = URL.createObjectURL(blob);
            setRecordingURL(url);
            setRecordedChunks([]);
        }
    }, [mediaRecorderRef, setCapturing, recordedChunks]);

    const handleWebcamSubmit = async (e) => {
        e.preventDefault();
        let form = new FormData();
        let blob;

        if (recordingURL) {
            // Fetch the data from the URL and convert it into a blob
            const response = await fetch(recordingURL);
            blob = await response.blob();
        }

        // Create a File object from the Blob
        let file = new File(
            [blob],
            blob.type === "image/webp" ? "media.webp" : "media.webm",
            {
                type: blob.type,
            }
        );
    };

    return (
        <form onSubmit={handleWebcamSubmit} className="w-full">
            <div className="py-4 w-full flex flex-col md:flex-row gap-x-8 gap-y-4 place-content-center">
                <span className="w-fit isolate inline-flex rounded-md shadow-sm">
                    {capturing ? (
                        <button
                            onClick={handleStopCaptureClick}
                            type="button"
                            className="relative inline-flex items-center rounded-l-md bg-white hover:bg-gray-50 px-3 py-2 text-lg font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10"
                        >
                            Finish Interview
                        </button>
                    ) : (
                        <button
                            onClick={handleStartCaptureClick}
                            disabled={capturing || recordingURL}
                            type="button"
                            className={`relative inline-flex items-center rounded-l-md ${
                                capturing || recordingURL
                                    ? "bg-gray-300"
                                    : "bg-white hover:bg-gray-50"
                            }  px-3 py-2 text-lg font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10`}
                        >
                            Start Interview
                        </button>
                    )}
                </span>
                <span className="w-fit isolate inline-flex rounded-md shadow-sm">
                    <button
                        type="submit"
                        disabled={!recordingURL}
                        className="relative inline-flex items-center rounded-md bg-indigo-500 hover:bg-indigo-400 px-3 py-2 text-lg font-semibold text-white ring-1 ring-inset ring-gray-300 focus:z-10"
                    >
                        Submit
                    </button>
                </span>
            </div>
            <div className="w-full h-fit rounded-lg">
                {recordingURL && (
                    <video
                        autoPlay
                        className="mx-auto border-8 border-white rounded-2xl rotate mirrored"
                    >
                        <source src={recordingURL} type="video/webm" />
                    </video>
                )}

                {!recordingURL && (
                    <Webcam
                        audio={true}
                        videoConstraints={videoConstraints}
                        mirrored={true}
                        className="mx-auto border-8 border-white rounded-2xl"
                        ref={webcamRef}
                    />
                )}
            </div>
        </form>
    );
};

export default WebcamForm;
