-- Create blog_posts table for local life section
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown or HTML content
  content_type TEXT NOT NULL CHECK (content_type IN ('markdown', 'html')),
  featured_image TEXT NOT NULL,
  author TEXT NOT NULL,
  published_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  read_time_minutes INTEGER,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX blog_posts_slug_idx ON blog_posts (slug);

-- Create indexes on common query fields
CREATE INDEX blog_posts_published_date_idx ON blog_posts (published_date);
CREATE INDEX blog_posts_status_idx ON blog_posts (status);
CREATE INDEX blog_posts_featured_idx ON blog_posts (featured);
CREATE INDEX blog_posts_tags_idx ON blog_posts USING GIN (tags);

-- Create RLS (Row Level Security) policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy for anonymous read access (only published posts)
CREATE POLICY "Allow anonymous read access to published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Policy for authenticated users to manage blog posts
CREATE POLICY "Allow authenticated users to manage blog posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

-- Create trigger to update updated_at timestamp automatically
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Insert sample data
INSERT INTO blog_posts (
  title,
  slug,
  summary,
  content,
  content_type,
  featured_image,
  author,
  published_date,
  tags,
  status,
  read_time_minutes,
  featured
) VALUES
(
  'Seasonal Traditions: Spring Planting Festival',
  'spring-planting-festival',
  'Experience the ancient Spring Planting Festival that marks the beginning of the agricultural season in Kamaris.',
  '# Spring Planting Festival

## A Centuries-Old Tradition

The Spring Planting Festival in Kamaris is a centuries-old tradition that marks the beginning of the agricultural season. Every year, as the last snow melts from the mountain slopes, the villagers gather to celebrate the fertility of the land and to pray for a bountiful harvest.

![Spring Planting Festival](/images/blogs/spring-festival.jpg)

## The Ceremony

The ceremony begins at dawn, with the village elders blessing the seeds that will be planted. The seeds are soaked in water collected from the sacred spring at the base of the mountain. This water is believed to contain special properties that ensure healthy growth.

### Traditional Activities

- **Communal Plowing**: The first furrows are plowed by the village elders, followed by the rest of the community.
- **Seed Blessing**: Each family brings their seeds to be blessed by the village spiritual leader.
- **Festive Dance**: Traditional dances performed to invoke the spirits of growth and fertility.
- **Communal Feast**: A feast prepared with preserved foods from the previous harvest.

## Modern Adaptations

While maintaining its core traditions, the festival has evolved to include educational components about sustainable farming practices and seed preservation techniques. Local schools participate by having children plant their own small gardens, ensuring the tradition continues with the next generation.

> "The Spring Planting Festival is not just about agriculture; it''s about our connection to the land and to each other. It reminds us that we are part of something larger than ourselves." - Elder Malik, 82

## Visitor Information

Visitors are welcome to observe and participate in the Spring Planting Festival, which takes place on the first full moon of spring each year. Those interested should contact the village council for exact dates and participation guidelines.

![Community Planting](/images/blogs/community-planting.jpg)

*Join us next spring to experience this beautiful tradition firsthand!*',
  'markdown',
  '/images/blogs/spring-festival-header.jpg',
  'Hassan Malik',
  '2023-04-15',
  ARRAY['culture', 'traditions', 'festivals', 'agriculture'],
  'published',
  8,
  TRUE
),
(
  'Local Cuisine: The Art of Mountain Cooking',
  'mountain-cooking-traditions',
  'Discover the unique culinary traditions of Kamaris, shaped by centuries of mountain life and seasonal ingredients.',
  '<h1>The Art of Mountain Cooking</h1>

<p>The cuisine of Kamaris is a reflection of its geography, climate, and cultural history. Nestled high in the mountains, traditional cooking methods have evolved to make the most of limited resources while creating nutritious and flavorful dishes.</p>

<h2>Seasonal Ingredients</h2>

<p>Mountain cooking follows the rhythm of the seasons:</p>

<ul>
  <li><strong>Spring:</strong> Wild herbs, fresh greens, and the first vegetables from kitchen gardens</li>
  <li><strong>Summer:</strong> Fresh fruits, vegetables, and dairy products from grazing animals</li>
  <li><strong>Fall:</strong> Root vegetables, dried fruits, nuts, and harvest celebrations</li>
  <li><strong>Winter:</strong> Preserved foods including dried meats, pickled vegetables, and fermented dairy</li>
</ul>

<img src="/images/blogs/seasonal-ingredients.jpg" alt="Seasonal ingredients from Kamaris" />

<h2>Signature Dishes</h2>

<p>Some of the most beloved dishes from our village include:</p>

<h3>Kamar Bread</h3>
<p>This distinctive flatbread is cooked on a hot stone and flavored with local mountain herbs. The dough is prepared using a sourdough starter that has been maintained in some families for generations.</p>

<h3>Shumla</h3>
<p>A hearty stew made with slow-cooked lamb, barley, and seasonal vegetables. During winter, dried ingredients are used, while fresh vegetables enhance the summer version.</p>

<h3>Mountain Tea</h3>
<p>Not just a beverage but a tradition, our mountain tea is made from herbs collected from specific altitudes, each believed to have different medicinal properties.</p>

<blockquote>
  <p>"Our food tells the story of our survival and our celebration of life in these mountains. Each dish carries the wisdom of generations." - Fatima Noori, Village Chef</p>
</blockquote>

<h2>Cooking Methods</h2>

<p>Traditional cooking techniques include:</p>

<ul>
  <li>Stone ovens for breads and slow-roasted meats</li>
  <li>Open-fire cooking for daily meals</li>
  <li>Preservation methods including smoking, drying, fermenting, and pickling</li>
  <li>Earth pits for special occasion cooking</li>
</ul>

<p>Visitors can experience these traditional cooking methods during seasonal food festivals or by arranging a cooking class with a local family.</p>

<img src="/images/blogs/traditional-cooking.jpg" alt="Traditional cooking in Kamaris" />

<p>Experience the flavors of our mountain heritage on your next visit to Kamaris!</p>',
  'html',
  '/images/blogs/mountain-cooking-header.jpg',
  'Fatima Noori',
  '2023-06-22',
  ARRAY['culture', 'food', 'traditions', 'lifestyle'],
  'published',
  6,
  TRUE
),
(
  'Preserving Ancient Crafts: The Weavers of Kamaris',
  'weavers-of-kamaris',
  'Learn about the traditional weaving techniques that have been passed down through generations in Kamaris village.',
  '# The Weavers of Kamaris

Kamaris has a rich tradition of textile arts, particularly weaving, that dates back hundreds of years. The intricate patterns and techniques have been preserved through careful apprenticeship and oral tradition.

## Historical Significance

Weaving in Kamaris originally served practical purposes - creating warm clothing for the harsh mountain winters and household items for daily use. Over time, it evolved into an art form with distinct patterns that tell stories of the village''s history, beliefs, and connection to the natural world.

![Traditional Loom](/images/blogs/traditional-loom.jpg)

## The Process

### Materials

Traditional weavers in Kamaris use:

- Wool from local sheep, known for its exceptional warmth and durability
- Natural dyes derived from plants, minerals, and insects found in the surrounding mountains
- Handmade wooden looms, often family heirlooms passed down through generations

### Techniques

The most common weaving techniques include:

1. **Zanjira Weaving**: Creates geometric patterns representing mountain landscapes
2. **Tamarband**: Incorporates small mirrors and beads into the textile
3. **Double-weft Technique**: Produces extra-thick textiles for winter use

## Modern Challenges and Preservation

As modern textiles become more accessible, the number of traditional weavers has declined. However, a dedicated group of village artisans has established the Kamaris Weavers Collective to preserve these ancient skills.

> "Every pattern we weave connects us to our ancestors. When I sit at my loom, I feel their hands guiding mine." - Sabira Khan, Master Weaver

## Apprenticeship Program

The collective has initiated an apprenticeship program where young villagers can learn from master weavers. This program has successfully trained 12 new weavers in the past five years, ensuring these traditions will continue.

## Visiting the Weavers

Visitors to Kamaris can:
- Observe weavers at work in the Artisan Center
- Participate in short workshops to learn basic techniques
- Purchase authentic textiles directly from the creators

![Weaving Workshop](/images/blogs/weaving-workshop.jpg)

*The Kamaris Weavers Collective welcomes visitors Monday through Friday, 10am to 4pm.*

---

**Related Posts:**
- Traditional Dyeing Techniques
- The Embroidery Traditions of Kamaris
- Textile Patterns and Their Meanings',
  'markdown',
  '/images/blogs/weavers-header.jpg',
  'Nadia Ahmad',
  '2023-08-10',
  ARRAY['culture', 'crafts', 'traditions', 'artisans'],
  'published',
  7,
  FALSE
); 