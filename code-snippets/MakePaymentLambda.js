const { CognitoIdentityServiceProvider } = require('aws-sdk');
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const stripe = require('stripe')('sk_test_51GyWX6KxUqRqwqPQ7XRtDWcdWhoRP0uEbuHD9C5RGocCQFb9PwolGCTNgWnQCww2qtz5OVfIPGJpg0mibHtvYW1z00VgZLH97s');

const getUserEmail = async(event) => {
    const params = {
        UserPoolId: "us-east-1_xZjPvMKSW",
        Username: event.identity.claims.username,
    };
    const user = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
    const { Value: email } = user.UserAttributes.find(attr => {
        if (attr.Name === 'email') {
            return attr.Value;
        }
    });
    return email;
}

exports.handler = async(event) => {
    try {
        const { id, cart, total, address, token } = event.arguments.input;
        const email = await getUserEmail(event);

        await stripe.charges.create({
            amount: total * 100,
            currency: "usd",
            source: token,
            description: `Order ${new Date()} by ${email}`
        })
        return { id, cart, total, address, email };
    }
    catch (err) {
        throw new Error(err);
    }
};
