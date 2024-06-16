import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import {
    type NextFetchEvent,
    type NextRequest,
    NextResponse,
} from "next/server";

// Create a new ratelimiter, that allows 5 requests per 10 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "10s"),
    ephemeralCache: new Map(),
    prefix: "@upstash/ratelimit",
    analytics: true,
});

// Define which routes you want to rate limit
export const config = {
    matcher: [
        "/",
        "/api",
        "/api/stripe/connect",
        "/api/auth",
        "/api/auth/creation",
        "/api/uploadthing/creation",
        "/products",
        "/products/template",
        "/products/newest",
        "/products/uikit",
        "/products/icon",
        "/product",
        "/my-products",
        "/return",
        "/sell",
        "/settings",
        "/billing",
    ],
};

export default async function middleware(
    request: NextRequest,
    context: NextFetchEvent
): Promise<Response | undefined> {
    const ip = request.ip ?? "127.0.0.1";

    const { success, pending, limit, remaining } = await ratelimit.limit(ip);
    // we use context.waitUntil since analytics: true.
    // see https://upstash.com/docs/oss/sdks/ts/ratelimit/gettingstarted#serverless-environments
    context.waitUntil(pending);

    const res = success
        ? NextResponse.next() // Continue routing
        : NextResponse.redirect(new URL("/api/blocked", request.url));

    // optionial - set headers
    res.headers.set("X-RateLimit-Success", success.toString());
    res.headers.set("X-RateLimit-Limit", limit.toString());
    res.headers.set("X-RateLimit-Remaining", remaining.toString());

    return res;
}
