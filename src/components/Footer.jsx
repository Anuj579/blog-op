import { Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t">
            <div className="container flex items-center justify-between py-8 ">
                <p className="flex items-center space-x-4 text-muted-foreground">Built with ❤ by Anuj</p>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <a href="https://x.com/anuj_549" target="_blank" rel="noopener noreferrer" className=" hover:text-blue-600 dark:hover:text-[#03d819]">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/anujchaudhary549/" target="_blank" rel="noopener noreferrer" className=" hover:text-blue-600 dark:hover:text-blue-400">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
