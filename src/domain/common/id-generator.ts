import { Id } from "./id";

export interface IdGenerator {
  generate(): Id
}