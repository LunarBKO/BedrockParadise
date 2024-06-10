import { world } from '@minecraft/server';

world.afterEvents.entityDie.subscribe((data) => {
    const killer = data.damageSource.damagingEntity;
    const target = data.deadEntity;
    if (killer !== undefined) {
        if (killer.typeId === 'pinatabedrock:pengum') {
            if (target.typeId === 'minecraft:axolotl') {
                killer.runCommandAsync('scoreboard players add @s req1 1')
            }
        }
        if (killer.typeId === 'pinatabedrock:sparrowmint') {
            if (target.typeId === 'pinatabedrock:whirlm') {
                killer.runCommandAsync('scoreboard players add @s req1 1')
            }
        }
    }
});

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

        for (let x = entityX - radius; x <= entityX + radius; x++) {
            for (let z = entityZ - radius; z <= entityZ + radius; z++) {
                if (dimension.getBlock({ x: x, y: entityY, z: z }).typeId === 'pinatabedrock:turnip') {
                    entity.runCommandAsync('fill ~-1~-1~-1 ~1~1~1 air replace pinatabedrock:turnip')
                    entity.runCommandAsync('scoreboard players add @s req1 1')
                }
                if (dimension.getBlock({ x: x, y: entityY, z: z }).typeId === 'pinatabedrock:buttercup') {
                    entity.runCommandAsync('fill ~-1~-1~-1 ~1~1~1 air replace pinatabedrock:buttercup')
                    entity.runCommandAsync('scoreboard players add @s req1 1')
                }
            }
        }
    }
});