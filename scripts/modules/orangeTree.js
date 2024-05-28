import { world } from '@minecraft/server';

world.beforeEvents.worldInitialize.subscribe((data) => {
    data.blockTypeRegistry.registerCustomComponent("pinatabedrock:random_tick", {
        onRandomTick(e) {
            const block = e.block;
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
                structure.place('mystructure:orange_tree', e.dimension, location)
            }
            if (block.below(1).typeId === "pinatabedrock:orange_tree2" && block.below(2).typeId === "pinatabedrock:orange_tree2" && block.above(1).isAir && playerPlaced !== 1 && block.permutation.getState('pinatabedrock:fertilizer') === 1) {
                structure.place('mystructure:orange_tree1', e.dimension, location)
            }
            if (block.below(1).typeId === "pinatabedrock:orange_tree2" && block.below(2).typeId === "pinatabedrock:orange_tree2" && block.above(1).isAir && playerPlaced !== 1 && block.permutation.getState('pinatabedrock:fertilizer') === 2) {
                structure.place('mystructure:orange_tree2', e.dimension, location)
            }
            if (block.below(1).typeId === "pinatabedrock:orange_tree2" && block.below(2).typeId === "pinatabedrock:orange_tree2" && block.above(1).isAir && playerPlaced !== 1 && block.permutation.getState('pinatabedrock:fertilizer') === 3) {
                structure.place('mystructure:orange_tree3', e.dimension, location)
            }
        }
    })
})