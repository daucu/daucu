import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  icons: {
    icon: "/daucu-cloud-favicon-white.png",
  },
  title: "Cloud Services Provider | Cloud Storage, Deployments, Databases",
  description:
    "Discover the next generation cloud services your business needs with Daucu Cloud. We provide a full range of cloud services, including cloud storage, easy deployments, databases, and more to help your business grow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ToastContainer />
        <Providers> {children} </Providers>
        {/* <Analytics />
        <SpeedInsights /> */}
      </body>
    </html>
  );
}