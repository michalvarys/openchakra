import React, { useState } from 'react'

import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { getComponents } from '~core/selectors/components'
import { useSelector } from 'react-redux'


type ApiKeyModalProps = {
    isOpen: boolean
    onClose: () => void
}

export function SaveModal({ isOpen, onClose }: ApiKeyModalProps) {
    const components = useSelector(getComponents)
    const [newApiKey, setNewApiKey] = useState('')

    const handleSave = () => {
        const json = JSON.stringify(components)
        console.log(json)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Zadejte jméno aplikace</ModalHeader>

                <ModalBody>
                    <Input
                        placeholder="Jméno aplikace"
                        value={newApiKey}
                        onChange={(e) => setNewApiKey(e.target.value)}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSave}>
                        Uložit
                    </Button>

                    <Button onClick={onClose}>Zrušit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
