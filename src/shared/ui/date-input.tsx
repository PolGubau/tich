import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Pressable, View, ViewProps } from "react-native";
import { Text } from "../components/Text";
import { useColorScheme } from "../hooks/useColorScheme";
import i18n from "../i18n/i18n";


type Props = ViewProps & {
  initialDate?: Date
  onDateChange?: (date: Date) => void
  label?: string
}
export default function DateInput({ initialDate, onDateChange, label = "Select a date", ...rest }: Props) {
  const [date, setDate] = useState(initialDate || new Date())
  const [show, setShow] = useState(false)
  const theme = useColorScheme()

  const onChange = (_e: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(Platform.OS === "ios")
    if (selectedDate) {
      setDate(selectedDate)
      onDateChange?.(selectedDate)
    }
  }

  return (
    <View {...rest}>
      <Text className="mb-1">{label}</Text>

      <Pressable onPress={() => setShow(true)} className="flex-row items-center gap-2 mb-4 border border-neutral-500/60 px-3 py-2 rounded-lg">
        <MaterialIcons name="calendar-today" size={18} color={theme === 'dark' ? '#fff' : '#000'} />
        <Text>{date.toLocaleDateString(i18n.locale)}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={date}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  )
}
