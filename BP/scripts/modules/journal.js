import { world } from '@minecraft/server';

world.afterEvents.playerInteractWithEntity.subscribe((data) => {
    const item = data.itemStack;
    const source = data.player;
    const target = data.target;
    if (item !== undefined) {
        if (item.typeId === 'pinatabedrock:journal') {

            if (target.matches({ families: ["garden"] })) {
                source.sendMessage({ translate: 'accessibility.garden' });
            }

            if (target.matches({ families: ["parmadillo", "wild"] })) {
                source.sendMessage({ translate: 'accessibility.wild.parmadillo' });
                source.sendMessage({ translate: 'accessibility.wild.parmadillo1' });
            }
            if (target.matches({ families: ["parmadillo", "resident"] })) {
                source.sendMessage({ translate: 'accessibility.res.parmadillo' });
            }

            if (target.matches({ families: ["custacean", "wild"] })) {
                source.sendMessage({ translate: 'accessibility.wild.custacean' });
                source.sendMessage({ translate: 'accessibility.wild.custacean1' });
            }
            if (target.matches({ families: ["custacean", "resident"] })) {
                source.sendMessage({ translate: 'accessibility.res.custacean' });
            }

            if (target.matches({ families: ["pengum", "wild"] })) {
                source.sendMessage({ translate: 'accessibility.wild.pengum' });
                source.sendMessage({ translate: 'accessibility.wild.pengum1' });
            }
            if (target.matches({ families: ["pengum", "resident"] })) {
                source.sendMessage({ translate: 'accessibility.res.pengum' });
            }

            if (target.matches({ families: ["whirlm", "wild"] })) {
                source.sendMessage({ translate: 'accessibility.wild.whirlm' });
                source.sendMessage({ translate: 'accessibility.wild.whirlm1' });
            }
            if (target.matches({ families: ["whirlm", "resident"] })) {
                source.sendMessage({ translate: 'accessibility.res.whirlm' });
            }

            if (target.matches({ families: ["sparrowmint", "wild"] })) {
                source.sendMessage({ translate: 'accessibility.wild.sparrowmint' });
                source.sendMessage({ translate: 'accessibility.wild.sparrowmint1' });
            }
            if (target.matches({ families: ["sparrowmint", "resident"] })) {
                source.sendMessage({ translate: 'accessibility.res.sparrowmint' });
            }

            if (target.matches({ families: ["mousemallow", "wild"] })) {
                source.sendMessage({ translate: 'accessibility.wild.mousemallow' });
                source.sendMessage({ translate: 'accessibility.wild.mousemallow1' });
            }
            if (target.matches({ families: ["mousemallow", "resident"] })) {
                source.sendMessage({ translate: 'accessibility.res.mousemallow' });
            }

            if (target.matches({ families: ["bunnycomb", "wild"] })) {
                source.sendMessage({ translate: 'accessibility.wild.bunnycomb' });
                source.sendMessage({ translate: 'accessibility.wild.bunnycomb1' });
            }
            if (target.matches({ families: ["bunnycomb", "resident"] })) {
                source.sendMessage({ translate: 'accessibility.res.bunnycomb' });
            }
        }
    }
})

world.afterEvents.playerInteractWithBlock.subscribe((data) => {
    const item = data.itemStack;
    const source = data.player;
    const block = data.block;
    if (item !== undefined) {
        if (item.typeId === 'pinatabedrock:journal') {

            if (block.typeId === 'pinatabedrock:orange_tree1' || block.typeId === 'pinatabedrock:orange_tree2') {
                source.sendMessage({ translate: 'accessibility.orangeTree' });
            }

            if (block.typeId === 'pinatabedrock:apple_tree1' || block.typeId === 'pinatabedrock:apple_tree2') {
                source.sendMessage({ translate: 'accessibility.appleTree' });
            }

            if (block.hasTag('pinata_red_plant')) {
                source.sendMessage({ translate: 'accessibility.redFertilizer' });
            }
            if (block.hasTag('pinata_yellow_plant')) {
                source.sendMessage({ translate: 'accessibility.yellowFertilizer' });
            }
            if (block.hasTag('pinata_green_plant')) {
                source.sendMessage({ translate: 'accessibility.greenFertilizer' });
            }
            if (block.hasTag('pinata_orange_plant')) {
                source.sendMessage({ translate: 'accessibility.orangeFertilizer' });
            }
            if (block.hasTag('pinata_blue_plant')) {
                source.sendMessage({ translate: 'accessibility.blueFertilizer' });
            }
            if (block.hasTag('pinata_purple_plant')) {
                source.sendMessage({ translate: 'accessibility.purpleFertilizer' });
            }
        }
    }
})