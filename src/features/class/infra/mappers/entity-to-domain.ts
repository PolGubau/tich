import { ClassEntity } from "db/schema";
import { Class } from "~/domain/class/class";
import { createClass } from "~/domain/class/create-class";
import { ClassPrimitive } from "~/domain/class/types";
import { classEntityToPrimitiveMapper } from "./entity-to-primitive";

export const classEntityToDomainMapper = (entity: ClassEntity): Class => {
  const primitive: ClassPrimitive = classEntityToPrimitiveMapper(entity);
  const domain = createClass(primitive);
  return domain;
}

export const classEntitiesToDomainsMapper = (entities: ClassEntity[]): Class[] => {
  return entities.map(classEntityToDomainMapper) ?? [];
}
