const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'db/contacts.json')

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8')
  const contacts = JSON.parse(data)
  return contacts
}

async function getContactById(contactId) {
  const allContacts = await listContacts()
  const contact = allContacts.find(
    (contact) => Number(contact.id) === Number(contactId),
  )

  if (!contact) {
    return null
  }
  return contact
}

async function removeContact(contactId) {
  const allContacts = await listContacts()
  const inx = allContacts.findIndex(
    (contact) => Number(contact.id) === Number(contactId),
  )
  if (inx === -1) {
    return null
  }

  allContacts.splice(inx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(allContacts))
  return 'Success remove'
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts()
  const newContact = { name, email, phone }
  allContacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(allContacts))
  return newContact
}

async function updateContact(id, data) {
  const allContacts = await listContacts()
  const inx = allContacts.findIndex((c) => Number(c.id) === Number(id))
  if (inx === -1) {
    return null
  }

  const newContact = { ...allContacts[inx], ...data }
  allContacts[inx] = newContact
  await fs.writeFile(contactsPath, JSON.stringify(allContacts))
  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
