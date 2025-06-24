import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ExpoImage from 'expo-image-picker';
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { StudentCreatePrimitive, StudentPrimitive } from "~/domain/student/types";

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

    console.log(result);

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

          <Image source={{ uri: avatarUrl }} className="w-24 h-24 rounded-full mb-4 bg-neutral-200" />
          <Pressable onPress={pickImage} className="absolute -bottom-2 bg-white rounded-full p-2">
            <MaterialIcons name="edit" size={18} color="#2563eb" />
          </Pressable>
        </View>

        <Text className="font-semibold mb-1">Name</Text>
        <TextInput editable={!isLoading}
          value={name}
          onChangeText={setName}
          placeholder="Nombre del estudiante"
          className="border border-neutral-500/60 px-3 py-2 text-lg rounded-lg mb-4"
        />

        <Text className="font-semibold mb-1">Email</Text>
        <TextInput editable={!isLoading}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-neutral-500/60 px-3 py-2 text-lg rounded-lg mb-4"
        />

        <Text className="font-semibold mb-1">Notes</Text>
        <TextInput editable={!isLoading}
          value={notes}
          onChangeText={setNotes}
          textAlignVertical="top"
          placeholder="The student wants to learn..."
          multiline
          numberOfLines={6}
          className="border border-neutral-500/60 px-3 py-2 text-base rounded-lg mb-4 min-h-20"
          maxLength={500}

        />



        <Button title={isLoading ? "Saving..." : "Save"}
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
