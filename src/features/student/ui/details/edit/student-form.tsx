import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ExpoImage from 'expo-image-picker';
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,

  View
} from "react-native";
import { StudentCreatePrimitive, StudentPrimitive } from "~/domain/student/types";
import Avatar from "~/shared/components/Avatar";
import { Text } from "~/shared/components/Text";
import TextInput from "~/shared/components/ui/TextInput";
import { t } from "~/shared/i18n/i18n";

interface Props {
  initialValues: StudentCreatePrimitive | StudentPrimitive
  onSubmit: (data: StudentCreatePrimitive) => void
  isLoading: boolean
}

export const StudentForm = ({ initialValues, onSubmit, isLoading }: Props) => {
  const [name, setName] = useState(initialValues.name)
  const [email, setEmail] = useState(initialValues.email)
  const [notes, setNotes] = useState(initialValues.notes ?? "")
  const [avatarUrl, setAvatarUrl] = useState(initialValues.avatarUrl ?? "")

  const [error, setError] = useState<string | null>(null)
  const handleSubmit = () => {
    if (!name.trim()) return setError("El nombre es obligatorio")
    if (!email.trim()) return setError("El email es obligatorio")

    const updated: StudentCreatePrimitive = {
      ...initialValues,
      name: name.trim(),
      email: email.trim(),
      notes: notes.trim() || null,
      avatarUrl: avatarUrl.trim() || null,
    }

    onSubmit(updated)
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImage.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });


    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri);
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 px-1"
    >
      <ScrollView>

        <View className="flex items-center justify-center mb-6 relative">

          <Avatar avatarUrl={avatarUrl} />
          <Pressable onPress={pickImage} className="absolute -bottom-2 bg-white dark:bg-neutral-800 rounded-full p-2">
            <MaterialIcons name="edit" size={18} color="#2563eb" />
          </Pressable>
        </View>

        <Text className="mb-1">{t("name")}</Text>
        <TextInput editable={!isLoading}
          value={name}
          onChangeText={setName}
          placeholder={t("name_placeholder")}
        />

        <Text className="mb-1">{t("email")}</Text>
        <TextInput editable={!isLoading}
          value={email}
          onChangeText={setEmail}
          placeholder={t("email_placeholder")}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="mb-1">{t("notes")}</Text>
        <TextInput editable={!isLoading}
          value={notes}
          onChangeText={setNotes}
          textAlignVertical="top"
          placeholder={t("student_notes_placeholder")}
          multiline
          numberOfLines={6}
          className="min-h-20"
          maxLength={500}

        />



        <Button title={isLoading ? t("saving") : t("save")}
          onPress={handleSubmit} disabled={isLoading || !name.trim() || !email.trim()}
        />
        {error && (
          <Text className="text-red-500 mt-2 text-center">
            {error}
          </Text>
        )}
      </ScrollView>
      {isLoading && (
        <View
          className="absolute inset-0 justify-center items-center"
          pointerEvents="auto"
        >
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      )}
    </KeyboardAvoidingView>
  )
}
