import { CreateClassEntity } from "db/schema"
import { ClassCreatePrimitive, ClassPrimitive } from "~/domain/class/types"

export const createClassMapper = (domain: ClassCreatePrimitive): CreateClassEntity => {
  return {
    studentId: domain.studentId,
    date: domain.date,
    durationMinutes: domain.durationMinutes,
    topic: domain.topic,
    packId: domain.packId ? domain.packId : null,
    priceValue: domain.price.value,
    priceCurrency: domain.price.currency,
    notes: domain.notes,
    isPaid: domain.isPaid ? 1 : 0,
  }
}
export const classMapper = (domain: ClassPrimitive): CreateClassEntity => {
  return {
    id: domain.id,
    studentId: domain.studentId,
    date: domain.date,
    durationMinutes: domain.durationMinutes,
    topic: domain.topic,
    packId: domain.packId ? domain.packId : null,
    priceValue: domain.price.value,
    priceCurrency: domain.price.currency,
    notes: domain.notes,
    isPaid: domain.isPaid ? 1 : 0,
  }
}