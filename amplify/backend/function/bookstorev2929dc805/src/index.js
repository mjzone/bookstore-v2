
// Use SSM when you implement
const stripe = require('stripe')('sk_test_51GyWX6KxUqRqwqPQ7XRtDWcdWhoRP0uEbuHD9C5RGocCQFb9PwolGCTNgWnQCww2qtz5OVfIPGJpg0mibHtvYW1z00VgZLH97s');

exports.handler = async (event) => {
    try {
        const { username } = event.identity.claims;
        const { id, cart, total, address, tokenId } = event.arguments.input;

        await stripe.charges.create({
            amount: total * 100,
            currency: "usd",
            source: tokenId,
            description: `Order ${new Date()} by ${username}`
        })
        return { id, cart, total, address, username };
    } catch (err) {
        throw new Error(err);
    }
};
