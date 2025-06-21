// domain/student/Student.ts

import { StudentEmail } from "./student-email"
import { StudentId } from "./student-id"
import { StudentPrimitive } from "./types"



export class Student {
  constructor(
    readonly id: StudentId,
    private _name: string,
    private _email: StudentEmail,
    private _notes?: string
  ) {
    if (!_name.trim()) throw new Error("Name cannot be empty")
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get notes() {
    return this._notes
  }

  updateName(newName: string) {
    if (!newName.trim()) throw new Error("Name cannot be empty")
    this._name = newName
  }

  updateEmail(newEmail: StudentEmail) {
    this._email = newEmail
  }

  updateNotes(newNotes?: string) {
    this._notes = newNotes
  }

  toPrimitive(): StudentPrimitive {
    return {
      id: this.id.value,
      name: this._name,
      email: this._email.value,
      notes: this._notes
    }
  }
}
