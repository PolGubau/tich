import { Id } from "../common/id";
import { Price } from "../common/price";
import { ClassPrimitive } from "./types";

export class Class {
  constructor(
    readonly id: Id,
    readonly studentId: Id,
    private _date: Date,
    private _durationMinutes: number,
    private _notes: string,
    private _topic: string,
    private _price: Price, // si no pertenece a un pack
    private _isPaid: boolean,
    private _packId?: Id, // si pertenece a un pack
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {
    if (!_date) throw new Error("Date cannot be empty");
    if (_durationMinutes <= 0) throw new Error("Duration must be greater than zero");
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
      id: this.id.value,
      studentId: this.studentId.value,
      date: this._date.toISOString(),
      durationMinutes: this._durationMinutes,
      topic: this._topic,
      price: this._price.value,
      isPaid: this._isPaid,
      packId: this._packId?.value || null,
      notes: this._notes,
      createdAt: this.createdAt || new Date(),
      updatedAt: this.updatedAt || new Date(),
    };
  }

  static fromPrimitive(primitive: ClassPrimitive): Class {
    return new Class(
      new Id(primitive.id),
      new Id(primitive.studentId),
      new Date(primitive.date),
      primitive.durationMinutes,
      primitive.notes,
      primitive.topic,
      new Price(primitive.price),
      primitive.isPaid,
      primitive.packId ? new Id(primitive.packId) : undefined, primitive.createdAt ? new Date(primitive.createdAt) : undefined,
      primitive.updatedAt ? new Date(primitive.updatedAt) : undefined,
    );
  }
}