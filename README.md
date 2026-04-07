🕌 Audio Quran Streaming App
A web-based application for streaming Holy Quran recitations from multiple renowned reciters. Listen to beautiful tilawat with seamless audio streaming and an intuitive user interface.

✨ Features
🎵 Multiple Reciters – Choose from a growing list of famous Qaris

📱 Responsive Design – Works flawlessly on desktop, tablet, and mobile devices

⏯️ Audio Controls – Play, pause, skip, seek, and volume control

🔄 Continuous Playback – Automatically plays next surah

📖 Surah List – Browse and select any surah with English/Arabic names

🔍 Search Functionality – Quickly find surahs by name or number

💾 Recently Played – Remembers your listening history

🌙 Dark/Light Mode – Toggle between themes for comfortable listening

🚀 Live Demo
[Insert your deployed link here]

🛠️ Tech Stack
Frontend: React.js / Next.js / Vue.js (choose yours)

Audio API: [e.g., Quran.com API, EveryAyat API, or custom backend]

Styling: Tailwind CSS / CSS Modules

State Management: Redux Toolkit / Zustand

Audio Player: Howler.js / HTML5 Audio

📦 Installation
Prerequisites
Node.js (v18 or higher)

npm / yarn / pnpm

Setup
Clone the repository

bash
git clone https://github.com/yourusername/audio-quran-streaming.git
cd audio-quran-streaming
Install dependencies

bash
npm install
# or
yarn install
Environment Variables
Create a .env.local file in the root directory:

env
NEXT_PUBLIC_API_URL=your_api_endpoint
NEXT_PUBLIC_AUDIO_BASE_URL=audio_streaming_base_url
Run development server

bash
npm run dev
# or
yarn dev
Open http://localhost:3000

🎙️ Available Reciters
Reciter	Style
Abdul Rahman Al-Sudais	Slow, melodious
Mishary Rashid Alafasy	Moderate, emotional
Saad Al-Ghamdi	Clear, precise
Abu Bakr Al-Shatri	Powerful, rhythmic
Maher Al-Muaiqly	Smooth, tranquil
More coming soon...	
[Update this list based on your actual reciters]

📁 Project Structure
text
audio-quran-streaming/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── AudioPlayer/
│   │   ├── SurahList/
│   │   ├── ReciterSelector/
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API integration
│   ├── store/           # State management
│   ├── styles/          # Global styles
│   └── utils/           # Helper functions
├── .env.local           # Environment variables
├── package.json
└── README.md
🔌 API Integration
This project uses Quran.com API or EveryAyat API to fetch:

Surah metadata (names, verses count)

Audio streams for each reciter

Translation data (optional)

Example API Call
javascript
// Fetch surah list
const response = await fetch('https://api.quran.com/api/v4/chapters');

// Get audio for a specific reciter
const audioUrl = `https://audio.quran.com/${reciterId}/${surahNumber}`;
🧪 Running Tests
bash
npm run test
# or
yarn test
🚢 Deployment
Deploy to Vercel (Recommended)
bash
npm run build
vercel --prod
Deploy to Netlify
bash
npm run build
# Drag and drop the `build` folder to Netlify
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Follow existing code style and conventions

Write meaningful commit messages

Update documentation for significant changes

Test thoroughly before submitting PR

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

🙏 Acknowledgments
Quran.com for the API and data

All the Qaris whose beautiful recitations make this project meaningful

The open-source community for their invaluable tools and libraries

📞 Contact
Your Name – @yourtwitter – your.email@example.com

Project Link: https://github.com/yourusername/audio-quran-streaming

🗺️ Roadmap
Add more reciters

Include translations (multiple languages)

Add bookmarking feature

Offline playback support

Mobile app with React Native

Playlist creation

Audio speed control

Sleep timer

⭐️ If you found this project helpful, please consider giving it a star on GitHub!


🕌 Audio Quran Streaming App
A web-based application for streaming Holy Quran recitations from multiple renowned reciters. Listen to beautiful tilawat with seamless audio streaming and an intuitive user interface.

✨ Features
🎵 Multiple Reciters – Choose from a growing list of famous Qaris

📱 Responsive Design – Works flawlessly on desktop, tablet, and mobile devices

⏯️ Audio Controls – Play, pause, skip, seek, and volume control

🔄 Continuous Playback – Automatically plays next surah

📖 Surah List – Browse and select any surah with English/Arabic names

🔍 Search Functionality – Quickly find surahs by name or number

💾 Recently Played – Remembers your listening history

🌙 Dark/Light Mode – Toggle between themes for comfortable listening

🚀 Live Demo
[Insert your deployed link here]

🛠️ Tech Stack
Frontend: React.js / Next.js / Vue.js (choose yours)

Audio API: [e.g., Quran.com API, EveryAyat API, or custom backend]

Styling: Tailwind CSS / CSS Modules

State Management: Redux Toolkit / Zustand

Audio Player: Howler.js / HTML5 Audio

📦 Installation
Prerequisites
Node.js (v18 or higher)

npm / yarn / pnpm

Setup
Clone the repository

bash
git clone https://github.com/yourusername/audio-quran-streaming.git
cd audio-quran-streaming
Install dependencies

bash
npm install
# or
yarn install
Environment Variables
Create a .env.local file in the root directory:

env
NEXT_PUBLIC_API_URL=your_api_endpoint
NEXT_PUBLIC_AUDIO_BASE_URL=audio_streaming_base_url
Run development server

bash
npm run dev
# or
yarn dev
Open http://localhost:3000

🎙️ Available Reciters
Reciter	Style
Abdul Rahman Al-Sudais	Slow, melodious
Mishary Rashid Alafasy	Moderate, emotional
Saad Al-Ghamdi	Clear, precise
Abu Bakr Al-Shatri	Powerful, rhythmic
Maher Al-Muaiqly	Smooth, tranquil
More coming soon...	
[Update this list based on your actual reciters]

📁 Project Structure
text
audio-quran-streaming/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── AudioPlayer/
│   │   ├── SurahList/
│   │   ├── ReciterSelector/
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API integration
│   ├── store/           # State management
│   ├── styles/          # Global styles
│   └── utils/           # Helper functions
├── .env.local           # Environment variables
├── package.json
└── README.md
🔌 API Integration
This project uses Quran.com API or EveryAyat API to fetch:

Surah metadata (names, verses count)

Audio streams for each reciter

Translation data (optional)

Example API Call
javascript
// Fetch surah list
const response = await fetch('https://api.quran.com/api/v4/chapters');

// Get audio for a specific reciter
const audioUrl = `https://audio.quran.com/${reciterId}/${surahNumber}`;
🧪 Running Tests
bash
npm run test
# or
yarn test
🚢 Deployment
Deploy to Vercel (Recommended)
bash
npm run build
vercel --prod
Deploy to Netlify
bash
npm run build
# Drag and drop the `build` folder to Netlify
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Follow existing code style and conventions

Write meaningful commit messages

Update documentation for significant changes

Test thoroughly before submitting PR

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

🙏 Acknowledgments
Quran.com for the API and data

All the Qaris whose beautiful recitations make this project meaningful

The open-source community for their invaluable tools and libraries

📞 Contact
Your Name – @yourtwitter – your.email@example.com

Project Link: https://github.com/yourusername/audio-quran-streaming

🗺️ Roadmap
Add more reciters

Include translations (multiple languages)

Add bookmarking feature

Offline playback support

Mobile app with React Native

Playlist creation

Audio speed control

Sleep timer

⭐️ If you found this project helpful, please consider giving it a star on GitHub!



🕌 Audio Quran Streaming App
A web-based application for streaming Holy Quran recitations from multiple renowned reciters. Listen to beautiful tilawat with seamless audio streaming and an intuitive user interface.

✨ Features
🎵 Multiple Reciters – Choose from a growing list of famous Qaris

📱 Responsive Design – Works flawlessly on desktop, tablet, and mobile devices

⏯️ Audio Controls – Play, pause, skip, seek, and volume control

🔄 Continuous Playback – Automatically plays next surah

📖 Surah List – Browse and select any surah with English/Arabic names

🔍 Search Functionality – Quickly find surahs by name or number

💾 Recently Played – Remembers your listening history

🌙 Dark/Light Mode – Toggle between themes for comfortable listening

🚀 Live Demo
[Insert your deployed link here]

🛠️ Tech Stack
Frontend: React.js / Next.js / Vue.js (choose yours)

Audio API: [e.g., Quran.com API, EveryAyat API, or custom backend]

Styling: Tailwind CSS / CSS Modules

State Management: Redux Toolkit / Zustand

Audio Player: Howler.js / HTML5 Audio

📦 Installation
Prerequisites
Node.js (v18 or higher)

npm / yarn / pnpm

Setup
Clone the repository

bash
git clone https://github.com/yourusername/audio-quran-streaming.git
cd audio-quran-streaming
Install dependencies

bash
npm install
# or
yarn install
Environment Variables
Create a .env.local file in the root directory:

env
NEXT_PUBLIC_API_URL=your_api_endpoint
NEXT_PUBLIC_AUDIO_BASE_URL=audio_streaming_base_url
Run development server

bash
npm run dev
# or
yarn dev
Open http://localhost:3000

🎙️ Available Reciters
Reciter	Style
Abdul Rahman Al-Sudais	Slow, melodious
Mishary Rashid Alafasy	Moderate, emotional
Saad Al-Ghamdi	Clear, precise
Abu Bakr Al-Shatri	Powerful, rhythmic
Maher Al-Muaiqly	Smooth, tranquil
More coming soon...	
[Update this list based on your actual reciters]

📁 Project Structure
text
audio-quran-streaming/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── AudioPlayer/
│   │   ├── SurahList/
│   │   ├── ReciterSelector/
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API integration
│   ├── store/           # State management
│   ├── styles/          # Global styles
│   └── utils/           # Helper functions
├── .env.local           # Environment variables
├── package.json
└── README.md
🔌 API Integration
This project uses Quran.com API or EveryAyat API to fetch:

Surah metadata (names, verses count)

Audio streams for each reciter

Translation data (optional)

Example API Call
javascript
// Fetch surah list
const response = await fetch('https://api.quran.com/api/v4/chapters');

// Get audio for a specific reciter
const audioUrl = `https://audio.quran.com/${reciterId}/${surahNumber}`;
🧪 Running Tests
bash
npm run test
# or
yarn test
🚢 Deployment
Deploy to Vercel (Recommended)
bash
npm run build
vercel --prod
Deploy to Netlify
bash
npm run build
# Drag and drop the `build` folder to Netlify
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Follow existing code style and conventions

Write meaningful commit messages

Update documentation for significant changes

Test thoroughly before submitting PR

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

🙏 Acknowledgments
Quran.com for the API and data

All the Qaris whose beautiful recitations make this project meaningful

The open-source community for their invaluable tools and libraries

📞 Contact
Your Name – @yourtwitter – your.email@example.com

Project Link: https://github.com/yourusername/audio-quran-streaming

🗺️ Roadmap
Add more reciters

Include translations (multiple languages)

Add bookmarking feature

Offline playback support

Mobile app with React Native

Playlist creation

Audio speed control

Sleep timer

⭐️ If you found this project helpful, please consider giving it a star on GitHub!


🕌 Audio Quran Streaming App
A web-based application for streaming Holy Quran recitations from multiple renowned reciters. Listen to beautiful tilawat with seamless audio streaming and an intuitive user interface.

✨ Features
🎵 Multiple Reciters – Choose from a growing list of famous Qaris

📱 Responsive Design – Works flawlessly on desktop, tablet, and mobile devices

⏯️ Audio Controls – Play, pause, skip, seek, and volume control

🔄 Continuous Playback – Automatically plays next surah

📖 Surah List – Browse and select any surah with English/Arabic names

🔍 Search Functionality – Quickly find surahs by name or number

💾 Recently Played – Remembers your listening history

🌙 Dark/Light Mode – Toggle between themes for comfortable listening

🚀 Live Demo
[Insert your deployed link here]

🛠️ Tech Stack
Frontend: React.js / Next.js / Vue.js (choose yours)

Audio API: [e.g., Quran.com API, EveryAyat API, or custom backend]

Styling: Tailwind CSS / CSS Modules

State Management: Redux Toolkit / Zustand

Audio Player: Howler.js / HTML5 Audio

📦 Installation
Prerequisites
Node.js (v18 or higher)

npm / yarn / pnpm

Setup
Clone the repository

bash
git clone https://github.com/yourusername/audio-quran-streaming.git
cd audio-quran-streaming
Install dependencies

bash
npm install
# or
yarn install
Environment Variables
Create a .env.local file in the root directory:

env
NEXT_PUBLIC_API_URL=your_api_endpoint
NEXT_PUBLIC_AUDIO_BASE_URL=audio_streaming_base_url
Run development server

bash
npm run dev
# or
yarn dev
Open http://localhost:3000

🎙️ Available Reciters
Reciter	Style
Abdul Rahman Al-Sudais	Slow, melodious
Mishary Rashid Alafasy	Moderate, emotional
Saad Al-Ghamdi	Clear, precise
Abu Bakr Al-Shatri	Powerful, rhythmic
Maher Al-Muaiqly	Smooth, tranquil
More coming soon...	
[Update this list based on your actual reciters]

📁 Project Structure
text
audio-quran-streaming/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── AudioPlayer/
│   │   ├── SurahList/
│   │   ├── ReciterSelector/
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API integration
│   ├── store/           # State management
│   ├── styles/          # Global styles
│   └── utils/           # Helper functions
├── .env.local           # Environment variables
├── package.json
└── README.md
🔌 API Integration
This project uses Quran.com API or EveryAyat API to fetch:

Surah metadata (names, verses count)

Audio streams for each reciter

Translation data (optional)

Example API Call
javascript
// Fetch surah list
const response = await fetch('https://api.quran.com/api/v4/chapters');

// Get audio for a specific reciter
const audioUrl = `https://audio.quran.com/${reciterId}/${surahNumber}`;
🧪 Running Tests
bash
npm run test
# or
yarn test
🚢 Deployment
Deploy to Vercel (Recommended)
bash
npm run build
vercel --prod
Deploy to Netlify
bash
npm run build
# Drag and drop the `build` folder to Netlify
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Follow existing code style and conventions

Write meaningful commit messages

Update documentation for significant changes

Test thoroughly before submitting PR

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

🙏 Acknowledgments
Quran.com for the API and data

All the Qaris whose beautiful recitations make this project meaningful

The open-source community for their invaluable tools and libraries

📞 Contact
Your Name – @yourtwitter – your.email@example.com

Project Link: https://github.com/yourusername/audio-quran-streaming

🗺️ Roadmap
Add more reciters

Include translations (multiple languages)

Add bookmarking feature

Offline playback support

Mobile app with React Native

Playlist creation

Audio speed control

Sleep timer

⭐️ If you found this project helpful, please consider giving it a star on GitHub!
