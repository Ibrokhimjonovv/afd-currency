
import { AccessProvider } from '@/context/context';
import { Poppins } from 'next/font/google'
import "../assets/styles/main.scss";
import Header from './components/header/header';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata = { 
  title: "AFD Currency",
  description: "Easy calculate your moneys",
};

export default function RootLayout({ children }) {
  return (
    <AccessProvider>
      <html lang="en" className={`${poppins.variable}`}>
        <body>
          <Header />  
          {children}
        </body>
      </html>
    </AccessProvider>
  );
}