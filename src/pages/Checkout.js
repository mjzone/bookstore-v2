import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51GyWX6KxUqRqwqPQDVgebtGmlSDpV74fw2xY2zU9dPqjgyAZhglzs7YAUHHZIJmyxlsuGlJX8QgxKvEskIuGPo1J00F0pX4AFN');

    return (
        <section className="checkout-wrapper">
            <AmplifyAuthenticator>
                <AmplifySignUp
                    slot="sign-up"
                    formFields={[
                        {
                            type: "name",
                            label: "Name",
                            placeholder: "Enter your name",
                            required: true,
                        },
                        {
                            type: "username",
                            label: "Username",
                            placeholder: "Enter your username",
                            required: true,
                        },
                        {
                            type: "email",
                            label: "Email",
                            placeholder: "Enter your email",
                            required: true,
                        },
                        {
                            type: "password",
                            label: "Password",
                            placeholder: "Enter your password",
                            required: true,
                        }
                    ]}
                />
                <AmplifySignIn slot="sign-in" />
                <Elements stripe={stripePromise}>
                    <section>
                        <h2>Time to Checkout?</h2>
                        <CheckoutForm />
                    </section>
                </Elements>
            </AmplifyAuthenticator>
        </section>

    )
}

export default Checkout
