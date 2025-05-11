import './globals.css';
import type { Metadata } from 'next';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rick and Morty Explorer',
  description: 'Explore characters and episodes from Rick and Morty',
  icons: {
    icon: '/favicon-rick.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        <div className="min-h-screen bg-[rgb(var(--morty-yellow))]">
          {children}
        </div>
        <footer className="bg-gray-800 text-white text-center p-4">
          <div className="container mx-auto">
            <p>Made by Mailén Givré</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
