# Backend for Todo Project

## Register User Flow
1. Validate input
2. Check if user exists
3. Create user
4. Create inbox (rollback if fails)
5. Return user without password/refreshToken

**Optimization:** Using `toObject()` instead of 
extra `findById()` call to exclude sensitive fields.