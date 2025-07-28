# Facebook Conversion API - Final Implementation Guide

This document provides a comprehensive overview of the server-side Facebook Conversion API implementation in the pickone e-commerce application.

## Implementation Overview

The Facebook Conversion API (CAPI) implementation consists of:

1. **Server-Side Tracking**:

   -  Helper class for conversion API requests
   -  Middleware for tracking page views
   -  Controller for handling tracking events
   -  Integration with API routes

2. **Client-Side Integration**:

   -  Utility for sending events to server
   -  API endpoint to proxy requests

3. **Testing Tools**:
   -  Test script for verifying implementation

## Key Files

### Server-Side Components

-  `/src/helpers/fbConversionApi.ts` - Core conversion API helper class
-  `/src/app/middleware/fbConversionTracker.ts` - Middleware for automated page view tracking
-  `/src/app/modules/tracking/tracking.controller.ts` - Handles tracking events from client
-  `/src/app/modules/tracking/tracking.route.ts` - Defines API endpoints for tracking events

### Client-Side Components

-  `/src/lib/server-tracking.ts` - Utilities for sending events to server
-  `/src/app/api/tracking/event/route.ts` - Client-side API route to forward events to server

### Testing

-  `/src/test-fb-conversion.ts` - Test script with endpoints for different event types

## Tracked Events

The implementation supports tracking the following events:

1. **Page Views**: Automatically tracked using middleware
2. **Product Views**: Tracked when viewing product details
3. **Add to Cart**: Tracked when items are added to cart
4. **Search Events**: Tracked when search is performed
5. **Filter Usage**: Tracked when product filters are applied
6. **Bundle Selection**: Tracked when product bundles are created
7. **Product Clicks**: Tracked when products are clicked in listings
8. **Purchase Events**: Tracked when orders are placed

## Configuration

To use this implementation, you need to configure:

1. **Server-Side Environment Variables**:

   ```
   FACEBOOK_ACCESS_TOKEN=your_access_token
   FACEBOOK_PIXEL_ID=your_pixel_id
   ```

2. **Client-Side Environment Variables**:
   ```
   NEXT_PUBLIC_API_KEY=your_server_url
   ```

## Usage Examples

### Server-Side Tracking in Controllers

```typescript
// Track a product view
try {
   const conversionApi = new FacebookConversionApi({
      access_token: config.facebook.access_token,
      pixel_id: config.facebook.pixel_id,
      clientIpAddress: req.ip || req.connection.remoteAddress || '',
      clientUserAgent: req.headers['user-agent'] || '',
      fbp: req.cookies?._fbp || null,
      fbc: req.cookies?._fbc || null,
      debug: config.facebook.debug,
   });

   conversionApi.trackProductView(productId, productPrice, sourceUrl, {
      eventId: `pv_${productId}_${Date.now()}`,
   });
} catch (error) {
   console.error('Tracking error:', error);
}
```

### Client-Side Tracking

```typescript
import { trackProductView } from '@/lib/server-tracking';

// In your component
const handleProductView = product => {
   trackProductView(product.id, product.price);
};
```

## Testing

To test the implementation:

1. Compile the test script:

   ```
   npx tsc src/test-fb-conversion.ts --outDir dist
   ```

2. Run the test server:

   ```
   node dist/test-fb-conversion.js
   ```

3. Access test endpoints:
   -  Page View: http://localhost:3001/test-fb-conversion
   -  Product View: http://localhost:3001/test-product-view
   -  Add to Cart: http://localhost:3001/test-add-to-cart
   -  Purchase: http://localhost:3001/test-purchase

## Advantages of Server-Side Tracking

1. **Reliability**: Not affected by ad blockers or browser restrictions
2. **Data Accuracy**: Sends more accurate and complete data
3. **Performance**: Doesn't impact client-side performance
4. **Future-Proof**: Less affected by browser privacy changes

## Best Practices

1. **Error Handling**: All tracking calls are wrapped in try/catch to prevent affecting user experience
2. **Performance**: Tracking calls are non-blocking (asynchronous)
3. **Data Protection**: Sensitive user data is hashed before sending
4. **Debugging**: Debug mode can be enabled for troubleshooting

## Conclusion

This implementation provides a robust server-side tracking solution for Facebook Conversion API that enhances tracking reliability while respecting user privacy. It's designed to work alongside client-side tracking for maximum coverage.
