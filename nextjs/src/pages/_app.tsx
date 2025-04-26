import Head from 'next/head'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { theme } from '../theme/theme'
import { Provider } from 'react-redux'
import { store } from '../GlobalRedux/store/index'
import '@mantine/core/styles.layer.css'
import 'ol/ol.css'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider theme={theme}>
            <Head>
                <title>Application</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
                <link rel="shortcut icon" href="/favicon.svg" />
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </MantineProvider>
    )
}
