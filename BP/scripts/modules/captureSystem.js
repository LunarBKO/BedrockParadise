import {
    world,
    ItemStack
} from '@minecraft/server'

//better visualization ;) quite useful really
//region
//endregion
//region //trap
world.afterEvents.dataDrivenEntityTrigger.subscribe((data) => {
    const entity = data.entity;
    const event = data.eventId;
    const id = entity.id;
    const iD = `pinata` + id;
    const dimension = entity.dimension;
    const location = entity.location;

    if (event.match('pinatabedrock:capture')) {
        const entityX = location.x;
        const entityY = location.y;
        const entityZ = location.z;
        const radius = 1;

        trap.forEach(trapType => {
            for (let x = entityX - radius; x <= entityX + radius; x++) {
                for (let z = entityZ - radius; z <= entityZ + radius; z++) {
                    if (dimension.getBlock({ x: x, y: entityY, z: z }).typeId === trapType) {
                        if (Math.random() < 0.4) {
                            entity.runCommandAsync('playsound random.door_close @p[r=10] ~~~')
                            trap.forEach(trapType => {
                                entity.runCommandAsync(`fill ~-1~-1~-1 ~1~1~1 air replace ${trapType}`);
                            });
                            entity.runCommandAsync(`structure save ${iD} ~~~ ~~~ true disk false`)
                            entity.runCommandAsync(`summon pinatabedrock:failed_trap`)
                            entity.runCommandAsync(`event entity @s pinatabedrock:trap`)
                        } else {
                            entity.runCommandAsync(`playsound random.break @p[r=10] ~~~`)
                            trap.forEach(trapType => {
                                entity.runCommandAsync(`fill ~-1~-1~-1 ~1~1~1 air replace ${trapType}`);
                            });
                            entity.runCommandAsync(`particle minecraft:critical_hit_emitter ~~1~`)
                            entity.runCommandAsync(`summon pinatabedrock:failed_trap`)
                        }
                    }
                }
            }
        })
    }
    if (event.match('pinatabedrock:trap')) {
        const name = entity.typeId.replace("pinatabedrock:", "")
        let trap = new ItemStack("pinatabedrock:begginer_trap_closed", 1)
        trap.nameTag = `trapped ${name}`
        trap.setLore([`${iD}`])
        dimension.spawnItem(trap, location)
        entity.remove()
    }
})

//loads trap saved structure
world.afterEvents.itemUseOn.subscribe((data) => {
    const item = data.itemStack;
    const lore = item.getLore();
    if (item.typeId === 'pinatabedrock:begginer_trap_closed') {
        if (lore !== undefined) {
            const player = data.source;
            const location = {
                x: data.block.x,
                y: data.block.y,
                z: data.block.z
            };
            const y1 = location.y + 1
            player.runCommandAsync(`structure load ${lore} ${location.x} ${y1} ${location.z} 0_degrees none true false`)
            player.runCommandAsync(`structure delete ${lore}`)
        }
    }
})

const trap = [
    "pinatabedrock:begginer_trap_buttercup",
    "pinatabedrock:begginer_trap_apple",
    "pinatabedrock:begginer_trap_chili",
    "pinatabedrock:begginer_trap_buttercup_seed"
]
//endregion

//region //net
world.afterEvents.playerInteractWithEntity.subscribe((data) => {
    const item = data.itemStack;
    const entity = data.target;
    const player = data.player;
    if (entity.matches({ families: ["net"] })) {
        if (item.typeId === 'pinatabedrock:net_level1') {
            if (entity.matches({ families: ["level0"] })) {
                let durability = item.getComponent("minecraft:durability");
                let damage = 1;

                const id = entity.id;
                const iD = `pinata` + id;

                if (Math.random() < 0.9) {
                    entity.runCommandAsync('playsound step.cloth @p[r=10] ~~~')
                    entity.runCommandAsync(`structure save ${iD} ~~~ ~~~ true disk false`)
                    entity.runCommandAsync(`summon pinatabedrock:failed_trap`)
                    entity.runCommandAsync(`event entity @s pinatabedrock:net`)
                } else {
                    entity.runCommandAsync(`playsound block.scaffolding.hit @p[r=10] ~~~`)
                    entity.runCommandAsync(`particle minecraft:critical_hit_emitter ~~1~`)
                    entity.runCommandAsync(`summon pinatabedrock:failed_trap`)
                    durability.damage = (durability.damage + damage)
                    if (durability.damage >= durability.maxDurability) {
                        player.getComponent("minecraft:inventory").container.setItem(player.selectedSlot)
                    } else {
                        player.getComponent("minecraft:inventory").container.setItem(player.selectedSlot, item)
                    }
                }
            }
        }
    }
})

world.afterEvents.dataDrivenEntityTrigger.subscribe((data) => {
    const entity = data.entity;
    const eventId = data.eventId;
    if (eventId.match('pinatabedrock:net')) {
        const name = entity.typeId.replace("pinatabedrock:", "")
        const id = entity.id;
        const iD = `pinata` + id;
        const location = entity.location;
        const dimension = entity.dimension;

        let net = new ItemStack("pinatabedrock:net_full", 1)
        net.nameTag = `neted ${name}`
        net.setLore([`${iD}`])
        dimension.spawnItem(net, location)
        entity.remove()
    }
})

world.afterEvents.playerInteractWithBlock.subscribe((data) => {
    const item = data.itemStack;
    if (item !== undefined) {
        const lore = item.getLore();
        if (item.typeId === 'pinatabedrock:net_full') {
            if (lore !== undefined) {
                const player = data.player;
                const location = {
                    x: data.block.x,
                    y: data.block.y,
                    z: data.block.z
                };
                const y1 = location.y + 1;
                player.runCommandAsync(`structure load ${lore} ${location.x} ${y1} ${location.z} 0_degrees none true false`)
                player.runCommandAsync(`structure delete ${lore}`)
                player.getComponent("minecraft:inventory").container.setItem(player.selectedSlot)
            }
        }
    }
})
//endregion

//comentaries are cool, you can hide lil secrets in the code for the curious people, does it take space? idk lmao