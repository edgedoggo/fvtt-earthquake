# fvtt-earthquake
A Foundry Module to shake the screen like an earthquake!


Have you ever wanted your players to shake and tremble as the ground rocks and shifts below them? 
Is a castle crumbling and they need to escape before its too late?
Is the very mountain itself exploding with magma as an active volcano erupts?

Well, before now - your players might have no idea... but now - the whole map is SHAKING!!!

EARTHQUAKE is my first release, it allows you to configure an earthquake effect across all players - client side (as well as GM)

The module is configurable, and can be modified at the macro level to change it up!


INSTRUCTIONS:

1) Install Earthquake from the Module Installation page of Foundry VTT
2) Enable it in Modules
3) Click to create a new macro, paste and configure the following:


   // Configure the EarthQuake!
const wiggleData = {
    action: 'triggerEarthquake',
    wiggleAmount: 100, // increase for more shake
    wiggleDuration: 5000, // increase for longer duration
};

// Toggle for DM screen shake
const dmShake = true; // Set to false to disable DM screen shake

// Define the sound to play during the quake
const soundToPlay = 'path-to-your-sound-file.ogg'; // Your file

function playSound() {
    const sound = new Audio(soundToPlay);
    sound.volume = 0.5; // Adjust the volume as needed
    sound.play();
}

// Broadcast Earthquake to Players and play sound
game.socket.emit('module.EarthQuake', wiggleData);
playSound();

// Screen wiggle logic for the GM's screen (if enabled)
if (dmShake) {
    const originalPosition = canvas.stage.pivot.clone();
    const startTime = Date.now();

    function animateGMWiggle() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        if (elapsedTime >= wiggleData.wiggleDuration) {
            canvas.animatePan({ x: originalPosition.x, y: originalPosition.y });
            return;
        }
        const xOffset = (Math.random() * wiggleData.wiggleAmount - wiggleData.wiggleAmount / 2) | 0;
        const yOffset = (Math.random() * wiggleData.wiggleAmount - wiggleData.wiggleAmount / 2) | 0;
        canvas.animatePan({ x: originalPosition.x + xOffset, y: originalPosition.y + yOffset });
        requestAnimationFrame(animateGMWiggle);
    }

    animateGMWiggle();
}
