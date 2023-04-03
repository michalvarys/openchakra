import axios from 'axios'
import React, { useEffect } from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Global } from '@emotion/react'
import Header from '~components/Header'
import useShortcuts from '~hooks/useShortcuts'
import Sidebar from '~components/sidebar/Sidebar'
import EditorErrorBoundary from '~components/errorBoundaries/EditorErrorBoundary'
import Editor from '~components/editor/Editor'
import { InspectorProvider } from '~contexts/inspector-context'
import Inspector from '~components/inspector/Inspector'
import { GetServerSideProps } from 'next'
import useDispatch from '~hooks/useDispatch'

type PageProps = {
  components: any
  error?: any
}

const App = ({ components, error }:PageProps) => {
  useShortcuts()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch.components.reset(components)
  }, [components])

  if (!components) {
    return <Box>Nastala nějaká chyba {error}</Box>
  }

  return (
    <>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />
      <DndProvider backend={HTML5Backend}>
        <Header />
        <Flex h="calc(100vh - 3rem)">
          <Sidebar />
          <EditorErrorBoundary>
            <Box bg="white" flex={1} position="relative">
              <Editor />
            </Box>
          </EditorErrorBoundary>

          <Box
            maxH="calc(100vh - 3rem)"
            flex="0 0 15rem"
            bg="#f7fafc"
            overflowY="auto"
            overflowX="visible"
            borderLeft="1px solid #cad5de"
          >
            <InspectorProvider>
              <Inspector />
            </InspectorProvider>
          </Box>
        </Flex>
      </DndProvider>
    </>
  )
}

export default App

export const getServerSideProps: GetServerSideProps<PageProps, { page: string }> = async (ctx) => {
  const { page } = ctx.params || {}

  if(page === 'new'){
    return {
      props: {
        components: {}
      }
    }
  }

  try {
    const res = await axios(`/api/app/${page}`)

    if (res.status === 404) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        }
      }
    }
    const components = res.data

    return {
      props: {
        components
      }
    }
  } catch (error) {
    return {
      props: {
        components: null,
        error: error.message
      }
    }
  }

}
