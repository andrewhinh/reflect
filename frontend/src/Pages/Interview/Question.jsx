import { useCallback, useRef, useState, useEffect } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { doc, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../firebase.js";
import { useAuth } from "../../Utils/authContext.jsx";
import WebcamForm from "./WebcamForm";
import Modal from "../../Components/Modal.jsx";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function Question({
    category,
    setInterviewState,
    interviewState,
    sessionId,
}) {
    const { currentUser } = useAuth();
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [questions, setQuestions] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const categoryDocRef = doc(db, "categories", category);
        const userDocRef = doc(db, "users", currentUser.uid);
        onSnapshot(categoryDocRef, (doc) => {
            setQuestions(doc.data());
        });
        onSnapshot(userDocRef, (doc) => {
            setUserData(doc.data());
        });
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
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start(10);
    }, [webcamRef, mediaRecorderRef, handleDataAvailable]);

    const handleWebcamSubmit = async () => {
        mediaRecorderRef.current.stop();
        if (recordedChunks.length) {
            const videoBlob = new Blob(recordedChunks, {
                type: "video/webm",
            });
            const url = URL.createObjectURL(videoBlob);

            if (url) {
                // Fetch the data from the URL and convert it into a blob
                const response = await fetch(url);
                let blob = await response.blob();

                // Create a File object from the Blob
                let file = new File(
                    [blob],
                    blob.type === "image/webp" ? "media.webp" : "media.webm",
                    {
                        type: blob.type,
                    }
                );
                uploadFile(file);
            }
        }
        setInterviewState((e) => e + 1);
    };

    const uploadFile = async (file) => {
        let id = crypto.randomUUID();
        try {
            const userStorageID = currentUser.uid;
            const userStorageRef = ref(
                storage,
                `${userStorageID}/${sessionId}/${id}`
            );
            await uploadBytes(userStorageRef, file);
            sendHumeRequest(id);
            console.log("Successfully uploaded file");
        } catch (e) {
            console.log("Error uploading file: ", e);
        }
    };

    const sendHumeRequest = async (id) => {
        const data = {
            bucket_name: "calhacks-10.appspot.com",
            remote_storage_path: `${currentUser.uid}/${sessionId}/${id}`,
        };
        try {
            const response = await fetch(
                `http://localhost:8000/emotion?bucket_name=${data.bucket_name}&remote_storage_path=${data.remote_storage_path}&question=${questions[`question_${interviewState}`]}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:8000",
                        "Access-Control-Allow-Credentials": "true",
                    },
                    mode: "no-cors",
                }
            );
            console.log(await response.text());
            if (!response.ok) {
                throw new Error("Network response was not OK");
            }
            let text = await response.text();
            console.log(JSON.parse(text));
        } catch (error) {
            console.error(
                "There has been a problem with your POST operation: ",
                error
            );
        }
    };

    const handleExitClick = () => {
        setInterviewState(0);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 min-h-screen relative isolate overflow-hidden bg-gray-900">
            <section className="absolute top-0">
                {Object.keys(questions).length >= interviewState && (
                    <Modal
                        number={`Question ${interviewState}`}
                        question={questions[`question_${interviewState}`]}
                        handleStartCaptureClick={handleStartCaptureClick}
                    />
                )}
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
            {Object.keys(questions).length >= interviewState ? (
                <main onClick={handleWebcamSubmit} className="-mt-32 ">
                    <div className="mx-auto max-w-7xl">
                        <div className="max-h-[60%] rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                            <section className="w-full">
                                <p className="animate-pulse text-center text-lg font-normal">
                                    Click anywhere to finish
                                </p>
                                <div className="w-full h-fit rounded-lg">
                                    {/* {recordingURL && (
                                    <video
                                        autoPlay
                                        className="mx-auto border-8 border-white rounded-2xl rotate mirrored"
                                    >
                                        <source
                                            src={recordingURL}
                                            type="video/webm"
                                        />
                                    </video>
                                )} */}

                                    <WebcamForm webcamRef={webcamRef} />
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            ) : (
                <main>
                    <div className="mx-auto max-w-7xl">
                        <div className="h-full rounded-lg bg-white px-5 py-6 shadow sm:px-6">
                            <section className="w-full text-center space-y-8">
                                <h1 className="">
                                    Congratulations! You have completed all
                                    interview questions. 🎉
                                </h1>
                                <p className="">Review your answers or exit.</p>
                                <button
                                    type="button"
                                    onClick={handleExitClick}
                                    className="self-center inline-flex h-fit w-fit items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <XCircleIcon
                                        className="-ml-0.5 h-5 w-5"
                                        aria-hidden="true"
                                    />
                                    Exit
                                </button>
                            </section>
                        </div>
                    </div>
                </main>
            )}

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
