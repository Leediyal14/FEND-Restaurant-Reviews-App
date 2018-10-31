//Checking the Service Worker Registration
console.log('Service Worker Registered Successfully!');

// Storing files in the Cache
var myCache = 'restaurant-cache';
var cachedFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

//Installing Event
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(myCache).then(function(cache) {
            return cache.addAll(cachedFiles);
        })
    );
});

// Fetching Event
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {

            if (response) {
                return response;
            }
            else {
                return fetch(event.request).then(function(response) {
                    const responseCloned = response.clone();
                    caches.open(myCache).then(function(cache) {
                        cache.put(event.request, responseCloned);
                    })
                    return response;
                }).catch(function(err) {
                    console.error(err);
                });
            }
        })
    );
});