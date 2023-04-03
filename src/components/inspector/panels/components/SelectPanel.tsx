import React, { memo, useState, } from 'react'
import { Select, Input, Accordion, Button, Icon, Box, Heading } from '@chakra-ui/react'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import TextControl from '~components/inspector/controls/TextControl'
import IconControl from '~components/inspector/controls/IconControl'
import AccordionContainer from '~components/inspector/AccordionContainer'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { SelectOption } from '~components/editor/previews/SelectPreview'
import snakeCase from 'lodash/snakeCase'

const SelectPanel = () => {
  const { setValueFromEvent, setValue } = useForm()

  const size = usePropsSelector('size')
  const variant = usePropsSelector('variant')
  const opt = usePropsSelector('options')

  const [options, setOptions] = useState<SelectOption[]>(opt)
  const addOption = () => {
    setOptions((options) => [
      ...options, { label: '', value: '' }
    ])
  }

  const handleOptionChange = ({ target }) => {
    const { value, name } = target
    const [, index, type] = name.split('.')
    setOptions((options) => {
      let newOptions = [...options]
      newOptions[index] = {
        ...newOptions[index],
        [type]: value
      }
      setValue('options', newOptions)
      return newOptions
    })
  }

  const handlePrefillValue = ({ target }) => {
    const { value, name } = target
    const [, index, type] = name.split('.')
    console.log({ index, type, value, name })
    if (!options[index].value) {
      handleOptionChange({
        target: {
          value: snakeCase(value),
          name: `options.${index}.value`
        }
      })
    }
  }

  return (
    <>
      <FormControl label="Size" htmlFor="size">
        <Select
          name="size"
          id="size"
          size="sm"
          value={size || ''}
          onChange={setValueFromEvent}
        >
          <option>sm</option>
          <option>md</option>
          <option>lg</option>
        </Select>
      </FormControl>

      <IconControl label="Icon" name="icon" />
      <TextControl label="Icon size" name="iconSize" />

      <FormControl label="variant" htmlFor="variant">
        <Select
          name="variant"
          id="variant"
          size="sm"
          value={variant}
          onChange={setValueFromEvent}
        >
          <option>outline</option>
          <option>unstyled</option>
          <option>flushed</option>
          <option>filled</option>
        </Select>
      </FormControl>

      <SwitchControl label="Invalid" name="isInvalid" />
      <SwitchControl label="Read Only" name="isReadOnly" />

      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionContainer title="Hodnoty">
          {options.map(({ value, label }, index) => {
            return (
              <Box key={index}>
                <Box fontSize={10}>{index + 1}.</Box>
                <FormControl label="label" htmlFor={`options.${index}.label`}>
                  <Input
                    value={label}
                    onChange={handleOptionChange}
                    onBlur={handlePrefillValue}
                    name={`options.${index}.label`}
                    id={`options.${index}.label`}
                    size="sm"
                  />
                </FormControl>

                <FormControl label="value" htmlFor={`options.${index}.value`}>
                  <Input
                    value={value}
                    onChange={handleOptionChange}
                    name={`options.${index}.value`}
                    id={`options.${index}.value`}
                    size="sm"
                  />
                </FormControl>
              </Box>
            )
          })}

          <Box w="full" textAlign="right">
            <Button ml="auto" onClick={addOption} variant="link" size="sm" leftIcon={<PlusSquareIcon />}>Přidat</Button>
          </Box>
        </AccordionContainer>
      </Accordion>
    </>
  )
}

export default memo(SelectPanel)
