import {
    system,
    world,
    ItemStack
} from '@minecraft/server'
//console.warn('Hello, thank you very much for participating in the mod alpha! If you find any errors, bugs or have any ideas for the mod, please contact me on my discord account: lunardev0668.')
console.warn('172')

import './modules/detectBlock.js'
import './modules/orangeTree.js'
import './modules/journal.js'
import './modules/habitatRequirement.js'

//start scoreboards
world.afterEvents.playerSpawn.subscribe((data) => {
    const player = data.player;
    player.runCommandAsync('scoreboard objectives add req1 dummy')
    player.runCommandAsync('scoreboard objectives add req2 dummy')
    player.runCommandAsync('scoreboard objectives add req3 dummy')
    player.runCommandAsync('scoreboard objectives add love_req1 dummy')
    player.runCommandAsync('scoreboard objectives add love_req2 dummy')
    player.runCommandAsync('scoreboard objectives add love_req3 dummy')
    player.runCommandAsync('scoreboard objectives add grass dummy')
    player.runCommandAsync('scoreboard objectives add water dummy')
    player.runCommandAsync('scoreboard objectives add snow dummy')
    player.runCommandAsync('scoreboard objectives add sand dummy')
})

//give items to players
world.afterEvents.playerSpawn.subscribe((data) => {
    const player = data.player;
    player.runCommandAsync('execute if entity @s[tag=!spawn] run give @s pinatabedrock:garden_sign')
    player.runCommandAsync('execute if entity @s[tag=!spawn] run give @s pinatabedrock:journal')
    player.runCommandAsync('tag @s add spawn')
})

//set wild pinata to wild... uhhhh
world.afterEvents.entitySpawn.subscribe((data) => {
    const entity = data.entity;
    const cause = data.cause
    if (entity.matches({ families: ["wild"] })) {
        if (cause !== "Born") {
            entity.triggerEvent('pinatabedrock:wild')
        } else {
            entity.runCommandAsync('event entity @s pinatabedrock:baby')
            entity.runCommandAsync('event entity @s pinatabedrock:resident2')
            entity.runCommandAsync('event entity @s pinatabedrock:wildcard')
            entity.runCommandAsync('event entity @e[r=3, c=3, family=resident, type=pinatabedrock:parmadillo] pinatabedrock:non_breedable')

        }
    }
})

//capture system
world.afterEvents.dataDrivenEntityTrigger.subscribe((data) => {
    const entity = data.entity;
    const event = data.eventId;
    const id = entity.id;
    const iD = `pinata` + id;
    const name = entity.typeId.replace("pinatabedrock:", "")
    const location = entity.location;
    const dimension = entity.dimension

    if (event.match('pinatabedrock:capture')) {
        if (Math.random() < 0.4) {
            entity.runCommandAsync('playsound random.door_close @p[r=10] ~~~')
            trap.forEach(trapType => {
                entity.runCommandAsync(`fill ~-1~-1~-1 ~1~1~1 air replace ${trapType}`);
            });
            entity.runCommandAsync(`structure save ${iD} ~~~ ~~~ true disk false`)
            entity.runCommandAsync(`summon pinatabedrock:failed_trap`)
            entity.runCommandAsync(`event entity @s pinatabedrock:despawn`)
        } else {
            entity.runCommandAsync(`playsound random.break @p[r=10] ~~~`)
            trap.forEach(trapType => {
                entity.runCommandAsync(`fill ~-1~-1~-1 ~1~1~1 air replace ${trapType}`);
            });
            entity.runCommandAsync(`particle minecraft:critical_hit_emitter ~~1~`)
            entity.runCommandAsync(`summon pinatabedrock:failed_trap`)
        }
    }
    if (event.match('pinatabedrock:despawn')) {
        let trap = new ItemStack("pinatabedrock:begginer_trap_closed", 1)
        trap.nameTag = `${name}'s trap`
        trap.setLore([`${iD}`])
        dimension.spawnItem(trap, location)
        entity.remove()
    }
})

//loads trap saved structure
world.afterEvents.itemUseOn.subscribe((data) => {
    const item = data.itemStack;
    const lore = item.getLore();
    const player = data.source;
    const location = {
        x: data.block.x,
        y: data.block.y,
        z: data.block.z
    };
    const y1 = location.y + 1
    if (item.typeId == 'pinatabedrock:begginer_trap_closed') {
        if (lore != undefined) {
            player.runCommandAsync(`structure load ${lore} ${location.x} ${y1} ${location.z} 0_degrees none true false`)
            player.runCommandAsync(`structure delete ${lore}`)
        }
    }
})

const trap = [
    "pinatabedrock:begginer_trap_buttercup",
    "pinatabedrock:begginer_trap_apple",
    "pinatabedrock:begginer_trap_chili"
]