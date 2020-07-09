const stripe = require('stripe')('sk_test_51GyWX6KxUqRqwqPQ7XRtDWcdWhoRP0uEbuHD9C5RGocCQFb9PwolGCTNgWnQCww2qtz5OVfIPGJpg0mibHtvYW1z00VgZLH97s');

exports.handler = async (event) => {
    try {
        const { email } = event.identity.claims;
        const { id, cart, total, address, token } = event.arguments.input;

        await stripe.charges.create({
            amount: total * 100,
            currency: "usd",
            source: token,
            description: `Order ${new Date()} by ${email}`
        })
        return { id, cart, total, address, email };
    } catch (err) {
        throw new Error(err);
    }
};