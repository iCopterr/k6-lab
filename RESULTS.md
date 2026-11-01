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