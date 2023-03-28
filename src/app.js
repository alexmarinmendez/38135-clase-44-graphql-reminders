import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import reminder from './Remiders.js'

const app = express()
app.listen(8080, () => console.log('Server Up'))

const schema = buildSchema(`
    type Reminder {
        id: Int
        title: String
        description: String
        status: String
    }

    type Query {
        reminders: [Reminder]
    }

    type Mutation {
        createReminder(title: String, description: String): Reminder
        deleteReminders: [Reminder]
        completeReminder(id: Int): Reminder
    }
`)

app.use('/reminder', graphqlHTTP({
    schema,
    rootValue: {
        reminders: () => reminder.getReminders(),
        createReminder: (data) => reminder.createReminder(data),
        deleteReminders: () => reminder.deleteReminders(),
        completeReminder: (id) => reminder.completeReminder(id)
    },
    graphiql: true
}))