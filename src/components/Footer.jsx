const Footer = () => {
    return (
        <footer className="border-t">
            <div className="container flex flex-col md:flex-row items-center justify-between py-8 space-y-4 md:space-y-0">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} BlogApp. All rights reserved.
                </p>
                <nav className="flex items-center space-x-4">Built with ❤ by Anuj</nav>
            </div>
        </footer>
    );
};

export default Footer;
