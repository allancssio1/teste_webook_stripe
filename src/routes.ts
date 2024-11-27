import express, { Request, Response } from "express";
import stripe from "stripe";

const _stripe = new stripe(
  "pk_test_51Nxdy5ChmMP0aHXjUFzi4gAk1kLpa2iQlIRcfbCafxZXctWKihkU6nOetcYHBLwn1uoL7dEw6cYWDuZogctIiL0K00HlDUQKp7"
);
const YOUR_DOMAIN = "http://localhost:5173/";

export const router = express.Router();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_f8ab4df060a8e2cd14d0a1442da8a136bdea16c8bea7e7cd882f6c8b9abd0eb8";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request: Request, response: Response) => {
    const sig: any = request.headers["stripe-signature"];

    let event;

    try {
      event = _stripe.webhooks.constructEvent(
        request.body,
        sig,
        endpointSecret
      );
    } catch (err: any) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

router.post("/create-checkout-session", async (req, res) => {
  const session: any = await _stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1PjV2EChmMP0aHXj0cIJ2beB",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});
router.get("/webhook", (req: Request, res: Response) => {
  console.log("Chamou o webhook");
  res.send("Welcome to the Webhooks API");
});
