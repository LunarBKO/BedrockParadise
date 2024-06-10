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
                })
                break;
            case '!PinataPeople':
                eventData.cancel = true;
                pinatas.forEach(pinata => {
                    player.runCommandAsync(`summon pinatabedrock:${pinata}`)
                })
                break;
            case '!pinatapeople resident':
                eventData.cancel = true;
                pinatas.forEach(pinata => {
                    player.runCommandAsync(`summon pinatabedrock:${pinata}`).then(() => {
                        system.runTimeout(() => {
                            player.runCommandAsync('event entity @e[r=5] pinatabedrock:resident');
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

const pinatas = [
    "bunnycomb",
    "custacean",
    "mousemallow",
    "parmadillo",
    "pengum",
    "sparrowmint",
    "whirlm"
]
//endregion