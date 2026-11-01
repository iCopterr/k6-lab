
import http from 'k6/http';
import { check, group, sleep } from 'k6';

const BASE_URL = 'https://quickpizza.grafana.com';

const PARAMS = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'token abcdef0123456789',
  },
};

export function journey() {
  // Step 1: Visit homepage
  group('01_home', function () {
    const res = http.get(BASE_URL);

    check(res, {
      'homepage status is 200': (r) => r.status === 200,
    });
  });

  sleep(1 + Math.random() * 2);

  // Step 2: View quotes
  group('02_quotes', function () {
    const res = http.get(`${BASE_URL}/api/quotes`);

    check(res, {
  'quotes status is 200': (r) => r.status === 200,
  'quotes are available': (r) => {
    if (r.status !== 200) return false;

    try {
      const data = r.json();
      return Array.isArray(data.quotes) && data.quotes.length > 0;
    } catch (error) {
      return false;
    }
  },
});

  sleep(1);

  // Step 3: Get a vegetarian pizza recommendation
  group('03_recommendation', function () {
    const body = JSON.stringify({
      mustBeVegetarian: true,
    });

    const res = http.post(`${BASE_URL}/api/pizza`, body, PARAMS);

    check(res, {
      'pizza status is 200': (r) => r.status === 200,
      'pizza has a name': (r) => Boolean(r.json('pizza.name')),
    });
  });

  sleep(1 + Math.random() * 2);
}
