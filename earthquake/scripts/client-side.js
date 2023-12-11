// Client-side listener in the EarthQuake module
game.socket.on('module.EarthQuake', (data) => {
    console.log(`EarthQuake Module Client-Side: Received message - ${JSON.stringify(data)}`);

    try {
        if (data.action === 'executeEarthquake') {
            console.log("EarthQuake Module Client-Side: Executing earthquake effect.");
            
            const elem = document.getElementById("board");
            if (elem) {
                elem.animate([
                    { transform: "translate(2px, 2px)" },
                    { transform: "translate(-2px, -3px) rotate(-2deg)" },
                    { transform: "translate(-4px, 0px) rotate(2deg)" },
                    { transform: "translate(4px, 3px)" },
                    { transform: "translate(2px, -2px) rotate(2deg)" },
                    { transform: "translate(-2px, 3px) rotate(-2deg)" },
                    { transform: "translate(-4px, 2px)" },
                    { transform: "translate(4px, 2px) rotate(-2deg)" },
                    { transform: "translate(-2px, -2px) rotate(2deg)" },
                    { transform: "translate(2px, 3px)" },
                    { transform: "translate(2px, -3px) rotate(-2deg)" }
                ], { 
                    duration: 500,
                    iterations: 3 
                });
            } else {
                console.log("EarthQuake Module Client-Side: 'board' element not found.");
            }
        }
    } catch (error) {
        console.error("EarthQuake Module Client-Side: Error occurred while executing earthquake effect -", error);
    }
});
