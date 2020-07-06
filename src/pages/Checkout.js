import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51GyWX6KxUqRqwqPQDVgebtGmlSDpV74fw2xY2zU9dPqjgyAZhglzs7YAUHHZIJmyxlsuGlJX8QgxKvEskIuGPo1J00F0pX4AFN');

    return (
        <AmplifyAuthenticator>
            <Elements stripe={stripePromise}>
                <section className="checkout">
                    <h2>Time to Checkout?</h2>
                    <CheckoutForm />
                </section>
            </Elements>
        </AmplifyAuthenticator>
    )
}

export default withAuthenticator(Checkout)
