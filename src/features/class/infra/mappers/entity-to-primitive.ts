import { ClassEntity } from "db/schema";
import { ClassPrimitive, CurrencyCode } from "~/domain/class/types";

export const classEntityToPrimitiveMapper = (entity: ClassEntity): ClassPrimitive => {

  console.log("ENTITY", entity)
  return {
    id: entity.id,
    studentId: entity.studentId,
    date: entity.date,
    durationMinutes: entity.durationMinutes,
    topic: entity.topic,
    isPaid: Boolean(entity.isPaid),
    packId: entity.packId ?? null,
    price: { value: entity.priceValue, currency: entity.priceCurrency as CurrencyCode },
    notes: entity.notes,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}

export const classEntitiesToPrimitivesMapper = (entities: ClassEntity[]): ClassPrimitive[] => {
  return entities.map(classEntityToPrimitiveMapper);
}
