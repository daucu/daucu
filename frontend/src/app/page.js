import Header from "./components/header";
import Footer from "./components/footer";
import HomeComponents from "./components/home";

export default function Home() {
  return (
    <main className="flex flex-col dark:bg-gray-900 bg-white">
      <Header />
      <HomeComponents/>
      <Footer />
    </main>
  );
}