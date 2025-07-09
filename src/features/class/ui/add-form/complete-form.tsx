import { Picker } from '@react-native-picker/picker';

import { useState } from "react";
import { View } from "react-native";
import { ClassCreatePrimitive, PartialClassWithDefinedStudent } from "~/domain/class/types";
import { useStudents } from "~/features/student/model/use-students";
import { Text } from '~/shared/components/Text';
import { useColorScheme } from '~/shared/hooks/useColorScheme';
import { t } from '~/shared/i18n/i18n';
import { BaseClassForm } from "./base-form";

type Props = {
  initialValues: ClassCreatePrimitive
  onSubmit: (item: ClassCreatePrimitive) => void;
  isLoading?: boolean;
  error?: string | null;
}
export function CompleteClassForm({ initialValues, onSubmit, isLoading, error }: Props) {
  const { students } = useStudents()
  const theme = useColorScheme()

  const [studentId, setStudentId] = useState<string | null>(initialValues.studentId !== null ? initialValues.studentId.toString() : null);

  const handleSubmit = (values: PartialClassWithDefinedStudent) => {
    if (!studentId) {
      console.error("Student ID is required");
      return;
    }

    const updatedValues: ClassCreatePrimitive = {
      ...initialValues,
      ...values,
      studentId: Number(studentId),
    };
    onSubmit(updatedValues);
  }


  return (
    <View className="flex-1">

      <Text className="mb-1">
        {t("who_is_this_class_for")} *
      </Text>


      <View className="border border-neutral-500/60 text-lg rounded-lg mb-4 "
      >
        {students?.length > 0 ? (
          <Picker
            placeholder='Select a student'
            prompt='Select a student'
            mode='dropdown' dropdownIconColor={theme === 'dark' ? '#fff' : '#000'}
            style={{ color: theme === 'dark' ? '#fff' : '#000' }}
            enabled={students.length > 0}
            selectedValue={studentId}

            onValueChange={(itemValue) =>
              setStudentId(itemValue)
            }>
            <Picker.Item enabled={false} label={`${t("select_student")}...`} value={null} />

            {students.map(student => (
              <Picker.Item key={student.id} label={student.name} value={student.id.toString()} />
            ))}
          </Picker>
        ) : (
          <Text customColor className="text-neutral-500 text-center p-4">
            {t("no_students_available")}
          </Text>
        )}

      </View>

      <BaseClassForm
        // to confirm, studentID must be a number and not null
        canSubmit={!!studentId && studentId !== "null"}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </View>
  )
}