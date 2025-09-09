import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: 'swap',
});

export const metadata = {
  title: "Einkaufslisten Manager",
  description: "Eine responsive Einkaufslisten-App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={roboto.variable}>
        {children}
      </body>
    </html>
  );
}
