import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpen,
  Feather,
  Map as MapIcon,
  Scroll,
  Sword,
  Gem,
  Ghost,
  Mail,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Youtube,
  Twitter,
  Instagram,
  Facebook,
  Play,
  Star,
  Users,
  TrendingUp,
  Award
} from "lucide-react";

// --- Types ---
interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
}

interface Book {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  status: "Published" | "Pre-Order" | "Coming Soon";
  link: string;
  pages?: string;
  rating?: string;
  reviews?: string;
}

// --- Data ---
const BOOKS: Book[] = [
  {
    id: 1,
    title: "Coming of Age, the Price of Land",
    subtitle: "Book One",
    description: "At 16, Lucan inherits four rare Skill slots. When 400 refugees arrive, his ambition clashes with his father's caution. Struggles with trade, debt, and a labyrinth assassination attempt test his resolve. Book 1 ends with Wildermen raid—and a looming war.",
    cover: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&q=80&w=600",
    status: "Published",
    link: "#",
    pages: "343 pages",
    rating: "4.7 stars",
    reviews: "500+ reviews"
  },
  {
    id: 2,
    title: "War, Leadership, Ascension",
    subtitle: "Book Two",
    description: "The kingdom marches to war. Lucan is separated from his father, forced to lead men into enemy territory. He's knighted for his leadership. Then a ranger brings shocking news: his father is alive but captured. The book ends with the King's death and political fracture.",
    cover: "https://images.unsplash.com/photo-1515549832467-8783363e19b6?auto=format&fit=crop&q=80&w=600",
    status: "Published",
    link: "#",
    rating: "4.7 stars"
  },
  {
    id: 3,
    title: "Expansion War",
    subtitle: "Book Three",
    description: "Lucan navigates kingdom-wide conflict. Political alliances fracture. Enemies multiply. His proven leadership is tested against larger forces.",
    cover: "https://images.unsplash.com/photo-1629196911514-cfd8d63f5e90?auto=format&fit=crop&q=80&w=600",
    status: "Coming Soon",
    link: "#"
  },
  {
    id: 4,
    title: "Legacy Reckoning",
    subtitle: "Book Four",
    description: "The final chapter of Lucan's rise. What does it mean to be a lord? Can ambition and responsibility coexist? The conclusion to a four-book epic.",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600",
    status: "Coming Soon",
    link: "#"
  },
];

const NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Lucan's Coming-of-Age: From Unproven Heir to Leader in The Elder Lands",
    date: "Jan 13, 2025",
    category: "Character Arc",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
    description: "Discover how Lucan Zesh transforms from a doubting heir into a decisive leader. Father-son tension, earned progression, and real consequences define his arc."
  },
  {
    id: 2,
    title: "The Political Fractures After the King's Death in Book 2",
    date: "Jan 15, 2025",
    category: "Political Intrigue",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
    description: "How the King's death fractures Barwalis. Lucan faces civil war, political pressure, and the ultimate test of loyalty in The Elder Lands Book 2."
  },
  {
    id: 3,
    title: "Building an Economy from a Salt Crater: Real-World Inspiration in The Elder Lands",
    date: "Jan 17, 2025",
    category: "Kingdom Building",
    image: "https://images.unsplash.com/photo-1514894780887-121968d00567?auto=format&fit=crop&q=80&w=800",
    description: "How The Elder Lands transforms a worthless salt lake into an economic engine. Kingdom-building inspiration from history and strategy game design."
  },
];

const LORE_CARDS = [
  { icon: <MapIcon size={32} />, title: "Fief Maps", desc: "Explore the strategic layout of Barwalis fief with detailed maps showing roads, settlements, and resource locations." },
  { icon: <Scroll size={32} />, title: "World Guide", desc: "Dive deep into the history of the Shattered Kingdom, the Elder Blessing, and the political landscape." },
  { icon: <Gem size={32} />, title: "God Orb System", desc: "Understand the crunchy progression system: God Orbs, Skill slots, Vital Orbs, and hybrid Skills." },
  { icon: <Sword size={32} />, title: "Beast Hunts", desc: "Learn about Hesati beasts, Wildermen threats, and the combat challenges that drive progression." },
  { icon: <Ghost size={32} />, title: "Character Guide", desc: "Meet Lucan Zesh, Sir Golan, and the cast of characters shaping the kingdom's fate." },
  { icon: <BookOpen size={32} />, title: "System Mechanics", desc: "Deep dive into the 7-Point Star Dance, Physique tiers, and the scarcity-driven advancement system." },
];

const TESTIMONIALS = [
  {
    quote: "Finally, a protagonist who doubts himself. I've read Cradle. I've devoured The Wandering Inn. I thought I understood mentor-apprentice dynamics. Then I read The Elder Lands. Lucan's relationship with his father isn't convenient plot tension—it's the heart of the story. When Sir Golan says 'You've done well, Lucan,' it lands harder than any epic battle.",
    author: "M. Chen, Verified Reader",
    source: "Royal Road | 100K pages read"
  },
  {
    quote: "Cradle meets Wandering Inn meets politics. This is what progression fantasy should be—messy, emotional, human. If you love Cradle's mentor tension, Wandering Inn's settlement economics, and He Who Fights with Monsters' crunchy system, you'll be obsessed with Elder Lands. But the father-son dynamic? That's the real magic.",
    author: "J. Williams, Verified Reader",
    source: "Goodreads | 4.75 stars"
  },
  {
    quote: "The refugee arc is devastating. Economic stakes are REAL. By book three, Lucan's competence feels genuinely earned. Not a chosen one narrative—just a young heir learning that ambition without wisdom is catastrophe with a sword.",
    author: "K. Thompson, Verified Reader",
    source: "Amazon Reviews | Kindle Unlimited"
  }
];

const FAQS = [
  { q: "Is this grimdark or dark fantasy?", a: "Serious and unafraid of consequences—but not nihilistic. People die. Failures matter. But the story is about building something despite the cost, not surviving despair. Think realistic medieval rather than hopeless grimdark." },
  { q: "How much romance is in this series?", a: "Relationships matter—companions, allies, family bonds—but they serve the kingdom-building narrative, not romance tropes. The emotional focus is on leadership growth and family legacy." },
  { q: "Is Lucan exiled or cursed?", a: "No. Lucan is a young heir to a modest fief, blessed with rare power and attempting to elevate his family's legacy. The tension comes from his ambition clashing with his father's caution—not from victimhood." },
  { q: "How crunchy is the system?", a: "Crunchy enough to satisfy system junkies. God Orbs, limited Skill slots, Vital Orb progression, hybrid Skills. But mechanics serve story, never overshadow it." },
];

const THEMES = [
  { title: "Father-Son Dynamics", body: "His father built through caution. His son builds through ambition. One of them will be right. Both will be scarred by the attempt." },
  { title: "Crunchy Progression", body: "Four Skill slots. God Orbs. Limited choices. Every advancement costs something and teaches you something." },
  { title: "Kingdom-Building Stakes", body: "Build a legacy from risk. Roads boost trade. Refugees feed you. Every decision ripples through your fief—and your family." },
  { title: "Coming-of-Age Transformation", body: "Watch a bookish heir become the leader his fief desperately needs. Rite of passage, vulnerability, fear, courage." },
];

const QUOTES = [
  { text: "You only see what you want to see, son. You forgo everything else... like ruin.", attr: "Sir Golan, warning Lucan about the refugee gamble" },
  { text: "When you're leading, your responsibility isn't only to fight. You must create space for others to survive.", attr: "Sir Golan, teaching Lucan during the Hesati outbreak" },
  { text: "Everyone freezes up the first time.", attr: "Lees, Lucan's mentor, after his first beast hunt paralysis" },
  { text: "If I cause a mess and run away, then I'm simply... a child.", attr: "Lucan, accepting the weight of responsibility" },
];

// --- Styles ---
const styles = `
  :root {
    --color-bg: #050505;
    --color-bg-light: #0f1420;
    --color-primary: #C5A059;
    --color-primary-hover: #E5C079;
    --color-text: #e0e0e0;
    --color-text-muted: #8a9bb5;
    --color-accent: #1e283d;
    --banner-height: 40px;
  }

  @media (max-width: 600px) {
    :root {
      --banner-height: 60px;
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Lato', sans-serif;
    background-color: var(--color-bg);
    color: var(--color-text);
    overflow-x: hidden;
    width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    margin: 0;
  }

  .font-cinzel {
    font-family: 'Cinzel', serif;
  }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes shimmer {
    0% { background-position: -100% 0; }
    100% { background-position: 100% 0; }
  }

  .animate-fade-up {
    animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-delay-100 { animation-delay: 0.1s; }
  .animate-delay-200 { animation-delay: 0.2s; }
  .animate-delay-300 { animation-delay: 0.3s; }

  /* Utility */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 28px;
    font-family: 'Cinzel', serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;
    border: 1px solid var(--color-primary);
  }

  .btn-primary {
    background: linear-gradient(45deg, #a67c00, #C5A059);
    color: #000;
    border: none;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px rgba(197, 160, 89, 0.4);
  }

  .btn-outline {
    background: transparent;
    color: var(--color-primary);
  }

  .btn-outline:hover {
    background: rgba(197, 160, 89, 0.1);
    color: #fff;
  }

  section {
    overflow: hidden;
    width: 100%;
    position: relative;
  }

  .section-heading {
    text-align: center;
    margin-bottom: 60px;
    position: relative;
  }

  .section-heading h2 {
    font-size: clamp(2rem, 5vw, 3rem);
    color: var(--color-primary);
    margin-bottom: 10px;
    padding: 0 15px;
  }

  .section-heading .decoration {
    display: block;
    width: 100px;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
    margin: 10px auto;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #000;
  }
  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
  }
`;

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: "var(--banner-height)",
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: "all 0.4s ease",
        background: isScrolled ? "rgba(5, 5, 5, 0.95)" : "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
        padding: isScrolled ? "10px 0" : "20px 0",
        borderBottom: "1px solid rgba(197, 160, 89, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <a href="#" style={{ fontFamily: "Cinzel", fontSize: "1.5rem", fontWeight: "bold", color: "#fff", textDecoration: "none", letterSpacing: "2px", whiteSpace: "nowrap" }}>
            ELDER LANDS
          </a>
          <div style={{ width: "1px", height: "30px", background: "rgba(255,255,255,0.2)" }} className="hidden-mobile" />
          <div className="hidden-mobile" style={{ display: "flex", gap: "20px" }}>
            {/* Progress Indicators */}
            <StatusIndicator title="Book 1" status="Published" color="#4ade80" />
            <StatusIndicator title="Book 2" status="Published" color="#4ade80" />
            <StatusIndicator title="Book 3" status="Coming 2026" color="#fbbf24" />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden-mobile" style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          {["Home", "The Series", "Kingdom Guide", "Blog", "Store"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              style={{ color: "#e0e0e0", textDecoration: "none", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px", fontWeight: 600, transition: "color 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#C5A059")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#e0e0e0")}
            >
              {item}
            </a>
          ))}
          <a href="#newsletter" className="btn btn-primary" style={{ padding: "8px 20px", fontSize: "0.8rem" }}>
            Get Free Prequel
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="visible-mobile"
          style={{
            background: "none",
            border: "none",
            color: isScrolled ? "#C5A059" : "#fff",
            cursor: "pointer",
            width: "40px",
            height: "40px",
            display: "none",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: "fixed",
          top: "60px",
          left: 0,
          right: 0,
          background: "#050505",
          padding: "20px",
          borderBottom: "1px solid #333",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          alignItems: "center"
        }}>
          {["Home", "The Series", "Kingdom Guide", "Blog", "Store"].map((item) => (
            <a key={item} href="#" style={{ color: "#fff", textDecoration: "none", fontSize: "1.1rem" }}>{item}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .hidden-mobile { display: none !important; }
          .visible-mobile { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

const StatusIndicator = ({ title, status, color }: { title: string; status: string; color: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.05)", padding: "5px 12px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}` }}></div>
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
      <span style={{ fontSize: "0.65rem", color: "#8a9bb5", textTransform: "uppercase" }}>{title}</span>
      <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: color }}>{status}</span>
    </div>
  </div>
);

const PromoBanner = () => {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "var(--banner-height)",
      zIndex: 1001,
      background: "linear-gradient(90deg, #a67c00, #C5A059)",
      color: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 15px",
      textAlign: "center",
      fontFamily: "Cinzel",
      fontSize: "0.75rem",
      fontWeight: "bold",
      letterSpacing: "0.5px",
      lineHeight: "1.2"
    }}>
      <span className="banner-text">GET YOUR FREE ELDER LANDS PREQUEL – Lucan's First Rite Hunt</span>
      <a href="#newsletter" style={{ marginLeft: "10px", color: "#000", textDecoration: "underline", whiteSpace: "nowrap" }}>Download Now</a>
      <style>{`
        @media (max-width: 600px) {
          .banner-text { font-size: 0.65rem; }
        }
      `}</style>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      paddingTop: "calc(var(--banner-height) + 100px)",
      paddingBottom: "60px"
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&q=80&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.4) saturate(0.8)"
      }}></div>

      {/* Cinematic Gradient Overlay */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(circle at center, transparent 0%, #050505 90%)"
      }}></div>

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: "800px" }}>
        <div className="animate-fade-up">
          <p style={{
            fontFamily: "Cinzel",
            color: "#C5A059",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "20px",
            fontSize: "1.1rem"
          }}>Kingdom-Building LitRPG Series</p>

          <h1 style={{
            fontSize: "clamp(2rem, 8vw, 5rem)",
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: "25px",
            textShadow: "0 10px 30px rgba(0,0,0,0.5)",
            padding: "0 10px"
          }}>
            Get Lost in Your Next <br /> <span style={{ fontFamily: "Playfair Display", fontStyle: "italic", color: "#C5A059" }}>Kingdom-Building Epic</span>
          </h1>

          <p style={{
            fontSize: "1.2rem",
            color: "#cbd5e1",
            marginBottom: "20px",
            lineHeight: 1.6,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            Ambitious heir. Pragmatic father. One fief. Infinite consequences.
          </p>

          <p style={{
            fontSize: "1.1rem",
            color: "#C5A059",
            marginBottom: "50px",
            fontWeight: "bold"
          }}>
            Four books. Zero cliffhangers. Zero exile tropes.
          </p>

          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" className="btn btn-primary">
              <BookOpen size={20} style={{ marginRight: "10px" }} />
              Read Free in KU
            </a>
            <a href="#" className="btn btn-outline" style={{ borderColor: "#fff", color: "#fff" }}>
              <Play size={20} style={{ marginRight: "10px" }} />
              Listen on Audible
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0, height: "150px",
        background: "linear-gradient(to top, #050505, transparent)"
      }}></div>
    </section>
  );
};

const StorySummary = () => {
  return (
    <section style={{ padding: "100px 0", background: "linear-gradient(to bottom, #050505, #0a0e17)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))", gap: "60px", alignItems: "center" }}>
          <div className="animate-fade-up">
            <h2 style={{ fontSize: "2.5rem", color: "#C5A059", marginBottom: "20px" }}>At 16, Lucan Zesh Inherited a Gift Most Nobles Dream Of</h2>
            <h3 style={{ fontSize: "1.5rem", color: "#fff", marginBottom: "30px", fontStyle: "italic" }}>He didn't know it would cost him everything.</h3>
            <div style={{ color: "#cbd5e1", lineHeight: 1.8, fontSize: "1.1rem" }}>
              <p style={{ marginBottom: "20px" }}>
                Barwalis fief has survived on caution. Sir Golan built it through restraint, through survival instincts honed by past crises. His son sees something different—possibility.
              </p>
              <p style={{ marginBottom: "20px" }}>
                When Lucan receives his Elder Blessing at sixteen—four rare Skill slots, a windfall—he sees roads where others see ruin. Settlement opportunities where his father sees financial catastrophe.
              </p>
              <p style={{ marginBottom: "20px" }}>
                Then 400 refugees from the Shattered Kingdom arrive at their gates. His father says no. Lucan says yes.
              </p>
              <p>
                What follows is a series of cascading crises that test everything Lucan believes about leadership: Hesati beast outbreaks. Economic shortfalls. Royal audits. Neighborhood hostilities.
              </p>
            </div>
          </div>
          <div className="animate-fade-up" style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1533221216134-c43c2f0bb262?auto=format&fit=crop&q=80&w=800"
              style={{ width: "100%", borderRadius: "4px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
            />
            <div style={{
              position: "absolute",
              bottom: "-30px",
              right: "-30px",
              background: "#C5A059",
              padding: "30px",
              color: "#000",
              fontFamily: "Cinzel",
              fontWeight: "bold",
              maxWidth: "300px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
            }}>
              "Ambition without wisdom is catastrophe with a sword."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BeginAdventure = () => {
  const cards = [
    { title: "Listen on Audible", desc: "12–15 hours per book, professional narration", btn: "Start Free Trial", icon: <Play /> },
    { title: "Read Free in KU", desc: "All 4 books included, 2,000 pages total", btn: "Get Book 1 Free", icon: <BookOpen /> },
    { title: "Own the Series", desc: "Hardcover & Paperback with deluxe maps", btn: "Shop Paperbacks", icon: <Award /> },
    { title: "Signed Edition", desc: "Limited hardcover run signed by B. Salem", btn: "Order Signed", icon: <Star /> },
  ];

  return (
    <section style={{ padding: "80px 0", background: "#050505" }}>
      <div className="container">
        <div className="section-heading">
          <h2>Begin Your Adventure</h2>
          <span className="decoration"></span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "25px" }}>
          {cards.map((card, idx) => (
            <div key={idx} style={{ background: "#0f1420", padding: "40px 30px", border: "1px solid #1e283d", textAlign: "center", borderRadius: "4px" }}>
              <div style={{ color: "#C5A059", marginBottom: "20px", display: "flex", justifyContent: "center" }}>{card.icon}</div>
              <h3 style={{ color: "#fff", marginBottom: "15px" }}>{card.title}</h3>
              <p style={{ color: "#8a9bb5", fontSize: "0.9rem", marginBottom: "25px", height: "40px" }}>{card.desc}</p>
              <button className="btn btn-outline" style={{ fontSize: "0.8rem", width: "100%" }}>{card.btn}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section style={{ padding: "100px 0", background: "#050505" }}>
      <div className="container">
        <div className="section-heading animate-fade-up">
          <span style={{ fontFamily: "Cinzel", color: "#8a9bb5", letterSpacing: "2px" }}>Reader Reviews</span>
          <h2>Loved by Progression Fantasy Readers</h2>
          <span className="decoration"></span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "50px" }}>
          {TESTIMONIALS.map((testimonial, idx) => (
            <div key={idx} className="animate-fade-up" style={{
              background: "#0f1420",
              padding: "25px",
              borderRadius: "4px",
              border: "1px solid #1e283d",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}>
              <p style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: "0.95rem", fontStyle: "italic" }}>
                "{testimonial.quote}"
              </p>
              <div>
                <div style={{ color: "#C5A059", fontWeight: "bold", marginBottom: "5px" }}>{testimonial.author}</div>
                <div style={{ color: "#64748b", fontSize: "0.85rem" }}>{testimonial.source}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", marginTop: "60px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#C5A059", marginBottom: "5px" }}>1,500+</div>
            <div style={{ color: "#8a9bb5", fontSize: "0.9rem" }}>5-Star Reviews</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#C5A059", marginBottom: "5px" }}>100K+</div>
            <div style={{ color: "#8a9bb5", fontSize: "0.9rem" }}>Pages Read on Royal Road</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#C5A059", marginBottom: "5px" }}>4.75</div>
            <div style={{ color: "#8a9bb5", fontSize: "0.9rem" }}>Average Rating</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#C5A059", marginBottom: "5px" }}>4</div>
            <div style={{ color: "#8a9bb5", fontSize: "0.9rem" }}>Complete Books</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsSection = () => {
  return (
    <section id="blog" style={{ padding: "100px 0", background: "#050505" }}>
      <div className="container">
        <div className="section-heading animate-fade-up">
          <span style={{ fontFamily: "Cinzel", color: "#8a9bb5", letterSpacing: "2px" }}>The Chronicle</span>
          <h2>Latest from the Blog</h2>
          <span className="decoration"></span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "40px" }}>
          {/* Main Feature */}
          <div className="animate-fade-up" style={{ gridColumn: "span 1" }}>
            <a href="#" style={{ display: "block", textDecoration: "none", color: "inherit", height: "100%" }}>
              <div style={{
                position: "relative",
                borderRadius: "4px",
                overflow: "hidden",
                height: "100%",
                background: "#0f1420",
                border: "1px solid #1e283d",
                transition: "transform 0.3s ease",
              }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
                  <img
                    src={NEWS[0].image}
                    alt={NEWS[0].title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    background: "#C5A059",
                    color: "#000",
                    padding: "4px 12px",
                    fontFamily: "Cinzel",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    textTransform: "uppercase"
                  }}>
                    {NEWS[0].category}
                  </div>
                </div>
                <div style={{ padding: "30px" }}>
                  <div style={{ color: "#8a9bb5", fontSize: "0.9rem", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                    <span>{NEWS[0].date}</span>
                    <span style={{ color: "#C5A059" }}>By B. Salem</span>
                  </div>
                  <h3 style={{ fontSize: "1.8rem", marginBottom: "15px", color: "#fff" }}>{NEWS[0].title}</h3>
                  <p style={{ color: "#8a9bb5", lineHeight: 1.6 }}>{NEWS[0].description}</p>
                  <span style={{ display: "inline-block", marginTop: "20px", color: "#C5A059", borderBottom: "1px solid #C5A059", paddingBottom: "2px", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Read Full Article</span>
                </div>
              </div>
            </a>
          </div>

          {/* Side List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", gridColumn: "span 1" }}>
            {NEWS.slice(1).map((news, idx) => (
              <a key={news.id} href="#" className={`animate-fade-up animate-delay-${(idx + 1) * 100}`} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex",
                  gap: "20px",
                  background: "#0f1420",
                  border: "1px solid #1e283d",
                  padding: "20px",
                  borderRadius: "4px",
                  alignItems: "center",
                  transition: "border-color 0.3s"
                }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = "#C5A059"}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = "#1e283d"}
                >
                  <div style={{ width: "100px", height: "100px", flexShrink: 0, borderRadius: "4px", overflow: "hidden" }}>
                    <img src={news.image} alt={news.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "#C5A059", marginBottom: "5px", textTransform: "uppercase" }}>{news.category}</div>
                    <h4 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "8px" }}>{news.title}</h4>
                    <div style={{ color: "#64748b", fontSize: "0.85rem" }}>{news.date}</div>
                  </div>
                </div>
              </a>
            ))}

            {/* Newsletter Mini Card */}
            <div className="animate-fade-up animate-delay-300" style={{
              background: "linear-gradient(135deg, #1e283d 0%, #0f1420 100%)",
              padding: "30px",
              borderRadius: "4px",
              border: "1px solid #C5A059",
              textAlign: "center",
              marginTop: "auto"
            }}>
              <Mail size={32} color="#C5A059" style={{ marginBottom: "15px" }} />
              <h3 style={{ color: "#fff", marginBottom: "10px" }}>Get Your Free Prequel</h3>
              <p style={{ color: "#8a9bb5", fontSize: "0.9rem", marginBottom: "20px" }}>40-page novella. Exclusive content not in the main books.</p>
              <input type="email" placeholder="Your email address" style={{
                width: "100%",
                padding: "12px",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid #333",
                color: "#fff",
                marginBottom: "10px",
                borderRadius: "2px"
              }} />
              <button className="btn btn-primary" style={{ width: "100%" }}>Download Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LoreSection = () => {
  return (
    <section id="kingdom-guide" style={{ padding: "100px 0", background: "#080a0f", borderTop: "1px solid #1e283d" }}>
      <div className="container">
        <div className="section-heading animate-fade-up">
          <span style={{ fontFamily: "Cinzel", color: "#8a9bb5", letterSpacing: "2px" }}>Resources</span>
          <h2>Kingdom Guide</h2>
          <span className="decoration"></span>
          <p style={{ maxWidth: "700px", margin: "0 auto", color: "#8a9bb5", lineHeight: 1.6 }}>
            Dive deep into the world of Barwalis fief, the God Orb system, and the strategic elements that make The Elder Lands unique.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "20px" }}>
          {LORE_CARDS.map((item, idx) => (
            <div key={idx} className="animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div style={{
                background: "#0f1420",
                padding: "30px",
                borderRadius: "4px",
                border: "1px solid #1e283d",
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                height: "100%"
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = "#C5A059";
                  const icon = e.currentTarget.querySelector('.icon-wrapper') as HTMLElement;
                  if (icon) icon.style.color = "#C5A059";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#1e283d";
                  const icon = e.currentTarget.querySelector('.icon-wrapper') as HTMLElement;
                  if (icon) icon.style.color = "#475569";
                }}
              >
                <div className="icon-wrapper" style={{ color: "#475569", transition: "color 0.3s" }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "8px" }}>{item.title}</h3>
                  <p style={{ color: "#8a9bb5", fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BookShowcase = () => {
  const [activeBook, setActiveBook] = useState(BOOKS[0]);

  return (
    <section id="the-series" style={{
      padding: "100px 0",
      background: "url('https://images.unsplash.com/photo-1598555845941-073dbb9308cc?auto=format&fit=crop&q=80&w=2000') no-repeat center center/cover",
      position: "relative"
    }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(5, 5, 5, 0.9)" }}></div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="section-heading animate-fade-up">
          <span style={{ fontFamily: "Cinzel", color: "#C5A059", letterSpacing: "2px" }}>The Series</span>
          <h2 style={{ color: "#fff" }}>The Elder Lands – Four Complete Books</h2>
          <span className="decoration"></span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          {/* Main Active Book Display */}
          <div className="animate-fade-up" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            alignItems: "center"
          }}>
            {/* Cover */}
            <div style={{ position: "relative", maxWidth: "400px", margin: "0 auto" }}>
              <div style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                right: "-20px",
                bottom: "-20px",
                border: "1px solid #C5A059",
                zIndex: 0
              }}></div>
              <img
                src={activeBook.cover}
                alt={activeBook.title}
                style={{
                  width: "100%",
                  borderRadius: "2px",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                  position: "relative",
                  zIndex: 1,
                  display: "block"
                }}
              />
              {activeBook.status === "Published" && (
                <div style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "#4ade80",
                  color: "#000",
                  padding: "8px 16px",
                  fontFamily: "Cinzel",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  zIndex: 2
                }}>
                  {activeBook.status}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div style={{ color: "#C5A059", fontSize: "1.1rem", fontFamily: "Cinzel", marginBottom: "10px" }}>{activeBook.subtitle}</div>
              <h3 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", lineHeight: 1.1, marginBottom: "20px" }}>{activeBook.title}</h3>

              {activeBook.rating && (
                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Star size={16} fill="#C5A059" color="#C5A059" />
                    <span style={{ color: "#C5A059", fontWeight: "bold" }}>{activeBook.rating}</span>
                  </div>
                  {activeBook.reviews && <span style={{ color: "#8a9bb5" }}>{activeBook.reviews}</span>}
                  {activeBook.pages && <span style={{ color: "#8a9bb5" }}>{activeBook.pages}</span>}
                </div>
              )}

              <p style={{ color: "#cbd5e1", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "40px" }}>{activeBook.description}</p>
              <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
                {activeBook.status === "Published" ? (
                  <>
                    <a href={activeBook.link} className="btn btn-primary">Read Free in KU</a>
                    <a href={activeBook.link} className="btn btn-outline">Listen on Audible</a>
                  </>
                ) : (
                  <a href={activeBook.link} className="btn btn-outline">Coming 2026</a>
                )}
              </div>
            </div>
          </div>

          {/* Book Selector */}
          <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap", marginTop: "40px" }}>
            {BOOKS.map((book) => (
              <div
                key={book.id}
                onClick={() => setActiveBook(book)}
                style={{
                  cursor: "pointer",
                  opacity: activeBook.id === book.id ? 1 : 0.5,
                  transform: activeBook.id === book.id ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.3s ease",
                  textAlign: "center",
                  position: "relative"
                }}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  style={{ width: "100px", height: "150px", objectFit: "cover", boxShadow: "0 5px 15px rgba(0,0,0,0.3)", marginBottom: "10px" }}
                />
                <div style={{ fontSize: "0.8rem", color: "#fff", maxWidth: "100px", margin: "0 auto" }}>{book.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer style={{ background: "#020202", borderTop: "1px solid #111", padding: "80px 0 30px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "50px", marginBottom: "60px" }}>

          {/* Brand */}
          <div>
            <h2 style={{ fontFamily: "Cinzel", fontSize: "2.5rem", color: "#fff", marginBottom: "20px" }}>ELDER LANDS</h2>
            <p style={{ color: "#64748b", lineHeight: 1.6, marginBottom: "30px" }}>
              A four-book kingdom-building LitRPG series by B. Salem. Earned progression. Mentor-apprentice tension. Real consequences.
            </p>
            <div style={{ display: "flex", gap: "20px" }}>
              {[Twitter, Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" style={{ color: "#8a9bb5", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "#C5A059"} onMouseOut={(e) => e.currentTarget.style.color = "#8a9bb5"}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Discover */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <h4 style={{ color: "#C5A059", fontFamily: "Cinzel", marginBottom: "10px" }}>Discover</h4>
            <a href="#the-series" style={{ color: "#e0e0e0", textDecoration: "none" }}>The Series</a>
            <a href="#" style={{ color: "#e0e0e0", textDecoration: "none" }}>Author Bio</a>
            <a href="#kingdom-guide" style={{ color: "#e0e0e0", textDecoration: "none" }}>Kingdom Guide</a>
            <a href="#blog" style={{ color: "#e0e0e0", textDecoration: "none" }}>Updates & News</a>
          </div>

          {/* Shop */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <h4 style={{ color: "#C5A059", fontFamily: "Cinzel", marginBottom: "10px" }}>Shop</h4>
            <a href="#" style={{ color: "#e0e0e0", textDecoration: "none" }}>Kindle Unlimited</a>
            <a href="#" style={{ color: "#e0e0e0", textDecoration: "none" }}>Audible Audiobooks</a>
            <a href="#" style={{ color: "#e0e0e0", textDecoration: "none" }}>Paperbacks</a>
            <a href="#" style={{ color: "#e0e0e0", textDecoration: "none" }}>Deluxe Hardcovers</a>
            <a href="#" style={{ color: "#e0e0e0", textDecoration: "none" }}>Signed Editions</a>
          </div>

          {/* Community */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <h4 style={{ color: "#C5A059", fontFamily: "Cinzel", marginBottom: "10px" }}>Community</h4>
            <a href="#newsletter" style={{ color: "#e0e0e0", textDecoration: "none" }}>Join the Newsletter</a>
            <a href="#" style={{ color: "#e0e0e0", textDecoration: "none" }}>Facebook Group</a>
            <a href="#" style={{ color: "#e0e0e0", textDecoration: "none" }}>Discord</a>
            <a href="#" style={{ color: "#e0e0e0", textDecoration: "none" }}>Reddit</a>
            <a href="#" style={{ color: "#e0e0e0", textDecoration: "none" }}>Royal Road</a>
          </div>

        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid #111", paddingTop: "30px", textAlign: "center", color: "#475569", fontSize: "0.85rem" }}>
          <p>Copyright 2025 B. Salem. All rights reserved. The Elder Lands is a trademark of B. Salem LLC.</p>
          <p style={{ marginTop: "10px" }}>
            <a href="#" style={{ color: "#8a9bb5", textDecoration: "none", marginRight: "20px" }}>Privacy Policy</a>
            <a href="#" style={{ color: "#8a9bb5", textDecoration: "none", marginRight: "20px" }}>Terms of Service</a>
            <a href="#" style={{ color: "#8a9bb5", textDecoration: "none" }}>Contact B. Salem</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

const ThemesAndQuotes = () => {
  return (
    <section style={{ padding: "100px 0", background: "#050505" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "50px" }}>
          <div>
            <h2 style={{ fontSize: "2rem", color: "#C5A059", marginBottom: "40px", fontFamily: "Cinzel" }}>Key Themes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              {THEMES.map((theme, idx) => (
                <div key={idx}>
                  <h4 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "10px" }}>{theme.title}</h4>
                  <p style={{ color: "#8a9bb5", fontSize: "0.95rem", lineHeight: 1.6 }}>{theme.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: "2rem", color: "#C5A059", marginBottom: "40px", fontFamily: "Cinzel" }}>Iconic Quotes</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              {QUOTES.map((quote, idx) => (
                <div key={idx} style={{ paddingLeft: "20px", borderLeft: "2px solid #C5A059" }}>
                  <p style={{ color: "#fff", fontSize: "1.1rem", fontStyle: "italic", marginBottom: "10px" }}>"{quote.text}"</p>
                  <p style={{ color: "#64748b", fontSize: "0.85rem" }}>— {quote.attr}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: "2rem", color: "#C5A059", marginBottom: "40px", fontFamily: "Cinzel" }}>For Fans Of...</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { title: "Cradle", why: "Mentor-apprentice tension rivals Cradle's best arcs. God Orbs create genuine scarcity." },
                { title: "Wandering Inn", why: "Road yields, refugee labor, trade economics. Every resource decision has consequences." },
                { title: "HWFWM", why: "God Orbs, Skill slots, Vital Orb tiers—crunchy! Action serves character." }
              ].map((fan, idx) => (
                <div key={idx} style={{ background: "#0f1420", padding: "20px", borderRadius: "4px", border: "1px solid #1e283d" }}>
                  <h4 style={{ color: "#C5A059", marginBottom: "5px" }}>If you loved {fan.title}</h4>
                  <p style={{ color: "#8a9bb5", fontSize: "0.85rem" }}>{fan.why}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section style={{ padding: "100px 0", background: "#080a0f" }}>
      <div className="container">
        <div className="section-heading">
          <h2>Frequently Asked Questions</h2>
          <span className="decoration"></span>
        </div>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {FAQS.map((faq, idx) => (
            <div key={idx} style={{ marginBottom: "15px", border: "1px solid #1e283d", borderRadius: "4px", overflow: "hidden" }}>
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                style={{ width: "100%", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0f1420", border: "none", color: "#fff", cursor: "pointer", textAlign: "left", fontSize: "1.1rem", fontWeight: "bold" }}
              >
                {faq.q}
                {openIdx === idx ? <ChevronLeft style={{ transform: "rotate(90deg)" }} /> : <ChevronRight style={{ transform: "rotate(90deg)" }} />}
              </button>
              {openIdx === idx && (
                <div style={{ padding: "20px", background: "#050505", color: "#8a9bb5", lineHeight: 1.6 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <>
      <style>{styles}</style>
      <PromoBanner />
      <Navbar />
      <Hero />
      <BeginAdventure />
      <StorySummary />
      <TestimonialsSection />
      <BookShowcase />
      <ThemesAndQuotes />
      <LoreSection />
      <NewsSection />
      <FAQSection />
      <Footer />
    </>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
