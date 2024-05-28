import { world } from '@minecraft/server';

world.afterEvents.entityDie.subscribe((data) => {
    const killer = data.damageSource.damagingEntity;
    const target = data.deadEntity;
    if (killer.typeId === 'pinatabedrock:pengum') {
        if (target.typeId === 'minecraft:axolotl') {
            killer.runCommandAsync('scoreboard players add @s req1 1')
        }
    }
})