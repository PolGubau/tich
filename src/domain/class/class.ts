import { Id } from "../common/identifier";
import { Price } from "../common/price";
import { ClassPrimitive } from "./types";

export class Class {
  constructor(
    readonly id: Id,
    readonly studentId: Id,
    private _date: Date,
    private _durationMinutes: number,
    private _topic?: string,
    private _packId?: Id, // si pertenece a un pack
    private _price?: Price, // si no pertenece a un pack
    private _notes?: string
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

  updateTopic(newTopic?: string) {
    this._topic = newTopic;
  }

  updatePackId(newPackId?: Id) {
    this._packId = newPackId;
  }

  updatePrice(newPrice?: Price) {
    if (newPrice && !(newPrice instanceof Price)) {
      throw new Error("Price must be an instance of Price class");
    }
    this._price = newPrice;
  }

  updateNotes(newNotes?: string) {
    this._notes = newNotes;
  }

  toPrimitive(): ClassPrimitive {

    return {
      id: this.id.value,
      studentId: this.studentId.value,
      date: this._date.toISOString(),
      durationMinutes: this._durationMinutes,
      topic: this._topic,
      packId: this._packId?.value,
      price: this._price?.value,
      notes: this._notes
    };
  }

  static fromPrimitive(primitive: ClassPrimitive): Class {
    return new Class(
      new Id(primitive.id),
      new Id(primitive.studentId),
      new Date(primitive.date),
      primitive.durationMinutes,
      primitive.topic,
      primitive.packId ? new Id(primitive.packId) : undefined,
      primitive.price ? new Price(primitive.price) : undefined,
      primitive.notes
    );
  }
}