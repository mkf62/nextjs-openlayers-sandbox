import { createTheme, colorsTuple } from '@mantine/core'

export const theme = createTheme({
    focusRing: 'auto',
    white: '#ffffff',
    black: '#0a0a0a',
    primaryColor: 'blue100',
    primaryShade: 0,
    colors: {
        blue100: colorsTuple('rgba(0,86,158,1)'),
        red: colorsTuple('rgba(235, 5, 12,1)'),
        green: colorsTuple('rgba(1, 107, 38, 1)'),
    },
    radius: { '5': '5px' },
    defaultRadius: 5,
    cursorType: 'default',
})
