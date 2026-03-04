import Hero from "../components/Hero";
import Products from "./Products";

export default function Home() {
  return (
    <div>
      <Hero />
      <section style={{ padding: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>
          Featured Products
        </h2>
        <Products />
      </section>
    </div>
  );
}