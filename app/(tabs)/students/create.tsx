import * as Contacts from 'expo-contacts'
import { Stack } from 'expo-router'
import React from 'react'
import { StudentCreatePrimitive } from '~/domain/student/types'
import { useCreateStudent } from '~/features/student/model/use-create-student'
import { DrawerList } from '~/features/student/ui/contact-list/drawer-list'
import { StudentForm } from '~/features/student/ui/details/edit/student-form'
import { t } from '~/shared/i18n/i18n'
import { MainLayout } from '~/shared/layouts/main-layout'
export default function CreateStudentScreen() {

  
 
  const { create, newStudent, status,setNewStudent } = useCreateStudent()
 

  function handlePrefill(contact: Contacts.Contact) {
    const student: StudentCreatePrimitive = {
      name: contact.name ?? "",
      email: contact.emails?.[0]?.email ?? "",
      notes: contact.note ?? "",
      avatarUrl: contact.image?.uri ?? null,
    }

    setNewStudent(student)
  }


  return (<>

    <MainLayout className='px-3'>
       <Stack.Screen
        options={{
          title: t("new_student"),
        }}
      />

      <StudentForm initialValues={newStudent} onSubmit={create} isLoading={status === 'loading'} />
       

        <DrawerList onSelect={handlePrefill} />

    </MainLayout></>
  )
}

 