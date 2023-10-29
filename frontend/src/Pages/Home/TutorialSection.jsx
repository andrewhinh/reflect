import {
    MagnifyingGlassCircleIcon,
    CalendarDaysIcon,
    ShoppingCartIcon,
    BookOpenIcon,
    CursorArrowRaysIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/20/solid";

export default function TutorialSection() {
    return (
        <div className="bg-white">
            <main>
                <div className="mx-auto max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                    <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-1 lg:gap-x-8 lg:gap-y-16">
                        {/* 1 */}
                        <div
                            key="Find your market."
                            className="relative grid grid-cols-2 grid-rows-1 "
                        >
                            <div className="h-fit self-center">
                                <dt className="flex font-semibold text-gray-900 items-center gap-1">
                                    <MagnifyingGlassCircleIcon
                                        className="h-5 w-5 text-indigo-600"
                                        aria-hidden="true"
                                    />
                                    <p>Choose your category.</p>
                                </dt>{" "}
                                <dd className="inline">
                                    Navigate through the interview skill
                                    categories and select a one that you
                                    corresponds to the skills you want to
                                    practice.
                                </dd>
                            </div>
                            <img
                                src="\assets\categories_image.png"
                                alt="Categories Image"
                            ></img>
                        </div>

                        <div className="grid grid-cols-2 items-center justify-center">
                            <div className="flex flex-col gap-y-4">
                                {/* 2 */}
                                <div className="relative pl-9">
                                    <dt className="inline font-semibold text-gray-900">
                                        <CursorArrowRaysIcon
                                            className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                                            aria-hidden="true"
                                        />
                                        Read the question and click "Begin" to
                                        start recording.
                                    </dt>{" "}
                                    <dd className="inline">
                                        Once you hit the button your practice
                                        session is live! As soon as you feel you
                                        have answered the question sufficiently
                                        just click on the screen to stop the
                                        recording.
                                    </dd>
                                </div>
                            </div>
                            <img
                                className="place-self-center"
                                src="\assets\question_image.png"
                                alt="Example Question"
                                style={{
                                    maxHeight: "600px",
                                    maxWidth: "300px",
                                }}
                            ></img>
                        </div>

                        {/* 5 */}
                        <div
                            key="Watch your purchase grow!"
                            className="relative grid grid-cols-2 grid-rows-1 "
                        >
                            <div className="h-fit self-center">
                                <dt className="inline flex font-semibold text-gray-900 items-center gap-1">
                                    <MagnifyingGlassCircleIcon
                                        className="h-5 w-5 text-indigo-600"
                                        aria-hidden="true"
                                    />
                                    <p>
                                        <strong>Reflect</strong> on your
                                        session!
                                    </p>
                                </dt>{" "}
                                <dd className="inline">
                                    This step may take a few minutes - once our
                                    video analysis is complete you will have
                                    access to feedback on how you did!
                                </dd>
                            </div>
                            <img
                                src="\assets\result_image.png"
                                alt="Result Page"
                                className="overflow-hidden"
                            ></img>
                        </div>

                        {/* 6 */}
                        <div
                            key="Read more about your equity."
                            className="relative pl-9"
                        >
                            <dt className="inline font-semibold text-gray-900">
                                <BookOpenIcon
                                    className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                                    aria-hidden="true"
                                />
                                Big shoutout to the Calhacks team and their
                                Sponsors!
                            </dt>{" "}
                            <dd className="inline">
                                This project was made possible by the platforms
                                and venue offered by the 2023 Calhacks 10.0
                                team.{" "}
                            </dd>
                        </div>
                    </dl>
                </div>
            </main>
        </div>
    );
}
