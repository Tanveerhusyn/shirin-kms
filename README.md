# Kamaris Website

A modern, responsive website for Kamaris featuring an interactive map experience, media hub, and dynamic content management.

## Features

### Interactive Map Experience
- Custom SVG markers for different location types (villages, lakes, glaciers, bridges)
- Interactive elements with animations and hover effects
- Detailed location information on click
- Responsive design for all device sizes

### Media Hub
- Dynamic media gallery with filtering by categories
- Featured media showcased on the homepage
- Supports both images and videos
- Supabase integration for storage and retrieval
- Admin interface for content management

### Admin Panel
- Secure authentication with Supabase Auth
- Media upload and management interface
- Role-based access control

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Animation**: Framer Motion
- **Database & Storage**: Supabase
- **Mapping**: Custom implementation with SVG elements
- **Authentication**: Supabase Auth

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/kamaris-website.git
   cd kamaris-website
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Set up Supabase:
   - Create a new Supabase project
   - Run the migration script in `supabase/migrations/20240410_create_media_items.sql`
   - Create a storage bucket named "media" with subfolders:
     - /images
     - /videos
     - /thumbnails

5. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
kamaris-website/
├── app/                      # Next.js app directory
│   ├── admin/                # Admin panel routes
│   │   └── media/            # Media management
│   └── media-hub/            # Media hub pages
├── components/               # React components
│   ├── admin/                # Admin components
│   ├── layout/               # Layout components
│   ├── map/                  # Map experience components
│   └── media-hub/            # Media hub components
├── public/                   # Static assets
│   └── icons/                # SVG icons and markers
├── styles/                   # Global styles
├── supabase/                 # Supabase configuration
│   └── migrations/           # Database migration scripts
├── utils/                    # Utility functions
│   └── supabase/             # Supabase client utilities
└── docs/                     # Documentation
```

## Documentation

- [Supabase Integration](docs/SupabaseIntegration.md)
- [Map Experience](docs/MapExperience.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Design inspiration from [mention sources]
- Special thanks to the Kamaris community
