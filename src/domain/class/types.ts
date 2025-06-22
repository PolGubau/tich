
/**
 * ClassPrimitive type definition
 * This type represents the structure of a class object in the system.
 */
export type ClassPrimitive = {
  id: string
  studentId: string
  date: string // ISO
  durationMinutes: number
  topic?: string
  packId?: string // si pertenece a un pack
  price?: number  // si no pertenece a un pack
  notes?: string
}  