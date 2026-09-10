import "./digestivesystem.css";

const DigestiveSystem = () => {
  return (
    <section className="dig-section">

      {/* ALIMENTARY CANAL */}
      <div className="leech-section-box">
        <h3 className="leech-section-title">Alimentary Canal</h3>
        <p className="leech-section-text">
          The alimentary canal is a <strong>complete, straight tube</strong> running from the mouth to the anus.
          It is highly specialized for blood storage and slow digestion — a key adaptation to the sanguivorous (blood-feeding) lifestyle.
        </p>

        <div className="leech-grid-2">
          {/* FLOW STEPS */}
          <div className="dig-flow-column">
            {[
              { num: '1', label: 'Mouth & Buccal Cavity', text: 'Triradiate (Y-shaped) aperture containing three muscular jaws, each bearing around 60–100 minute teeth. Located within segments 1–5.', badge: 'Entry' },
              { num: '2', label: 'Pharynx', text: 'A muscular pumping chamber surrounded by unicellular salivary glands. Secretes hirudin — an anticoagulant that keeps the host\'s blood fluid during feeding.', badge: 'Pumping' },
              { num: '3', label: 'Oesophagus', text: 'A short, narrow tube connecting the pharynx to the crop. Acts as a passage for blood to enter the storage chamber.', badge: 'Transit' },
              { num: '4', label: 'Crop (Largest Part)', text: 'Divided into 10 chambers, each with a pair of lateral caeca (diverticula). Stores enormous quantities of blood — up to 5× the leech\'s body weight.', badge: 'Storage' },
              { num: '5', label: 'Stomach & Intestine', text: 'The stomach is a small, tubular chamber where actual digestion begins. The narrow intestine absorbs the digested nutrients slowly over weeks.', badge: 'Digestion' },
              { num: '6', label: 'Rectum & Anus', text: 'The rectum stores undigested residue. Waste is egested through the mid-dorsal anus located on the 26th segment.', badge: 'Egestion' }
            ].map((step, i) => (
              <div key={i} className="dig-flow-step">
                <div className="dig-step-number">{step.num}</div>
                <div className="dig-step-content">
                  <div className="dig-step-header">
                    <strong className="dig-step-label">{step.label}</strong>
                    <span className="dig-step-badge">{step.badge}</span>
                  </div>
                  <p className="dig-step-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* IMAGE & QUICK FACTS */}
          <div className="dig-right-col">
            <div className="dig-image-frame">
              <img
                src="https://res.cloudinary.com/duibfmcw1/image/upload/v1767810737/digestivesystem_osipqw.png"
                alt="Digestive System of Leech"
                className="dig-img"
              />
              <p className="dig-img-caption">Detailed Alimentary Anatomy</p>
            </div>

            <div className="dig-facts-card">
              <h4 className="leech-section-title" style={{ fontSize: '1rem' }}>Sanguivorous Adaptations</h4>
              <ul className="leech-section-list">
                <li><strong>Hirudin:</strong> Powerful anticoagulant that keeps blood liquid during and after feeding. Used in modern medicine for microsurgery.</li>
                <li><strong>Blood storage:</strong> The crop can hold blood equal to <strong>5× the body weight</strong>, allowing the leech to feed just once every few months.</li>
                <li><strong>Slow digestion:</strong> A single full blood meal can take up to <strong>6–18 months</strong> to fully digest, extracting maximum nutrition.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FEEDING MECHANISM */}
      <div className="leech-section-box">
        <h3 className="leech-section-title">Feeding Mechanism — Step by Step</h3>
        <p className="leech-section-text">
          The feeding process is a remarkable sequence of attachment, incision, and suction:
        </p>
        <div className="dig-mechanism-grid">
          {[
            { icon: '🩸', title: 'Attachment', text: 'Locates host using chemoreceptors. Attaches firmly with posterior sucker, then positions anterior sucker on skin.' },
            { icon: '🦷', title: 'Incision', text: 'Three jaws create a Y-shaped wound. The bite is painless due to an anaesthetic in the saliva.' },
            { icon: '💉', title: 'Suction & Injection', text: 'Muscular pharynx creates powerful suction. Simultaneously injects hirudin + vasodilator to increase blood flow.' },
            { icon: '📦', title: 'Storage & Detach', text: 'Blood fills the 10-chambered crop until engorged. Leech then detaches and digests slowly over months.' }
          ].map((item, i) => (
            <div key={i} className="dig-mechanism-card">
              <div className="dig-mech-icon">{item.icon}</div>
              <div className="dig-mech-step-num">{i + 1}</div>
              <strong className="dig-mech-title">{item.title}</strong>
              <p className="dig-mech-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MEDICAL SIGNIFICANCE */}
      <div className="leech-callout leech-callout-fact">
        <strong>🏥 Medical Significance</strong>
        Leech therapy (hirudotherapy) has been used for over 2,500 years. Today, medicinal leeches
        (<em>Hirudo medicinalis</em>) are FDA-approved medical devices used after reconstructive surgery
        to relieve venous congestion and promote blood flow in reattached tissues.
      </div>

    </section>
  );
};

export default DigestiveSystem;