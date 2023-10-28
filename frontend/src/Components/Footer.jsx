const navigation = {
    main: [{ name: "Home", href: "/" }],
};

const Footer = () => {
    return (
        <footer className="bg-gray-900">
            <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
                <nav
                    className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
                    aria-label="Footer"
                >
                    {navigation.main.map((item) => (
                        <div key={item.name} className="pb-6">
                            <a
                                href={item.href}
                                className="text-sm leading-6 text-gray-300 hover:text-gray-500"
                            >
                                {item.name}
                            </a>
                        </div>
                    ))}
                </nav>
                <p className="mt-10 text-center text-xs leading-5 text-gray-500">
                    &copy; {new Date().getFullYear()} Calhacks 10.0
                </p>
            </div>
        </footer>
    );
};

export default Footer;
