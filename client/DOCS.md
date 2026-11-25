## Current Task
1. Create register
    - needs to reach `/api/auth/register `
    - if success 201 if failure 404
2. Create Login
    - needs to reach `/api/auth/login`
    - account for token
    - if success 200 if failure 404
----
3. Run tests
Off the top of my head

### Register

- needs to reach `/api/auth/register`
- zod validation still applies
- return 201

### Login

- needs to reach `/api/auth/login`
- Returns 200
- token is created.
- httpOnly is present.
- needs to hold cookie for repeated access.

