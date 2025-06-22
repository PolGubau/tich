
import { Id } from "../common/id"
import { IdGenerator } from "../common/id-generator"
import { StudentCreatePrimitive, StudentPrimitive } from "./types"
import { StudentEmail } from "./validators/student-email"
import { StudentName } from "./validators/student-name"



export class Student {
  constructor(
    readonly id: Id,
    private _name: StudentName,
    private _email: StudentEmail,
    private _notes?: string,
    private _avatarUrl?: string
  ) {
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

  get avatarUrl() {
    return this._avatarUrl
  }

  updateName(newName: StudentName): void {
    this._name = newName
  }

  updateEmail(newEmail: StudentEmail): void {
    this._email = newEmail
  }

  updateNotes(newNotes?: string): void {
    this._notes = newNotes
  }

  updateAvatarUrl(newAvatarUrl?: string): void {
    this._avatarUrl = newAvatarUrl
  }
  toPrimitive(): StudentPrimitive {
    return {
      id: this.id.value,
      name: this._name.value,
      email: this._email.value,
      notes: this._notes,
      avatarUrl: this._avatarUrl
    }
  }
  /** Factory que garantiza id válido y crea instancia */

  static create(primitive: StudentCreatePrimitive,
    idGen?: IdGenerator): Student {
    const pId = primitive.id

    if (!pId && !idGen) {
      throw new Error("IdGenerator is required when id is not provided")
    }

    const id = pId ? new Id(pId) : idGen!.generate()

    return new Student(
      id,
      new StudentName(primitive.name),
      new StudentEmail(primitive.email),
      primitive.notes,
      primitive.avatarUrl
    )
  }
}
