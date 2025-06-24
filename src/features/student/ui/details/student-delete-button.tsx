import MaterialIcons from "@expo/vector-icons/build/MaterialIcons"
import { Alert, Pressable, Text } from "react-native"

export function DeleteStudentButton({ onDelete }: { onDelete: () => void }) {
  const confirmDelete = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Seguro que quieres borrar este estudiante? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", style: "destructive", onPress: onDelete },
      ],
      { cancelable: true }
    )
  }

  return (<Pressable className='flex-row items-center gap-1 pt-2' onPress={confirmDelete}>
    <MaterialIcons name='delete' size={14} color='#ef4444' />
    <Text className='text-red-500'>
      Eliminar</Text>
  </Pressable>)
}
