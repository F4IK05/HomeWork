export default function Contact() {
    return (
        <main className="relative min-h-screen bg-black text-green-500 selection:bg-green-500 selection:text-black overflow-x-hidden">
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
                <p className="text-lg max-w-2xl text-center mb-8">
                    I'm always open to new opportunities and collaborations. Whether you have a project in mind, want to chat about frontend development, or just want to say hi, feel free to reach out!
                </p>
                <div className="flex space-x-6">
                    <a href="mailto:faikhasanov05@gmail.com" className="text-lg font-mono text-green-500 hover:text-green-400 transition-colors duration-300">
                        Email: faikhasanov05@gmail.com
                    </a>
                    <a href="https://www.linkedin.com/in/faik-hasanov/" target="_blank" rel="noopener noreferrer" className="text-lg font-mono text-green-500 hover:text-green-400 transition-colors duration-300">
                        LinkedIn
                    </a>
                </div>
            </div>
        </main>
    );
}