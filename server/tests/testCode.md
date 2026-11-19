
create a fake email and password
curl -i -X POST http://localhost:8003/api/auth/register -H "Content-Type: application/json" -d '{"email":"Test@Example.com","password":"password123"}'