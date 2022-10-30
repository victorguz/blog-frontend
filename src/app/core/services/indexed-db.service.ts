import Dexie, { Table } from 'dexie';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService extends Dexie {
  records!: Table<IndexedDbRecord, number>;

  constructor() {
    super('local-database');
    this.version(3).stores({
      records: '++id, name, data',
    });
  }

  getAllRecords() {
    return this.records.toArray();
  }

  findRecordByName(url: string) {
    return this.records
      .where({
        url,
      })
      .toArray();
  }

  async addAllRecords(all: IndexedDbRecord[]) {
    await this.records.bulkAdd(all);
  }

  async addRecord(body: IndexedDbRecord) {
    try {
      await this.records.add(body);
    } catch (error) {
      console.error('Error al guardar registro en IndexedDB');
    }
  }

  async deleteRecord(id: number) {
    await this.records.delete(id);
  }

  async updateRecord(id: number, body: IndexedDbRecord) {
    await this.records.update(id, {
      name: body.name,
      data: body.data,
    });
  }
}

export interface IndexedDbRecord {
  id?: number;
  name: string;
  data: any;
}
