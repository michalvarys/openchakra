import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@chakra-ui/theme'
import axios from 'axios'
import 'react-color-picker/index.css'
import '@reach/combobox/styles.css'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://wvujbt-3000.csb.app/'

import { wrapper } from '~core/store'
import { ErrorBoundary as BugsnagErrorBoundary } from '~utils/bugsnag'
import AppErrorBoundary from '~components/errorBoundaries/AppErrorBoundary'
import { AppProps } from 'next/app'

const Main = ({ Component, pageProps }: AppProps) => (
  <BugsnagErrorBoundary>
    <ChakraProvider resetCSS theme={theme}>
      <AppErrorBoundary>
        <Component {...pageProps} />
      </AppErrorBoundary>
    </ChakraProvider>
  </BugsnagErrorBoundary>
)

export default wrapper.withRedux(Main)
