import React, { useMemo } from 'react'
import { useInteractive } from '~hooks/useInteractive'
import iconsList from '~iconsList'
import { Select } from '@chakra-ui/react'

export type SelectOption = { value: string, label: string }

interface IProps {
  component: IComponent
  options?: SelectOption[]
}

const SelectPreview = ({ component }: IProps) => {
  const {
    props: { icon, options, ...props },
  } = useInteractive(component)

  const Icon = useMemo(() => {
    if (!icon) {
      return null
    }
    return iconsList[icon as keyof typeof iconsList]
  }, [icon])

  return (
    <Select {...props} icon={Icon ? <Icon path="" /> : undefined}>
      {options?.map(({ value, label }, index) => (
        <option key={value || label || index} value={value}>{label}</option>
      ))}
    </Select>
  )
}

export default SelectPreview
