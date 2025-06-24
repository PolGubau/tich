
export interface StudentPrimitive {
  id: number
  name: string
  email: string
  notes: string | null
  avatarUrl: string | null
}
export interface StudentCreatePrimitive extends Omit<StudentPrimitive, "id"> { id?: number }