import { NavLink } from "react-router-dom";
import { useAuth } from "../Utils/authContext.jsx";
import WebcamForm from "../Components/WebcamForm.jsx";

export default function Interview() {
    const { currentUser } = useAuth();

    return (
        <div className="text-center px-6 pt-10 pb-20 sm:px-10 md:px-14">
            <div className="pb-6 text-2xl font-medium text-neutral-800">
                Mock Interview
            </div>
            {currentUser ? (
                <WebcamForm />
            ) : (
                <section className="h-screen">
                    <h1 className="py-8 font-black text-3xl">
                        Create an account!
                    </h1>
                    <NavLink
                        to="/login"
                        className="text-purple-600 hover:underline hover:invert"
                    >
                        Login In!
                    </NavLink>
                </section>
            )}
        </div>
    );
}
