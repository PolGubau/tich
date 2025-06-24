import { ClassPrimitive } from "~/domain/class/types";
import { studentListMock } from "~/features/student/__mocks__/studentList.mock";

export const classListMock: ClassPrimitive[] = [
  {
    id: 1,
    studentId: studentListMock[0].id,
    date: new Date("2023-10-01T10:00:00Z").toISOString(),
    durationMinutes: 60,
    topic: "HTML",
    price: 19,
    packId: null,
    notes: "First class on HTML basics", createdAt: new Date("2023-10-02T10:00:00Z"),
    updatedAt: new Date("2023-10-02T10:00:00Z"),
  },
  {
    id: 2,
    studentId: studentListMock[0].id,
    date: new Date("2023-10-02T10:00:00Z").toISOString(),
    durationMinutes: 60,
    topic: "Python",
    createdAt: new Date("2023-10-02T10:00:00Z"),
    updatedAt: new Date("2023-10-02T10:00:00Z"),
    price: 19,
    notes: "hemos visto los selectores y las propiedades más comunes, no hemos dado tiempo a ver flex ni ha entendido a usarlo pero ha entendido el concepto de caja flexible", packId: null,

  },
  {
    id: 3,
    studentId: studentListMock[1].id,
    date: new Date("2023-10-03T10:00:00Z").toISOString(), createdAt: new Date("2023-10-02T10:00:00Z"),
    updatedAt: new Date("2023-10-02T10:00:00Z"),
    durationMinutes: 30,
    topic: "CSS",
    price: 19,
    notes: "hemos visto los selectores y las propiedades más comunes, no hemos dado tiempo a ver flex ni ha entendido a usarlo pero ha entendido el concepto de caja flexible", packId: null,

  },
];
