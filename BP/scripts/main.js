import {
    system,
    world,
    ItemStack
} from '@minecraft/server'
//console.warn('Hello, thank you very much for participating in the mod alpha! If you find any errors, bugs or have any ideas for the mod, please contact me on my discord account: lunardev0668.')
console.warn('203')//times i tested the code :)

import './modules/detectBlock.js'
import './modules/customComponents.js'
import './modules/journal.js'
import './modules/habitatRequirement.js'
import './modules/captureSystem.js'
import './modules/customCommands.js'

//add scoreboards
world.afterEvents.worldInitialize.subscribe(() => {
    const scoreboard = world.scoreboard;
    const addObjective = scoreboard.addObjective.bind(scoreboard);
    const getObjective = scoreboard.getObjective.bind(scoreboard)
    score.forEach(scoreType => {
        if (!getObjective(scoreType)) {
            addObjective(scoreType, scoreType);
        }
    });
});

//give items to players
world.afterEvents.playerSpawn.subscribe((data) => {
    const player = data.player;
    player.runCommandAsync('execute if entity @s[tag=!spawn] run give @s pinatabedrock:garden_sign')
    player.runCommandAsync('execute if entity @s[tag=!spawn] run give @s pinatabedrock:journal')
    player.runCommandAsync('tag @s add spawn')
});

//set wild pinata to wild... uhhhh
world.afterEvents.entitySpawn.subscribe((data) => {
    const entity = data.entity;
    const cause = data.cause;
    if (entity.matches({ families: ["wild"] })) {
        if (cause !== "Born") {
            entity.triggerEvent('pinatabedrock:wild');
        } else {
            entity.runCommandAsync('event entity @s pinatabedrock:baby');
            entity.runCommandAsync('event entity @s pinatabedrock:resident2');
            entity.runCommandAsync('event entity @s pinatabedrock:wildcard');
            entity.runCommandAsync('event entity @e[r=3, c=3, family=resident] pinatabedrock:non_breedable');
        }
    }
    if (entity.matches({ families: ["sparrowmint"] }) || entity.matches({ families: ["bispotti"] })) {
        entity.triggerEvent('pinatabedrock:walk');
    }
});

world.afterEvents.dataDrivenEntityTrigger.subscribe((data) => {
    const entity = data.entity;
    const dimension = entity?.dimension;
    const location = entity.location;
    const eventId = data.eventId;
    if (eventId.match('pinatabedrock:resident') || eventId.match('pinatabedrock:var1') || eventId.match('pinatabedrock:var2') || eventId.match('pinatabedrock:var3')) {
        dimension.spawnParticle('pinatabedrock:resident', location)
    }
    if (eventId.match('pinatabedrock:non_breedable')) {
        entity.runCommandAsync('scoreboard players reset @s love_req1')
    }
})

const score = [
    "req1",
    "req2",
    "req3",
    "love_req1",
    "love_req2",
    "love_req3",
    "grass",
    "water",
    "snow",
    "sand",
    "soil",
    "poppy",
    "sparrowmint",
    "parmadillo"
]