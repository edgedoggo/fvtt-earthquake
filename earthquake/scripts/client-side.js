Hooks.on('socketlib.ready', () => {
  console.log("Socketlib is ready. Listening for screen wiggle event...");

  game.socket.on('module.screenWiggle', (data) => {
    console.log("Received screen wiggle event", data);

    if (data && data.start) {
      try {
        window.screenWiggle(data.wiggleAmount, data.wiggleDuration);
      } catch (error) {
        console.error("Error in screenWiggle function:", error);
      }
    } else {
      console.log("Screen wiggle event data is invalid or 'start' is false.");
      // Handle the end of the screen wiggle if needed
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
  let isShaking = true;

  function animate() {
    if (!isShaking) {
      canvas.animatePan({ x: originalPosition.x, y: originalPosition.y });
      return;
    }

    const xOffset = (Math.random() * wiggleAmount - wiggleAmount / 2) | 0;
    const yOffset = (Math.random() * wiggleAmount - wiggleAmount / 2) | 0;

    canvas.animatePan({ x: originalPosition.x + xOffset, y: originalPosition.y + yOffset });

    requestAnimationFrame(animate);
  }

  animate();

  setTimeout(() => {
    isShaking = false;
    console.log("Screen wiggle ended.");
  }, wiggleDuration);
};
