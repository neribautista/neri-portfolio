import { ORIGIN, PROFILE } from "../data/siteData";
import Icon from "./Icon";

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="about__text">
        <p className="kicker">About the Main Character</p>
        <h2 className="about__name">
          {PROFILE.first} <span className="accent">{PROFILE.last}</span>
        </h2>

        <ul className="chips">
          {PROFILE.roles.map((r) => (
            <li key={r} className="chip chip--outline">{r}</li>
          ))}
        </ul>

        <p className="about__loc">
          <Icon name="pin" size={16} /> {PROFILE.location}
        </p>

        <p className="about__bio">{PROFILE.bio}</p>

        <div className="about__group">
          <h3>Currently exploring</h3>
          <ul className="chips">
            {PROFILE.exploring.map((r) => (
              <li key={r} className="chip">{r}</li>
            ))}
          </ul>
        </div>
        <div className="about__group">
          <h3>Previously</h3>
          <ul className="chips">
            {PROFILE.previously.map((r) => (
              <li key={r} className="chip">{r}</li>
            ))}
          </ul>
        </div>
      </div>

      <figure className="about__photo">
        <img src={PROFILE.photos.portrait} alt="Nerissa Bautista smiling" loading="lazy" />
        <figcaption className="script about__script" aria-hidden="true">
          Good Things
          <br />
          Take Time
          <Icon name="heart" size={22} className="about__heart" />
        </figcaption>
      </figure>

      <div className="origin">
        <h3 className="section__title section__title--sm">Origin Story</h3>
        <ol className="origin__track">
          {ORIGIN.map((o) => (
            <li key={o.year} className="origin__item">
              <span className="origin__dot" />
              <span className="origin__year">{o.year}</span>
              <span className="origin__title">{o.title}</span>
              <span className="origin__body">{o.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
