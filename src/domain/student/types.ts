
export interface StudentPrimitive {
  id: string
  name: string
  email: string
  notes?: string
  avatarUrl?: string
}
export interface StudentCreatePrimitive extends Omit<StudentPrimitive, "id"> { id?: string }