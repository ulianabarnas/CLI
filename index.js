const { Command } = require('commander');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      //   console.log('invoke list');
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case 'get':
      //   console.log('invoke get');
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case 'add':
      //   console.log('invoke add');
      await addContact(name, email, phone);
      break;

    case 'remove':
      //   console.log('invoke remove');
      await removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: '1' });
// invokeAction({
//   action: 'add',
//   name: 'Uliana',
//   email: 'fghf@gf.hgh',
//   phone: '775-6567-767',
// });
// invokeAction({ action: 'remove', id: 'HRxxNdoOC' });
