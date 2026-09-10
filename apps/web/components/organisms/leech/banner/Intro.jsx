import "./Intro.css";

const LeechIntro = () => {
  return (
    <section className="intro-hero">
      {/* Background glows */}
      <div className="intro-hero-bg intro-hero-bg-green"></div>
      <div className="intro-hero-bg intro-hero-bg-blue"></div>

      <div className="intro-hero-container">
        {/* LEFT CONTENT */}
        {/* This div takes up 58% of width, fixing the "side space" gap */}
        <div className="intro-hero-content">
          <span className="intro-hero-tag">Phylum Annelida</span>

          <h1 className="intro-hero-title">
            Indian Cattle <br /> Leech
          </h1>

          <p className="intro-hero-text">
            The Indian cattle leech is commonly found in India, Bangladesh, Pakistan, Myanmar, and Sri Lanka.
          </p>

          <p className="intro-hero-text">
            It lives in <strong>freshwater habitats</strong> such as ponds, lakes, swamps, and slow-moving streams.
          </p>

          <p className="intro-hero-text">
            This leech is <strong>ectoparasitic</strong>, meaning it lives on the outside of its host and feeds on blood.
          </p>

          <p className="intro-hero-text">
            It sucks blood from fishes, frogs, cattle, and sometimes humans, and therefore it is described as
            <strong> sanguivorous</strong> (blood-feeding).
          </p>

          <div className="intro-hero-buttons">
            <button className="intro-btn-main">Start Learning</button>
            <button className="intro-btn-alt">View Syllabus</button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="intro-hero-image">
          <img
            src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810091/image_yibxxk.jpg"
            alt="Indian Cattle Leech"
          />
        </div>
      </div>
    </section>
  );
};

export default LeechIntro;