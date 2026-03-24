import Stripe from "stripe";
import keys from "../config/keys.js";
import requireLogin from "../middlewares/requireLogin.js";

export const stripe = new Stripe(keys.stripeSecretKey, {
  apiVersion: "2022-08-01",
});

export default (app) => {

  app.get("/api/customer/:email", requireLogin, (req, res) => {
    res.send({
      publishableKey: keys.stripePublishableKey,
    });
  });

  app.get("/api/config", requireLogin, (req, res) => {
    res.send({
      publishableKey: keys.stripePublishableKey,
    });
  });

  app.post("/api/create-payment-intent", requireLogin, async (req, res) => {
    try {

      let customer = await stripe.customers.list({
        email: req.user.email,
        limit: 1,
      });

      let customerId;

      if (customer.data.length > 0) {
        customerId = customer.data[0].id;
      } else {
        customer = await stripe.customers.create({
          email: req.user.email,
        });
        customerId = customer.id;
      }

      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: 9500,
        description: "95 euros for 1 credit",
        automatic_payment_methods: { enabled: true },
        customer: customerId,
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });

    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });
};