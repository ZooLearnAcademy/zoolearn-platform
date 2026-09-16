import "./revision.css";

const Revision = () => {
  return (
    <section className="rev-revision-section">
      <div className="rev-revision-container">
        
        {/* HEADER */}
        {/* <div className="revision-header">
          <h2 className="section-title">Overall Revision & Facts</h2>
          <div className="title-underline"></div>
          <p className="revision-subtitle">A quick summary of the Indian Cattle Leech</p>
        </div> */}

        {/* REVISION GRID (System Summaries) */}
        <div className="rev-revision-grid">
          
          {/* 1. IDENTITY */}
          {/* <div className="rev-card identity-card">
            <div className="rev-icon">🆔</div>
            <h3 className="rev-title">Scientific Identity</h3>
            <ul className="rev-list">
              <li><strong>Name:</strong> <i>Hirudinaria granulosa</i></li>
              <li><strong>Phylum:</strong> Annelida</li>
              <li><strong>Habit:</strong> Sanguivorous (Blood-feeding)</li>
              <li><strong>Habitat:</strong> Freshwater (ponds, swamps)</li>
            </ul>
          </div> */}

          {/* 2. MORPHOLOGY */}
          {/* <div className="rev-card">
            <div className="rev-icon">🐛</div>
            <h3 className="rev-title">Morphology</h3>
            <ul className="rev-list">
              <li><strong>Body:</strong> Soft, vermiform, 33 segments</li>
              <li><strong>Suckers:</strong> Anterior (Feeding) & Posterior (Attachment)</li>
              <li><strong>Length:</strong> Up to 35 cm</li>
            </ul>
          </div> */}

          {/* 3. PHYSIOLOGY (Respiration & Circulation) */}
          {/* <div className="rev-card">
            <div className="rev-icon">🫁</div>
            <h3 className="rev-title">Respiration & Circulation</h3>
            <ul className="rev-list">
              <li><strong>Respiration:</strong> Cutaneous (Skin)</li>
              <li><strong>Circulation:</strong> Haemocoelic system (No true blood vessels)</li>
              <li><strong>Fluid:</strong> Haemocoelomic fluid with Haemoglobin</li>
            </ul>
          </div> */}

          {/* 4. DIGESTION & EXCRETION */}
          {/* <div className="rev-card">
            <div className="rev-icon">🥣</div>
            <h3 className="rev-title">Digestion & Excretion</h3>
            <ul className="rev-list">
              <li><strong>Crop:</strong> Largest part (stores blood)</li>
              <li><strong>Anticoagulant:</strong> Hirudin (prevents clotting)</li>
              <li><strong>Excretion:</strong> 17 pairs of Nephridia</li>
            </ul>
          </div> */}

          {/* 5. LOCOMOTION & NERVOUS */}
          {/* <div className="rev-card">
            <div className="rev-icon">🧠</div>
            <h3 className="rev-title">Control & Movement</h3>
            <ul className="rev-list">
              <li><strong>Movement:</strong> Looping (land) & Swimming (water)</li>
              <li><strong>Brain:</strong> Suprapharyngeal ganglion</li>
              <li><strong>Nerve Cord:</strong> Ventral, with 21 ganglia</li>
            </ul>
          </div> */}

          {/* 6. REPRODUCTION */}
          {/* <div className="rev-card">
            <div className="rev-icon">💞</div>
            <h3 className="rev-title">Reproduction</h3>
            <ul className="rev-list">
              <li><strong>Nature:</strong> Hermaphrodite (Bisexual)</li>
              <li><strong>Male:</strong> 11 pairs of testes</li>
              <li><strong>Female:</strong> 1 pair of ovaries</li>
            </ul>
          </div> */}

        </div>

        {/* GENERAL FACTS BANNER */}
        <div className="rev-general-facts-container">
          <h3 className="rev-facts-header">💡 General Facts to Remember</h3>
          <div className="rev-facts-items">
            <div className="rev-fact-pill">No Ear (Sense vibrations by skin)</div>
            <div className="rev-fact-pill">5 pairs of Eyes</div>
            <div className="rev-fact-pill">Y-shaped Painless Bite</div>
            <div className="rev-fact-pill">Can store food for 1+ year</div>
            <div className="rev-fact-pill">Sucks 5x body weight in blood</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Revision;