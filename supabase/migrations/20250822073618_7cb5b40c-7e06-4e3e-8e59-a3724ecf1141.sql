-- Insert demo vendor data after the demo accounts are created through signup
-- This assumes the demo accounts will be created via the auth signup process

-- Insert demo vendor profile (will be linked to vendor@demo.com after signup)
INSERT INTO public.vendors (
  user_id,
  business_name,
  description,
  address,
  city,
  province,
  postal_code,
  phone,
  email,
  latitude,
  longitude,
  services,
  business_hours,
  rating,
  review_count,
  verified,
  active
) VALUES (
  -- This will need to be updated with the actual user_id after demo account creation
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Demo Barbershop',
  'Experience the finest haircuts and grooming services in town. Our skilled barbers provide premium cuts, beard trims, and traditional hot towel shaves.',
  '123 Main Street',
  'Toronto',
  'Ontario',
  'M5V 3A8',
  '(416) 555-0123',
  'vendor@demo.com',
  43.6532,
  -79.3832,
  '[
    {"name": "Classic Haircut", "duration": 30, "price": 35},
    {"name": "Beard Trim", "duration": 15, "price": 20},
    {"name": "Hot Towel Shave", "duration": 45, "price": 50},
    {"name": "Hair Wash & Style", "duration": 20, "price": 25}
  ]'::jsonb,
  '{
    "monday": {"open": "09:00", "close": "18:00", "closed": false},
    "tuesday": {"open": "09:00", "close": "18:00", "closed": false},
    "wednesday": {"open": "09:00", "close": "18:00", "closed": false},
    "thursday": {"open": "09:00", "close": "20:00", "closed": false},
    "friday": {"open": "09:00", "close": "20:00", "closed": false},
    "saturday": {"open": "08:00", "close": "17:00", "closed": false},
    "sunday": {"open": "10:00", "close": "16:00", "closed": false}
  }'::jsonb,
  4.8,
  127,
  true,
  true
) ON CONFLICT (user_id) DO UPDATE SET
  business_name = EXCLUDED.business_name,
  description = EXCLUDED.description,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  province = EXCLUDED.province,
  postal_code = EXCLUDED.postal_code,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  services = EXCLUDED.services,
  business_hours = EXCLUDED.business_hours,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  verified = EXCLUDED.verified,
  active = EXCLUDED.active;