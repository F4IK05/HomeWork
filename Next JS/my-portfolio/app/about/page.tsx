export default function About() {
    return (
        <main className="relative min-h-screen bg-black text-green-500 selection:bg-green-500 selection:text-black overflow-x-hidden">
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <h1 className="text-4xl font-bold mb-6">About Me</h1>
                <p className="text-lg max-w-2xl text-center mb-8">
                    I'm a passionate frontend developer with a love for creating immersive digital experiences. With a background in design and a knack for coding, I specialize in crafting visually stunning and highly interactive web applications. My journey in tech has been fueled by curiosity and a desire to push the boundaries of what's possible on the web.
                </p>
                <p className="text-lg max-w-2xl text-center mb-8">
                    When I'm not coding, you can find me exploring the latest trends in UI/UX design, experimenting with
    new frontend technologies, or diving into the world of pixel art. I'm always eager to connect with fellow developers and creatives, so feel free to reach out!
                </p>
            </div>
        </main>
    );
}