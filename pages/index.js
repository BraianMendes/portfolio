import Head from "next/head";
import Layout, { siteTitle } from "../components/layout/layout.js";
import styles from "../styles/index.module.css";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      {/* <!-- Introduction --> */}
      <section className={styles.intro} id="home">
        <h1
          className={`${styles.section__title} ${styles.section__title__intro}`}
        >
          Hi, I am <strong>Braian Mendes</strong>
        </h1>
        <p
          className={`${styles.section__subtitle} ${styles.section__subtitle__intro}`}
        >
          full-stack dev
        </p>
        <img
          src="/images/braian-01.jpg"
          alt="a picture of Braian Mendes smiling"
          className={styles.intro__img}
        />
      </section>

      {/* <!-- My services --> */}
      <section className={styles.my_services} id="services">
        <h2
          className={`${styles.section__title} ${styles.section__title__services}`}
        >
          What I do
        </h2>
        <div className={styles.services}>
          <div className={styles.service}>
            <h3>Design + Development</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          {/* <!-- / service --> */}

          <div className={styles.service}>
            <h3>E-Commerce</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          {/* <!-- / service --> */}

          <div className={styles.service}>
            <h3>WordPress</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          {/* <!-- / service --> */}
        </div>
        {/* <!-- / services --> */}

        <a href="#work" className={styles.btn}>
          My Work
        </a>
      </section>

      {/* <!-- About me --> */}
      <section className={styles.about_me} id="about">
        <h2 className={`${styles.div__title} ${styles.section__title__about}`}>
          Who I am
        </h2>
        <p
          className={`${styles.div__subtitle} ${styles.section__subtitle__about}`}
        >
          Designer & developer working remote
        </p>

        <div className={styles.about_me__body}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <img
          src="/images/braian-02.jpg"
          alt="Jane leaning against a bus"
          className={styles.about_me__img}
        />
      </section>

      {/* <!-- My Work --> */}
      <section className={styles.my_work} id="work">
        <h2 className={`${styles.div__title} ${styles.section__title__work}`}>
          My work
        </h2>
        <p
          className={`${styles.div__subtitle} ${styles.section__subtitle__work}`}
        >
          A selection of my range of work
        </p>

        <div className={styles.portfolio}>
          {/* <!-- Portfolio item 01 --> */}
          <a href="portfolio-item.html" className={styles.portfolio__item}>
            <img
              src="/images/portfolio-01.jpg"
              alt=""
              className={styles.portfolio__img}
            />
          </a>

          {/* <!-- Portfolio item 02 --> */}
          <a href="portfolio-item.html" className={styles.portfolio__item}>
            <img
              src="/images/portfolio-02.jpg"
              alt=""
              className={styles.portfolio__img}
            />
          </a>

          {/* <!-- Portfolio item 03 --> */}
          <a href="portfolio-item.html" className={styles.portfolio__item}>
            <img
              src="/images/portfolio-03.jpg"
              alt=""
              className={styles.portfolio__img}
            />
          </a>

          {/* <!-- Portfolio item 04 --> */}
          <a href="portfolio-item.html" className={styles.portfolio__item}>
            <img
              src="/images/portfolio-04.jpg"
              alt=""
              className={styles.portfolio__img}
            />
          </a>

          {/* <!-- Portfolio item 05 --> */}
          <a href="portfolio-item.html" className={styles.portfolio__item}>
            <img
              src="/images/portfolio-05.jpg"
              alt=""
              className={styles.portfolio__img}
            />
          </a>

          {/* <!-- Portfolio item 06 --> */}
          <a href="portfolio-item.html" className={styles.portfolio__item}>
            <img
              src="/images/portfolio-06.jpg"
              alt=""
              className={styles.portfolio__img}
            />
          </a>

          {/* <!-- Portfolio item 07 --> */}
          <a href="portfolio-item.html" className={styles.portfolio__item}>
            <img
              src="/images/portfolio-07.jpg"
              alt=""
              className={styles.portfolio__img}
            />
          </a>

          {/* <!-- Portfolio item 08 --> */}
          <a href="#" className={styles.portfolio__item}>
            <img
              src="/images/portfolio-08.jpg"
              alt=""
              className={styles.portfolio__img}
            />
          </a>

          {/* <!-- Portfolio item 09 --> */}
          <a href="#" className={styles.portfolio__item}>
            <img
              src="/images/portfolio-09.jpg"
              alt=""
              className={styles.portfolio__img}
            />
          </a>

          {/* <!-- Portfolio item 0 0--> */}
          <a href="#" className={styles.portfolio__item}>
            <img
              src="/images/portfolio-10.jpg"
              alt=""
              className={styles.portfolio__img}
            />
          </a>
        </div>
      </section>

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
    </Layout>
  );
}

<style jsx>{``}</style>;
