export default function ApplicationLogo(props) {
    return (
        <>
            <style jsx>{`
                @keyframes logoGlow {
                    0%,
                    100% {
                        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
                    }
                    50% {
                        text-shadow: 0 0 20px rgba(255, 255, 255, 0.6),
                            0 0 30px rgba(255, 196, 0, 0.4);
                    }
                }

                .logo-animate {
                    animation: logoGlow 3s ease-in-out infinite;
                    transition: transform 0.6s ease-in-out;
                }

                .logo-animate:hover {
                    transform: scale(1.1);
                }
            `}</style>
            <h1 className="logo-animate text-2xl font-bold tracking-wider text-yellow-300 transition-colors duration-300 hover:text-yellow-400 lg:text-3xl">
                SHOC EVENTS
            </h1>
        </>
    );
}
