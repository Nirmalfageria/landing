'use client'
import React, { useState } from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'

export default function Navbar() {
  const [selected, setSelected] = useState('#Home'); // State to track the selected nav item

  // Function to handle selecting a nav item
  const handleSelect = (href) => {
    setSelected(href); // Update selected state
  };

  return (
    <div className={styles.main}>
      <div className={styles.navbar}>
        <Link
          href="/"
          className={`${styles.navItem} ${selected === '#Home' ? styles.selected : ''}`}
          onClick={() => handleSelect('#Home')}
        >
          Home
        </Link>
        <Link
          href="/"
          className={`${styles.navItem} ${selected === '#Workshop' ? styles.selected : ''}`}
          onClick={() => handleSelect('#Workshop')}
        >
          Workshop
        </Link>
        <Link
          href="#Lecture"
          className={`${styles.navItem} ${selected === '#Lecture' ? styles.selected : ''}`}
          onClick={() => handleSelect('#Lecture')}
        >
          Lecture
        </Link>
        <Link
          href="#Contact"
          className={`${styles.navItem} ${selected === '#Contact' ? styles.selected : ''}`}
          onClick={() => handleSelect('#Contact')}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
