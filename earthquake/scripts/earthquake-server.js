Hooks.on('ready', () => {
    console.log("EarthQuake Module Server-Side: Ready and listening.");

    game.socket.on('module.EarthQuake', (data) => {
        console.log(`EarthQuake Module Server-Side: Received message - ${JSON.stringify(data)}`);

        try {
            if (data.action === 'startEarthquake') {
                console.log("EarthQuake Module Server-Side: Broadcasting 'executeEarthquake' to clients.");
                game.socket.emit('module.EarthQuake', { action: 'executeEarthquake' });
            }
        } catch (error) {
            console.error("EarthQuake Module Server-Side: Error occurred -", error);
        }
    });
});
