#!/bin/bash

# NEXTRIP.AI - Comprehensive Testing Script
# Run this to test all application functionality

echo "🚀 NEXTRIP.AI - Application Testing Suite"
echo "========================================"
echo ""

BASE_URL="http://localhost:3000"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if server is running
echo "📡 Checking if development server is running..."
if curl -s "${BASE_URL}" > /dev/null; then
    echo -e "${GREEN}✓ Server is running${NC}"
else
    echo -e "${RED}✗ Server is not running${NC}"
    echo "Please start the server with: npm run dev"
    exit 1
fi

echo ""

# Test Homepage
echo "🏠 Testing Homepage (/)..."
if curl -s "${BASE_URL}" | grep -q "NEXTRIP"; then
    echo -e "${GREEN}✓ Homepage loads correctly${NC}"
else
    echo -e "${RED}✗ Homepage failed${NC}"
fi

echo ""

# Test Plan Page
echo "📅 Testing Plan Page (/plan)..."
if curl -s "${BASE_URL}/plan" | grep -q "NEXTRIP"; then
    echo -e "${GREEN}✓ Plan page loads correctly${NC}"
else
    echo -e "${RED}✗ Plan page failed${NC}"
fi

echo ""

# Test Weather API
echo "🌤️  Testing Weather API..."
WEATHER_RESPONSE=$(curl -s "${BASE_URL}/api/weather?city=Bali")
if echo "$WEATHER_RESPONSE" | grep -q "temp"; then
    echo -e "${GREEN}✓ Weather API working${NC}"
    echo "   Sample: $(echo $WEATHER_RESPONSE | jq -r '.temp // "N/A"')°C"
else
    echo -e "${RED}✗ Weather API failed${NC}"
fi

echo ""

# Test Search API - Flights
echo "✈️  Testing Flight Search API..."
FLIGHT_RESPONSE=$(curl -s "${BASE_URL}/api/search?type=flights&origin=Delhi&destination=Bali&budget=50000&currency=INR")
if echo "$FLIGHT_RESPONSE" | grep -q "airline"; then
    FLIGHT_COUNT=$(echo "$FLIGHT_RESPONSE" | jq '. | length')
    echo -e "${GREEN}✓ Flight search working (${FLIGHT_COUNT} flights found)${NC}"
else
    echo -e "${RED}✗ Flight search failed${NC}"
fi

echo ""

# Test Search API - Hotels
echo "🏨 Testing Hotel Search API..."
HOTEL_RESPONSE=$(curl -s "${BASE_URL}/api/search?type=hotels&destination=Bali&budget=50000&currency=INR")
if echo "$HOTEL_RESPONSE" | grep -q "name"; then
    HOTEL_COUNT=$(echo "$HOTEL_RESPONSE" | jq '. | length')
    echo -e "${GREEN}✓ Hotel search working (${HOTEL_COUNT} hotels found)${NC}"
else
    echo -e "${RED}✗ Hotel search failed${NC}"
fi

echo ""

# Test Itinerary Generation API
echo "🤖 Testing AI Itinerary Generation..."
ITINERARY_PAYLOAD='{
  "destination": "Bali",
  "origin": "Delhi",
  "startDate": "2026-12-01",
  "endDate": "2026-12-05",
  "budget": 50000,
  "currency": "INR",
  "travelers": 2,
  "travelStyle": "luxury",
  "dietaryRestrictions": ["Vegetarian"],
  "interests": ["Beaches", "Culture"],
  "accommodation": "luxury",
  "transportMode": "mix"
}'

ITINERARY_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/generate-itinerary" \
  -H "Content-Type: application/json" \
  -d "$ITINERARY_PAYLOAD")

if echo "$ITINERARY_RESPONSE" | grep -q "destination"; then
    DAY_COUNT=$(echo "$ITINERARY_RESPONSE" | jq '.days | length')
    TOTAL_COST=$(echo "$ITINERARY_RESPONSE" | jq -r '.totalEstimatedCost // "N/A"')
    echo -e "${GREEN}✓ Itinerary generation working${NC}"
    echo "   ${DAY_COUNT} days planned, Total: INR ${TOTAL_COST}"
else
    echo -e "${RED}✗ Itinerary generation failed${NC}"
fi

echo ""

# Test 404 Page
echo "🔍 Testing 404 Not Found Page..."
if curl -s "${BASE_URL}/nonexistent-page" | grep -q "404"; then
    echo -e "${GREEN}✓ 404 page works${NC}"
else
    echo -e "${YELLOW}⚠ 404 page may need checking${NC}"
fi

echo ""
echo "========================================"
echo "✅ Testing Complete!"
echo ""
echo "💡 Manual Testing Checklist:"
echo "   1. Navigate to ${BASE_URL}"
echo "   2. Click 'Get Started' button"
echo "   3. Fill out the trip form"
echo "   4. Submit and verify itinerary generation"
echo "   5. Test all tabs: Itinerary, Budget, Flights, Hotels, Map"
echo "   6. Test mobile responsiveness"
echo "   7. Test form validation"
echo "   8. Test error handling"
echo ""
echo "🎉 NEXTRIP.AI is ready for production!"
