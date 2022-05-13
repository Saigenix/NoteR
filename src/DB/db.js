import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import schema from './schema'
import Note from './model/Note'


const adapter = new SQLiteAdapter({
    dbName: 'notes',
    schema,
    onSetUpError: error => {
      // Database failed to load -- offer the user to reload the app or log out
    }
  })

  const database = new Database({
    adapter,
    modelClasses: [Note],
  })

  export { database };