import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.infoSection}>
          <p>&copy; 2024 Matiz Vision. Todos los derechos reservados.</p>
          <p>
            Contacto: <a href="mailto:info@matizvision.com" style={styles.link}>info@matizvision.com</a>
          </p>
        </div>
        <div style={styles.socialSection}>
          <p>Síguenos:</p>
          <div style={styles.icons}>
            <a href="https://facebook.com" style={styles.icon} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} style={styles.iconImage} />
            </a>
            <a href="https://twitter.com" style={styles.icon} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} style={styles.iconImage} />
            </a>
            <a href="https://instagram.com" style={styles.icon} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} style={styles.iconImage} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  infoSection: {
    flex: 1,
    minWidth: '200px',
    textAlign: 'left',
    padding: '10px',
  },
  socialSection: {
    flex: 1,
    minWidth: '200px',
    textAlign: 'right',
    padding: '10px',
  },
  icons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '5px',
  },
  icon: {
    color: '#00ffff',
    fontSize: '20px',
    transition: 'color 0.3s ease',
    textDecoration: 'none',
  },
  iconImage: {
    fontSize: '24px',
    color: '#fff',
  },
  link: {
    color: '#00ffff',
    textDecoration: 'none',
  },
};

export default Footer;