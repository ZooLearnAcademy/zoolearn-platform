import "./bodyDivisions.css";

const BodyDivisions = () => {
  const regions = [
    {
      name: "Cephalic region",
      segments: "1–5",
      desc: "bears eyes and mouth"
    },
    {
      name: "Pre-clitellar region",
      segments: "6–8",
      desc: "narrow region before clitellum"
    },
    {
      name: "Clitellar region",
      segments: "9–11",
      desc: "involved in reproduction"
    },
    {
      name: "Middle region",
      segments: "12–22",
      desc: "longest part, contains digestive and reproductive organs"
    },
    {
      name: "Caudal region",
      segments: "23–26",
      desc: "posterior body part"
    },
    {
      name: "Posterior sucker",
      segments: "27–33",
      desc: "used for attachment and movement"
    }
  ];

  return (
    <section className="bd-divisions-section">
      <div className="bd-divisions-container">
        
        {/* HEADER */}
        <div className="bd-divisions-header">
          <h2 className="bd-divisions-title">Divisions of the Body</h2>
          <div className="bd-divisions-underline"></div>
        </div>

        {/* INTRO TEXT */}
        <p className="bd-divisions-intro">
          The body of the leech is divided into six distinct regions, based on function and segmentation:
        </p>
        
        [Image of Hirudinaria granulosa body divisions diagram]

        {/* REGIONS GRID */}
        <div className="bd-divisions-grid">
          {regions.map((region, index) => (
            <div 
              key={index} 
              className="bd-division-card" 
              style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation
            >
              <div className="bd-card-header">
                <span className="bd-segment-badge">Segments {region.segments}</span>
              </div>
              <h3 className="bd-region-name">{region.name}</h3>
              <div className="bd-arrow-divider">↓</div>
              <p className="bd-region-desc">{region.desc}</p>
            </div>
          ))}
        </div>

        {/* FOOTER TEXT */}
        <div className="bd-divisions-footer-box">
          <p className="bd-footer-text">
            These regions help in feeding, locomotion, and reproduction.
          </p>
        </div>

      </div>
    </section>
  );
};
 
export default BodyDivisions;




{/* <div className="bw-footer-info">
            <div className="bw-footer-row">
              <span>Specimen</span>
              <span className="bw-footer-val bw-specimen-name">H. medicinalis</span>
            </div>
            <div className="bw-footer-row">
              <span>Magnification</span>
              <span className="bw-footer-val">100x Nominal</span>
            </div>
          </div> */}