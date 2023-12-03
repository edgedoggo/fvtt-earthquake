Hooks.on('socketlib.ready', () => {
  game.socket.on('module.screenWiggle', (data) => {
    if (data.start) {
      window.screenWiggle(data.wiggleAmount, data.wiggleDuration);
    } else {
      // Handle the end of the screen wiggle if needed
    }
  });
});

// Define the screenWiggle function globally
window.screenWiggle = async function (wiggleAmount, wiggleDuration) {
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
  }, wiggleDuration);
};
