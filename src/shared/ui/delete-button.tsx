import MaterialIcons from "@expo/vector-icons/build/MaterialIcons"
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics"
import { Alert, Pressable, Text } from "react-native"

type DeleteButtonProps = {
  onDelete: () => void
  alertMessages?: {
    title?: string
    message?: string
    cancel?: string
    confirm?: string
  }
  deleteText?: string

}

export function DeleteButton({ onDelete, alertMessages, deleteText = "Eliminar" }: DeleteButtonProps) {
  const confirmDelete = () => {
    Alert.alert(
      alertMessages?.title || "Confirmar eliminación",
      alertMessages?.message || "¿Seguro que quieres borrar este estudiante? Esta acción no se puede deshacer.",
      [
        { text: alertMessages?.cancel, style: "cancel" },
        { text: alertMessages?.confirm, style: "destructive", onPress: onDelete },
      ],
      { cancelable: true }
    )
  }

  return (<Pressable onPressIn={() => {
    impactAsync(ImpactFeedbackStyle.Light);
  }} className='flex-row items-center gap-1 pt-2' onPress={confirmDelete}>
    <MaterialIcons name='delete' size={14} color='#ef4444' />
    <Text className='text-red-500'>{deleteText}</Text>
  </Pressable>)
}
