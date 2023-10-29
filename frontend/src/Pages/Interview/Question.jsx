import { useCallback, useRef, useState, useEffect } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { doc, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../firebase.js";
import { useAuth } from "../../Utils/authContext.jsx";
import WebcamForm from "./WebcamForm";
import Modal from "../../Components/Modal.jsx";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function Question({ category, setInterviewState }) {
    const { currentUser } = useAuth();
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [recordingURL, setRecordingURL] = useState(null);
    const [questions, setQuestions] = useState({});
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);

    useEffect(() => {
        const docRef = doc(db, "categories", category);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            setQuestions(doc.data());
        });
        return unsubscribe;
    }, []);

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
        handleFileUpload(file);
    };

    const handleFileUpload = async (file) => {
        try {
            const userStorageID = currentUser.uid;
            const userStorageRef = ref(
                storage,
                `${userStorageID}/${crypto.randomUUID()}`
            );
            await uploadBytes(userStorageRef, file);
            console.log("Successfully uploaded file");
            setUploadSuccess(true);
            setUploadStatus("File uploaded!");
        } catch (e) {
            console.log("Error uploading file: ", e);
            setUploadSuccess(false);
            setUploadStatus("Upload failed");
        }
    };

    const handleExitClick = () => {
        setInterviewState(0);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 min-h-screen relative isolate overflow-hidden bg-gray-900">
            <section className="absolute top-0">
                <Modal
                    number="Question 1"
                    question={questions["question_1"]}
                    handleStartCaptureClick={handleStartCaptureClick}
                />
            </section>
            <div className="w-full pb-32 flex flex-col sm:flex-row justify-between">
                <header className="py-5">
                    <div className="mx-auto max-w-7xl">
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            {category}
                        </h1>
                    </div>
                </header>
                <button
                    type="button"
                    onClick={handleExitClick}
                    className="self-center inline-flex h-fit items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <XCircleIcon
                        className="-ml-0.5 h-5 w-5"
                        aria-hidden="true"
                    />
                    Exit
                </button>
            </div>
            <main className="-mt-32 ">
                <div className="mx-auto max-w-7xl">
                    <div className="max-h-[60%] rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                        <form onSubmit={handleWebcamSubmit} className="w-full">
                            <div className="w-full flex flex-col md:flex-row gap-x-8 gap-y-4 place-content-center">
                                <span className="w-fit isolate inline-flex rounded-md shadow-sm">
                                    <button
                                        type="submit"
                                        disabled={!recordingURL}
                                        className="relative inline-flex items-center rounded-md bg-indigo-500 hover:bg-indigo-400 px-3 py-2 text-lg font-semibold text-white ring-1 ring-inset ring-gray-300 focus:z-10"
                                    >
                                        Complete
                                    </button>
                                </span>
                            </div>
                            <div className="w-full h-fit rounded-lg">
                                {recordingURL && (
                                    <video
                                        autoPlay
                                        className="mx-auto border-8 border-white rounded-2xl rotate mirrored"
                                    >
                                        <source
                                            src={recordingURL}
                                            type="video/webm"
                                        />
                                    </video>
                                )}

                                {!recordingURL && (
                                    <WebcamForm webcamRef={webcamRef} />
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                aria-hidden="true"
            >
                <circle
                    cx={512}
                    cy={512}
                    r={512}
                    fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
                    fillOpacity="0.7"
                />
                <defs>
                    <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                        <stop stopColor="#7775D6" />
                        <stop offset={1} stopColor="#E935C1" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
}
