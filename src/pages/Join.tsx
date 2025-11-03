import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JoinUs from "@/components/JoinUs";

const Join = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-8">
        <JoinUs />
      </div>
      <Footer />
    </main>
  );
};

export default Join;
