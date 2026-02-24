export default function Projects() {
    return (
        <main className="relative min-h-screen bg-black text-green-500 selection:bg-green-500 selection:text-black overflow-x-hidden">
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <h1 className="text-4xl font-bold mb-6">My Projects</h1>
                <p className="text-lg max-w-2xl text-center mb-8">
                    Here are some of the projects I've worked on. Each project is a unique blend of creativity and technical skill, showcasing my passion for frontend development and design.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="project-card bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-green-500">
                        <h2 className="text-2xl font-bold mb-4">Project One</h2>
                        <p className="text-green-400 mb-4">
                            A web application that allows users to track their tasks and manage their time effectively. Built with React and Node.js, it features a sleek interface and powerful functionality.
                        </p>
                        <a href="#" className="text-green-500 hover:text-green-400 transition-colors duration-300">
                            View Project
                        </a>
                    </div>
                    <div className="project-card bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-green-500">
                        <h2 className="text-2xl font-bold mb-4">Project Two</h2>
                        <p className="text-green-400 mb-4">
                            An e-commerce platform designed to provide a seamless shopping experience. Developed using Next.js and Tailwind CSS, it features a responsive design and intuitive user interface.
                        </p>
                        <a href="#" className="text-green-500 hover:text-green-400 transition-colors duration-300">
                            View Project
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}