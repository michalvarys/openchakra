import React from 'react'
import { GetServerSideProps } from 'next'
import { Box } from '@chakra-ui/react'

export default function Homepage() {
    return (
        <Box
            maxH="calc(100vh - 3rem)"
            flex="0 0 15rem"
            bg="#f7fafc"
            overflowY="auto"
            overflowX="visible"
            borderLeft="1px solid #cad5de"
        >
            homepage
        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {}
    }
}