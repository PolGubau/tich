import MaterialIcons from "@expo/vector-icons/build/MaterialIcons"
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics"
import * as LocalAuthentication from 'expo-local-authentication'
import { Alert, Pressable } from "react-native"
import { Text } from "../components/Text"
import { t } from "../i18n/i18n"
import { TranslationKeys } from "../i18n/i18n-types"


type DeleteButtonProps = {
  onDelete: () => void
  alertMessages?: {
    title: TranslationKeys
    message: TranslationKeys
    cancel: TranslationKeys
    confirm: TranslationKeys
  }
  deleteText?: TranslationKeys

}

export function DeleteButton({ onDelete, alertMessages = {
  title: "delete",
  message: "delete_confirmation",
  cancel: "cancel",
  confirm: "delete"
}, deleteText = "delete" }: DeleteButtonProps) {
  const { title, message, cancel, confirm } = alertMessages
  const confirmDelete = () => {
    Alert.alert(
      t(title),
      t(message),
      [
        { text: t(cancel), style: "cancel" },
        {
          text: t(confirm),
          style: "destructive",
          onPress: async () => {
            const hasHardware = await LocalAuthentication.hasHardwareAsync()
            const isEnrolled = await LocalAuthentication.isEnrolledAsync()

            if (!hasHardware || !isEnrolled) {
              onDelete()
            }

            const result = await LocalAuthentication.authenticateAsync({
              promptMessage: t("authenticate_to_delete"),
              cancelLabel: t("cancel"),
              fallbackLabel: t("use_passcode"),
              disableDeviceFallback: false,
              requireConfirmation: true
            })

            if (result.success) {
              onDelete()
            }
          }
        }
      ],
      { cancelable: true }
    )
  }

  return (<Pressable onPressIn={() => {
    impactAsync(ImpactFeedbackStyle.Light);
  }} className='flex-row items-center gap-1' onPress={confirmDelete}>
    <MaterialIcons name='delete' size={14} color='#ef4444' />
    <Text customColor className='text-red-500'>{t(deleteText)}</Text>
  </Pressable>)
}
