import { Handler } from './index'
import { logger, message } from 'snips-toolkit'
import { checkVolumeRange } from './volumeSetUtils'
import {
    VOLOME_STEP_DEFAULT
} from '../constants'
import { NluSlot, slotType } from 'hermes-javascript/types'

export const volumeDownHandler: Handler = async function (msg, flow, hermes, player, options) {
    logger.debug('volumeDownHandler')
    flow.end()

    let change: any = VOLOME_STEP_DEFAULT
    let slot: NluSlot<slotType.custom> | null = message.getSlotsByName(msg, 'volume_lower', {
        onlyMostConfident: true,
        threshold: options.confidenceScore.slotDrop
    })
    if (slot) {
        change = slot.value.value
    }
    let newVolume = checkVolumeRange(player.volume - change)

    await player.saveVolume(newVolume)
}