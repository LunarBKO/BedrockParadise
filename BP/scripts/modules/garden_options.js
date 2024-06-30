import {
    world
} from '@minecraft/server'

import { ActionFormData } from "@minecraft/server-ui"

const gardenOptions = new ActionFormData()
    .title(`entity.pinatabedrock:wandering_gardner.name`)
    .body("")
    .button("a");

world.afterEvents.itemUse.subscribe((data) => {
    const { source, itemStack } = data
    if (itemStack.typeId == "minecraft:clock") {
        gardenOptions.show(source)
    }
})