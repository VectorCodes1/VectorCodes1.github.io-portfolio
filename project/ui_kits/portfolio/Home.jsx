// Home.jsx — Matias Guillen Portfolio UI Kit (mobile)
// Displays: name + sine wave, subtitle, bio, skills, education, section nav

const MOBILE_SKILLS = [
  { group: 'HW',  items: ['KiCad', 'LTSpice', 'SolidWorks', 'Oscilloscope', 'FDM'] },
  { group: 'SW',  items: ['MATLAB', 'C', 'Autodesk Inventor', 'Python'] },
  { group: 'EE',  items: ['RF Systems', 'Power Electronics', 'PCB Design', 'Antenna Design', 'Test Engineering'] },
];

// Simple scroll-reveal for mobile
const MobileReveal = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); else setVis(false); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(18px)',
      transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

const Home = ({ onNavigate }) => {
  return (
    <div style={homeStyles.page}>
      <div style={homeStyles.container}>

        {/* Profile photo + name */}
        <MobileReveal>
        <div style={homeStyles.topRow}>
          <img src="../../assets/profileimage1.png" alt="Matias Guillen" style={homeStyles.profileImg} />
          <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
            <h1 style={homeStyles.name}>Matias Guillen</h1>
            <span style={homeStyles.sineWrap}>
              <svg viewBox="0 0 240 18" style={homeStyles.sineSvg} fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 17 Q7.5 1 15 17 L30 17 Q37.5 1 45 17 L60 17 Q67.5 1 75 17 L90 17 Q97.5 1 105 17 L120 17 Q127.5 1 135 17 L150 17 Q157.5 1 165 17 L180 17 Q187.5 1 195 17 L210 17 Q217.5 1 225 17 L240 17"
                  stroke="#1B3A5C" strokeWidth="1.5" fill="none"/>
              </svg>
            </span>
            <p style={homeStyles.greeting}>Hey — I'm Matias!</p>
          </div>
        </div>

        {/* Bio */}
        <p style={homeStyles.bio}>
          Undergraduate specializing in RF &amp; power electronics — designing test fixtures at
          Lockheed Martin, building circuits in the lab, and leading the largest EE student organization
          at UCF as IEEE President. I still believe the best way to understand a circuit is to build it.
        </p>
        </MobileReveal>

        {/* About */}
        <div style={homeStyles.dividerWrap}><div style={homeStyles.dividerNode}></div><div style={homeStyles.divider}></div></div>
        <MobileReveal delay={60}>
        <div style={homeStyles.section}>
          <div style={homeStyles.sectionLabel}>About</div>
          <p style={homeStyles.aboutBio}>
            Most of us grew up idolizing a hero who could make the impossible seem like a simple weekend project.
            Back in kindergarten, I built a cardboard "Iron Man" suit and an arc reactor out of a flashlight.
            My time with IEEE UCF has challenged and defined my leadership. I may have outgrown the cardboard suit,
            but I have never outgrown my drive to build, break, and improve.
          </p>
        </div>
        </MobileReveal>

        {/* Education */}
        <div style={homeStyles.dividerWrap}><div style={homeStyles.dividerNode}></div><div style={homeStyles.divider}></div></div>
        <MobileReveal delay={60}>
        <div style={homeStyles.section}>
          <div style={homeStyles.eduLabelRow}>
            <img src="../../assets/university_of_central_florida_logo.jpg" alt="UCF" style={homeStyles.ucfLogo} />
            <div style={homeStyles.sectionLabel}>Education</div>
          </div>
          <dl style={homeStyles.eduDl}>
            <dt style={homeStyles.eduKey}>School</dt><dd style={homeStyles.eduVal}>University of Central Florida</dd>
            <dt style={homeStyles.eduKey}>Degree</dt><dd style={homeStyles.eduVal}>B.S. Electrical Engineering</dd>
            <dt style={homeStyles.eduKey}>Grad</dt><dd style={homeStyles.eduVal}>May 2027</dd>
            <dt style={homeStyles.eduKey}>GPA</dt><dd style={homeStyles.eduVal}>3.8</dd>
            <dt style={homeStyles.eduKey}>Courses</dt><dd style={homeStyles.eduVal}>Circuits I &amp; II · Electromagnetics · Signal Processing · Power Electronics · RF Circuit Design</dd>
          </dl>
        </div>
        </MobileReveal>

        {/* Skills */}
        <div style={homeStyles.dividerWrap}><div style={homeStyles.dividerNode}></div><div style={homeStyles.divider}></div></div>
        <MobileReveal delay={60}>
        <div style={homeStyles.section}>
          <div style={homeStyles.sectionLabel}>Skills</div>
          {MOBILE_SKILLS.map(({ group, items }) => (
            <div key={group} style={homeStyles.skillGroup}>
              <span style={homeStyles.skillGroupLabel}>{group}</span>
              <div style={homeStyles.skillTags}>
                {items.map(s => <span key={s} style={homeStyles.skillTag}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
        </MobileReveal>

        {/* Section Nav */}
        <div style={homeStyles.dividerWrap}><div style={homeStyles.dividerNode}></div><div style={homeStyles.divider}></div></div>
        <nav style={homeStyles.nav}>
          {[
            { label: 'Experience',  page: 'experience' },
            { label: 'Projects',    page: 'projects'   },
            { label: 'Leadership',  page: 'leadership' },
            { label: 'Resume',      page: 'resume'     },
            { label: 'Contact',     page: 'contact'    },
          ].map(({ label, page }, i) => (
            <MobileReveal key={page} delay={i * 60}>
            <div style={homeStyles.dividerWrap}>
              <div style={homeStyles.dividerNode}></div>
              <div style={homeStyles.divider}></div>
              <button onClick={() => onNavigate(page)} style={homeStyles.navRow}>
                <span style={homeStyles.navLabel}>{label}</span>
                <span style={homeStyles.navArrow}>→</span>
              </button>
            </div>
            </MobileReveal>
          ))}
          <div style={homeStyles.dividerWrap}>
            <div style={homeStyles.dividerNode}></div>
            <div style={homeStyles.divider}></div>
          </div>
        </nav>

        <footer style={homeStyles.footer}>
          <span>mattg.guillen@gmail.com</span>
          <span style={{color:'rgba(17,17,17,0.2)'}}>·</span>
          <a href="https://linkedin.com/in/matias-guillen" style={homeStyles.footerLink} target="_blank" rel="noreferrer">linkedin</a>
        </footer>
      </div>
    </div>
  );
};

const homeStyles = {
  page: { minHeight: '100vh', background: '#FAFAF7', backgroundImage: 'radial-gradient(circle, rgba(17,17,17,0.04) 1px, transparent 1px)', backgroundSize: '20px 20px', borderLeft: '3px solid #1B3A5C' },
  container: { maxWidth: 680, margin: '0 auto', padding: '48px 20px 48px' },
  topRow: { display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 },
  profileImg: { width: 88, height: 88, objectFit: 'cover', flexShrink: 0, borderRadius: '50%' },
  name: { fontFamily: "'EB Garamond', serif", fontSize: 'clamp(1.6rem,5vw,2rem)', fontWeight: 400, color: '#111', lineHeight: 1.05, margin: '0 0 6px', letterSpacing: '-0.01em' },
  sineWrap: { display: 'inline-block', overflow: 'hidden', width: 72, height: 14, opacity: 0.4, marginBottom: 6 },
  sineSvg: { animation: 'sineDrift 3.2s linear infinite', width: '200%', height: '100%' },
  greeting: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#1B3A5C', letterSpacing: '0.04em', margin: 0 },
  bio: { fontFamily: "'EB Garamond', serif", fontSize: 17, lineHeight: 1.65, color: '#111', marginBottom: 0, textWrap: 'pretty' },
  dividerWrap: { position: 'relative' },
  dividerNode: { position: 'absolute', top: -3, left: 0, width: 5, height: 5, background: '#1B3A5C', borderRadius: '50%', zIndex: 1 },
  divider: { borderTop: '1px solid rgba(17,17,17,0.12)', margin: 0 },
  section: { padding: '16px 0' },
  sectionLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#1B3A5C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 },
  eduLabelRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 },
  ucfLogo: { width: 18, height: 18, objectFit: 'contain', opacity: 0.85, borderRadius: 2 },
  aboutBio: { fontFamily: "'EB Garamond', serif", fontSize: 16, lineHeight: 1.65, color: '#555', textWrap: 'pretty' },
  eduDl: { display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '5px 20px', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.02em' },
  eduKey: { color: '#888', whiteSpace: 'nowrap' },
  eduVal: { color: '#111', fontWeight: 500, lineHeight: 1.5 },
  skillGroup: { display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  skillGroupLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#888', letterSpacing: '0.06em', textTransform: 'uppercase', width: 24, flexShrink: 0, paddingTop: 3 },
  skillTags: { display: 'flex', flexWrap: 'wrap', gap: 5 },
  skillTag: { fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: '#1B3A5C', letterSpacing: '0.02em', border: '1px solid rgba(27,58,92,0.28)', padding: '2px 7px' },
  nav: { marginBottom: 0 },
  navRow: { display: 'flex', alignItems: 'baseline', gap: 12, padding: '13px 0', width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', minHeight: 44 },
  navLabel: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#555', letterSpacing: '0.02em', flex: 1 },
  navArrow: { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#1B3A5C', opacity: 0.4 },
  footer: { fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#888', letterSpacing: '0.02em', display: 'flex', gap: 10, alignItems: 'center', marginTop: 32 },
  footerLink: { color: '#1B3A5C', textDecoration: 'none' },
};

Object.assign(window, { Home });
