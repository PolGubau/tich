import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";


type Props = {
  initialDate?: Date
  onDateChange?: (date: Date) => void
  label?: string
}
export default function DateInput({ initialDate, onDateChange, label = "Select a date" }: Props) {
  const [date, setDate] = useState(initialDate || new Date())
  const [show, setShow] = useState(false)

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(Platform.OS === "ios")
    if (selectedDate) {
      setDate(selectedDate)
      onDateChange?.(selectedDate)
    }
  }

  return (
    <View>
      <Text className="font-semibold mb-1">{label}</Text>

      <Pressable onPress={() => setShow(true)} className="flex-row items-center gap-2 mb-4 border border-neutral-500/60 px-3 py-2 rounded-lg">
        <MaterialIcons name="calendar-today" size={18} />
        <Text>{date.toDateString()}</Text>
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
