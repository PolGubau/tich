import * as Crypto from 'expo-crypto';
import { Id } from '~/domain/common/id';
import { IdGenerator } from '~/domain/common/id-generator';

export class UUIDGenerator implements IdGenerator {
  generate() {
    const UUID = Crypto.randomUUID();

    return new Id(UUID);
  }
}


export const uuid = new UUIDGenerator();