import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2026-08-26.dahlia',
  appInfo: {
    name: 'Plura App',
    version: '0.1.0',
  },
})
