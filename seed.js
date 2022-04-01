const dotenv = require('dotenv')
dotenv.config()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const fs = require('fs')

;(async function seed() {
  let catFacts = []
  let numFacts = 0
  try {
    const linesOfCatFacts = fs.readFileSync('./cat-facts.txt', 'utf8')
    catFacts = linesOfCatFacts.split('\n').map(line => line.trim())
    console.log(`${catFacts.length} cat facts loaded`)
    let createCatFacts = []
    catFacts.forEach(fact => {
      createCatFacts = [
        ...createCatFacts,
        prisma.catFact.create({
          data: {
            content: fact,
            index: numFacts++
          }
        })
      ]
      if (numFacts % 10 === 0) {
        console.log(`${numFacts} cat facts ready`)
      }
    })
    const createCatStatDefault = prisma.catFactMessageStats.create({
      data: {
        numberSent: 0,
        totalFacts: numFacts
      }
    })
    await Promise.all([...createCatFacts, createCatStatDefault]).then(() => {
      console.log(`Successfully seeded ${numFacts} cat facts!!`)
    })
  } catch (err) {
    console.log('Error:', err)
    return
  } finally {
  }
})()
