-- Insert demo vendors in KwaZulu-Natal (Durban area)
INSERT INTO public.vendors (
  user_id,
  business_name,
  description,
  address,
  city,
  province,
  phone,
  email,
  rating,
  review_count,
  services,
  latitude,
  longitude,
  active
) VALUES 
-- Vendor 1: Phoenix area
(
  gen_random_uuid(),
  'Phoenix Cuts Barbershop',
  'Modern barbershop specializing in fades, beard trims, and classic cuts. Walk-ins welcome!',
  '45 Phoenix Plaza, Phoenix Highway',
  'Phoenix',
  'KwaZulu-Natal',
  '+27 31 500 1234',
  'info@phoenixcuts.co.za',
  4.8,
  127,
  '[
    {"name": "Classic Cut", "price": 80, "duration": 30},
    {"name": "Beard Trim", "price": 50, "duration": 20},
    {"name": "Fade Cut", "price": 100, "duration": 45},
    {"name": "Hot Towel Shave", "price": 120, "duration": 40}
  ]'::jsonb,
  -29.7271296,
  31.0247424,
  true
),
-- Vendor 2: Durban Central
(
  gen_random_uuid(),
  'Kings Barber Lounge',
  'Premium barbering experience in the heart of Durban. Appointment-based luxury service.',
  '123 West Street, Durban Central',
  'Durban',
  'KwaZulu-Natal',
  '+27 31 301 5678',
  'bookings@kingsbarber.co.za',
  4.9,
  203,
  '[
    {"name": "Signature Cut", "price": 150, "duration": 60},
    {"name": "Beard Sculpting", "price": 80, "duration": 30},
    {"name": "Executive Package", "price": 250, "duration": 90},
    {"name": "Hair Wash & Style", "price": 60, "duration": 25}
  ]'::jsonb,
  -29.8587,
  31.0218,
  true
),
-- Vendor 3: Chatsworth area
(
  gen_random_uuid(),
  'Chatsworth Traditional Barbers',
  'Family-run barbershop serving the community for over 20 years. Traditional cuts and modern styles.',
  '67 Chatsworth Centre Road',
  'Chatsworth',
  'KwaZulu-Natal',
  '+27 31 404 9876',
  'chat.barbers@gmail.com',
  4.6,
  89,
  '[
    {"name": "Standard Cut", "price": 60, "duration": 25},
    {"name": "Beard Trim", "price": 40, "duration": 15},
    {"name": "Father & Son Cut", "price": 100, "duration": 50},
    {"name": "Line Up", "price": 30, "duration": 15}
  ]'::jsonb,
  -29.9139,
  30.8663,
  true
),
-- Vendor 4: Pinetown
(
  gen_random_uuid(),
  'Pinetown Precision Cuts',
  'Sports-themed barbershop with big screens and professional cuts. Great for match days!',
  '89 Josiah Gumede Road, Pinetown',
  'Pinetown',
  'KwaZulu-Natal',
  '+27 31 702 3456',
  'cuts@pinetownprecision.co.za',
  4.7,
  156,
  '[
    {"name": "Team Cut", "price": 70, "duration": 30},
    {"name": "Playoff Special", "price": 90, "duration": 40},
    {"name": "Beard Game", "price": 55, "duration": 20},
    {"name": "Championship Package", "price": 140, "duration": 60}
  ]'::jsonb,
  -29.7833,
  30.8833,
  true
),
-- Vendor 5: Umhlanga
(
  gen_random_uuid(),
  'Umhlanga Elite Barber Studio',
  'Upscale barbering in Umhlanga. Specializing in executive cuts and grooming packages.',
  '12 Gateway Centre, Umhlanga Ridge',
  'Umhlanga',
  'KwaZulu-Natal',
  '+27 31 566 7890',
  'studio@umhlangaelite.co.za',
  4.9,
  234,
  '[
    {"name": "Executive Cut", "price": 180, "duration": 50},
    {"name": "Gentleman Package", "price": 300, "duration": 90},
    {"name": "Business Trim", "price": 120, "duration": 35},
    {"name": "Luxury Shave", "price": 150, "duration": 45}
  ]'::jsonb,
  -29.7167,
  31.0833,
  true
);

-- Add some demo vendors in other provinces too for testing
INSERT INTO public.vendors (
  user_id,
  business_name,
  description,
  address,
  city,
  province,
  phone,
  rating,
  review_count,
  services,
  latitude,
  longitude,
  active
) VALUES 
-- Cape Town vendor
(
  gen_random_uuid(),
  'Cape Town Classic Cuts',
  'Traditional barbering with a modern twist in the heart of Cape Town.',
  '45 Long Street, Cape Town City Bowl',
  'Cape Town',
  'Western Cape',
  '+27 21 424 1234',
  4.5,
  92,
  '[
    {"name": "Classic Cut", "price": 90, "duration": 35},
    {"name": "Beard Trim", "price": 60, "duration": 20},
    {"name": "Hot Towel Shave", "price": 130, "duration": 40}
  ]'::jsonb,
  -33.9249,
  18.4241,
  true
),
-- Johannesburg vendor
(
  gen_random_uuid(),
  'Jozi Barber Co',
  'Hip barbershop in Johannesburg serving the city with style.',
  '78 Commissioner Street, Johannesburg',
  'Johannesburg',
  'Gauteng',
  '+27 11 836 5678',
  4.6,
  167,
  '[
    {"name": "City Cut", "price": 85, "duration": 30},
    {"name": "Beard Sculpt", "price": 65, "duration": 25},
    {"name": "Full Service", "price": 150, "duration": 55}
  ]'::jsonb,
  -26.2041,
  28.0473,
  true
);