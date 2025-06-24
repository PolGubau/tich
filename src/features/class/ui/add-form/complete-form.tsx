import { Picker } from '@react-native-picker/picker';
import { PartialClassWithDefinedStudent } from "app/(tabs)/students/[id]/add-class";
import { useState } from "react";
import { Text, View } from "react-native";
import { ClassCreatePrimitive } from "~/domain/class/types";
import { useStudents } from "~/features/student/model/use-students";
import { BaseClassForm } from "./base-form";

type Props = {
  initialValues: ClassCreatePrimitive
  onSubmit: (item: ClassCreatePrimitive) => void;
  isLoading?: boolean;
  error?: string | null;
}
export function CompleteClassForm({ initialValues, onSubmit, isLoading, error }: Props) {
  const { students } = useStudents()

  const [studentId, setStudentId] = useState<number | null>(initialValues.studentId ?? null);



  const handleSubmit = (values: PartialClassWithDefinedStudent) => {
    if (!studentId) {
      console.error("Student ID is required");
      return;
    }

    const updatedValues: ClassCreatePrimitive = {
      ...initialValues,
      ...values,
      studentId: studentId,
    };
    onSubmit(updatedValues);
  }


  return (
    <View className="flex-1">

      <Text className="font-semibold mb-1">
        Who is this class for?
      </Text>


      <View className="border border-neutral-500/60 text-lg rounded-lg mb-4"
      >

        <Picker
          enabled={students.length > 0}
          selectedValue={studentId?.toString() ?? null}
          onValueChange={(itemValue) =>
            setStudentId(Number(itemValue))
          }>
          {students.map(student => (
            <Picker.Item key={student.id.value} label={student.name.value} value={student.id.value.toString()} />
          ))}
        </Picker>

      </View>


      <BaseClassForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </View>
  )
}