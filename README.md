# 🤝 MILAAN — *Vasudhaiva Kutumbakam*

> *"The world is one family."* — A community-driven platform that connects people facing real-world challenges with those who can help solve them.


## 🌍 About

**MILAAN** (मिलान — meaning *"to meet / to connect"*) is a social impact web platform built on the belief that every problem has a solution within the community itself. It bridges the gap between individuals in need — students, citizens, and local communities — and those who can help, like mentors, NGOs, and domain experts.

Whether it's finding a volunteer, organizing a local event, or sharing critical resources, MILAAN brings people together to create real, measurable change.


## ✨ Features

- 🤝 **Community Support Network** — Connect people with problems to those with solutions
- 📋 **Event Organization** — Create, manage, and join volunteer-driven community events
- 💬 **Discussion Forums** — Open community conversations around local issues
- 🔗 **Resource Sharing** — Share knowledge, tools, and contacts across communities
- 📊 **Impact Tracking** — Monitor contributions and community outcomes
- 🔒 **Secure Authentication** — User login and profile management via Supabase Auth
- 📱 **Fully Responsive** — Works seamlessly on desktop and mobile


## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React** | Frontend UI framework |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Accessible, pre-built UI components |
| **Supabase** | Backend — database, auth & real-time sync |


## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or above
- npm or bun

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mynameispm/milaan-sahaay-community.git

# 2. Navigate into the project directory
cd milaan-sahaay-community

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be live at `http://localhost:5173`.


## ⚙️ Environment Setup

This project uses **Supabase** as its backend. Create a `.env` file at the root of the project and add your credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Find these in your [Supabase Dashboard](https://supabase.com/dashboard) under Project Settings → API.

## 📁 Project Structure

```
milaan-sahaay-community/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Route-level page components
│   ├── hooks/         # Custom React hooks
│   └── lib/           # Utilities & Supabase client config
├── supabase/          # Supabase migrations & config
├── index.html
└── vite.config.ts
```

## 🏗️ Build for Production

```bash
npm run build
```

Output files will be in the `dist/` directory, ready for deployment.


## 🗺️ Roadmap

- [ ] Resource mapping with interactive visualizations
- [ ] Multilingual support for diverse communities
- [ ] Mobile app (React Native)
- [ ] Integration with local government services
- [ ] Community impact measurement dashboard

## 👥 Team

| Name | Role |
|---|---|
| **Phaneendra M** | UI/UX |
| **Priyanshu** | Backend |
| **Dhanush Kumar** | Backend |
| **Mohan Raj** | Design |


## 🤝 Contributing

Contributions, ideas, and pull requests are always welcome. Feel free to open an issue to discuss what you'd like to improve.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

<div align="center">
  <b>मिलान — जहाँ हर समस्या का हल, समाज में ही है।</b><br/>
  <i>("MILAAN — where every problem finds its answer within the community itself.")</i>
  <br/><br/>
  Made with ❤️ by <a href="https://github.com/mynameispm">mynameispm</a> & Team
</div>
