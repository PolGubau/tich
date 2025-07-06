import { Id } from "../common/id";
import { Price } from "../common/price";
import { ClassPrimitive } from "./types";

type ClassParams = {
  id: Id
  studentId: Id
  date: Date
  durationMinutes: number
  notes: string
  topic: string
  price: Price
  isPaid: boolean
  packId?: Id
  createdAt?: Date
  updatedAt?: Date
}
export class Class {
  private _date: Date
  private _durationMinutes: number
  private _notes: string
  private _topic: string
  private _price: Price
  private _isPaid: boolean
  private _packId?: Id
  private _id: Id
  private _studentId: Id
  private _createdAt?: Date
  private _updatedAt?: Date

  constructor({
    id,
    studentId,
    date,
    durationMinutes,
    notes,
    topic,
    price,
    isPaid,
    packId,
    createdAt,
    updatedAt,
  }: ClassParams) {
    this._id = id
    this._studentId = studentId
    this._date = date
    this._durationMinutes = durationMinutes
    this._notes = notes
    this._topic = topic
    this._price = price
    this._isPaid = isPaid
    this._packId = packId
    this._createdAt = createdAt
    this._updatedAt = updatedAt
  }

  get id() {
    return this._id;
  }

  get studentId() {
    return this._studentId;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get date() {
    return this._date;
  }

  get durationMinutes() {
    return this._durationMinutes;
  }

  get topic() {
    return this._topic;
  }
  get isPaid() {
    return this._isPaid;
  }

  get packId() {
    return this._packId;
  }

  get price() {
    return this._price;
  }



  get notes() {
    return this._notes;
  }


  updateDate(newDate: Date) {
    if (!newDate) throw new Error("Date cannot be empty");
    this._date = newDate;
  }

  updateDuration(newDuration: number) {
    if (newDuration <= 0) throw new Error("Duration must be greater than zero");
    this._durationMinutes = newDuration;
  }

  updateTopic(newTopic: string) {
    this._topic = newTopic;
  }
  updateIsPaid(newIsPaid: boolean) {
    this._isPaid = newIsPaid;
  }

  updatePackId(newPackId?: Id) {
    this._packId = newPackId;
  }

  updateStudentId(newStudentId: Id) {
    if (!(newStudentId instanceof Id)) {
      throw new Error("Student ID must be an instance of Id class");
    }
    this._studentId = newStudentId;
  }

  updateId(newId: Id) {
    if (!(newId instanceof Id)) {
      throw new Error("ID must be an instance of Id class");
    }
    this._id = newId;
  }


  updatePrice(newPrice: Price) {
    if (newPrice && !(newPrice instanceof Price)) {
      throw new Error("Price must be an instance of Price class");
    }
    this._price = newPrice;
  }

  updateNotes(newNotes: string) {
    this._notes = newNotes;
  }

  toPrimitive(): ClassPrimitive {
    return {
      id: this._id.value,
      studentId: this._studentId.value,
      date: this._date.toISOString(),
      durationMinutes: this._durationMinutes,
      topic: this._topic,
      price: this._price.toPrimitive(),
      isPaid: this._isPaid,
      packId: this._packId?.value || null,
      notes: this._notes,
      createdAt: this._createdAt || new Date(),
      updatedAt: this._updatedAt || new Date(),
    };
  }

  static fromPrimitive(primitive: ClassPrimitive): Class {
    console.log("primitive", primitive);
    return new Class({
      id: new Id(primitive.id),
      studentId: new Id(primitive.studentId),
      date: new Date(primitive.date),
      durationMinutes: primitive.durationMinutes,
      notes: primitive.notes,
      topic: primitive.topic,
      price: new Price(primitive.price.value, primitive.price.currency),
      isPaid: primitive.isPaid,
      packId: primitive.packId ? new Id(primitive.packId) : undefined,
      createdAt: primitive.createdAt ? new Date(primitive.createdAt) : undefined,
      updatedAt: primitive.updatedAt ? new Date(primitive.updatedAt) : undefined,
    });
  }
}