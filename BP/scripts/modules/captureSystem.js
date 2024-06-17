import {
    world,
    system,
    ItemStack
} from '@minecraft/server'

//better visualization ;) quite useful really
//region
//endregion

//region trap
world.beforeEvents.worldInitialize.subscribe((data) => {
    data.blockTypeRegistry.registerCustomComponent("pinatabedrock:trap", {
        onPlayerInteract(e) {
            const player = e.player;
            const inventory = player.getComponent('inventory').container;
            const item_stack = inventory.getItem(player.selectedSlotIndex);
            const block = e.block;
            const location = block.location;
            const x = location.x + 0.5;
            const y = location.y + 0.1;
            const z = location.z + 0.5;
            const entities = block.dimension.getEntities({ location: location, maxDistance: 1 });
            const delay = 1;

            baits.forEach(baitType => {
                for (const entity of entities) {
                    if (entity.typeId == 'pinatabedrock:bait' && entity.matches({ families: [`${baitType}`] })) {
                        entity.runCommandAsync(`loot spawn ~~~ loot "baits/${baitType}"`)
                        system.runTimeout(() => {
                            entity.triggerEvent('pinatabedrock:despawn')
                        }, delay)
                    }
                }
            })

            baits.forEach(baitType => {
                if (item_stack?.typeId == `pinatabedrock:${baitType}`) {

                    let baitFound = false;
                    for (const entity of entities) {
                        if (entity.typeId === "pinatabedrock:bait") {
                            baitFound = true;
                            break;
                        }
                    }

                    if (!baitFound) {
                        if (player.getGameMode() !== "creative") {
                            if (inventory.getItem(player.selectedSlotIndex).amount > 1) {
                                item_stack.amount -= 1;
                                inventory.setItem(player.selectedSlotIndex, item_stack);
                            } else {
                                inventory.setItem(player.selectedSlotIndex, undefined);
                            }
                        } else {
                            system.runTimeout(() => {
                                player.runCommandAsync('tag @e[r=1, c=1, type=pinatabedrock:bait] add creative_trap')
                            }, delay)
                        }

                        trap.forEach(trapType => {
                            player.runCommandAsync(`execute if block ~~~ ${trapType} run summon pinatabedrock:bait ~~~ 90 0 pinatabedrock:${baitType}`)
                        })
                    }
                }
                if (item_stack?.typeId == `minecraft:${baitType}`) {

                    let baitFound = false;
                    for (const entity of entities) {
                        if (entity.typeId === "pinatabedrock:bait") {
                            baitFound = true;
                            break;
                        }
                    }

                    if (!baitFound) {
                        if (player.getGameMode() !== "creative") {
                            if (inventory.getItem(player.selectedSlotIndex).amount > 1) {
                                item_stack.amount -= 1;
                                inventory.setItem(player.selectedSlotIndex, item_stack);
                            } else {
                                inventory.setItem(player.selectedSlotIndex, undefined);
                            }
                        } else {
                            system.runTimeout(() => {
                                player.runCommandAsync('tag @e[r=1, c=1, type=pinatabedrock:bait] add creative_trap')
                            }, delay)
                        }

                        trap.forEach(trapType => {
                            player.runCommandAsync(`execute if block ~~~ ${trapType} run summon pinatabedrock:bait ~~~ 90 0 pinatabedrock:${baitType}`)
                        })
                    }
                }
            })

            if (player.isSneaking) {
                block.setType("pinatabedrock:begginer_trap_closed")
            }
        }
    });
})

world.afterEvents.dataDrivenEntityTrigger.subscribe((data) => {
    const entity = data.entity;
    const event = data.eventId;

    const location = entity.location;
    const dimension = entity.dimension;

    const delay = 1;

    if (event.match('pinatabedrock:detect_block')) {
        trap.forEach(trapType => {
            if (dimension.getBlock(location).typeId !== trapType) {
                baits.forEach(bait => {
                    if (entity.typeId == 'pinatabedrock:bait' && entity.matches({ families: [`${bait}`] })) {
                        entity.runCommandAsync(`loot spawn ~~~ loot "baits/${bait}"`)
                        system.runTimeout(() => {
                            entity.triggerEvent('pinatabedrock:despawn')
                        }, delay)
                    }
                })
            }
        })
    }
})

world.afterEvents.dataDrivenEntityTrigger.subscribe((data) => {
    const entity = data.entity;
    const event = data.eventId;

    const location = entity.location;
    const dimension = entity.dimension;

    const delay = 1;

    if (event.match('pinatabedrock:capture_pinata')) {
        const entities = dimension.getEntities({ location: location, maxDistance: 1 });

        for (const nearbyEntity of entities) {
            if (nearbyEntity.matches({ families: ["pinata", "wild"] })) {
                const id = `pinata` + nearbyEntity.id
                trap.forEach(trapType => {
                    if (dimension.getBlock(location).typeId === trapType) {
                        if (entity.hasTag("creative_trap")) {
                            entity.runCommandAsync('playsound random.door_close @p[r=10] ~~~');
                            trap.forEach(trapType => {
                                entity.runCommandAsync(`fill ~~~ ~~~ air replace ${trapType}`);
                            });
                            entity.runCommandAsync(`structure save ${id} ~~~ ~~~ true disk false`);
                            entity.runCommandAsync(`summon pinatabedrock:failed_trap`);
                            entity.runCommandAsync(`event entity @e[r=2, c=1, family=wild] pinatabedrock:trap`);
                            system.runTimeout(() => {
                                entity.remove();
                            }, delay);
                        } else {
                            if (Math.random() < 0.4) {
                                entity.runCommandAsync('playsound random.door_close @p[r=10] ~~~');
                                trap.forEach(trapType => {
                                    entity.runCommandAsync(`fill ~~~ ~~~ air replace ${trapType}`);
                                });
                                entity.runCommandAsync(`structure save ${id} ~~~ ~~~ true disk false`);
                                entity.runCommandAsync(`summon pinatabedrock:failed_trap`);
                                entity.runCommandAsync(`event entity @e[r=2, c=1, family=wild] pinatabedrock:trap`);
                                system.runTimeout(() => {
                                    entity.remove();
                                }, delay);
                            } else {
                                entity.runCommandAsync(`playsound random.break @p[r=10] ~~~`);
                                trap.forEach(trapType => {
                                    entity.runCommandAsync(`fill ~~~ ~~~ air replace ${trapType}`);
                                });
                                entity.runCommandAsync(`particle minecraft:critical_hit_emitter ~~1~`);
                                entity.runCommandAsync(`summon pinatabedrock:failed_trap`);
                                system.runTimeout(() => {
                                    entity.remove();
                                }, delay);
                            }
                        }
                    }
                });
            }
        }
    } else if (event.match('pinatabedrock:trap')) {
        const entities = dimension.getEntities({ location: location, maxDistance: 1 });
        for (const nearbyEntity of entities) {
            if (nearbyEntity.matches({ families: ["pinata", "wild"] })) {
                const id = `pinata` + nearbyEntity.id
                const name = entity.typeId.replace("pinatabedrock:", "");
                let trap = new ItemStack("pinatabedrock:begginer_trap_closed", 1);
                trap.nameTag = `trapped ${name}`;
                trap.setLore([`${id}`]);
                dimension.spawnItem(trap, location);
                nearbyEntity.remove();
            }
        }
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
    "pinatabedrock:begginer_trap"
]

const baits = [
    "apple",
    "buttercup_seed",
    "buttercup_petals",
    "chili"
]

//endregion

//region //net
world.afterEvents.playerInteractWithEntity.subscribe((data) => {
    const item = data.itemStack;
    const entity = data.target;
    const player = data.player;
    if (item.typeId !== undefined) {
        if (entity.matches({ families: ["net"] })) {
            if (item.typeId === 'pinatabedrock:net_level1') {
                if (entity.matches({ families: ["level0"] })) {
                    let durability = item.getComponent("minecraft:durability");
                    let damage = 1;

                    const id = entity.id;
                    const iD = `pinata` + id;

                    if (player.getGameMode() === "creative") {
                        entity.runCommandAsync('playsound step.cloth @p[r=10] ~~~')
                        entity.runCommandAsync(`structure save ${iD} ~~~ ~~~ true disk false`)
                        entity.runCommandAsync(`summon pinatabedrock:failed_trap`)
                        entity.runCommandAsync(`event entity @s pinatabedrock:net`)
                    } else {
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
                                player.getComponent("minecraft:inventory").container.setItem(player.selectedSlotIndex)
                            } else {
                                player.getComponent("minecraft:inventory").container.setItem(player.selectedSlotIndex, item)
                            }
                        }
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
                player.getComponent("minecraft:inventory").container.setItem(player.selectedSlotIndex)
            }
        }
    }
})
//endregion

//comentaries are cool, you can hide lil secrets in the code for the curious people, does it take space? idk lmao