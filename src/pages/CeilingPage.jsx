import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm.jsx";
import "./CeilingPage.css";

const services = [
  {
    img: "/Interiors/Falseceiling.jpg",
    alt: "False Ceiling",
    label: "False Ceiling",
    text: "Transform your living spaces with our high-quality false ceiling installations. We provide modern and elegant designs...",
  },
  {
    img: "/Interiors/wardrobe1.jpg",
    alt: "Wardrobes",
    label: "Wardrobes",
    text: "Maximize your storage with our custom wardrobe solutions. We specialize in designing wardrobes that...",
  },
  {
    img: "/Interiors/painting.jpg",
    alt: "Painting",
    label: "Painting",
    text: "Revitalize your home with a fresh coat of paint. Our services include both interior and exterior works...",
  },
  {
    img: "/Interiors/tilesfixing.jpg",
    alt: "Tiles Fixing",
    label: "Tiles Fixing",
    text: "Upgrade your floors and walls with our expert tile fixing services. We work with various materials...",
  },
  {
    img: "/Interiors/plumbing.jpeg",
    alt: "Plumbing",
    label: "Plumbing",
    text: "Trust us to handle all your plumbing needs, from fixing leaks to installing new pipes...",
  },
  {
    img: "/Interiors/electrical.jpeg",
    alt: "Electrical",
    label: "Electrical",
    text: "Ensure your home's electrical systems are safe and efficient with our comprehensive services...",
  },
  {
    img: "/Interiors/kitchencupboards.jpg",
    alt: "Kitchen Cupboards",
    label: "Kitchen Cupboards",
    text: "Enhance your kitchen's functionality with our custom kitchen cupboards that combine form and function...",
  },
];

const galleryBlock1 = [
  {
    src: "/img/A.jpeg",
    title: "Interior 1",
    text: "Discover the elegant design of Interior 1, where modern aesthetics meet functional comfort. The space is crafted to provide an inviting atmosphere, perfect for gatherings or quiet moments of reflection. With meticulous attention to detail, each corner tells a story of style and comfort.",
  },
  {
    src: "/img/B.jpeg",
    title: "Interior 2",
    text: "Step into Interior 2, a harmonious blend of contemporary design and timeless charm. This space is ideal for those who appreciate a balance between sophistication and warmth. Every element is thoughtfully chosen to create a relaxing yet stylish environment for you and your loved ones.",
  },
  {
    src: "/img/C.jpeg",
    title: "Interior 3",
    text: "Experience the unique ambiance of Interior 3, designed to evoke tranquility and inspiration. The thoughtful layout and selection of colors create a serene retreat, making it the perfect place to unwind after a long day. Here, beauty and comfort coexist effortlessly.",
  },
];

const galleryBlock2 = [
  {
    src: "/img/J1.jpeg",
    title: "Interior 1",
    text: "Explore the inviting atmosphere of this space, where comfort meets style. Interior 1 is designed with versatility in mind, making it suitable for both intimate gatherings and lively celebrations. Every design choice reflects a commitment to quality and aesthetic appeal.",
  },
  {
    src: "/img/I.jpeg",
    title: "Interior 2",
    text: "Interior 2 showcases innovative design elements that inspire creativity and relaxation. With its thoughtfully arranged furnishings and soothing color palette, this space serves as a perfect backdrop for cherished memories and moments of tranquility.",
  },
  {
    src: "/img/H.jpeg",
    title: "Interior 3",
    text: "Experience the elegance of Interior 3, where every detail is curated to enhance your living experience. This space combines luxury with practicality, offering a stylish environment that encourages both social interaction and personal reflection.",
  },
  {
    src: "/img/F.jpeg",
    title: "Interior 4",
    text: "Step into Interior 4, a space that reflects contemporary sophistication and timeless design. This beautifully arranged environment promotes comfort and style, making it the perfect place to gather with friends or relax in solitude.",
  },
];

export default function CeilingPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [wideLayout, setWideLayout] = useState(
    () => typeof window !== "undefined" && window.innerWidth > 767
  );
  const menuButtonRef = useRef(null);
  const sideMenuRef = useRef(null);

  useEffect(() => {
    const mq = () => setWideLayout(window.innerWidth > 767);
    window.addEventListener("resize", mq);
    mq();
    return () => window.removeEventListener("resize", mq);
  }, []);

  const openContactModal = useCallback(() => {
    setContactModalOpen(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onDocClick = (event) => {
      const side = sideMenuRef.current;
      const btn = menuButtonRef.current;
      if (!side || !btn) return;
      if (window.innerWidth <= 767) return;
      if (!side.contains(event.target) && !btn.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const toggleMenu = () => {
    if (window.innerWidth > 767) {
      setMenuOpen((o) => !o);
    }
  };

  const closeMenuOnNav = () => {
    if (window.innerWidth > 767) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="ceiling-page">
      <section id="HomePageSection">
        <img
          id="movingImage"
          src="/Interiors/background2.gif"
          alt="Moving background"
        />
        <div id="overlay" />
        <header className="hero-topbar">
          <div className="hero-topbar__start">
            <button
              type="button"
              id="menuButton"
              ref={menuButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu();
              }}
            >
              &#9776;
            </button>
            <Link id="shopButton" to="/shop">
              <i className="fas fa-shopping-cart" /> Shop
            </Link>
          </div>
          <div className="hero-topbar__end">
            <button
              type="button"
              id="getInTouchButton"
              onClick={openContactModal}
            >
              Get in Touch
            </button>
          </div>
        </header>
        <img id="logoImage" src="/img/logo.png" alt="Logo" />
        <nav
          id="sideMenu"
          className="side-menu"
          ref={sideMenuRef}
          aria-label="Primary"
          style={
            wideLayout
              ? { left: menuOpen ? "0px" : "var(--side-menu-off)" }
              : undefined
          }
        >
          <div className="side-menu__header">
            <span className="side-menu__brand">Homis</span>
            <span className="side-menu__eyebrow">Interiors</span>
          </div>
          <div className="side-menu__links">
            <a
              href="#HomePageSection"
              className="menuOption"
              onClick={closeMenuOnNav}
            >
              <span className="menuOption__icon" aria-hidden>
                <i className="fas fa-home" />
              </span>
              <span className="menuOption__text">
                <span className="menuOption__label">Home</span>
                <span className="menuOption__hint">Hero</span>
              </span>
              <span className="menuOption__chev" aria-hidden>
                <i className="fas fa-arrow-right" />
              </span>
            </a>
            <a
              href="#aboutUsSection"
              className="menuOption"
              onClick={closeMenuOnNav}
            >
              <span className="menuOption__icon" aria-hidden>
                <i className="fas fa-heart" />
              </span>
              <span className="menuOption__text">
                <span className="menuOption__label">About</span>
                <span className="menuOption__hint">Our story</span>
              </span>
              <span className="menuOption__chev" aria-hidden>
                <i className="fas fa-arrow-right" />
              </span>
            </a>
            <a
              href="#services"
              className="menuOption"
              onClick={closeMenuOnNav}
            >
              <span className="menuOption__icon" aria-hidden>
                <i className="fas fa-palette" />
              </span>
              <span className="menuOption__text">
                <span className="menuOption__label">Services</span>
                <span className="menuOption__hint">What we do</span>
              </span>
              <span className="menuOption__chev" aria-hidden>
                <i className="fas fa-arrow-right" />
              </span>
            </a>
            <a href="#Gallery" className="menuOption" onClick={closeMenuOnNav}>
              <span className="menuOption__icon" aria-hidden>
                <i className="fas fa-images" />
              </span>
              <span className="menuOption__text">
                <span className="menuOption__label">Gallery</span>
                <span className="menuOption__hint">Our work</span>
              </span>
              <span className="menuOption__chev" aria-hidden>
                <i className="fas fa-arrow-right" />
              </span>
            </a>
          </div>
        </nav>
        <div id="homeParagraph">
          <h1>Let&apos;s Create Something Beautiful Together</h1>
          <p>
            We are a creative interior design studio dedicated to transforming
            your space into a stunning reflection of your personality.
          </p>
        </div>
        <div id="socialMedia">
          <a
            href="https://wa.me/+916303321139"
            className="socialMediaIcon"
            title="WhatsApp"
          >
            <i className="fab fa-whatsapp" />
          </a>
          <a
            href="https://www.instagram.com/homis_interiors?igsh=OG5rch3bWFuMHZi"
            className="socialMediaIcon"
            title="Instagram"
          >
            <i className="fab fa-instagram" />
          </a>
          <a
            href="mailto:homisinteriors@gmail.com"
            className="socialMediaIcon"
            title="Email"
          >
            <i className="fas fa-envelope" />
          </a>
        </div>
      </section>

      <section id="aboutUsSection">
        <h2>About Us</h2>
        <div className="aboutContent">
          <h4>Our Mission</h4>
          <p>
            At Homis Interiors, our mission is to design spaces that are not only
            aesthetically pleasing but also functional and sustainable. With a
            keen eye for detail and a passion for innovation, we strive to
            exceed our clients&apos; expectations in every project we undertake.
          </p>
        </div>
      </section>

      <section id="services">
        <div className="section-heading-wrap">
          <div className="heading">Our Services</div>
        </div>
        <div className="card-container">
          {services.map((s) => (
            <div key={s.label} className="card">
              <div className="card-inner">
                <div className="card-front">
                  <img src={s.img} alt={s.alt} />
                  <div className="label">{s.label}</div>
                </div>
                <div className="card-back">
                  <p>{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="Gallery">
        <div className="container">
          <div className="title">
            <h1>OUR WORKS</h1>
          </div>
          <div className="title">
            <h1>WE PRESENT YOU</h1>
          </div>
          <div className="small-images">
            {galleryBlock1.map((g) => (
              <div key={g.src} className="small-image">
                <img src={g.src} alt={g.title} />
                <h2>{g.title}</h2>
                <p>{g.text}</p>
              </div>
            ))}
          </div>
          <div className="small-images">
            {galleryBlock2.map((g) => (
              <div key={g.src} className="small-image">
                <img src={g.src} alt={g.title} />
                <h2>{g.title}</h2>
                <p>{g.text}</p>
              </div>
            ))}
          </div>
          <div className="title">
            <h1>DEVOTIONAL ॐ</h1>
          </div>
          <div className="main-content">
            <div className="main-image">
              <img src="/img/J.jpeg" alt="Pooja room" />
            </div>
            <div className="main-text">
              <h1>POOJA ROOM</h1>
              <p>
                Place where families come together to find solace, connect with
                their spirituality, and offer devotion. This serene environment
                is designed to foster peace and reflection, making it the heart of
                spiritual gatherings.
              </p>
            </div>
          </div>
          <div className="title">
            <h1>WANNA MEET US ?!</h1>
          </div>
        </div>
      </section>

      <footer id="footer" className="site-footer">
        <div className="site-footer__inner">
          <p className="site-footer__brand">Homis Interiors</p>
          <p className="site-footer__tagline">
            Thoughtful spaces for the way you live.
          </p>
          <a href="mailto:homisinteriors@gmail.com">homisinteriors@gmail.com</a>
          <p className="site-footer__cta-wrap">
            <button
              type="button"
              className="site-footer__cta"
              onClick={() => setContactModalOpen(true)}
            >
              Get in touch
            </button>
          </p>
        </div>
      </footer>

      {contactModalOpen && (
        <div
          className="contact-modal-backdrop"
          role="presentation"
          onClick={() => setContactModalOpen(false)}
        >
          <div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="contact-modal__close"
              onClick={() => setContactModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 id="contact-modal-title" className="contact-modal__title">
              Get in touch
            </h2>
            <p className="contact-modal__subtitle">
              Same form as the shop — we will reply by phone or email.
            </p>
            <ContactForm compact idPrefix="hero-" />
          </div>
        </div>
      )}
    </div>
  );
}
