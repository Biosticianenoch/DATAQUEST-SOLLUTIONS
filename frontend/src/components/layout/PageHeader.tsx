import React from "react";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  backgroundImage = "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?q=80&w=2670&auto=format&fit=crop"
}) => {
  return (
    <div className={styles.header}>
      <div className={`${styles.headerBackground} ${styles.headerBackgroundWithImage}`} />
      <div className={styles.headerContent}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && (
          <p className={styles.subtitle}>{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
