import type { Metadata } from "next";

import "@/styles/globals.css";


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
       
        
        {children}
      </body>
    </html>
  );
}