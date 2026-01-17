import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SocialMediaBar from "./SocialMediaBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <SocialMediaBar />
    </div>
  );
};

export default Layout;
