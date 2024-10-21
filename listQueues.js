require('dotenv').config()
const freeclimbSDK = require('@freeclimb/sdk')

const accountId = process.env.ACCOUNT_ID
const apiKey = process.env.API_KEY
const configuration = freeclimbSDK.createConfiguration({ accountId, apiKey })
const freeclimb = new freeclimbSDK.DefaultApi(configuration)

getQueues().then(queues => {
  console.log('got queues', queues)
}).catch(err => {
  console.log(err)
})

async function getQueues() {
  const queues = []

  let response = await freeclimb.listActiveQueues()
  queues.push(...response.queues)

  while (response.nextPageUri) {
    response = await freeclimb.getNextPage(response)
    queues.push(...response.queues)
  }
  return queues
}