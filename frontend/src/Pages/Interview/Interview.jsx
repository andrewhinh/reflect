import { useState, useId } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Utils/authContext.jsx";
import StartInterview from "./StartInterview.jsx";
import Question from "./Question.jsx";
import NavigationBar from "../../Components/NavigationBar.jsx";

export default function Interview() {
    const { currentUser } = useAuth();
    const [interviewState, setInterviewState] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sessionId, setSessionId] = useState(crypto.randomUUID());

    return currentUser ? (
        <section className="h-screen bg-white">
            {interviewState == 0 ? (
                <>
                    <NavigationBar />
                    <StartInterview
                        setSelectedCategory={setSelectedCategory}
                        setInterviewState={setInterviewState}
                    />
                </>
            ) : (
                <Question
                    category={selectedCategory}
                    interviewState={interviewState}
                    setInterviewState={setInterviewState}
                    sessionId={sessionId}
                />
            )}
        </section>
    ) : (
        <section className="text-center min-h-screen">
            <NavLink
                to="/login"
                className="text-6xl font-black text-blue-900 hover:underline hover:invert"
            >
                Please log in
            </NavLink>
        </section>
    );
}
