import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Utils/authContext.jsx";

const ChangePassword = () => {
    const { sendChangePasswordEmail } = useAuth();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSendChangePasswordEmailClick = async (e) => {
        e.preventDefault();
        try {
            await sendChangePasswordEmail(email);
            setStatus("Request successful. Check your inbox!");
            setIsSuccess(true);
        } catch {
            setStatus(
                "There was an error while sending the request. Please try again."
            );
            setIsSuccess(false);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Request a password change
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        onSubmit={handleSendChangePasswordEmailClick}
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <NavLink
                                    to={"/login"}
                                    className="text-sm font-semibold leading-6 text-purple-600 hover:underline hover:invert"
                                >
                                    Back
                                </NavLink>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                            >
                                Submit request
                            </button>
                            {status && (
                                <span
                                    className={`p-4 font-bold text-center ${
                                        isSuccess
                                            ? "text-alert-success"
                                            : "text-alert-error"
                                    }`}
                                >
                                    {status}
                                </span>
                            )}
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Need more help? No can do sorry.
                    </p>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
