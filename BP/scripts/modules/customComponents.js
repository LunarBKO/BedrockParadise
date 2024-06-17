import { world, system, BlockPermutation, BlockStates } from '@minecraft/server';

world.beforeEvents.worldInitialize.subscribe((data) => {
    data.blockTypeRegistry.registerCustomComponent("pinatabedrock:orange_random_tick1", {
        onRandomTick(data) {
            const block = data.block;
            const blockTypeId = "minecraft:water"
            const radius = 4;

            if (isBlockTypeNearBlock(block, blockTypeId, radius)) {
                if (block.above(1).isAir) {
                    block.setType('pinatabedrock:orange_tree2')
                }
            }
        }
    });
    data.blockTypeRegistry.registerCustomComponent("pinatabedrock:orange_random_tick2", {
        onRandomTick(data) {
            const block = data.block;
            const playerPlaced = block.permutation.getState('pinatabedrock:player_paced');
            const structure = world.structureManager;
            const x = block.x.valueOf() - 1;
            const y = block.y.valueOf() - 2;
            const z = block.z.valueOf() - 1;
            const location = {
                x: x,
                y: y,
                z: z
            }
            if (block.below(1).typeId !== "pinatabedrock:orange_tree2" && block.above(1).isAir && playerPlaced !== 1) {
                block.above(1).setType("pinatabedrock:orange_tree2")
            }
            if (block.below(1).typeId === "pinatabedrock:orange_tree2" && block.below(2).typeId !== "pinatabedrock:orange_tree2" && block.above(1).isAir && playerPlaced !== 1) {
                block.above(1).setType("pinatabedrock:orange_tree2")
            }
            if (block.below(1).typeId === "pinatabedrock:orange_tree2" && block.below(2).typeId === "pinatabedrock:orange_tree2" && block.above(1).isAir && playerPlaced !== 1 && block.permutation.getState('pinatabedrock:fertilizer') === 0) {
                structure.place('mystructure:orange_tree', data.dimension, location)
            }
            if (block.below(1).typeId === "pinatabedrock:orange_tree2" && block.below(2).typeId === "pinatabedrock:orange_tree2" && block.above(1).isAir && playerPlaced !== 1 && block.permutation.getState('pinatabedrock:fertilizer') === 1) {
                structure.place('mystructure:orange_tree1', data.dimension, location)
            }
            if (block.below(1).typeId === "pinatabedrock:orange_tree2" && block.below(2).typeId === "pinatabedrock:orange_tree2" && block.above(1).isAir && playerPlaced !== 1 && block.permutation.getState('pinatabedrock:fertilizer') === 2) {
                structure.place('mystructure:orange_tree2', data.dimension, location)
            }
            if (block.below(1).typeId === "pinatabedrock:orange_tree2" && block.below(2).typeId === "pinatabedrock:orange_tree2" && block.above(1).isAir && playerPlaced !== 1 && block.permutation.getState('pinatabedrock:fertilizer') === 3) {
                structure.place('mystructure:orange_tree3', data.dimension, location)
            }
        }
    });
    data.blockTypeRegistry.registerCustomComponent("pinatabedrock:orange_next_log", {
        onRandomTick(e) {
            let block = e.block;

            let logState = block.permutation.getState('pinatabedrock:next_log');

            if (block.above(1).hasTag('orange')) {
                logState == 1;

                block.setPermutation(
                    BlockPermutation.resolve(block.typeId, {
                        'pinatabedrock:next_log': logState,
                    })
                );
            } else {
                logState == 0;

                block.setPermutation(
                    BlockPermutation.resolve(block.typeId, {
                        'pinatabedrock:next_log': logState,
                    })
                );
            }
        }
    });
    data.blockTypeRegistry.registerCustomComponent("pinatabedrock:apple_random_tick1", {
        onRandomTick(data) {
            const block = data.block;
            const blockTypeId = "minecraft:water"
            const radius = 4;

            const structure = world.structureManager;
            const x = block.x.valueOf();
            const y = block.y.valueOf();
            const z = block.z.valueOf();
            const location = {
                x: x,
                y: y,
                z: z
            }

            if (isBlockTypeNearBlock(block, blockTypeId, radius)) {
                if (block.below(1).typeId === "minecraft:grass_block" && block.above(1).isAir) {
                    structure.place('mystructure:apple_stage1', data.dimension, location)
                }
            }
        }
    });
    data.blockTypeRegistry.registerCustomComponent("pinatabedrock:apple_random_tick2", {
        onRandomTick(data) {
            const block = data.block;
            const blockTypeId = "minecraft:water"
            const radius = 4;

            const dimension = data.dimension;
            const structure = world.structureManager;

            const x = block.x.valueOf();
            const y = block.y.valueOf();
            const z = block.z.valueOf();
            const location1 = {
                x: x,
                y: y,
                z: z
            }

            const x2 = block.x.valueOf() - 2;
            const y2 = block.y.valueOf();
            const z2 = block.z.valueOf() - 2;
            const location2 = {
                x: x2,
                y: y2,
                z: z2
            }

            let fertilizerState = block.permutation.getState('pinatabedrock:fertilizer');

            if (isBlockTypeNearBlock(block, blockTypeId, radius)) {
                if (block.above(1).typeId === "pinatabedrock:apple_tree1" && block.above(2).isAir) {
                    structure.place('mystructure:apple_stage2', dimension, location1)
                }
                if (block.above(1).south(1).typeId === "minecraft:oak_leaves" && block.above(2).isAir) {
                    if (fertilizerState == 0) {
                        structure.place('mystructure:apple_stage3', dimension, location2)
                    }
                    if (fertilizerState == 1) {
                        structure.place('mystructure:apple_stage4', dimension, location2)
                    }
                    if (fertilizerState == 2) {
                        structure.place('mystructure:apple_stage5', dimension, location2)
                    }
                    if (fertilizerState == 3) {
                        structure.place('mystructure:apple_stage6', dimension, location2)
                    }
                }
            }
        }
    });
    data.blockTypeRegistry.registerCustomComponent("pinatabedrock:plant_random_tick", {
        onRandomTick(e) {
            let block = e.block;

            const blockTypeId = "minecraft:water"
            const radius = 4;

            let growthState = block.permutation.getState('pinatabedrock:growth_stage');
            let valid_values = BlockStates.get('pinatabedrock:growth_stage').validValues;
            let max = valid_values[valid_values.length - 1];

            let fertilizerState = block.permutation.getState('pinatabedrock:fertilizer');

            if (growthState === undefined) {
                console.warn("Growth state is undefined, initializing to 0");
                growthState = 0;
                block.setPermutation(
                    BlockPermutation.resolve(block.typeId, {
                        'pinatabedrock:growth_stage': growthState
                    })
                );
            }

            if (isBlockTypeNearBlock(block, blockTypeId, radius)) {
                if (growthState < max) {
                    growthState += 1;

                    block.setPermutation(
                        BlockPermutation.resolve(block.typeId, {
                            'pinatabedrock:growth_stage': growthState,
                            'pinatabedrock:fertilizer': fertilizerState
                        })
                    );
                }
            }
        }
    });
    data.blockTypeRegistry.registerCustomComponent("pinatabedrock:plant_queued_ticking", {
        onTick(data) {
            const block = data.block;
            const x = block.location.x;
            const y = block.location.y;
            const z = block.location.z;
            if (block.above(1)?.typeId === "minecraft:water" || block.east(1)?.typeId === "minecraft:water" || block.north(1)?.typeId === "minecraft:water" || block.south(1)?.typeId === "minecraft:water" || block.west(1)?.typeId === "minecraft:water") {
                block.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air destroy`)
            }
        }
    });
    data.blockTypeRegistry.registerCustomComponent("pinatabedrock:fertilize", {
        onPlayerInteract(data) {
            const block = data.block;
            const dimension = block.dimension;
            const location = block.location;
            const x = location.x + 0.5;
            const y = location.y;
            const z = location.z + 0.5;

            let growthState = block.permutation.getState('pinatabedrock:growth_stage');
            let maxGrowthValue = BlockStates.get('pinatabedrock:growth_stage').validValues.length - 2;

            let fertilizerState = block.permutation.getState('pinatabedrock:fertilizer');
            let maxFertilizerValue = BlockStates.get('pinatabedrock:fertilizer').validValues.length - 1;

            const player = data.player;
            const inventory = player.getComponent('inventory').container.getItem(player.selectedSlotIndex);
            const itemStack = undefined

            if (growthState < maxGrowthValue && fertilizerState < maxFertilizerValue) {
                if (inventory.hasTag('pinatabedrock:fertilizer')) {
                    colors.forEach(colors => {
                        if (inventory.typeId === `pinatabedrock:fertilizer_${colors}` && block.hasTag(`pinata_${colors}_plant`)) {
                            fertilizerState += 1;

                            block.setPermutation(
                                BlockPermutation.resolve(block.typeId, {
                                    'pinatabedrock:fertilizer': fertilizerState,
                                    'pinatabedrock:growth_stage': growthState
                                })
                            );

                            if (player.getGameMode() !== "creative") {
                                if (inventory.amount > 1) {
                                    inventory.amount -= 1;
                                    player.getComponent('inventory').container.setItem(player.selectedSlotIndex, inventory);
                                } else {
                                    player.getComponent('inventory').container.setItem(player.selectedSlotIndex, itemStack);
                                }
                            }

                            dimension.spawnParticle("minecraft:crop_growth_emitter", { x: x, y: y, z: z });
                            dimension.playSound("dig.gravel", { x: x, y: y, z: z });
                        }
                    });
                }
            }
        }
    });
    /*data.blockTypeRegistry.registerCustomComponent("pinatabedrock:plant_detect_water", {
        onPlace(e) {
            let block = e.block;

            let growthState = block.permutation.getState('pinatabedrock:growth_stage');
            let valid_values = BlockStates.get('pinatabedrock:growth_stage').validValues.length - 2;

            let fertilizerState = block.permutation.getState('pinatabedrock:fertilizer');

            let rotationState = block.permutation.getState('pinatabedrock:rotation');
            let rotationValue = BlockStates.get('pinatabedrock:rotation').validValues.length - 2;

            if (block.south(1).below(1).typeId === "minecraft:water") {
                rotationState == 2;

                block.setPermutation(
                    BlockPermutation.resolve(block.typeId, {
                        'pinatabedrock:fertilizer': fertilizerState,
                        'pinatabedrock:growth_stage': growthState,
                        'pinatabedrock:rotation': rotationState
                    })
                );
            }
            if (block.east(1).below(1).typeId === "minecraft:water") {
                rotationState == 3;

                block.setPermutation(
                    BlockPermutation.resolve(block.typeId, {
                        'pinatabedrock:fertilizer': fertilizerState,
                        'pinatabedrock:growth_stage': growthState,
                        'pinatabedrock:rotation': rotationState
                    })
                );
            }
            if (block.north(1).below(1).typeId === "minecraft:water") {
                rotationState == 0;

                block.setPermutation(
                    BlockPermutation.resolve(block.typeId, {
                        'pinatabedrock:fertilizer': fertilizerState,
                        'pinatabedrock:growth_stage': growthState,
                        'pinatabedrock:rotation': rotationState
                    })
                );
            }
            if (block.west(1).below(1).typeId === "minecraft:water") {
                rotationState == 1;

                block.setPermutation(
                    BlockPermutation.resolve(block.typeId, {
                        'pinatabedrock:fertilizer': fertilizerState,
                        'pinatabedrock:growth_stage': growthState,
                        'pinatabedrock:rotation': rotationState
                    })
                );
            }
        }
    });*/
})

const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple"
];

function isBlockTypeNearBlock(block, blockTypeId, radius) {
    try {
        const radiusInt = Math.floor(radius);
        const dimension = block.dimension;

        const x0 = Math.floor(block.location.x) - radiusInt;
        const z0 = Math.floor(block.location.z) - radiusInt;
        const xMax = x0 + radiusInt * 2;
        const zMax = z0 + radiusInt * 2;
        const y = Math.floor(block.location.y) - 1;

        for (let x = x0; x <= xMax; x++) {
            for (let z = z0; z <= zMax; z++) {
                if (blockTypeId === dimension.getBlock({ x: x, y: y, z: z }).typeId) {
                    return true;
                }
            }
        }

        return false;

    } catch (e) {
        world.sendMessage(`Error caught in isBlockTypeNearPlayer(): ${e.message}`);
    }
}