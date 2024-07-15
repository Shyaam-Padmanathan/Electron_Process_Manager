// db.js
import Dexie from 'dexie';

const db = new Dexie('MyDatabase');

db.version(1).stores({
  processes: '++id, name, path, command', // Primary key and indexed properties
});

export default db;
