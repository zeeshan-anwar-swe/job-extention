export const playHelloSound = () => {
    const audio = new Audio('/sounds/hello.wav');
    audio.play().catch(() => {});
};