importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

console.log(workbox)
workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image', new workbox.strategies.CacheFirst()
)



workbox.routing.registerRoute(
    // Check to see if the request is a navigation to a new page
    ({ request }) => request.mode === 'navigate',
    // Use a Network First caching strategy
    new workbox.strategies.NetworkFirst({
        // Put all cached files in a cache named 'pages'
        cacheName: 'pages',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
workbox.routing.registerRoute(
    // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
    ({ request }) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    // Use a Stale While Revalidate caching strategy
    new workbox.strategies.StaleWhileRevalidate({
        // Put all cached files in a cache named 'assets'
        cacheName: 'assets',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

// Cache images with a Cache First strategy
workbox.routing.registerRoute(
    // Check to see if the request's destination is style for an image
    ({ request }) => request.destination === 'image',
    // Use a Cache First caching strategy
    new workbox.strategies.CacheFirst({
        // Put all cached files in a cache named 'images'
        cacheName: 'images',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [200],
            }),
            // Don't cache more than 50 items, and expire them after 30 days
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
            }),
        ],
    }),
);

// workbox.routing.registerRoute(
//     ({ url }) => url.origin === 'https://fonts.googleapis.com',
//     new workbox.strategies.StaleWhileRevalidate({
//         cacheName: 'google-fonts-stylesheets',
//     })
// );
// workbox.routing.registerRoute(
//     ({ request }) => request.destination === 'image',
//     new workbox.strategies.CacheFirst({
//         cacheName: 'images',
//         plugins: [
//             new workbox.expiration.ExpirationPlugin({
//                 maxEntries: 60,
//                 maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//             }),
//         ],
//     })
// );

// workbox.routing.registerRoute(

//     ({ request }) =>
//         request.destination === 'style' ||
//         request.destination === 'script' ||
//         request.destination === 'worker',
//     new workbox.strategies.StaleWhileRevalidate({
//         cacheName: 'assets',
//         plugins: [
//             new workbox.cacheableResponse.CacheableResponsePlugin({
//                 statuses: [200]
//             }),
//         ],
//     }),
// );