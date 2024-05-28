import { world } from '@minecraft/server';

world.afterEvents.playerInteractWithEntity.subscribe((data) => {
    const item = data.itemStack;
    const source = data.player;
    const target = data.target;
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
    }
})

world.afterEvents.playerInteractWithBlock.subscribe((data) => {
    const item = data.itemStack;
    const source = data.player;
    const block = data.block;
    if (item.typeId === 'pinatabedrock:journal') {

        if (block.typeId === 'pinatabedrock:apple_tree1' || block.typeId === 'pinatabedrock:apple_tree2') {
            source.sendMessage({ translate: 'accessibility.appleTree' });
        }

        if (block.typeId === 'pinatabedrock:orange_tree1' || block.typeId === 'pinatabedrock:orange_tree2') {
            source.sendMessage({ translate: 'accessibility.orangeTree' });
        }
    }
})