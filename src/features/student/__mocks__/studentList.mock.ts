import { StudentPrimitive } from "~/domain/student/types";

export const studentListMock: StudentPrimitive[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    notes: 'First student in the list',
    avatarUrl: 'https://example.com/avatar/john.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    notes: 'Second student in the list',
    avatarUrl: null,

  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    notes: null,
    avatarUrl: 'https://example.com/avatar/alice.jpg',
  },
];
