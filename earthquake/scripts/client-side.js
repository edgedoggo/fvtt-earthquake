Hooks.on('socketlib.ready', () => {
    console.log("Socketlib is ready. Listening for screen wiggle event...");

    game.socket.on('module.screenWiggle', (data) => {
        console.log("Event listener triggered with data:", data);

        if (data && data.start) {
            try {
                window.screenWiggle(data.wiggleAmount, data.wiggleDuration);
                console.log("screenWiggle function called with amount:", data.wiggleAmount, "and duration:", data.wiggleDuration);
            } catch (error) {
                console.error("Error in screenWiggle function:", error);
            }
        } else {
            console.log("Screen wiggle event data is invalid or 'start' is false.");
        }
    });
});

window.screenWiggle = async function (wiggleAmount, wiggleDuration) {
    console.log(`Starting screen wiggle with amount ${wiggleAmount} and duration ${wiggleDuration}`);

    if (!canvas || !canvas.stage) {
        console.error("Canvas or canvas.stage is undefined.");
        return;
    }

    const originalPosition = canvas.stage.pivot.clone();
    const startTime = Date.now();

    function animate() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;

        if (elapsedTime >= wiggleDuration) {
            canvas.animatePan({ x: originalPosition.x, y: originalPosition.y });
            console.log("Screen wiggle ended.");
            return;
        }

        const xOffset = (Math.random() * wiggleAmount - wiggleAmount / 2) | 0;
        const yOffset = (Math.random() * wiggleAmount - wiggleAmount / 2) | 0;

        canvas.animatePan({ x: originalPosition.x + xOffset, y: originalPosition.y + yOffset });
        requestAnimationFrame(animate);
    }

    animate();
};
