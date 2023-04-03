import { Box } from "@chakra-ui/react"
import { Global } from "@emotion/react"
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import axios from 'axios'
import Editor from "~components/editor/Editor"
import EditorErrorBoundary from "~components/errorBoundaries/EditorErrorBoundary"
import useDispatch from "~hooks/useDispatch"

type PageProps = {
  components: any
  error?: any
}

export default function Page({ components, error }: PageProps) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch.components.reset(components)
    dispatch.app.setRenderMode()
  }, [components])

  if (!components) {
    return <Box>Nastala nějaká chyba {error}</Box>
  }

  return (
    <>
      <Global styles={{
        html: { minWidth: '860px', backgroundColor: 'white' },
      }} />

      <DndProvider options={{ disabled: true, canDrag: false, isDisabled: true }} backend={HTML5Backend}>
        <EditorErrorBoundary>
          <Box bg="white" flex={1} position="relative">
            <Editor isRenderer />
          </Box>
        </EditorErrorBoundary>
      </DndProvider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps, { page: string }> = async (ctx) => {
  const { page } = ctx.params || {}

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