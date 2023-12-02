Hooks.on('socketlib.ready', () => {
  game.socket.on('module.screenWiggle', (start) => {
    if (start) {
      screenWiggle();
    } else {
      // Handle the end of the screen wiggle if needed
    }
  });
});

// Add any other client-side code you need here