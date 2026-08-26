import { getDatabase } from "@netlify/database";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import type { Work } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getWorks(): Promise<Work[]> {
  try {
    const db = getDatabase();
    const rows = await db.sql`
      SELECT id, version, date, status, title, description, tags, link, image
      FROM works
      ORDER BY date DESC, id DESC
    `;
    return rows as unknown as Work[];
  } catch (err) {
    console.error("Failed to load works from database:", err);
    return [];
  }
}

export default async function Home() {
  const works = await getWorks();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Works works={works} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
