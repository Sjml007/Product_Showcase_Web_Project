export interface IStorage {
  getDummy(): Promise<any[]>;
}

export class MemStorage implements IStorage {
  async getDummy(): Promise<any[]> {
    return [];
  }
}

export const storage = new MemStorage();
