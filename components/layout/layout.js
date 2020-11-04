import React from "react";
import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";

const name = "Braian";
export const siteTitle = "Braian.dev";

export default function Layout({ children, home }) {
  React.useEffect(() => {
    const navToggle = document.querySelector(".nav_toggle");
    const navLinks = document.querySelectorAll(".nav__link");

    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav_open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav_open");
      });
    });
  });

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
        />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Braian.dev</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"
          integrity="sha256-46qynGAkLSFpVbEBog43gvNhfrOj+BmwXdxFgVK/Kvc="
          crossorigin="anonymous"
        />

        {/* <!-- Update these with your own fonts --> */}
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400,900|Source+Sans+Pro:300,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <div className={styles.logo}>
              <img src="/images/devjane.png" alt="" />
            </div>
            <button
              className={`${styles.nav_toggle} nav_toggle`}
              aria-label="toggle navigation"
            >
              <span className={styles.hamburger}></span>
            </button>
            <nav class="nav" className={styles.nav}>
              <ul class="nav__list" className={styles.nav__list}>
                <li class="nav__item" className={styles.nav__item}>
                  <a href="#home" className={`${styles.nav__link} .nav__link`}>
                    Home
                  </a>
                </li>
                <li class="nav__item" className={styles.nav__item}>
                  <a href="#services" className={styles.nav__link}>
                    My Services
                  </a>
                </li>
                <li class="nav__item" className={styles.nav__item}>
                  <a href="#about" className={styles.nav__link}>
                    About me
                  </a>
                </li>
                <li class="nav__item" className={styles.nav__item}>
                  <a href="#work" className={styles.nav__link}>
                    My Work
                  </a>
                </li>
              </ul>
            </nav>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {/* <!-- Footer --> */}
      <footer className={styles.footer}>
        {/* <!-- replace with your own email address --> */}
        <a
          href="mailto:00.braian.dev@gmail.com"
          className={styles.footer__link}
        >
          00.braian.dev@gmail.com
        </a>
        <ul className={styles.social_list}>
          <li className={styles.social_list__item}>
            <a className={styles.social_list__link} href="https://codepen.io">
              <i class="fab fa-codepen"></i>
            </a>
          </li>
          <li className={styles.social_list__item}>
            <a className={styles.social_list__link} href="http://dribbble.com">
              <i class="fab fa-dribbble"></i>
            </a>
          </li>
          <li className={styles.social_list__item}>
            <a className={styles.social_list__link} href="https://twitter.com">
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li className={styles.social_list__item}>
            <a className={styles.social_list__link} href="https://github.com">
              <i class="fab fa-github"></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
