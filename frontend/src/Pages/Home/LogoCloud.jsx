export default function LogoCloud() {
    return (
        <div className="bg-white pb-4">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex">
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <img
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="\assets\humeailogo.png"
                        alt="FastAPI Logo"
                        width={158}
                        height={48}
                    />
                    <img
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="\assets\gptlogo.png"
                        alt="Openai GPT Logo"
                        width={158}
                        height={48}
                    />
                    <img
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="\assets\fastapilogo.png"
                        alt="FastAPI Logo"
                        width={158}
                        height={48}
                    />
                    <img
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="\assets\firebaselogo.png"
                        alt="Firebase Logo"
                        width={158}
                        height={48}
                    />
                    <img
                        className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                        src="\assets\reactlogo.png"
                        alt="React.js Logo"
                        width={158}
                        height={48}
                    />
                    <img
                        className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                        src="\assets\reflectailogo.png"
                        alt="Reflect AI Logo"
                        width={158}
                        height={48}
                    />
                </div>
            </div>
        </div>
    );
}
