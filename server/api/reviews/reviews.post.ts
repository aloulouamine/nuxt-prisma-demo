export default defineEventHandler(async event => {
    const review = await readBody(event);
    setResponseHeader(event, 'Content-Type', 'application/json');
    reviews.push(review);
    return review;
})