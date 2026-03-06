import { useState } from "react";

export default function ProfileSelector({ onSelect }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => onSelect(), 800);
  };

  return (
    <div className={`profile-selector ${clicked ? "profile-selector--exiting" : ""}`}>
      <div className="profile-selector__bg" />

      <div className="profile-selector__logo">NB</div>

      <div className="profile-selector__content">
        <h1 className="profile-selector__heading">Do you want to see my portfolio?</h1>

        <button
          className={`profile-selector__card ${hovered ? "profile-selector__card--hovered" : ""}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleClick}
        >
          <div className="profile-selector__avatar-wrapper">
            <img
              src="/profile.png"
              alt="Nerissa Bautista"
              className="profile-selector__avatar"
            />
            <div className="profile-selector__avatar-border" />
          </div>
          <span className={`profile-selector__name ${hovered ? "profile-selector__name--hovered" : ""}`}>
            Nerissa
          </span>
        </button>

        <div className="profile-selector__footer">
          <p>Recruiter? Hiring Manager? Curious dev? — Pick a profile to continue.</p>
          <p>Oh it's just me? Then just click the card </p>
        </div>
      </div>
    </div>
  );
}
