import {
    world,
    system,
    ItemStack
} from '@minecraft/server'

import {
    ActionFormData
} from '@minecraft/server-ui'

const gardenOptions = new ActionFormData()
    .title(`accessibility.gardenOptions`)
    .body("")
    .button(`accessibility.removeGarden`)
    .button(`accessibility.detectBlocks`);
/*.button("proibir pinatas");

const pinataBanOptions = new ActionFormData()
.title(`proibir pinatas`)
.body("")
if 
.button(`accessibility.removeGarden`)
.button(`accessibility.detectBlocks`)
.button("proibir pinatas");*/

world.afterEvents.entitySpawn.subscribe((data) => {
    const entity = data.entity;
    if (entity.typeId == "pinatabedrock:garden") {
        const player = entity.getEntitiesFromViewDirection()
        for (const owner of player) {
            const id = owner.entity.nameTag;
            entity.addTag(`${id}`)
        }
    }
})

world.afterEvents.playerInteractWithEntity.subscribe((data) => {
    const { player, target } = data
    if (target.typeId == "pinatabedrock:garden") {
        const dimension = target.dimension;
        const owner = target.getTags();//player nameTag
        const id = player.nameTag
        if (owner == player.nameTag) {
            gardenOptions.show(player).then(respose => {
                if (respose.canceled) return;

                let selection = respose.selection;
                switch (selection) {
                    case 0:
                        target.runCommandAsync(`structure save ${id} ~~~ ~~~ true disk false`);
                        let gardenSign = new ItemStack("pinatabedrock:garden_sign", 1);
                        gardenSign.setLore([`${id}`]);
                        dimension.spawnItem(gardenSign, target.location);
                        system.runTimeout(() => {
                            target.remove();
                        }, 1);
                        break
                    case 1:
                        target.triggerEvent("pinatabedrock:detect")
                        break
                    /*case 2:
                        respose.canceled = true
                        pinataBanOptions.show(player).then(respond => {
                            if (respond.canceled) return;

                            let banSelection = respond.selection
                            switch (banSelection) {

                            }
                        })
                        break*/
                }
            })
        } else {
            player.sendMessage(`${owner}'s garden`)
        }
    }
})