const operations = require('./contacts')
const { Command } = require('commander')
const program = new Command()
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

async function invokeAction({ action = 'list', id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        const contactList = await operations.listContacts()
        console.table(contactList)
        break

      case 'get':
        const contact = await operations.getContactById(id)
        console.log(contact)
        break

      case 'add':
        const addedContact = await operations.addContact(name, email, phone)
        console.log(addedContact)
        break

      case 'remove':
        const removingResult = await operations.removeContact(id)
        console.log(removingResult)
        break

      case 'update':
        const updatedContact = await operations.updateContact(id, {
          name,
          email,
          phone,
        })
        console.log(updatedContact)
        break

      default:
        console.warn('\x1B[31m Unknown action type!')
    }
  } catch (error) {
    throw error
  }
}

invokeAction(argv)
