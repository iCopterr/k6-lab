# K6 lab results

## Part 0

### Step 0.1: First Test
- http_req_duration: [Need result from Step 0.1]
- The test used 1 virtual user and completed 1 iteration.

### Step 0.2: More Users for Longer
- Virtual users: 5
- Duration: 20 seconds
- Total requests: 80
- Request rate: 3.803704 req/s
- p(95): 271.62 ms
- Checks succeeded: 100%
- Failed requests: 0%

The request rate was below 5 requests per second because each virtual user waits for the server response and sleeps for 1 second before sending another request.

### Step 0.3: Fixed Number of Iterations
- Virtual users: 5
- Total iterations: 20
- Total requests: 20
- Execution time: 5.9 seconds
- p(95): 321.29 ms
- Checks succeeded: 100%
- Failed requests: 0%

The test stopped after completing 20 iterations. This shows that iterations control the amount of work, while duration controls how long the test runs.

### Step 0.4: Testing an API
- Total requests: 1
- Response time: 295.55 ms
- Checks succeeded: 100% (3/3)
- Failed requests: 0%

All three checks passed. The API returned status 200, the pizza had a name, and all ingredients were vegetarian.

### Step 0.5: Request Without a Token
- Total requests: 1
- Response time: 268.6 ms
- Checks succeeded: 100% (1/1)
- Failed requests: 0%

The API returned status 401 when no token was provided. This was the expected result, so the test passed.

### Step 0.6: Thresholds
- Virtual users: 3
- Duration: 30 seconds
- Normal run exit code: [Need result]
- P95=300 run exit code: 99
- P95=300 measured p(95): 383.16 ms
- Total requests (P95=300 run): 68
- Checks succeeded: 100%
- Failed requests: 0%

The test with P95=300 failed because the response time was higher than 300 ms. The exit code was 99, which means a threshold was not met.

### Step 0.7: From Requirement to Thresholds

- Virtual users: 3
- Duration: 30 seconds

**Normal Test:**
- Total requests: 68
- p(95): 370.53 ms
- p(99): 377.11 ms
- Failed requests: 0%
- Exit code: 0
- All thresholds passed.

**Modified Test:**
- Total requests: 65
- Modified threshold: p(95) < 100 ms
- Measured p(95): 380.22 ms
- Measured p(99): 1410 ms
- Failed requests: 0%
- Exit code: 99

The normal test passed because the response times were within the requirements. The modified test failed because p(95) was higher than 100 ms.

### Step 0.8: Bug Hunt

- Virtual users: 5
- Duration: 20 seconds

**Before Fix:**
- Total requests: 74
- Checks succeeded: 85.58% (190/222)
- Checks failed: 14.41% (32/222)
- No pepperoni: 70 passed, 4 failed
- No knife needed: 46 passed, 28 failed
- HTTP failed requests: 0%
- p(95): 503.39 ms

**Investigation:**

The API used the ingredient name "Pepperoni" and the tool name "Knife". However, the original request used lowercase values.

**Fix:**

Changed `excludedIngredients` from `pepperoni` to `Pepperoni` and `excludedTools` from `knife` to `Knife`.

**After Fix:**
- Total requests: 75
- Checks succeeded: 100% (225/225)
- Checks failed: 0%
- HTTP failed requests: 0%
- p(95): 458.92 ms
- Exit code: 0

**Conclusion:**

The problem was caused by using incorrect capitalization in the request. After using the correct names, all checks passed.

Automated testing helped find this problem because multiple requests tested different pizza recommendations. A single manual request might not show the problem.

### A1: Smoke Test

- Virtual users: 1
- Duration: 30 seconds
- Total requests: 18
- Request rate: 0.488911 req/s
- Average response time: 291.73 ms
- p(95): 368.33 ms
- Max response time: 392.84 ms
- Failed requests: 0%
- Checks succeeded: 100% (30/30)
- Completed iterations: 6
- Exit code: 0

**Result: PASS**

All checks passed, and there were no failed HTTP requests.

The smoke test showed that the main user journey worked correctly with one virtual user. The request rate was low because the journey included waiting time between requests.

### A2: Average Load Test

- Virtual users: 3
- Duration: 3 minutes
- Total requests: 243
- Request rate: 1.31 req/s
- Completed iterations: 81
- Average response time: 288 ms
- p(95): 398 ms
- p(99): 417 ms
- Max response time: 526 ms
- Failed requests: 0%
- Checks succeeded: 100%
- Exit code: 0

**Result: All checks passed.**

The average load test used 3 virtual users. The request rate increased from 0.49 req/s in A1 to 1.31 req/s in A2.

The p(95) response time increased slightly from 368.33 ms to 398 ms. There were no failed requests, and all checks passed.

This shows that the website handled the tested average load without major performance problems.

### A3: Stress Test

- Virtual users: 5
- Duration: 3 minutes
- Total requests: 402
- Request rate: 2.154386 req/s
- Completed iterations: 134
- Average response time: 294.81 ms
- p(95): 396.03 ms
- Max response time: 610.19 ms
- Failed requests: 0%
- Checks succeeded: 100% (670/670)
- Homepage p(95): 274.80 ms
- Recommendation p(95): 465.33 ms
- Exit code: 0

**Result: PASS**

All thresholds passed, and there were no failed HTTP requests.

Compared with A2, the number of requests increased from 243 to 402, while the p(95) response time stayed almost the same.

This shows that the website handled 5 virtual users without major performance problems during this test.

### A4: Spike Test

- Virtual users: 5 (maximum)
- Duration: 2 minutes 20 seconds
- Total requests: 150
- Request rate: 1.022636 req/s
- Completed iterations: 50
- Average response time: 297.78 ms
- p(95): 404.29 ms
- Max response time: 454.08 ms
- Failed requests: 0%
- Checks succeeded: 100% (250/250)
- Homepage p(95): 304.65 ms
- Recommendation p(95): 425.03 ms
- Exit code: 0

**Result: PASS**

All thresholds passed, and there were no failed HTTP requests.

The spike test increased the number of virtual users from 1 to 5 in 5 seconds, then reduced it back to 1.

The website handled this sudden increase in load without request failures. The overall p(95) response time was 404.29 ms, which was close to the previous tests.

This suggests that the website handled the tested traffic spike well.

### A5: Soak Test

- Virtual users: 2
- Duration: 11 minutes
- Total requests: 644
- Request rate: 0.969961 req/s
- Completed iterations: 215
- Average response time: 325.10 ms
- p(95): 380.26 ms
- Max response time: 10.26 s
- Failed requests: 0.31% (2/644)
- Checks succeeded: 99.62% (1069/1073)
- Homepage p(95): 287.51 ms
- Recommendation p(95): 406.51 ms
- Exit code: 0

**Result: PASS**

All configured thresholds passed, but the test detected two failed HTTP requests and four failed checks.

During the test, one response could not be parsed as JSON. The maximum response time also reached 10.26 seconds.

The p(95) response time remained at 380.26 ms, but a few requests were much slower.

This shows why long-duration testing is useful. It can reveal occasional errors and slow requests that shorter tests might not detect.

The results do not confirm whether performance became worse over time. The response-time graph should be checked to investigate this.

## Part B: Reflection

### 1. Test Results

| Test | Users | Req/s | p(95) | Max | Failed | Checks |
|---|---|---|---|---|---|---|
| A1 Smoke | 1 | 0.49 | 368.33 ms | 392.84 ms | 0% | 100% |
| A2 Average | 3 | 1.31 | 398 ms | 526 ms | 0% | 100% |
| A3 Stress | 5 | 2.15 | 396.03 ms | 610.19 ms | 0% | 100% |
| A4 Spike | 5 | 1.02 | 404.29 ms | 454.08 ms | 0% | 100% |
| A5 Soak | 2 | 0.97 | 380.26 ms | 10260 ms | 0.31% | 99.62% |

### 2. Why was the request rate below 5 req/s in Step 0.2?

Because each user had to wait for the server and sleep for 1 second before making another request.

That is why 5 users did not make 5 requests every second.

### 3. What did you learn from Average and Stress Tests?

A2 used 3 users, and A3 used 5 users.

A3 had more requests, but the response time was almost the same.

Both tests had no failed requests.

This means the website worked well with up to 5 users in our tests.

### 4. What happened during the Spike Test?

The number of users went from 1 to 5 very quickly.

All checks passed, and no requests failed.

The website worked well when the number of users increased quickly.

### 5. What did you learn from the Soak Test?

We tested the website for 11 minutes.

Most requests were fast, but one took about 10 seconds.

There were 2 failed requests and 4 failed checks.

This shows that testing for a long time can help us find problems that short tests may miss.

### 6. Why is p(95) useful?

p(95) tells us how fast 95% of requests were.

It is useful because the average time does not show all slow requests.

We can use p(95) to see how fast the website is for most users.

### 7. Why can results be different on a public website?

First, internet speed can change the response time.

Second, other people may use the website while we are testing it.

These things can make the results different each time.

### 8. Why should we not test a public website with too many users?

Too many requests can make the website slow or stop working.

This can affect other people who are using it.

We should only test websites when we have permission and follow the rules.

### 9. How can we make a performance requirement easy to test?

A bad requirement is:

"The website should be fast."

It is not clear how fast the website should be.

A better requirement is:

"With 3 users, 95% of requests must take less than 1 second, 99% must take less than 1.5 seconds, and less than 1% of requests can fail."

We can test this with K6:

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

This makes it easy to check if the website passes or fails.