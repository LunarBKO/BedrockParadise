import {
    system,
    world,
    ItemStack
} from '@minecraft/server'
console.warn('Hello, thank you very much for participating in the mod alpha! If you find any errors, bugs or have any ideas for the mod, please contact me on my discord account: lunardev0668.')
//console.warn('101')

//start scoreboards
world.afterEvents.playerSpawn.subscribe((data) => {
    const player = data.player;
    player.runCommandAsync('scoreboard objectives add req1 dummy')
})

//give items to players
world.afterEvents.playerSpawn.subscribe((data) => {
    const player = data.player;
    player.runCommandAsync('execute if entity @s[tag=!spawn] run give @s pinatabedrock:apple_seed 2')
    player.runCommandAsync('execute if entity @s[tag=!spawn] run give @s pinatabedrock:buttercup_seed 5')
    player.runCommandAsync('execute if entity @s[tag=!spawn] run give @s pinatabedrock:garden_spawn_egg')
    player.runCommandAsync('tag @s add spawn')
})

//set wild pinata to wild
world.afterEvents.entitySpawn.subscribe((data) => {
    const entity = data.entity;
    if (entity.matches({
        families: ["wild"]
    })) {
        entity.triggerEvent('pinatabedrock:wild')
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
            entity.runCommandAsync(`fill ~-1~-1~-1 ~1~1~1 air replace pinatabedrock:begginer_trap_buttercup`)
            entity.runCommandAsync(`structure save ${iD} ~~~ ~~~ true disk false`)
            entity.runCommandAsync(`summon pinatabedrock:failed_trap`)
            entity.runCommandAsync(`event entity @s pinatabedrock:despawn`)
        } else {
            entity.runCommandAsync(`playsound random.break @p[r=10] ~~~`)
            entity.runCommandAsync(`fill ~-1~-1~-1 ~1~1~1 air replace pinatabedrock:begginer_trap_buttercup`)
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

//play particle if started resident/variants
world.afterEvents.dataDrivenEntityTrigger.subscribe((data) => {
    const entity = data.entity;
    const event = data.eventId;;
    if (event.match('pinatabedrock:resident') || event.match('pinatabedrock:var1') || event.match('pinatabedrock:var2') || event.match('pinatabedrock:var3')) {
        entity.runCommandAsync('particle pinatabedrock:resident ~~~')
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
        player.runCommandAsync(`structure load ${lore} ${location.x} ${y1} ${location.z} 0_degrees none true false`)
        player.runCommandAsync(`structure delete ${lore}`)
        console.log("if you are seeing a bug dont worry, its not bugged (kinda lmao)")
    }
})