-- Create media_items table
CREATE TABLE IF NOT EXISTS media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  thumbnail TEXT NOT NULL,
  source TEXT NOT NULL,
  categories TEXT[] NOT NULL DEFAULT '{}',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS (Row Level Security) policies
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

-- Policy for anonymous read access
CREATE POLICY "Allow anonymous read access"
  ON media_items FOR SELECT
  USING (true);

-- Policy for any authenticated users to manage media_items
CREATE POLICY "Allow authenticated users to manage media_items"
  ON media_items FOR ALL
  USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at timestamp automatically
CREATE TRIGGER update_media_items_updated_at
BEFORE UPDATE ON media_items
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Create index on frequently queried columns
CREATE INDEX media_items_categories_idx ON media_items USING GIN (categories);
CREATE INDEX media_items_featured_idx ON media_items (featured);
CREATE INDEX media_items_date_idx ON media_items (date);

-- Insert sample data
INSERT INTO media_items (title, description, type, thumbnail, source, categories, date, featured)
VALUES
  (
    'Kamaris Valley Panorama',
    'Sweeping view of the Kamaris valley during summer with the village visible below.',
    'image',
    '/images/media-hub/kamaris-valley-thumb.jpg',
    '/images/media-hub/kamaris-valley.jpg',
    ARRAY['landscapes'],
    '2023-06-15',
    TRUE
  ),
  (
    'Traditional Carpet Weaving',
    'Fatima demonstrates the ancient art of carpet weaving passed down through generations.',
    'image',
    '/images/media-hub/carpet-weaving-thumb.jpg',
    '/images/media-hub/carpet-weaving.jpg',
    ARRAY['culture', 'people'],
    '2023-07-23',
    FALSE
  ),
  (
    'Stone Houses of Kamaris',
    'Traditional stone architecture designed to withstand harsh mountain winters.',
    'image',
    '/images/media-hub/stone-houses-thumb.jpg',
    '/images/media-hub/stone-houses.jpg',
    ARRAY['architecture'],
    '2023-05-18',
    FALSE
  ),
  (
    'Harvest Festival Celebrations',
    'Annual harvest festival with traditional music, dance and food.',
    'video',
    '/images/media-hub/harvest-festival-thumb.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ARRAY['culture', 'festivals', 'videos'],
    '2023-09-10',
    TRUE
  ),
  (
    'Mountain Pass Trek',
    'The journey through the mountain pass connecting Kamaris to neighboring valleys.',
    'image',
    '/images/media-hub/mountain-pass-thumb.jpg',
    '/images/media-hub/mountain-pass.jpg',
    ARRAY['landscapes'],
    '2023-08-05',
    FALSE
  ),
  (
    'Apricot Harvest',
    'Community members gather to harvest apricots, a staple crop in Kamaris.',
    'image',
    '/images/media-hub/apricot-harvest-thumb.jpg',
    '/images/media-hub/apricot-harvest.jpg',
    ARRAY['culture', 'people'],
    '2023-07-12',
    FALSE
  ),
  (
    'Village Elder Stories',
    'Elder Abdullah shares stories of Kamaris from decades past.',
    'video',
    '/images/media-hub/elder-stories-thumb.jpg',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ARRAY['culture', 'people', 'videos'],
    '2023-06-28',
    FALSE
  ),
  (
    'Ancient Irrigation Channels',
    'The centuries-old water management system that sustains Kamaris agriculture.',
    'image',
    '/images/media-hub/irrigation-thumb.jpg',
    '/images/media-hub/irrigation.jpg',
    ARRAY['architecture', 'culture'],
    '2023-05-30',
    FALSE
  ),
  (
    'Sunset Over Hunza Valley',
    'Stunning sunset views from Kamaris lookout point.',
    'image',
    '/images/media-hub/sunset-thumb.jpg',
    '/images/media-hub/sunset.jpg',
    ARRAY['landscapes'],
    '2023-09-05',
    TRUE
  ); 