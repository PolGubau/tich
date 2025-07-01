import { PackEntity } from "db/schema"
import { DefaultDates } from "~/shared/types/defaultDates"
import { StudentPrimitive } from "../student/types"




type PricePrimitive = {
  value: number
  currency: string
}
/**
 * ClassPrimitive type definition
 * This type represents the structure of a class object in the system.
 */
export type ClassPrimitive = DefaultDates & {
  id: number
  studentId: StudentPrimitive["id"]
  date: string // ISO
  durationMinutes: number
  topic: string
  isPaid: boolean
  packId: PackEntity["id"] | null
  price: PricePrimitive
  notes: string
}
export interface ClassCreatePrimitive extends Omit<ClassPrimitive, "id" | "createdAt" | "updatedAt"> { id?: number }


export type PartialClassWithDefinedStudent = Partial<Omit<ClassCreatePrimitive, "studentId">> & {}
