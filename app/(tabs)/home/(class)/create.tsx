import React from 'react'
import { useCreateClass } from '~/features/class/model/use-create-class'
import { CompleteClassForm } from '~/features/class/ui/add-form/complete-form'
import { MainLayout } from '~/shared/layouts/main-layout'

export default function CreateClass() {
  const { create, emptyClass, status } = useCreateClass()





  return (
    <MainLayout className='flex-1 px-6'>
      <CompleteClassForm onSubmit={create} initialValues={emptyClass} isLoading={status === "loading"} />
    </MainLayout>
  )
}