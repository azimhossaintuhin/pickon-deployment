# Facebook Conversion API - Quick Reference

## 🚀 Quick Start

### 1. Test Purchase Event (Meta Docs Example)

```bash
curl -X GET "http://localhost:5000/api/v1/facebook-events/test-purchase"
```

### 2. Send Custom Event

```bash
curl -X POST "http://localhost:5000/api/v1/facebook-events/send-event" \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "Purchase",
    "custom_data": {
      "currency": "USD",
      "value": 99.99,
      "contents": [{"id": "PROD123", "quantity": 1, "item_price": 99.99}]
    },
    "user_data": {
      "em": ["user@example.com"],
      "client_ip_address": "192.168.1.1"
    },
    "event_id": "unique_event_123"
  }'
```

### 3. Hash User Data

```bash
curl -X POST "http://localhost:5000/api/v1/facebook-events/hash-user-data" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "phone": "+1234567890"}'
```

### 4. Track Events (Simplified API)

```bash
curl -X POST "http://localhost:5000/api/v1/tracking/event" \
  -H "Content-Type: application/json" \
  -d '{
    "eventName": "AddToCart",
    "products": [{"id": "PROD123", "quantity": 2}],
    "value": 49.98
  }'
```

## 📊 Available Endpoints

### New Meta Documentation Compliant Endpoints

| Method | Endpoint                                 | Purpose                                    |
| ------ | ---------------------------------------- | ------------------------------------------ |
| POST   | `/api/v1/facebook-events/send-event`     | Send any event with Meta payload structure |
| GET    | `/api/v1/facebook-events/test-purchase`  | Test Purchase event (Meta docs example)    |
| POST   | `/api/v1/facebook-events/hash-user-data` | Hash email/phone for privacy               |

### Existing Simplified Tracking Endpoints

| Method | Endpoint                 | Purpose                                            |
| ------ | ------------------------ | -------------------------------------------------- |
| POST   | `/api/v1/tracking/event` | Track common events (AddToCart, ViewContent, etc.) |

### Test Server Endpoints (Port 3001)

| Method | Endpoint              | Purpose                 |
| ------ | --------------------- | ----------------------- |
| GET    | `/test-fb-conversion` | Test page view event    |
| GET    | `/test-product-view`  | Test product view event |
| GET    | `/test-add-to-cart`   | Test add to cart event  |
| GET    | `/test-purchase`      | Test purchase event     |

## 🎯 Event Types Supported

-  `Purchase` - Purchase completion
-  `ViewContent` - Product/content view
-  `AddToCart` - Add item to cart
-  `InitiateCheckout` - Begin checkout process
-  `Search` - Search performed
-  `CompleteRegistration` - User registration
-  `Lead` - Lead generation
-  `PageView` - Page view (automatic)
-  Custom events - Any event name

## 🔧 Environment Variables Required

```env
FACEBOOK_ACCESS_TOKEN=your_access_token_here
FACEBOOK_PIXEL_ID=your_pixel_id_here
```

## ✅ Response Format

### Success Response

```json
{
   "statusCode": 200,
   "success": true,
   "message": "Event sent successfully",
   "data": {
      "event_name": "Purchase",
      "event_id": "unique_id",
      "response": {
         "events_received": 1,
         "messages": [],
         "fbtrace_id": "facebook_trace_id"
      }
   }
}
```

### Error Response

```json
{
   "statusCode": 500,
   "success": false,
   "message": "Error description here"
}
```

## 🔍 Integration Examples

### JavaScript/Client-Side

```javascript
// Send purchase event
const sendPurchaseEvent = async orderData => {
   const response = await fetch('/api/v1/facebook-events/send-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         event_name: 'Purchase',
         custom_data: {
            currency: 'USD',
            value: orderData.total,
            contents: orderData.items.map(item => ({
               id: item.id,
               quantity: item.quantity,
               item_price: item.price,
            })),
         },
         user_data: {
            em: [orderData.customerEmail],
         },
         event_id: `purchase_${orderData.orderId}`,
      }),
   });

   return response.json();
};
```

### Node.js/Server-Side

```typescript
import { FacebookConversionService } from './facebook-events.service';

// Send custom event
const trackEvent = async eventData => {
   try {
      const response = await FacebookConversionService.sendDirectEvent({
         event_name: eventData.name,
         event_time: Math.floor(Date.now() / 1000),
         action_source: 'website',
         user_data: eventData.userData,
         custom_data: eventData.customData,
         event_id: eventData.eventId,
      });

      console.log('Event sent:', response);
   } catch (error) {
      console.error('Event failed:', error);
   }
};
```

## 🎉 Status: Production Ready ✅

All endpoints tested and working with Facebook Conversion API!
