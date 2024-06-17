import {
    system,
    world
} from '@minecraft/server'

world.afterEvents.dataDrivenEntityTrigger.subscribe((data) => {
    const eventId = data.eventId;
    if (eventId.match('pinatabedrock:detect') && !eventId.match('pinatabedrock:detect_block')) {
        const entity = data.entity;
        const dimension = entity.dimension;
        const entityX = entity.location.x;
        const entityY = entity.location.y + 10;
        const entityZ = entity.location.z;

        const areaRadius = 15;
        const startX = entityX - areaRadius;
        const startZ = entityZ - areaRadius;
        for (let x = startX; x < startX + 30; x++) {
            for (let z = startZ; z < startZ + 30; z++) {
                dimension.spawnEntity('pinatabedrock:rat', { x: x, y: entityY, z: z })
            }
        }
    }
})

world.afterEvents.dataDrivenEntityTrigger.subscribe((data) => {
    const entity = data.entity;
    const eventId = data.eventId;
    if (eventId.match('pinatabedrock:delete')) {
        entity.runCommandAsync('loot spawn ~~~ loot "garden"')
        entity.runCommandAsync('tp @s 0 0 0')
        entity.runCommandAsync('kill @s')
    }
})