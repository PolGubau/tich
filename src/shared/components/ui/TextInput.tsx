import React from 'react'
import { TextInput as NativeInput, TextInputProps } from 'react-native'


type Props = TextInputProps & {
}
export default function TextInput(props: Props) {
  return (
    <NativeInput {...props} className={`border border-neutral-500/60 px-3 py-2 text-lg rounded-lg mb-4 placeholder:text-neutral-500 text-black dark:text-white ${props.className || ''}`} autoCapitalize="none" />
  )
}