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