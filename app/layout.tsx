import type { Metadata } from "next";
import Navbar from '@/components/navbar'
import "./globals.css";


export const metadata: Metadata = {
  title: "SportHub",
  description: "Gestiona tus eventos deportivos en línea con SportHub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className=''
      >
       
        <Navbar />
        
        {children}
      </body>
    </html>
  );
}
