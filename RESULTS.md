# K6 lab results

## Part 0

- **Step 0.1, http_req_duration:**

  avg=268.41ms, min=268.41ms, med=268.41ms, max=268.41ms, p(90)=268.41ms, p(95)=268.41ms

- **Step 0.2, requests, rate and p(95), and why the rate stays below 5:**

  Requests: 80

  Rate: 3.80 req/s

  p(95): 271.62 ms

  The rate was below 5 because each user had to wait for the server and sleep for 1 second.

- **Step 0.6, exit code of the normal run and of the run with P95=300:**

  Normal run exit code: 0

  P95=300 exit code: 99

  The second run failed because p(95) was 383.16 ms, which was higher than 300 ms.

- **Step 0.7, rules that passed, p(95), p(99), exit code after your change:**

  Normal run:
  - All rules passed.
  - p(95): 370.53 ms
  - p(99): 377.11 ms
  - Exit code: 0

  After changing the p(95) limit to 100 ms:
  - p(95): 380.22 ms
  - p(99): 1.41 s
  - Exit code: 99

  The test failed because p(95) was higher than 100 ms.

- **Step 0.8, what was wrong, and how the checks showed it:**

  The first test used `pepperoni` and `knife`, but the API used `Pepperoni` and `Knife`.

  The first test passed only 85.58% of checks.

  After fixing the names, all 225 checks passed.

  This shows that checks can find problems even when the HTTP status is 200.

## Part A Results

| Step | Test type | Users | Req/s | p(95) | Max | Failed | Checks |
|---|---|---|---|---|---|---|---|
| A1 | Smoke | 1 | 0.49 | 368.33 ms | 392.84 ms | 0% | 100% |
| A2 | Average load | 3 | 1.31 | 398.26 ms | 526.86 ms | 0% | 100% |
| A3 | Stress | 5 | 2.15 | 396.03 ms | 610.19 ms | 0% | 100% |
| A4 | Spike | 5 | 1.02 | 404.29 ms | 454.08 ms | 0% | 100% |
| A5 | Soak | 2 | 0.97 | 380.26 ms | 10260 ms | 0.31% | 99.62% |

## Part B

**1. What did you learn from the test results?**

All five tests passed their limits. Most requests were fast, but the Soak Test had some slow and failed requests.

**2. Why was the request rate below 5 req/s in Step 0.2?**

Each user had to wait for the server and sleep for 1 second before sending another request.

**3. What did you learn from Average and Stress Tests?**

A2 used 3 users, and A3 used 5 users. A3 had more requests, but the response time was almost the same. Both tests had no failed requests.

**4. What happened during the Spike Test?**

The number of users increased quickly from 1 to 5. All checks passed, and no requests failed. We need to check the graph to know how quickly the website recovered.

**5. What did you learn from the Soak Test?**

We tested the website for 11 minutes. Most requests were fast, but one took about 10 seconds. There were 2 failed requests and 4 failed checks. Long tests can help us find problems that short tests may miss.

**6. Why is p(95) useful?**

p(95) tells us how fast 95% of requests were. It is useful because the average time can hide slow requests.

**7. Why can results be different on a public website?**

Internet speed can change, and other people may use the website during our test. This can make the results different.

**8. Why should we not test a public website with too many users?**

Too many requests can make the website slow or stop working. This can affect other users. We should follow the test limits and get permission.

**9. How can we make a performance requirement easy to test?**

A bad requirement is:

"The website should be fast."

A better requirement is:

"With 3 users, 95% of requests must take less than 1 second, 99% must take less than 1.5 seconds, and less than 1% of requests can fail."

K6 thresholds:

```javascript
export const options = {
  vus: 3,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000', 'p(99)<1500'],
  },
};
```