import React from 'react'
import { MenuItem, Box, useDisclosure } from '@chakra-ui/react'
import { FaSave } from 'react-icons/fa'
import { SaveModal } from './SaveModal'

const ExportMenuItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <MenuItem onClick={onOpen}>
        <Box mr={2} as={FaSave} />
        Uložit aplikaci
      </MenuItem>

      <SaveModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ExportMenuItem
