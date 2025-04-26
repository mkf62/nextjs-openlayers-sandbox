import { icGJson } from './icecream'
import { zooGJson } from './zoo'
import { createPointLayer } from '../functions/createLayers'
import { theme } from '@/theme/theme'

export const zoo = createPointLayer(
    'zoo',
    zooGJson,
    1,
    //@ts-ignore
    theme.colors.red[0],
)

export const icecream = createPointLayer(
    'icecream',
    icGJson,
    1,
    //@ts-ignore
    theme.colors.blue100[0],
)
