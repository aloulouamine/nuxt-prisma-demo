import { reviews } from "~/server/utils/reviews";

export default defineEventHandler(event => {
    setResponseHeader(event, 'Content-Type', 'application/json');
    return reviews;
})