import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.js";

export default function StartInterview({
    setSelectedCategory,
    setInterviewState,
}) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const categoryCollectionsRef = collection(db, "categories");
        const unsubscribe = onSnapshot(categoryCollectionsRef, (col) => {
            setCategories(col.docs.map((doc) => doc.id));
        });
        return unsubscribe;
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setInterviewState((e) => e + 1);
    };

    return (
        <div className="min-h-screen relative isolate overflow-hidden bg-gray-900">
            <div className="px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Mock Interview
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                        Select your category. Each one has a different set of
                        questions that aim to target a set of particular skills
                        or topics during the interview.
                    </p>
                    <div className="pt-4 pb-24 sm:pb-16">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() =>
                                            handleCategoryClick(category)
                                        }
                                        className="text-stone-200 font-semibold bg-white/5 p-8 sm:p-10 hover:bg-slate-800 transition-colors"
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-x-6"></div>
                </div>
            </div>
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
