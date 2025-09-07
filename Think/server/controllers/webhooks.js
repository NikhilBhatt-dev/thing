import { response } from "express";
import Stripe from "stripe";
import Transaction from "../models/Transaction.js"
import User from "../models/user.js"
import { messageInRaw } from "svix";

export const stripeWebhooks = async (request, response)=>{
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    sig = request.headers["stripe-signature"]

    let event;
    try {
        event = stripe.webhook.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET)

    }catch (error) {
        return response.status(400).send(`webhoook Error:${error.message}`)
    }
    try {
        switch (event.type) {
            case "payment_intent.succedded":{
                const paymentIntent = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                })

                const session = sessionList.data[0];
                const {transactionId, appId} = session.metadata;

                if(appId === 'quickgpt'){
                    const transaction = await Transaction.findOne({_id: transactionId, ispaid: false})

                    // update credit  in user account
                    await User.updateOne({_ID: Transaction.userId}, {$inc: {credits: transaction.credits}})

                    // update credit Payment status
                    transaction.isPaid = true;
                    await transaction.save();

                }else {
                    return response.json({received: true, message: "Ignored event: Invalid app"})
                }
            } 
        }
    }
}