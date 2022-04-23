const functions = require('firebase-functions');
const express = require("express")
const cors = require('cors');
const { CallReceived } = require('@material-ui/icons');
// sk_test_51HeywyKcm3I702bLZ14L6JFuy5cz02ve3MNsjfgjuCeZU0LONStKpd6CzZAiSmRHT84HVmrm1N9fhKec4pk3NUWD00XEY3y0g5
const stripe = require('stripe')('sk_test_51HeywyKcm3I702bLZ14L6JFuy5cz02ve3MNsjfgjuCeZU0LONStKpd6CzZAiSmRHT84HVmrm1N9fhKec4pk3NUWD00XEY3y0g5')

// API

// -App Config
const app = express()

//MiddleWares
app.use(cors({origin:true}))
app.use(express.json())

//API routes
app.get('/',(request, response)=>response.status(200)
.send('hello world'))

app.post('/payments/create', async (request, response)=>{
    const total = request.query.total
    console.log('payment request CallReceived', total)
    const paymentIntent= await stripe.paymentIntents.create({
        amount:total,
        currency:'usd'
    })
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//listen command
exports.api = functions.https.onRequest(app)



//example endpoint
// (http://localhost:5001/ecomm-second/us-central1/api)