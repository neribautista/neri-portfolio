export default function EducationBanner({ data }) {
  return (
    <div
      className="edu-banner"
      style={{
        background: `linear-gradient(135deg, ${data.accentColor}18, ${data.cardBg})`,
        border: `1px solid ${data.accentColor}30`,
      }}
    >
      <div>
        <div className="edu-banner__label" style={{ color: data.accentColor }}>
          EDUCATION
        </div>
        <div className="edu-banner__degree" style={{ color: data.textColor }}>
          {data.education.degree}
        </div>
        <div className="edu-banner__school" style={{ color: data.subtleColor }}>
          {data.education.school} · {data.education.grad}
          {data.education.gpa !== "—" && (
            <span className="edu-banner__gpa" style={{ color: data.accentColor }}>
              GPA: {data.education.gpa}
            </span>
          )}
        </div>
      </div>

      <div
        className="edu-banner__next"
        style={{
          background: `${data.accentColor}15`,
          border: `1px solid ${data.accentColor}30`,
          color: data.subtleColor,
        }}
      >
        <span style={{ fontWeight: 700, color: data.textColor }}>Next: </span>
        {data.education.next}
      </div>
    </div>
  );
}
