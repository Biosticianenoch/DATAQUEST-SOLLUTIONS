import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Github } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>DataQuest Solutions</h2>
            <p className={styles.sectionDescription}>
              Empowering professionals with cutting-edge data science knowledge and skills.
            </p>
            <div className={styles.socialLinks}>
              <a 
                href="https://facebook.com/datasciencehub" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                title="Follow us on Facebook"
              >
                <Facebook className={styles.socialIcon} />
                <span className={styles.screenReaderText}>Facebook</span>
              </a>
              <a 
                href="https://twitter.com/datasciencehub" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                title="Follow us on Twitter"
              >
                <Twitter className={styles.socialIcon} />
                <span className={styles.screenReaderText}>Twitter</span>
              </a>
              <a 
                href="https://instagram.com/datasciencehub" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                title="Follow us on Instagram"
              >
                <Instagram className={styles.socialIcon} />
                <span className={styles.screenReaderText}>Instagram</span>
              </a>
              <a 
                href="https://linkedin.com/company/datasciencehub" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                title="Follow us on LinkedIn"
              >
                <Linkedin className={styles.socialIcon} />
                <span className={styles.screenReaderText}>LinkedIn</span>
              </a>
              <a 
                href="https://youtube.com/datasciencehub" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialLink}
                title="Subscribe to our YouTube channel"
              >
                <Youtube className={styles.socialIcon} />
                <span className={styles.screenReaderText}>YouTube</span>
              </a>
              <a
                href="https://github.com/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                title="Visit our GitHub repository"
              >
                <Github className={styles.socialIcon} />
                <span className={styles.screenReaderText}>GitHub</span>
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Quick Links</h2>
            <nav className={styles.links}>
              <Link to="/" className={styles.link}>Home</Link>
              <Link to="/courses" className={styles.link}>Courses</Link>
              <Link to="/services" className={styles.link}>Services</Link>
              <Link to="/blog" className={styles.link}>Blog</Link>
              <Link to="/about" className={styles.link}>About Us</Link>
            </nav>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Resources</h2>
            <nav className={styles.links}>
              <Link to="/resources/tutorials" className={styles.link}>Free Tutorials</Link>
              <Link to="/resources/webinars" className={styles.link}>Webinars</Link>
              <Link to="/resources/ebooks" className={styles.link}>E-books</Link>
              <Link to="/resources/case-studies" className={styles.link}>Case Studies</Link>
              <Link to="/resources/faq" className={styles.link}>FAQ</Link>
            </nav>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Us</h2>
            <address className={styles.address}>
              <p>1234 Data Avenue</p>
              <p>Analytics City, AC 98765</p>
              <p className="mt-4 flex items-center">
                <Mail className="h-4 w-4 mr-2" /> contact@datasciencehub.com
              </p>
            </address>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} DataQuest Solutions. All rights reserved.</p>
          <nav className={styles.legalLinks}>
            <Link to="/legal/privacy" className={styles.legalLink}>Privacy Policy</Link>
            <Link to="/legal/terms" className={styles.legalLink}>Terms of Service</Link>
            <Link to="/legal/cookies" className={styles.legalLink}>Cookie Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
