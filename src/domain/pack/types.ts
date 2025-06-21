export interface PackPrimitive {
  id: string
  studentId: string
  purchaseDate: string // ISO
  totalClasses: number
  totalPrice: number
  classIds: string[]
  notes?: string
}