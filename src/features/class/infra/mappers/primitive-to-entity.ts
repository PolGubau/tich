import { ClassCreatePrimitive, ClassPrimitive } from "~/domain/class/types"

export const createClassMapper = (domain: ClassCreatePrimitive) => {
  return {
    studentId: domain.studentId,
    date: domain.date,
    durationMinutes: domain.durationMinutes,
    topic: domain.topic,
    packId: domain.packId ? domain.packId : null,
    price: domain.price,
    notes: domain.notes,
    isPaid: domain.isPaid ? 1 : 0,
  }
}
export const classMapper = (domain: ClassPrimitive) => {
  return {
    id: domain.id,
    studentId: domain.studentId,
    date: domain.date,
    durationMinutes: domain.durationMinutes,
    topic: domain.topic,
    packId: domain.packId ? domain.packId : null,
    price: domain.price,
    notes: domain.notes,
    isPaid: domain.isPaid ? 1 : 0,
  }
}