import {
    world,
    system
} from '@minecraft/server'

world.beforeEvents.chatSend.subscribe((eventData) => {
    const player = eventData.sender;
    switch (eventData.message) {
        case '!help':
            eventData.cancel = true;
            player.sendMessage({ translate: 'accessibility.pinata_help1' });
            player.sendMessage({ translate: 'accessibility.pinata_help2' });
            break;
        default: break;
    }
});

world.beforeEvents.chatSend.subscribe((eventData) => {
    const player = eventData.sender;
    const { x, y, z } = player.getViewDirection();
    switch (eventData.message) {
        case '!a':
            eventData.cancel = true;

            if (Math.abs(x) > Math.abs(z)) {
                if (x > 0) {
                    player.sendMessage(`east`);
                } else {
                    player.sendMessage(`west`);
                }
            } else {
                if (z > 0) {
                    player.sendMessage(`south`);
                } else {
                    player.sendMessage(`north`);
                }
            }
            break;
        default: break;
    }
});

//set wildcard
world.afterEvents.itemUse.subscribe((data) => {
    const player = data.source;
    const location = player.location
    const item = data.itemStack;
    const pinatas = player.dimension.getEntities({ location: location, maxDistance: 2 })
    if (player.getGameMode() === "creative") {
        if (item.nameTag === 'wildcard 1') {
            for (const pinata of pinatas) {
                if (pinata.matches({ families: ["pinata"] })) {
                    pinata.setProperty("pinatabedrock:wildcard1", 1)
                }
            }
        }
        if (item.nameTag === 'wildcard 2') {
            for (const pinata of pinatas) {
                if (pinata.matches({ families: ["pinata"] })) {
                    pinata.setProperty("pinatabedrock:wildcard2", 1)
                }
            }
        }
        if (item.nameTag === 'wildcard 3') {
            for (const pinata of pinatas) {
                if (pinata.matches({ families: ["pinata"] })) {
                    pinata.setProperty("pinatabedrock:wildcard3", 1)
                }
            }
        }
    }
})

//region summon Pinatas
world.beforeEvents.chatSend.subscribe((eventData) => {
    const player = eventData.sender;
    const delay = 20
    if (player.getGameMode() === "creative") {
        switch (eventData.message) {
            case '!pinatapeople':
                eventData.cancel = true;
                pinatas.forEach(pinata => {
                    player.runCommandAsync(`summon pinatabedrock:${pinata}`)
                    player.runCommandAsync('spreadplayers ~2 ~2 2 3 @e[family=pinata, r=3]');
                })
                break;
            case '!PinataPeople':
                eventData.cancel = true;
                pinatas.forEach(pinata => {
                    player.runCommandAsync(`summon pinatabedrock:${pinata}`)
                    player.runCommandAsync('spreadplayers ~2 ~2 2 3 @e[family=pinata, r=3]');
                })
                break;
            case '!pinatapeople resident':
                eventData.cancel = true;
                pinatas.forEach(pinata => {
                    player.runCommandAsync(`summon pinatabedrock:${pinata}`).then(() => {
                        system.runTimeout(() => {
                            player.runCommandAsync('event entity @e[r=5] pinatabedrock:resident');
                            player.runCommandAsync('spreadplayers ~2 ~2 2 3 @e[family=pinata, r=3]');
                        }, delay);
                    })
                })
                break;
            case '!PinataPeople Resident':
                eventData.cancel = true;
                pinatas.forEach(pinata => {
                    player.runCommandAsync(`summon pinatabedrock:${pinata}`).then(() => {
                        system.runTimeout(() => {
                            player.runCommandAsync('event entity @e[r=5] pinatabedrock:resident');
                            player.runCommandAsync('spreadplayers ~2 ~2 2 3 @e[family=pinata, r=3]');
                        }, delay);
                    })
                })
                break;
            default: break;
        }
    } else {
        switch (eventData.message) {
            case '!pinatapeople':
                eventData.cancel = true;
                player.sendMessage({ translate: 'accessibility.noPermission' });
                break;
            case '!PinataPeople':
                eventData.cancel = true;
                player.sendMessage({ translate: 'accessibility.noPermission' });
                break;
            case '!pinatapeople resident':
                eventData.cancel = true;
                player.sendMessage({ translate: 'accessibility.noPermission' });
                break;
            case '!PinataPeople Resident':
                eventData.cancel = true;
                player.sendMessage({ translate: 'accessibility.noPermission' });
                break;
            default: break;
        }
    }
});
//endregion

const pinatas = [
    "bispotti",
    "bunnycomb",
    "custacean",
    "mousemallow",
    "parmadillo",
    "pengum",
    "sparrowmint",
    "whirlm"
]