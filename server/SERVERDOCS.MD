# SERVER DOCS


## 11/17/26
1. Completed zod validations for register and login
2. Completed migration to users


Todo:
1. Use bcrypt to create register route
2. Create login route
3. JSON web token for httpOnly cookies
4. Adjust to account for native headers.
**Nothing Deployed today**


## 11/18/26

Todo:
1. Use bcrypt to create register route
2. Create login routegit add 
3. JSON web token for httpOnly cookies
4. Adjust to account for native headers.


## 11/23/26
Today I completed auth fully. Now i need to make todos belong to users.


## 11/24/26

completed
- Added tokenVerify to all routes
    - Had to go through them and add user_id now that token verify requires it.

for number 3

I ran the test and here's my expereince


I created alice and bob, created a todo for alice and confirmed it had the data and returned 201 successfully.

had bob use .get on /todos and used ` expect(canBobSee.status).not.toBe(200)` because i was unsure what the error code would be, but anything other than 200 would be a better starting point. But my test was red, so i expected 200 and it was green. I doubled checked that the route was protected (not with a test) but then console logged bobs todos and saw it was empty []. So i went back to my controller and saw how the end result was just res.json(200). No error handling or anything so i did `if(result.rows === 0)` but saw that I can't due to an error so i did 

```TS
 if(result.rows.length === 0){
    res.status(404).json({error: "NO TODOS FOUND."})
}  
```

Now it works, bob cannot access alice's todos.

^ fix what was wrong with this later


**Completed***
- All todo routes are protected
  - No user is able to access another users todos
  - No user is able to alter another users todos

  