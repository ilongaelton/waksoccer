import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ 
      price_data: { 
        currency: 'usd', 
        recurring: { interval: 'month' }, 
        product_data: { name: 'waksoccer Premium' }, 
        unit_amount: 500 
      }, 
      quantity: 1 
    }],
    success_url: process.env.STRIPE_SUCCESS_URL!,
    cancel_url: process.env.STRIPE_CANCEL_URL!,
  });
  
  return NextResponse.json({ id: session.id });
}