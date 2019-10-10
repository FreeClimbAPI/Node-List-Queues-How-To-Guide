require('dotenv').config()
const persephonySDK = require('@persephony/sdk')

const accountId = process.env.ACCOUNT_ID
const authToken = process.env.AUTH_TOKEN
// your Persephony API key (available in the Dashboard) - be sure to set up environment variables to store these values
const persephony = persephonySDK(accountId, authToken)

getQueues().then(queues => {
  // Use Queues
  console.log(queues)
}).catch(err => {
  // Catch Errors
  console.log(err)
})

async function getQueues() {
  // Create array to store all queues
  const queues = []
  // Invoke GET method to retrieve initial list of queues information
  const first = await persephony.api.queues.getList()
  queues.push(...first.queues)
  // Get Uri for next page
  let nextPageUri = first.nextPageUri
  // Retrieve entire queues list 
  while (nextPageUri) {
    const nextPage = await persephony.api.queues.getNextPage(nextPageUri)
    queues.push(...nextPage.queues)
    nextPageUri = nextPage.nextPageUri
  }
  return queues
}