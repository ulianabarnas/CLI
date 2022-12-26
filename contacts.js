const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.resolve(__dirname, 'db/contacts.json');

async function readDb() {
  const dbRaw = await fs.readFile(contactsPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function writeDb(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function listContacts() {
  const db = await readDb();
  return db;
}

async function getContactById(contactId) {
  const db = await readDb();
  const contact = db.filter(contact => contact.id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const db = await readDb();
  const updatedDb = db.filter(contact => contact.id !== contactId);
  await writeDb(updatedDb);
}

async function addContact(name, email, phone) {
  const id = shortid();
  const contact = { id, name, email, phone };

  const db = await readDb();
  db.push(contact);

  await writeDb(db);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
