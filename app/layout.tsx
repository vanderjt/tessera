import "./globals.css";

export const metadata = {
  title: "Tessera",
  description: "A private sanctuary for shared memories"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}