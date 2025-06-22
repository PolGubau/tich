import { ClassPrimitive } from "~/domain/class/types";
import { studentListMock } from "~/features/student/__mocks__/studentList.mock";

export const classListMock: ClassPrimitive[] = [
  {
    id: "class-1",
    studentId: studentListMock[0].id,
    date: new Date("2023-10-01T10:00:00Z").toISOString(),
    durationMinutes: 60,
    topic: "HTML",
    price: 19,
  },
  {
    id: "class-2",
    studentId: studentListMock[0].id,
    date: new Date("2023-10-02T10:00:00Z").toISOString(),
    durationMinutes: 60,
    topic: "Python",
    price: 19,
  },
  {
    id: "class-3",
    studentId: studentListMock[1].id,
    date: new Date("2023-10-03T10:00:00Z").toISOString(),
    durationMinutes: 30,
    topic: "CSS",
    price: 19,
  },
];
