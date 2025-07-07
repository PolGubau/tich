import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, Platform, ScrollView, Switch, View } from 'react-native';
import { PartialClassWithDefinedStudent } from "~/domain/class/types";
import { Text } from '~/shared/components/Text';
import TextInput from '~/shared/components/ui/TextInput';
import { t } from '~/shared/i18n/i18n';
import DateInput from '~/shared/ui/date-input';
import TimeInput from '~/shared/ui/time-input';



type Props = {
  initialValues: PartialClassWithDefinedStudent
  onSubmit: (partial: PartialClassWithDefinedStudent) => void;
  isLoading?: boolean;
  error?: string | null;
  canSubmit?: boolean;
}
export function BaseClassForm({ initialValues, onSubmit, isLoading, canSubmit = true }: Props) {
  const [topic, setTopic] = useState(initialValues.topic ?? '')
  const [notes, setNotes] = useState(initialValues.notes ?? '')
  const [isPaid, setIsPaid] = useState(initialValues.isPaid ?? false)
  const [duration, setDuration] = useState(initialValues.durationMinutes ?? 0)
  const [price, setPrice] = useState<number>(initialValues.price?.value ?? 0)

  useEffect(() => {
    setTopic(initialValues.topic ?? '')
    setNotes(initialValues.notes ?? '')
    setIsPaid(initialValues.isPaid ?? false)
    setDuration(initialValues.durationMinutes ?? 0)
    setPrice(initialValues.price?.value ?? 0)
    const newDate = initialValues.date ? new Date(initialValues.date) : new Date()
    setDate(newDate.toISOString())
    setStartingTime(newDate.toISOString())
    setError(null)
  }, [initialValues])

  // both dateFecha and startingTime should be the time and date of initialValues.date, ine input changes the date and the other the time, then they are combined to form the full date
  const completeDate = initialValues.date ? new Date(initialValues.date) : new Date();

  const [date, setDate] = useState(completeDate.toISOString())
  const [startingTime, setStartingTime] = useState(completeDate.toISOString())



  const [error, setError] = useState<string | null>(null)



  const handleSubmit = () => {
    if (!topic.trim()) return setError("El tema es obligatorio")
    if (!notes.trim()) return setError("Las notas son obligatorias")
    if (duration <= 0) return setError("La duración debe ser mayor a 0 minutos")
    if (price <= 0) return setError("El precio debe ser mayor a 0")
    if (!date) return setError("La fecha es obligatoria")
    if (!startingTime) return setError("La hora de inicio es obligatoria")
    setError(null)

    const dateObj = new Date(date); // complete ISO where we only want the date part
    const timeObj = new Date(startingTime); // complete ISO where we only want the time part
    // Combine date and time into a single ISO string
    if (isNaN(dateObj.getTime()) || isNaN(timeObj.getTime())) {
      return setError("Fecha o hora inválida");
    }
    const combinedDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), timeObj.getHours(), timeObj.getMinutes());


    const updated: PartialClassWithDefinedStudent = {
      ...initialValues,
      date: combinedDate.toISOString(), // Combine date and time
      durationMinutes: duration,
      price: { value: price, currency: "EUR" }, // Assuming EUR as the currency for now
      isPaid: isPaid,
      topic: topic.trim(),
      notes: notes.trim(),
    }

    onSubmit(updated)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 px-1"
    >
      <ScrollView>

        <Text className="font-semibold mb-1">{t("topic")} *</Text>
        <TextInput editable={!isLoading}
          value={topic}
          onChangeText={setTopic}
          autoCapitalize="sentences"
          autoCorrect={false}
          placeholder={t("topic_placeholder")}
        />
        <Text className="font-semibold mb-1">{t("notes")} *</Text>
        <TextInput editable={!isLoading}
          value={notes}
          onChangeText={setNotes}
          textAlignVertical="top"
          placeholder={t("notes_placeholder")}
          multiline
          numberOfLines={6}
          className="min-h-20"
          maxLength={500}

        />
        <Text className="font-semibold mb-1">{t("price")} *</Text>
        <TextInput
          value={price.toString()}
          onChangeText={text => {
            // Opcional: filtrar solo dígitos
            const numericText = text.replace(/[^0-9]/g, "")
            setPrice(Number(numericText))
          }}
          keyboardType="numeric"
          placeholder={t("price_placeholder")}
        />

        <View className="flex-row items-center justify-between mb-4">
          <Text className="font-semibold mb-1">{t("is_already_paid")}?</Text>

          <Switch
            value={isPaid}
            onValueChange={setIsPaid}
          />
        </View>

        <Text className="font-semibold mb-1">{t("duration")} </Text>
        <TextInput
          value={duration.toString()}
          onChangeText={text => {
            // Opcional: filtrar solo dígitos
            const numericText = text.replace(/[^0-9]/g, "")
            setDuration(Number(numericText))
          }}
          keyboardType="numeric"
          placeholder={t("duration_placeholder")}
        />
        <DateInput
          label={t("date_of_class")}
          initialDate={new Date(date)}
          onDateChange={(date) => setDate(date.toISOString())}
        />
        <TimeInput
          label={t("starting_time")}
          initialDate={new Date(startingTime)}
          onDateChange={(date) => setStartingTime(date.toISOString())}
        />





        <Button title={isLoading ? t("saving") : t("save")}
          onPress={handleSubmit} disabled={isLoading || !canSubmit || !topic.trim() || !notes.trim() || duration <= 0 || price <= 0 || !date || !startingTime}
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