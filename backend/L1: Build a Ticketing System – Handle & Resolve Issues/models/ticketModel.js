import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, '../db.json');
const adapter = new JSONFile(file);
const defaultData = { tickets: [] };
const db = new Low(adapter, defaultData);

// Initialize database
await db.read();
await db.write();

const generateId = () => {
  const lastTicket = db.data.tickets[db.data.tickets.length - 1];
  return lastTicket ? lastTicket.id + 1 : 1;
};

const ticketModel = {
  getAll: async () => {
    await db.read();
    return db.data.tickets;
  },

  getById: async (id) => {
    await db.read();
    return db.data.tickets.find(ticket => ticket.id === Number(id));
  },

  create: async (ticketData) => {
    await db.read();
    const newTicket = {
      id: generateId(),
      ...ticketData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.data.tickets.push(newTicket);
    await db.write();
    return newTicket;
  },

  update: async (id, updates) => {
    await db.read();
    const ticketIndex = db.data.tickets.findIndex(t => t.id === Number(id));
    if (ticketIndex === -1) return null;
    
    db.data.tickets[ticketIndex] = {
      ...db.data.tickets[ticketIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await db.write();
    return db.data.tickets[ticketIndex];
  },

  resolve: async (id) => {
    await db.read();
    const ticketIndex = db.data.tickets.findIndex(t => t.id === Number(id));
    if (ticketIndex === -1) return null;
    
    db.data.tickets[ticketIndex] = {
      ...db.data.tickets[ticketIndex],
      status: 'resolved',
      updatedAt: new Date().toISOString()
    };
    
    await db.write();
    return db.data.tickets[ticketIndex];
  },

  delete: async (id) => {
    await db.read();
    const ticketIndex = db.data.tickets.findIndex(t => t.id === Number(id));
    if (ticketIndex === -1) return null;
    
    const [deletedTicket] = db.data.tickets.splice(ticketIndex, 1);
    await db.write();
    return deletedTicket;
  }
};

export default ticketModel;
