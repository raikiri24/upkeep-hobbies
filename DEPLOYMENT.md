# Deployment Instructions for Production

## Current Issue
The production deployment is trying to use `https://unmatched.cards/api/db/decks` but getting CORS errors because:
1. The production environment is detected correctly
2. The API requests are coming from `www.upkeephobbies.shop` domain
3. The CORS policy blocks cross-origin requests

## Solutions

### Option 1: Server-Side Fix (Recommended)
Configure your production server to allow CORS headers:

```nginx
location /api/ {
    proxy_pass https://unmatched.cards;
    proxy_set_header Access-Control-Allow-Origin *;
    proxy_set_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
    proxy_set_header Access-Control-Allow-Headers 'Content-Type, Authorization';
}
```

### Option 2: Environment Variable Override
For development/testing in production environment, set this environment variable:

```bash
# Force development API usage (for testing)
FORCE_DEV=true

# This will make the app use the local Vite proxy instead of direct API calls
```

Then deploy with:
```bash
env FORCE_DEV=true npm run build
```

### Option 3: Same Domain Deployment
Deploy the frontend to the same domain as the API:
- Deploy to `unmatched.cards` domain
- Or use a reverse proxy that handles CORS

## Quick Fix for Testing

If you want to test immediately, run:
```bash
# This will force the app to use development API (Vite proxy)
export FORCE_DEV=true && npm run build
```

## Environment Variables Available

- `MODE`: Current environment (development/production)
- `FORCE_DEV`: Override to force development API usage

## Verification

After deployment, check the browser console for:
- "CORS error detected" message = means you're using production API
- No CORS errors = means the override is working correctly

## File Changes Made

- Updated `services/unmatchedApi.ts` with environment override logic
- Added `FORCE_DEV` environment variable support
- Enhanced error handling with user-friendly messages

The fix is now ready for deployment!