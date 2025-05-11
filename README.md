# Rick and Morty Explorer

## 🎯 Features

- View and paginate through Rick and Morty characters
- Select two different characters to compare
- View episodes specific to each character
- See shared episodes between selected characters
- Responsive design for various screen sizes
- Unit tested components and hooks

## 📋 Technical Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **API**: Rick and Morty API (https://rickandmortyapi.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- NPM or Yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Mailen-Givre/rick-and-morty-explorer.git
   cd rick-and-morty-explorer
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## 🧪 Testing

Run the test suite with:

```bash
npm test
# or
yarn test
```

Run tests with coverage:

```bash
npm test -- --coverage
# or
yarn test --coverage
```

## 🔧 Project Structure

```
src/
  app/              # Next.js App Router pages
  components/       # React components
  hooks/            # Custom React hooks
  api/              # API interaction
  tests/            # Unit tests
```

## 🌟 Main Components

- **CharacterCard**: Displays character information with visual feedback for selection
- **CharacterList**: Renders a paginated list of characters
- **EpisodeCard**: Displays episode information
- **EpisodeList**: Renders a list of episodes with appropriate titles

## 🔄 State Management

The application uses React hooks for state management:

- **useCharacters**: Custom hook to fetch and manage character data
- **useEpisodes**: Custom hook to manage episode data based on selected characters