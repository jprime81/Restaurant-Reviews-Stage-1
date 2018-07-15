// Instantiate cache details
const cacheName = 'restaurant_reviews_v1';

const filesForCaching = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/data/restaurants.json',
	'/css/styles.css',
	'/css/responsive.css',
	'/js/dbhelper.js',
	'js/main.js',
	'js/restaurant_info.js',
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

// Create cache when service worker is installed
self.addEventListener('install', event => {
	console.log('Service Worker is installed');
	event.waitUntil(caches.open(cacheName)
		.then(cache => {
			console.log('Service Worker is caching');
			return cache.addAll(filesForCaching);
		}),
	);
});

// Delete previous cache after new cache is activated
self.addEventListener('activate', event => {
	console.log('Service Worker is activated');
	event.waitUntil(caches.keys()
		.then(keyList =>
			Promise.all(
				keyList.map(key => {
					if (key !== cacheName) {
						return caches.delete(key);
					}
				}),
			),
		),
	);
});

// Use cached content if same data is detected
self.addEventListener('fetch', event => {
	const request = event.request.url.includes('/restaurant.html') ? new Request('/restaurant.html') : event.request;

	event.respondWith(caches.match(request)
		.then(response => response || fetch(request)),
	);
});