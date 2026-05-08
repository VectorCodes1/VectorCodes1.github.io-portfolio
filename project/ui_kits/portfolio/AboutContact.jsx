// AboutContact.jsx — About and Contact pages

const About = ({ onNavigate }) => (
  <div style={acStyles.page}>
    <StickyNav title="about" onBack={() => onNavigate('home')} />
    <div style={acStyles.container}>
      <div style={acStyles.titleBlock}>
        <span style={acStyles.sectionNum}>§04</span>
        <h1 style={acStyles.h1}>About</h1>
      </div>

      <div style={acStyles.profileRow}>
        <img src="../../assets/profileimage1.png" alt="Matias Guillen" style={acStyles.profileImg} />
        <div>
          <p style={acStyles.body}>
            Most of us grew up idolizing a hero who could make the impossible seem like a simple weekend project.
            Back in kindergarten, I started with a cardboard box and a dream much larger than the materials I had on hand.
            I first developed an engineering mindset when I built a cardboard "Iron Man" suit and an arc reactor out of a flashlight.
          </p>
          <p style={{...acStyles.body, marginTop: 20}}>
            Since high school I have become more reflective — older and wiser, but still letting my younger self take control
            once in a while. My time with IEEE UCF introduced me to a world that challenged and defined my leadership.
            As President, I see the organization as a vital bridge between the classroom and hands-on activity.
          </p>
        </div>
      </div>

      <dl style={acStyles.specBlock}>
        <dt style={acStyles.specKey}>Degree</dt><dd style={acStyles.specVal}>B.S. Electrical Engineering, UCF (2023 – 2027)</dd>
        <dt style={acStyles.specKey}>Specialization</dt><dd style={acStyles.specVal}>RF & Electronics, Power Electronics</dd>
        <dt style={acStyles.specKey}>Tools</dt><dd style={acStyles.specVal}>KiCad, LTSpice, MATLAB, SolidWorks, C</dd>
        <dt style={acStyles.specKey}>Certifications</dt><dd style={acStyles.specVal}>CSWA (SolidWorks), CPT 4.0, Autodesk Inventor</dd>
      </dl>

      <p style={acStyles.body}>
        Outside of engineering: I maintain a healthy lifestyle by exercising regularly and enjoying golf with my father.
        I'm an active foodie who cooks regularly. I still believe the best way to understand a circuit is to build it.
      </p>
    </div>
  </div>
);

const Contact = ({ onNavigate }) => (
  <div style={acStyles.page}>
    <StickyNav title="contact" onBack={() => onNavigate('home')} />
    <div style={acStyles.container}>
      <div style={acStyles.titleBlock}>
        <span style={acStyles.sectionNum}>§05</span>
        <h1 style={acStyles.h1}>Contact</h1>
      </div>
      <p style={acStyles.body}>
        I'm always happy to connect with others interested in RF electronics, antenna design, power systems, or any other
        engineering field. Reach out via email or LinkedIn.
      </p>
      <div style={acStyles.links}>
        <div style={acStyles.linkRow}>
          <span style={acStyles.linkLabel}>email</span>
          <a href="mailto:mattg.guillen@gmail.com" style={acStyles.link}>mattg.guillen@gmail.com</a>
        </div>
        <div style={acStyles.dividerWrap}><div style={acStyles.dividerNode}></div><div style={acStyles.divider}></div></div>
        <div style={acStyles.linkRow}>
          <span style={acStyles.linkLabel}>linkedin</span>
          <a href="https://linkedin.com/in/matias-guillen" target="_blank" rel="noreferrer" style={acStyles.link}>linkedin.com/in/matias-guillen</a>
        </div>
        <div style={acStyles.dividerWrap}><div style={acStyles.dividerNode}></div><div style={acStyles.divider}></div></div>
      </div>
    </div>
  </div>
);

const acStyles = {
  page: { minHeight: '100vh', background: '#FAFAF7', backgroundImage: 'radial-gradient(circle,rgba(17,17,17,0.04) 1px,transparent 1px)', backgroundSize: '20px 20px' },
  container: { maxWidth: 680, margin: '0 auto', padding: '40px 20px 96px' },
  titleBlock: { marginBottom: 32 },
  sectionNum: { display: 'block', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#1B3A5C', letterSpacing: '0.02em', marginBottom: 4 },
  h1: { fontFamily: "'EB Garamond',serif", fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 400, color: '#111', margin: 0 },
  profileRow: { display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 32 },
  profileImg: { width: 80, height: 80, objectFit: 'cover', flexShrink: 0 },
  body: { fontFamily: "'EB Garamond',serif", fontSize: 17, lineHeight: 1.65, color: '#111', textWrap: 'pretty' },
  specBlock: { display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '5px 40px', padding: '16px 0', borderTop: '1px solid rgba(17,17,17,0.12)', borderBottom: '1px solid rgba(17,17,17,0.12)', margin: '32px 0', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.02em' },
  specKey: { color: '#555' },
  specVal: { color: '#111', fontWeight: 500 },
  links: { marginTop: 36 },
  dividerWrap: { position: 'relative' },
  dividerNode: { position: 'absolute', top: -3, left: 0, width: 5, height: 5, background: '#1B3A5C', borderRadius: '50%', zIndex: 1 },
  divider: { borderTop: '1px solid rgba(17,17,17,0.12)' },
  linkRow: { display: 'flex', alignItems: 'baseline', gap: 20, padding: '14px 0', minHeight: 44 },
  linkLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#555', letterSpacing: '0.02em', width: 60 },
  link: { fontFamily: "'EB Garamond',serif", fontSize: 17, color: '#1B3A5C', textDecoration: 'none' },
};

Object.assign(window, { About, Contact });
