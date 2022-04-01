const dotenv = require('dotenv')
dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken)

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const RECIPIENT_NUMBER = process.env['RECIPIENT_NUMBER']
const SENDER_NUMBER = process.env['SENDER_NUMBER']

let options = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

;(async function () {
  const now = new Date()
  console.log('Starting...', now.toLocaleDateString('en-US', options))
  try {
    let catFactStats = await prisma.catFactMessageStats.findFirst({
      where: {
        id: 0
      }
    })
    console.log(`Last cat fact message sent: ${catFactStats.lastSent}`)
    let catFact = await prisma.catFact.findUnique({
      where: {
        index: catFactStats.numberSent
      }
    })
    console.log(`Sending cat fact: ${catFact.content}`)
    let message = await client.messages.create({
      body: catFact.content,
      from: SENDER_NUMBER,
      to: RECIPIENT_NUMBER
    })
    console.log(message.sid, message)

    await prisma.catFactMessageStats.update({
      where: {
        id: catFactStats.id
      },
      data: {
        numberSent: catFact.index + 1,
        lastSent: new Date()
      }
    })
    console.log(`Successfully sent cat fact: ${catFact.content}`)
    const catFactMessage = await prisma.catFactMessage.create({
      data: {
        message: catFact.content,
        status: message.status,
        raw: JSON.stringify(message)
      }
    })
    console.log(`Successfully saved cat fact message: ${catFactMessage.id}`)
  } catch (e) {
    console.error(e)
  }
})()
