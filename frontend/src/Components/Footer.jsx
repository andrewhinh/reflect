import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-center lg:px-8">
                <div className="mt-8 md:order-1 md:mt-0">
                    <p className="text-center text-xs leading-5 text-gray-500">
                        Andrew Hinh, Hajin Park, Ryan Lee, Gordon Mui
                    </p>
                    <p className="text-center text-xs leading-5 text-gray-500">
                        Calhacks 10.0
                    </p>
                    <div className="flex justify-center space-x-6 md:order-2">
                        <a
                            key={"Github"}
                            href={"https://github.com/andrewhinh/aurora"}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">{"Github"}</span>
                            <AiFillGithub
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
