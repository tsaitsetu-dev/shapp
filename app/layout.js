import './globals.css';

export const metadata = {
  title: 'Shapp',
  description: 'Plan group shopping trips in NYC',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
