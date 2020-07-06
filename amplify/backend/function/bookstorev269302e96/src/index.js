

exports.handler = async (event) => {
    // Get the stashed body from first function
    // Create the order
    // Create the links in the BookOrder table (So that user can see his order history)
    const test = event.prev;

    console.log("==== Check this =====");
    console.log(test);

    return "SUCCESS"
};
