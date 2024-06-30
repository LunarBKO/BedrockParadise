import { world } from '@minecraft/server';

world.afterEvents.playerInteractWithEntity.subscribe((data) => {
    const item = data.itemStack;
    const source = data.player;
    const target = data.target;

    if (item !== undefined && item.typeId === 'pinatabedrock:journal') {
        pinatas.forEach(pinata => {
            if (target.matches({ families: [pinata, "wild"] })) {
                source.sendMessage({ translate: `accessibility.wild.${pinata}` });
                source.sendMessage({ translate: `accessibility.wild.${pinata}1` });
            }
            if (target.matches({ families: [pinata, "resident"] })) {
                source.sendMessage({ translate: `accessibility.res.${pinata}` });
            }
        });
    }
});

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

const pinatas = [
    "bispotti",
    "bunnycomb",
    "custacean",
    "mousemallow",
    "parmadillo",
    "pengum",
    "sparrowmint",
    "whirlm"
]