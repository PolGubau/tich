import { ClassEntity } from "db/schema";
import { ClassPrimitive } from "~/domain/class/types";

export const classEntityToPrimitiveMapper = (entity: ClassEntity): ClassPrimitive => {
  return {
    id: entity.id,
    studentId: entity.studentId,
    date: entity.date,
    durationMinutes: entity.durationMinutes,
    topic: entity.topic,
    isPaid: Boolean(entity.isPaid),
    packId: entity.packId ?? null,
    price: { value: entity.priceValue, currency: entity.priceCurrency },
    notes: entity.notes,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}

export const classEntitiesToPrimitivesMapper = (entities: ClassEntity[]): ClassPrimitive[] => {
  return entities.map(classEntityToPrimitiveMapper);
}
