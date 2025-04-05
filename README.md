🌌 AstroTrack AstroTrack is a web application that allows users to explore celestial objects in detail — including their characteristics, atmospheric composition, related space events, and associated scientific research. It is designed for space enthusiasts, researchers, and educators who want an interactive way to visualize and analyze data about the universe.

🚀 Features 🔭 Celestial Object Browser: View planets, stars, and exoplanets with scientific data.

📊 Habitability Index: Visual representation of how habitable a planet is.

🌐 Atmospheric Composition: Breakdown of gases present on each object.

📅 Related Events: Explore space missions and discoveries related to each object.

📚 Research Papers: Access scientific publications and findings.

🎨 Modern UI/UX: Beautifully styled using Tailwind CSS and Lucide icons.

🧑‍💻 Tech Stack Frontend: React + TypeScript

Styling: Tailwind CSS

Icons: Lucide-react

Database: Supabase (PostgreSQL + API)

Deployment: Vercel (or any preferred hosting platform)

🧠 How It Works Fetch Celestial Data from the Supabase database.

Render Dynamic Modals that show object-specific information.

Query Relations (e.g., events, research papers) using Supabase joins.

Display Data Visually with animated progress bars, responsive cards, and intuitive layout.

🛠️ Installation Clone the repository:

bash Copy code git clone https://github.com/marvel987dc/AstroTrack.git cd astrotrack Install dependencies:

bash Copy code npm install Set up environment variables (.env.local):

ini Copy code NEXT_PUBLIC_SUPABASE_URL=your-supabase-url NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key Run the app:

bash Copy code npm run dev
