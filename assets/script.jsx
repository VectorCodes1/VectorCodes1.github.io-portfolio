
/* ─── Scroll-reveal hook ───────────────────────────────────────────────── */
const useReveal = () => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Reveal = ({ children, delay = 0 }) => {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

/* ─── Mobile detection hook ─────────────────────────────────────────────── */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

/* ─── Sidebar ──────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'Experience',  page: 'experience' },
  { label: 'Projects',    page: 'projects'   },
  { label: 'Leadership',  page: 'leadership' },
  { label: 'Resume',      page: 'resume'     },
  { label: 'Contact',     page: 'contact'    },
];

const NavItems = ({ activePage, onNavigate, onClose }) => {
  const [hovered, setHovered] = React.useState(null);
  return (
    <>
      {NAV_ITEMS.map(({label, page}) => {
        const active = activePage === page;
        return (
          <button
            key={page}
            aria-current={active ? 'page' : undefined}
            style={{...sb.navBtn, ...(active ? sb.navBtnActive : {}), ...(hovered===page && !active ? sb.navBtnHover : {})}}
            onMouseEnter={() => setHovered(page)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => { onNavigate(page); onClose && onClose(); }}
          >
            <span style={{...sb.navLabel, ...(active ? {color:'#111'} : {})}}>{label}</span>
          </button>
        );
      })}
    </>
  );
};

const Sidebar = ({ activePage, onNavigate }) => (
  <aside style={sb.aside}>
    <div style={sb.nameBlock} onClick={() => onNavigate('home')} role="button" tabIndex={0}
         onKeyDown={e => e.key==='Enter' && onNavigate('home')} aria-label="Home">
      <img src="assets/profileimage1.png" alt="Matias Guillen" style={sb.profileImg} />
      <div style={sb.nameRow}><span style={sb.name}>Matias Guillen</span></div>
      <div style={sb.wave} aria-hidden="true">
        <svg viewBox="0 0 240 20" style={sb.waveSvg} fill="none" preserveAspectRatio="none">
          <path d="M0 17 Q7.5 1 15 17 L30 17 Q37.5 1 45 17 L60 17 Q67.5 1 75 17 L90 17 Q97.5 1 105 17 L120 17 Q127.5 1 135 17 L150 17 Q157.5 1 165 17 L180 17 Q187.5 1 195 17 L210 17 Q217.5 1 225 17 L240 17"
            stroke="#1B3A5C" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
      <div style={sb.subtitle}>Hey — I'm Matias!</div>
    </div>
    <div style={sb.dividerFull}></div>
    <nav style={sb.nav}>
      <NavItems activePage={activePage} onNavigate={onNavigate} />
    </nav>
  </aside>
);

/* ─── Mobile header + drawer ────────────────────────────────────────────── */
const MobileHeader = ({ activePage, onNavigate }) => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  return (
    <>
      {/* Top bar */}
      <header style={mh.bar}>
        <div style={mh.barLeft} onClick={() => onNavigate('home')} role="button" tabIndex={0}>
          <img src="assets/profileimage1.png" alt="Matias Guillen" style={mh.avatar} />
          <span style={mh.name}>Matias Guillen</span>
        </div>
        <button style={mh.burger} onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open
            ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><line x1="4" y1="4" x2="16" y2="16" stroke="#1B3A5C" strokeWidth="1.8"/><line x1="16" y1="4" x2="4" y2="16" stroke="#1B3A5C" strokeWidth="1.8"/></svg>
            : <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><line x1="3" y1="6" x2="17" y2="6" stroke="#1B3A5C" strokeWidth="1.8"/><line x1="3" y1="10" x2="17" y2="10" stroke="#1B3A5C" strokeWidth="1.8"/><line x1="3" y1="14" x2="17" y2="14" stroke="#1B3A5C" strokeWidth="1.8"/></svg>
          }
        </button>
      </header>
      {/* Drawer overlay */}
      {open && (
        <div style={mh.overlay} onClick={() => setOpen(false)}>
          <div style={mh.drawer} onClick={e => e.stopPropagation()}>
            <div style={mh.drawerProfile}>
              <img src="assets/profileimage1.png" alt="Matias Guillen" style={mh.drawerAvatar} />
              <span style={mh.drawerName}>Matias Guillen</span>
              <div style={{overflow:'hidden', width:64, height:16, opacity:0.4}} aria-hidden="true">
                <svg viewBox="0 0 240 20" style={{animation:'sineDrift 3.2s linear infinite', width:'200%', height:'100%'}} fill="none" preserveAspectRatio="none">
                  <path d="M0 17 Q7.5 1 15 17 L30 17 Q37.5 1 45 17 L60 17 Q67.5 1 75 17 L90 17 Q97.5 1 105 17 L120 17 Q127.5 1 135 17 L150 17 Q157.5 1 165 17 L180 17 Q187.5 1 195 17 L210 17 Q217.5 1 225 17 L240 17" stroke="#1B3A5C" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
            </div>
            <div style={{borderTop:'1px solid rgba(17,17,17,0.12)'}}></div>
            <nav style={{display:'flex', flexDirection:'column', padding:'8px 0'}}>
              <NavItems activePage={activePage} onNavigate={onNavigate} onClose={() => setOpen(false)} />
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

const mh = {
  bar: { position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 56, borderBottom: '1px solid rgba(17,17,17,0.12)', borderLeft: '3px solid #1B3A5C', background: '#FAFAF7', backgroundImage: 'radial-gradient(circle,rgba(17,17,17,0.04) 1px,transparent 1px)', backgroundSize: '20px 20px' },
  barLeft: { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' },
  avatar: { width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 },
  name: { fontFamily: "'EB Garamond',serif", fontSize: 17, color: '#111', letterSpacing: '-0.01em' },
  burger: { background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(17,17,17,0.4)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' },
  drawer: { width: 260, height: '100vh', background: '#FAFAF7', backgroundImage: 'radial-gradient(circle,rgba(17,17,17,0.04) 1px,transparent 1px)', backgroundSize: '20px 20px', borderLeft: '1px solid rgba(17,17,17,0.12)', display: 'flex', flexDirection: 'column', overflowY: 'auto' },
  drawerProfile: { padding: '32px 24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  drawerAvatar: { width: 72, height: 72, borderRadius: '50%', objectFit: 'cover' },
  drawerName: { fontFamily: "'EB Garamond',serif", fontSize: 18, color: '#111', letterSpacing: '-0.01em' },
};

const sb = {
  aside: { width: 260, flexShrink: 0, position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(17,17,17,0.12)', borderLeft: '3px solid #1B3A5C', padding: '48px 0 32px', background: '#FAFAF7', backgroundImage: 'radial-gradient(circle,rgba(17,17,17,0.04) 1px,transparent 1px)', backgroundSize: '20px 20px' },
  nameBlock: { padding: '0 32px 28px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  nameRow: { marginBottom: 10 },
  profileImg: { width: 96, height: 96, objectFit: 'cover', display: 'block', margin: '0 auto 14px', borderRadius: '50%' },
  name: { fontFamily: "'EB Garamond',serif", fontSize: 22, fontWeight: 400, color: '#111', lineHeight: 1.1, display: 'block', letterSpacing: '-0.01em', textAlign: 'center' },
  wave: { display: 'block', overflow: 'hidden', width: 72, height: 16, opacity: 0.4, marginBottom: 10 },
  waveSvg: { animation: 'sineDrift 3.2s linear infinite', width: '200%', height: '100%' },
  subtitle: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#1B3A5C', letterSpacing: '0.02em', lineHeight: 1.6, marginTop: 2, textAlign: 'center' },
  dividerFull: { borderTop: '1px solid rgba(17,17,17,0.12)', margin: '0 0' },
  nav: { flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 0' },
  navBtn: { display: 'flex', alignItems: 'baseline', gap: 10, padding: '11px 32px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', minHeight: 44 },
  navBtnActive: { background: 'rgba(27,58,92,0.06)' },
  navBtnHover: { background: 'rgba(27,58,92,0.04)' },
  navLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#555', letterSpacing: '0.04em' },
};

/* ─── Shared breadcrumb nav for inner pages ────────────────────────────── */
const StickyNav = ({ title }) => {
  const isMobile = useIsMobile();
  return (
    <div style={{
      borderBottom: '1px solid rgba(17,17,17,0.12)',
      padding: isMobile ? '14px 20px' : '14px 56px',
      fontFamily: "'JetBrains Mono',monospace",
      fontSize: 11, letterSpacing: '0.02em',
      color: '#555', background: '#FAFAF7',
    }}>
      {title}
    </div>
  );
};

/* ─── Home / Hero content ───────────────────────────────────────────────── */

/* ✏️  EDIT YOUR CONTENT HERE — Skills */
const SKILLS = [
  { group: 'Hardware & Tools', items: [
    { name: 'Oscilloscope / Lab Equipment', level: 'Proficient'   },
    { name: 'SolidWorks',                   level: 'Proficient'   },
    { name: 'Autodesk Fusion',              level: 'Proficient'   },
    { name: 'KiCad',                        level: 'Intermediate' },
    { name: 'LTSpice',                      level: 'Intermediate' },
    { name: 'FDM / 3D Printing',            level: 'Intermediate' },
    { name: 'Soldering',                    level: 'Proficient'   },
  ]},
  { group: 'Software', items: [
    { name: 'MATLAB',                       level: 'Intermediate' },
    { name: 'C / Embedded C',              level: 'Intermediate' },
    { name: 'Python',                       level: 'Beginner'     },
    { name: 'LabVIEW',                      level: 'Beginner'     },
  ]},
  { group: 'Focus Areas', items: [
    { name: 'Test Engineering',             level: 'Proficient'   },
    { name: 'RF & Signal Analysis',         level: 'Proficient'   },
    { name: 'Embedded Systems',             level: 'Intermediate' },
    { name: 'Power Electronics',            level: 'Intermediate' },
    { name: 'PCB Design',                   level: 'Intermediate' },
    { name: 'Control Systems',              level: 'Beginner'     },
  ]},
];

const LEVEL_COLOR = {
  Proficient:   { bg: 'rgba(27,58,92,0.10)', border: 'rgba(27,58,92,0.55)', text: '#1B3A5C' },
  Intermediate: { bg: 'rgba(27,58,92,0.04)', border: 'rgba(27,58,92,0.28)', text: '#1B3A5C' },
  Beginner:     { bg: 'transparent',         border: 'rgba(17,17,17,0.18)', text: '#555'    },
};

const ABOUT_PHOTOS = [
  { src: 'assets/about-photo.jpg', alt: 'Matias Guillen', caption: 'Riding a dune buggy in the Mojave Desert for the first time.' },
  { src: null, caption: '' },
  { src: null, caption: '' },
  { src: null, caption: '' },
];

const AboutPhoto = () => {
  const [index, setIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const current = ABOUT_PHOTOS[index];
  const hasImage = current && current.src;

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const prev = () => setIndex(i => (i - 1 + ABOUT_PHOTOS.length) % ABOUT_PHOTOS.length);
  const next = () => setIndex(i => (i + 1) % ABOUT_PHOTOS.length);

  return (
    <>
      <div style={{ marginTop: 24, maxWidth: 480 }}>
        {/* Photo frame */}
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(17,17,17,0.1)', lineHeight: 0, background: 'rgba(27,58,92,0.04)' }}>
          {hasImage ? (
            <img
              src={current.src}
              alt={current.alt}
              decoding="async"
              onClick={() => setOpen(true)}
              style={{ display: 'block', width: '100%', height: 'auto', cursor: 'zoom-in' }}
            />
          ) : (
            <div style={{ width: '100%', aspectRatio: '4/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, border: '2px dashed rgba(27,58,92,0.2)', borderRadius: 12 }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#1B3A5C" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.35"/><line x1="16" y1="10" x2="16" y2="22" stroke="#1B3A5C" strokeWidth="1.5" opacity="0.35"/><line x1="10" y1="16" x2="22" y2="16" stroke="#1B3A5C" strokeWidth="1.5" opacity="0.35"/></svg>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#1B3A5C', opacity: 0.4, letterSpacing: '0.04em' }}>photo coming soon</span>
            </div>
          )}

          {/* Prev / Next arrows */}
          <button onClick={prev} aria-label="Previous photo"
            style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(17,17,17,0.12)', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polyline points="9,2 5,7 9,12" stroke="#1B3A5C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={next} aria-label="Next photo"
            style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(17,17,17,0.12)', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polyline points="5,2 9,7 5,12" stroke="#1B3A5C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
          {ABOUT_PHOTOS.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`Photo ${i + 1}`}
              style={{ width: i === index ? 16 : 6, height: 6, borderRadius: 3, background: i === index ? '#1B3A5C' : 'rgba(27,58,92,0.25)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 0.2s, background 0.2s' }} />
          ))}
        </div>

        {/* Caption */}
        {current && current.caption ? (
          <p style={{ fontFamily: "'EB Garamond',serif", fontStyle: 'italic', fontSize: 14, color: '#666', marginTop: 8, textAlign: 'center', lineHeight: 1.5 }}>{current.caption}</p>
        ) : null}
      </div>

      {open && hasImage && (
        <div onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, cursor: 'zoom-out', padding: 16 }}>
          <button onClick={() => setOpen(false)} aria-label="Close photo"
            style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer', lineHeight: 1, opacity: 0.8 }}>×</button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <img src={current.src} alt={current.alt} decoding="async"
              style={{ maxWidth: '92vw', maxHeight: '82vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }} />
            {current.caption && <p style={{ fontFamily: "'EB Garamond',serif", fontStyle: 'italic', fontSize: 15, color: 'rgba(255,255,255,0.75)', textAlign: 'center', maxWidth: 480 }}>{current.caption}</p>}
          </div>
        </div>
      )}
    </>
  );
};

const HomeFull = ({ onNavigate }) => {
  const [skillFilter, setSkillFilter] = React.useState('All');
  const isMobile = useIsMobile();
  const levels = ['All','Proficient','Intermediate','Beginner'];

  return (
  <div style={{...hf.page, padding: isMobile ? '32px 20px 64px' : '64px 56px 96px', position:'relative'}}>

    {/* Subtle right-side gradient accent */}
    <div style={{position:'fixed', right:0, top:0, width:320, height:'100vh', pointerEvents:'none', zIndex:0,
      background:'linear-gradient(to left, rgba(200,215,235,0.18) 0%, transparent 100%)'}} />

    {/* Hero */}
    <Reveal>
    <div style={hf.hero}>
      <h1 style={hf.h1}>Hey — I'm Matias!</h1>
      <p style={hf.bio}>
        Undergraduate specializing in RF &amp; power electronics — designing test fixtures at
        Lockheed Martin, building circuits in the lab, and leading IEEE UCF as President.
        I still believe the best way to understand a circuit is to build it.
      </p>
    </div>
    </Reveal>

    <div style={hf.dividerWrap}><div style={hf.divNode}></div><div style={hf.divLine}></div></div>

    {/* About */}
    <Reveal delay={60}>
    <div style={hf.aboutRow}>
      <div style={hf.aboutText}>
        <span style={hf.sectionLabel}>About</span>
        <p style={hf.aboutBio}>
          Most of us grew up idolizing a hero who could make the impossible seem like a simple
          weekend project. Back in kindergarten, I built a cardboard "Iron Man" suit and an arc
          reactor out of a flashlight — a spark of my growing imagination.
        </p>
        <p style={{...hf.aboutBio, marginTop: 16}}>
          My time with IEEE UCF has challenged and defined my leadership. As President, I see the
          organization as a vital bridge between the classroom and hands-on activity. I may have
          outgrown the cardboard suit, but I have never outgrown my drive to build, break, and improve.
        </p>
        <AboutPhoto />
      </div>
    </div>
    </Reveal>

    <div style={hf.dividerWrap}><div style={hf.divNode}></div><div style={hf.divLine}></div></div>

    {/* Education */}
    <Reveal delay={60}>
    <div style={hf.eduBlock}>
      <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:16}}>
        <img src="assets/university_of_central_florida_logo.jpg" alt="UCF" style={{width:22, height:22, objectFit:'contain', opacity:0.85, borderRadius:2}} />
        <span style={{...hf.sectionLabel, marginBottom:0}}>Education</span>
      </div>
      <dl style={hf.eduDl}>
        <dt style={hf.eduKey}>School</dt><dd style={hf.eduVal}>University of Central Florida</dd>
        <dt style={hf.eduKey}>Degree</dt><dd style={hf.eduVal}>B.S. Electrical Engineering</dd>
        <dt style={hf.eduKey}>Graduation</dt><dd style={hf.eduVal}>May 2027</dd>
        <dt style={hf.eduKey}>GPA</dt><dd style={hf.eduVal}>3.4</dd>
        <dt style={hf.eduKey}>Coursework</dt><dd style={hf.eduVal}>Electronics I &amp; II · Electromagnetic Fields · Linear Control Systems · Real Time Systems · Embedded Systems</dd>
      </dl>
    </div>
    </Reveal>

    <div style={hf.dividerWrap}><div style={hf.divNode}></div><div style={hf.divLine}></div></div>

    {/* Skills with proficiency filter */}
    <Reveal delay={60}>
    <div style={hf.skillsBlock}>
      <div style={hf.skillsHeader}>
        <span style={hf.sectionLabel}>Skills</span>
        <div style={hf.filterRow}>
          {levels.map(l => (
            <button key={l} onClick={() => setSkillFilter(l)}
              style={{...hf.filterBtn, ...(skillFilter===l ? hf.filterBtnActive : {})}}>
              {l}
            </button>
          ))}
        </div>
      </div>
      {SKILLS.map(({ group, items }) => {
        const visible = items.filter(s => skillFilter==='All' || s.level===skillFilter);
        if (!visible.length) return null;
        return (
          <div key={group} style={hf.skillGroup}>
            <span style={hf.skillGroupLabel}>{group}</span>
            <div style={hf.skillTags}>
              {visible.map(s => {
                const c = LEVEL_COLOR[s.level];
                return (
                  <span key={s.name} style={{...hf.skillTag, background:c.bg, borderColor:c.border, color:c.text}}>
                    {s.name}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
      <div style={hf.levelLegend}>
        {Object.entries(LEVEL_COLOR).map(([lvl, c]) => (
          <span key={lvl} style={hf.legendItem}>
            <span style={{...hf.legendDot, background: lvl==='Beginner'?'rgba(17,17,17,0.2)':c.border}}></span>
            {lvl}
          </span>
        ))}
      </div>
    </div>
    </Reveal>

    <div style={hf.dividerWrap}><div style={hf.divNode}></div><div style={hf.divLine}></div></div>

    <Reveal delay={80}>
    <p style={hf.closingQuote}>
      "I may have outgrown the cardboard suit, but I have never outgrown my drive to build, break, and improve."
    </p>
    </Reveal>
  </div>
  );
};

const hf = {
  page: { padding: '64px 56px 96px', maxWidth: 820 },
  hero: { marginBottom: 48 },
  h1: { fontFamily: "'EB Garamond',serif", fontSize: 'clamp(2.8rem,4vw,4rem)', fontWeight: 400, color: '#111', lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.01em' },
  bio: { fontFamily: "'EB Garamond',serif", fontSize: 19, lineHeight: 1.65, color: '#111', maxWidth: 580, marginBottom: 0, textWrap: 'pretty' },
  dividerWrap: { position: 'relative', margin: '44px 0' },
  divNode: { position: 'absolute', top: -3, left: 0, width: 5, height: 5, background: '#1B3A5C', borderRadius: '50%' },
  divLine: { borderTop: '1px solid rgba(17,17,17,0.12)' },
  sectionLabel: { display: 'block', fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, color: '#1B3A5C', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 },
  aboutRow: {},
  aboutText: { maxWidth: 600 },
  aboutBio: { fontFamily: "'EB Garamond',serif", fontSize: 18, lineHeight: 1.7, color: '#555', textWrap: 'pretty' },
  eduBlock: {},
  eduDl: { display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '7px 40px', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.02em' },
  eduKey: { color: '#555', fontWeight: 400, whiteSpace: 'nowrap' },
  eduVal: { color: '#111', fontWeight: 500, lineHeight: 1.5 },
  skillsBlock: {},
  skillsHeader: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 },
  filterRow: { display: 'flex', gap: 6 },
  filterBtn: { fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, letterSpacing: '0.04em', color: '#555', background: 'none', border: '1px solid rgba(17,17,17,0.18)', padding: '3px 10px', cursor: 'pointer' },
  filterBtnActive: { color: '#1B3A5C', borderColor: 'rgba(27,58,92,0.55)', background: 'rgba(27,58,92,0.06)' },
  skillGroup: { display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 12 },
  skillGroupLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#555', letterSpacing: '0.06em', textTransform: 'uppercase', width: 64, flexShrink: 0 },
  skillTags: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  skillTag: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '0.02em', border: '1px solid', padding: '3px 8px', transition: 'opacity 0.15s' },
  levelLegend: { display: 'flex', gap: 20, marginTop: 16 },
  legendItem: { fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#666', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 5 },
  legendDot: { width: 6, height: 6, borderRadius: '50%', display: 'inline-block' },
  closingQuote: { fontFamily: "'EB Garamond',serif", fontStyle: 'italic', fontSize: 17, color: '#666', lineHeight: 1.6, maxWidth: 540, textWrap: 'pretty' },
};

/* ─── Index page icons ──────────────────────────────────────────────────── */
const ICONS = {
  experience: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{flexShrink:0,marginTop:2}}>
      <rect x="1" y="4" width="12" height="7" rx="0" stroke="#1B3A5C" strokeWidth="1.2"/>
      <path d="M4 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="#1B3A5C" strokeWidth="1.2"/>
      <line x1="1" y1="7" x2="13" y2="7" stroke="#1B3A5C" strokeWidth="1.2"/>
    </svg>
  ),
  projects: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{flexShrink:0,marginTop:2}}>
      <rect x="1" y="1" width="12" height="12" stroke="#1B3A5C" strokeWidth="1.2"/>
      <line x1="4" y1="1" x2="4" y2="13" stroke="#1B3A5C" strokeWidth="1.2"/>
      <line x1="10" y1="1" x2="10" y2="13" stroke="#1B3A5C" strokeWidth="1.2"/>
      <line x1="1" y1="5" x2="13" y2="5" stroke="#1B3A5C" strokeWidth="1.2"/>
      <circle cx="7" cy="9" r="1.5" fill="#1B3A5C"/>
    </svg>
  ),
  leadership: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{flexShrink:0,marginTop:2}}>
      <circle cx="7" cy="3" r="2" stroke="#1B3A5C" strokeWidth="1.2"/>
      <circle cx="2.5" cy="11" r="1.5" stroke="#1B3A5C" strokeWidth="1.2"/>
      <circle cx="11.5" cy="11" r="1.5" stroke="#1B3A5C" strokeWidth="1.2"/>
      <line x1="7" y1="5" x2="7" y2="8" stroke="#1B3A5C" strokeWidth="1.2"/>
      <line x1="7" y1="8" x2="2.5" y2="9.5" stroke="#1B3A5C" strokeWidth="1.2"/>
      <line x1="7" y1="8" x2="11.5" y2="9.5" stroke="#1B3A5C" strokeWidth="1.2"/>
    </svg>
  ),
};

/* ─── Projects index — cards with thumbnail ────────────────────────────── */
const ProjectsIndex = ({ onSelect }) => {
  const [hovered, setHovered] = React.useState(null);
  const [certHovered, setCertHovered] = React.useState(null);
  const isMobile = useIsMobile();
  return (
    <div style={di.page}>
      <StickyNav title="Projects" />
      <div style={{...di.inner, padding: isMobile ? '28px 20px 64px' : '40px 56px 96px'}}>
        <h1 style={di.h1}>Projects</h1>
        <div style={{...di.grid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px,1fr))'}}>
          {PROJECTS_DATA.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
            <div
              role="button"
              tabIndex={0}
              aria-label={`Open project: ${item.title}`}
              style={{...di.card, ...(hovered===i ? di.cardHover : {})}}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(item)}
              onKeyDown={e => { if (e.key==='Enter' || e.key===' ') { e.preventDefault(); onSelect(item); } }}
            >
              <div style={di.cardThumb}>
                {item.thumb
                  ? <img src={item.thumb} alt={item.title} style={di.thumbImg} />
                  : <div style={di.thumbPlaceholder} aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect x="4" y="4" width="24" height="24" stroke="#1B3A5C" strokeWidth="1.2" strokeDasharray="3 2"/>
                        <line x1="4" y1="16" x2="28" y2="16" stroke="#1B3A5C" strokeWidth="0.8"/>
                        <line x1="16" y1="4" x2="16" y2="28" stroke="#1B3A5C" strokeWidth="0.8"/>
                        <circle cx="16" cy="16" r="3" fill="none" stroke="#1B3A5C" strokeWidth="1.2"/>
                      </svg>
                    </div>
                }
              </div>
              <div style={di.cardBody}>
                <div style={di.cardTop}>
                  <span style={di.cardTitle}>{item.title}</span>
                  <span style={di.cardDate}>{item.date}</span>
                </div>
                <p style={di.cardDesc}>{item.desc}</p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ marginTop: 56 }}>
          <h2 style={{ fontFamily: "'EB Garamond',serif", fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 400, color: '#111', marginBottom: 24 }}>Certifications</h2>
          <div>
            {CERTIFICATIONS_DATA.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 60}>
              <div>
                <div style={{ borderTop: '1px solid rgba(17,17,17,0.12)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -3, left: 0, width: 5, height: 5, background: '#1B3A5C', borderRadius: '50%' }} />
                </div>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', transition: 'background 0.1s', ...(certHovered === i ? { background: 'rgba(27,58,92,0.04)', margin: '0 -20px', padding: '14px 20px' } : {}) }}
                  onMouseEnter={() => setCertHovered(i)}
                  onMouseLeave={() => setCertHovered(null)}
                >
                  <div style={{ flexShrink: 0, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(27,58,92,0.06)', borderRadius: 8, border: '1px solid rgba(27,58,92,0.12)' }}>
                    {CERT_ICON[cert.icon]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 17, color: '#111' }}>{cert.title}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#555', letterSpacing: '0.02em', marginTop: 2 }}>{cert.org}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#555', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>{cert.date}</span>
                    {cert.pdfLink && (
                      <a href={cert.pdfLink} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#1B3A5C', letterSpacing: '0.04em', border: '1px solid rgba(27,58,92,0.35)', padding: '3px 8px', textDecoration: 'none', whiteSpace: 'nowrap' }}
                        onClick={e => e.stopPropagation()}>
                        ↓ pdf
                      </a>
                    )}
                  </div>
                </div>
              </div>
              </Reveal>
            ))}
            <div style={{ borderTop: '1px solid rgba(17,17,17,0.12)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -3, left: 0, width: 5, height: 5, background: '#1B3A5C', borderRadius: '50%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CERT_ICON = {
  solidworks: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="6" stroke="#1B3A5C" strokeWidth="1.5"/>
      <circle cx="14" cy="14" r="12" stroke="#1B3A5C" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
      <line x1="14" y1="2" x2="14" y2="6" stroke="#1B3A5C" strokeWidth="1.5"/>
      <line x1="14" y1="22" x2="14" y2="26" stroke="#1B3A5C" strokeWidth="1.5"/>
      <line x1="2" y1="14" x2="6" y2="14" stroke="#1B3A5C" strokeWidth="1.5"/>
      <line x1="22" y1="14" x2="26" y2="14" stroke="#1B3A5C" strokeWidth="1.5"/>
    </svg>
  ),
  autodesk: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 3L25 9.5V18.5L14 25L3 18.5V9.5L14 3Z" stroke="#1B3A5C" strokeWidth="1.5"/>
      <path d="M14 3V25M3 9.5L25 9.5" stroke="#1B3A5C" strokeWidth="0.8" opacity="0.4"/>
    </svg>
  ),
  cpt: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="13" width="22" height="12" rx="1" stroke="#1B3A5C" strokeWidth="1.5"/>
      <path d="M3 13L8 7H20L25 13" stroke="#1B3A5C" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="11" y="17" width="6" height="8" stroke="#1B3A5C" strokeWidth="1"/>
      <circle cx="8" cy="18" r="1.5" fill="#1B3A5C" opacity="0.5"/>
      <circle cx="20" cy="18" r="1.5" fill="#1B3A5C" opacity="0.5"/>
    </svg>
  ),
};

const CERTIFICATIONS_DATA = [
  {
    id: 'cswa',
    title: 'CSWA — Certified SolidWorks Associate',
    org: 'Dassault Systèmes',
    date: 'Issued 2024',
    pdfLink: 'assets/cswa-cert.pdf',
    icon: 'solidworks',
  },
  {
    id: 'autodesk-fusion',
    title: 'Autodesk Fusion Certified User',
    org: 'Autodesk',
    date: 'Issued 2024',
    pdfLink: null,
    icon: 'autodesk',
  },
  {
    id: 'cpt',
    title: 'Certified Production Technician (CPT) 4.0',
    org: 'Manufacturing Skill Standards Council (MSSC)',
    date: 'Issued Mar 2023 · Expires Mar 2028',
    pdfLink: null,
    icon: 'cpt',
  },
];

/* ─── Leadership index — same grid as Projects ──────────────────────────── */
const LeadershipIndex = ({ onSelect }) => {
  const [hovered, setHovered] = React.useState(null);
  const isMobile = useIsMobile();
  return (
    <div style={di.page}>
      <StickyNav title="Leadership" />
      <div style={{...di.inner, padding: isMobile ? '28px 20px 64px' : '40px 56px 96px'}}>
        <h1 style={di.h1}>Leadership</h1>
        <div style={{...di.grid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px,1fr))'}}>
          {LEADERSHIP_DATA.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
            <div
              role="button"
              tabIndex={0}
              aria-label={`Open leadership role: ${item.title}`}
              style={{...di.card, ...(hovered===i ? di.cardHover : {})}}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(item)}
              onKeyDown={e => { if (e.key==='Enter' || e.key===' ') { e.preventDefault(); onSelect(item); } }}
            >
              <div style={di.cardThumb}>
                {item.thumb
                  ? <img src={item.thumb} alt={item.title} style={di.thumbImg} />
                  : <div style={di.thumbPlaceholder} aria-hidden="true">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="11" r="5" stroke="#1B3A5C" strokeWidth="1.2" strokeDasharray="3 2"/>
                        <path d="M5 30c0-6.075 4.925-11 11-11s11 4.925 11 11" stroke="#1B3A5C" strokeWidth="1.2" strokeDasharray="3 2"/>
                      </svg>
                    </div>
                }
              </div>
              <div style={di.cardBody}>
                <div style={di.cardTop}>
                  <span style={di.cardTitle}>{item.title}</span>
                  <span style={di.cardDate}>{item.date}</span>
                </div>
                <p style={di.cardDesc}>{item.desc}</p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

      </div>
    </div>
  );
};

const di = {
  page: { flex: 1 },
  inner: { padding: '40px 56px 96px', maxWidth: 900 },
  h1: { fontFamily: "'EB Garamond',serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 400, color: '#111', marginBottom: 32 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px,1fr))', gap: 20 },
  card: { border: '1px solid rgba(17,17,17,0.12)', borderTop: '3px solid #1B3A5C', background: '#fff', cursor: 'pointer', transition: 'box-shadow 0.15s, transform 0.15s', overflow: 'hidden' },
  cardHover: { boxShadow: '0 4px 20px rgba(27,58,92,0.10)', transform: 'translateY(-2px)' },
  cardThumb: { height: 160, overflow: 'hidden', background: 'rgba(27,58,92,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  thumbImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  thumbPlaceholder: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', opacity: 0.35 },
  cardBody: { padding: '18px 20px 20px' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 8 },
  cardTitle: { fontFamily: "'EB Garamond',serif", fontSize: 17, color: '#111', lineHeight: 1.3 },
  cardDate: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#666', letterSpacing: '0.02em', whiteSpace: 'nowrap', flexShrink: 0 },
  cardDesc: { fontFamily: "'EB Garamond',serif", fontStyle: 'italic', fontSize: 14, color: '#555', lineHeight: 1.5 },
};

/* ─── Detail page — desktop ─────────────────────────────────────────────── */
const DesktopDetail = ({ item, type, onBack }) => {
  const [zoom, setZoom] = React.useState(null);
  const isMobile = useIsMobile();
  const photos = item.photos || [];
  const specs = item.specs || defaultDetailSpecs(item, type);

  React.useEffect(() => {
    if (!zoom) return;
    const onKey = e => { if (e.key === 'Escape') setZoom(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);

  return (
    <div style={dd.page}>
      {zoom && (
        <div style={dd.zoomOverlay} onClick={() => setZoom(null)} role="dialog" aria-modal="true" aria-label="Photo zoom">
          <button onClick={() => setZoom(null)} aria-label="Close" style={dd.zoomClose}>×</button>
          <img src={zoom} alt="" style={dd.zoomImg} />
        </div>
      )}
      <StickyNav title={item.id} />
      <div style={{...dd.inner, padding: isMobile ? '24px 20px 64px' : '32px 56px 96px'}}>
        <button onClick={onBack} style={dd.backBtn}>← back to {type === 'project' ? 'Projects' : type === 'leadership' ? 'Leadership' : 'Experience'}</button>

        <div style={dd.titleBlock}>
          <span style={dd.sectionNum}>{type === 'project' ? 'Project' : type === 'leadership' ? 'Leadership' : 'Experience'}</span>
          <h1 style={dd.h1}>{item.title}</h1>
        </div>

        <div style={{...dd.twoCol, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 64}}>
          {/* Left: spec block + body */}
          <div style={dd.leftCol}>
            <dl style={dd.specBlock}>
              {specs.map(([k, v]) => (
                <React.Fragment key={k}>
                  <dt style={dd.specKey}>{k}</dt>
                  <dd style={dd.specVal}>{v}</dd>
                </React.Fragment>
              ))}
            </dl>
            <p style={dd.body}>{item.desc}</p>
          </div>

          {/* Right: photo gallery */}
          {photos.length > 0 && (
            <div style={dd.gallery}>
              {photos.map((p, i) => (
                <figure key={i} style={dd.figure}>
                  <img src={p.src} alt={p.caption} loading="lazy" decoding="async" style={dd.img} onClick={() => setZoom(p.src)} />
                  <figcaption style={dd.caption}>Fig. {i+1} — {p.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function defaultDetailSpecs(item, type) {
  if (type === 'project') return [['Date', item.date], ['Tools', 'KiCad, LTSpice, MATLAB'], ['Status', 'Completed']];
  if (type === 'experience') return item.specs || [['Role', item.title], ['Period', item.date]];
  return [['Role', item.title], ['Period', item.date], ['Organization', 'IEEE UCF']];
}

const dd = {
  page: { flex: 1 },
  zoomOverlay: { position: 'fixed', inset: 0, background: 'rgba(17,17,17,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, cursor: 'zoom-out' },
  zoomImg: { maxWidth: '92vw', maxHeight: '90vh', objectFit: 'contain' },
  zoomClose: { position: 'absolute', top: 16, right: 20, width: 40, height: 40, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: 28, lineHeight: 1, cursor: 'pointer', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 },
  inner: { padding: '32px 56px 96px', maxWidth: 1000 },
  backBtn: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#1B3A5C', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.02em', padding: '0 0 28px', display: 'block' },
  titleBlock: { marginBottom: 36 },
  sectionNum: { display: 'block', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#1B3A5C', letterSpacing: '0.02em', marginBottom: 6, textTransform: 'capitalize' },
  h1: { fontFamily: "'EB Garamond',serif", fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 400, color: '#111', margin: 0 },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start', justifyItems: 'start' },
  leftCol: {},
  specBlock: { display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '5px 32px', padding: '16px 0', borderTop: '1px solid rgba(17,17,17,0.12)', borderBottom: '1px solid rgba(17,17,17,0.12)', marginBottom: 28, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.02em' },
  specKey: { color: '#555' },
  specVal: { color: '#111', fontWeight: 500 },
  body: { fontFamily: "'EB Garamond',serif", fontSize: 17, lineHeight: 1.7, color: '#111', textWrap: 'pretty' },
  gallery: { display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' },
  figure: { width: '100%', maxWidth: 480, margin: '0 auto' },
  img: { width: '100%', display: 'block', cursor: 'zoom-in' },
  caption: { fontFamily: "'EB Garamond',serif", fontStyle: 'italic', fontSize: 13, color: '#555', marginTop: 6, textAlign: 'center' },
};

/* ─── Experience desktop ────────────────────────────────────────────────── */

/* ✏️  EDIT YOUR CONTENT HERE — Experience */
const EXPERIENCE_DATA = [
  {
    id: 'lockheed-rf',
    title: 'RF/Antenna Electrical Engineering Intern',
    org: 'Lockheed Martin',
    date: 'May 2026 – Present',
    logo: 'assets/lockheed_martin_logo.jpg',
    bullets: [
      'Supporting RF and antenna system design and testing at Lockheed Martin.',
      'Conducting antenna pattern measurements and RF signal characterization.',
      'Collaborating with senior engineers on hardware validation test plans.',
    ],
    skills: ['RF Systems','Antenna Design','Signal Analysis','LTSpice'],
  },
  {
    id: 'lockheed',
    title: 'CWEP — Test Engineering',
    org: 'Lockheed Martin',
    date: 'Apr 2024 – Apr 2026',
    logo: 'assets/lockheed_martin_logo.jpg',
    bullets: [
      'Component-level failure analysis and root-cause investigations on sensor hardware.',
      'Designed and fabricated custom RF test fixtures using SolidWorks and FDM to improve signal integrity.',
      'Managed calibration schedules across a large inventory of test assets.',
      'Mentored incoming CWEPs on lab procedures and documentation standards.',
    ],
    skills: ['SolidWorks','FDM / 3D Print','KiCad','LTSpice','Test Engineering','RF Systems'],
  },
];

const ExperiencePage = () => {
  const isMobile = useIsMobile();
  return (
  <div style={exp.page}>
    <StickyNav title="Experience" />
    <div style={{...exp.inner, padding: isMobile ? '28px 20px 64px' : '40px 56px 96px'}}>
      <h1 style={exp.h1}>Experience</h1>
      <div style={exp.cards}>
        {EXPERIENCE_DATA.map((item, i) => (
          <Reveal key={item.id} delay={i * 100}>
          <div style={exp.card}>
            <div style={exp.cardHeader}>
              <div style={exp.cardLeft}>
                {item.logo && <img src={item.logo} alt={item.org} style={exp.logo} />}
                <div>
                  <div style={exp.cardTitle}>{item.title}</div>
                  <div style={exp.cardOrg}>{item.org}</div>
                </div>
              </div>
              <span style={exp.cardDate}>{item.date}</span>
            </div>
            <ul style={exp.bullets}>
              {item.bullets.map((b,i) => <li key={i} style={exp.bullet}>{b}</li>)}
            </ul>
            <div style={exp.skillRow}>
              {item.skills.map(s => <span key={s} style={exp.skillChip}>{s}</span>)}
            </div>
          </div>
          </Reveal>
        ))}
      </div>
    </div>
  </div>
  );
};

const exp = {
  page: { flex: 1 },
  inner: { padding: '40px 56px 96px', maxWidth: 860 },
  h1: { fontFamily: "'EB Garamond',serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 400, color: '#111', marginBottom: 36 },
  cards: { display: 'flex', flexDirection: 'column', gap: 20 },
  card: { border: '1px solid rgba(17,17,17,0.12)', borderLeft: '3px solid #1B3A5C', padding: '24px 28px', background: '#fff', borderRadius: 0 },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 16 },
  cardLeft: { display: 'flex', alignItems: 'center', gap: 14 },
  logo: { width: 36, height: 36, objectFit: 'contain', flexShrink: 0, borderRadius: 2, border: '1px solid rgba(17,17,17,0.08)' },
  cardTitle: { fontFamily: "'EB Garamond',serif", fontSize: 19, fontWeight: 500, color: '#111', lineHeight: 1.2 },
  cardOrg: { fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#1B3A5C', letterSpacing: '0.04em', marginTop: 4 },
  cardDate: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#666', letterSpacing: '0.02em', whiteSpace: 'nowrap', flexShrink: 0 },
  bullets: { paddingLeft: 18, marginBottom: 16 },
  bullet: { fontFamily: "'EB Garamond',serif", fontSize: 16, lineHeight: 1.65, color: '#444', marginBottom: 6 },
  skillRow: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 },
  skillChip: { fontFamily: "'JetBrains Mono',monospace", fontSize: 9.5, color: '#1B3A5C', border: '1px solid rgba(27,58,92,0.35)', padding: '2px 8px', background: 'rgba(27,58,92,0.04)', letterSpacing: '0.02em' },
};

/* ✏️  EDIT YOUR CONTENT HERE — Projects */
const PROJECTS_DATA = [
  { id: 'southeastcon-2024', title: 'IEEE SoutheastCon 2024 Hardware Competition', date: 'Sep 2023 – Apr 2024', thumb: null, desc: 'Designed and built hardware entry for the IEEE Region 3 SoutheastCon 2024 Hardware Competition.', specs: [['Date','Sep 2023 – Apr 2024'],['Event','IEEE SoutheastCon 2024'],['Type','Hardware Design'],['Status','Completed']] },
  { id: 'internal-project-comp', title: 'Internal Project Competition', date: 'Apr 2024 – Apr 2025', thumb: null, desc: 'IEEE UCF internal technical project competition spanning multiple engineering disciplines.', specs: [['Date','Apr 2024 – Apr 2025'],['Org','IEEE UCF'],['Type','Internal Competition'],['Status','Completed']] },
  { id: 'senior-design', title: 'Senior Design — Space Systems', date: 'Aug 2025 – Present', thumb: null, desc: 'Senior capstone project focused on space systems engineering and design.', specs: [['Date','Aug 2025 – Present'],['Type','Senior Design'],['Status','In Progress']] },
  { id: 'placeholder-project', title: 'Coming Soon', date: '', thumb: null, desc: 'New project in progress — check back soon.', specs: [] },
];

/* ✏️  EDIT YOUR CONTENT HERE — Leadership */
const LEADERSHIP_DATA = [
  { id: 'ieee-president',     title: 'IEEE UCF President',                      date: 'Apr 2025 – Apr 2026', thumb: 'assets/photos/president-1.jpg',          desc: 'Led 13-officer board; coordinated 30+ events with AMD, Northrop Grumman, and others' },
  { id: 'ieee-project-chair', title: 'IEEE UCF Project Chair',                  date: 'Apr 2024 – Apr 2025', thumb: 'assets/photos/project-chair-1.jpg',      desc: 'Implemented BOM-based budget approval; delivered technical presentations to 100+ students' },
  { id: 'ieee-hkn',           title: 'IEEE HKN Zeta Chi Chapter Vice President', date: '2024 – Present',      thumb: 'assets/photos/hkn-1.jpg',                desc: 'Vice President of the Zeta Chi chapter of IEEE Eta Kappa Nu, the IEEE honor society for electrical and computer engineering' },
  { id: 'ieee-service',       title: 'IEEE UCF Service Committee',               date: 'Feb 2024 – Apr 2024', thumb: 'assets/photos/service-committee-1.jpg', desc: 'FIRST Robotics, beach cleanups, E-Week school workshops' },
  { id: 'lead-scholars',      title: 'UCF LEAD Scholars Member',                 date: 'Mar 2023 – Apr 2025', thumb: null,                                    desc: 'Two-year servant leadership program with Hope Helps, SERV, First Robotics' },
];

/* ✏️  EDIT YOUR CONTENT HERE — Photo Map */
const PHOTO_MAP = {
  'ieee-president':      [{ src: 'assets/photos/president-1.jpg', caption: 'IEEE UCF general meeting, Spring 2025.' },{ src: 'assets/photos/president-2.jpg', caption: 'Officer board photo, Apr 2025.' },{ src: 'assets/photos/president-3.jpg', caption: 'Region 3 Exemplary Student Branch Award.' }],
  'ieee-project-chair':  [{ src: 'assets/photos/project-chair-1.jpg', caption: 'Technical workshop, Fall 2024.' },{ src: 'assets/photos/project-chair-2.jpg', caption: 'Project review session, Mar 2025.' }],
  'ieee-hkn':            [{ src: 'assets/photos/hkn-1.jpg', caption: 'HKN induction ceremony.' },{ src: 'assets/photos/hkn-2.jpg', caption: 'HKN chapter members.' },{ src: 'assets/photos/hkn-3.jpg', caption: 'IEEE Eta Kappa Nu at UCF.' }],
  'ieee-service':        [{ src: 'assets/photos/service-committee-1.jpg', caption: 'E-Week motor workshop.' },{ src: 'assets/photos/service-committee-2.jpg', caption: 'FIRST Robotics, Feb 2024.' },{ src: 'assets/photos/service-committee-3.jpg', caption: 'Beach cleanup event.' },{ src: 'assets/photos/service-committee-4.jpg', caption: 'STEM demonstration.' }],
  'circuit-comp':        [{ src: 'assets/photos/circuit-design-competition-1.jpg', caption: 'Competition setup, Mar 2024.' },{ src: 'assets/photos/circuit-design-competition-2.jpg', caption: 'Circuit under test.' },{ src: 'assets/photos/circuit-design-competition-3.jpg', caption: '2nd place award.' }],
  'lockheed':            [{ src: 'assets/photos/solidworks-cert.jpg', caption: 'SolidWorks CSWA certificate.' },{ src: 'assets/photos/exemplary-student-branch.jpg', caption: 'Region 3 Exemplary Student Branch Award.' }],
};

/* ─── Resume page ───────────────────────────────────────────────────────── */
const ResumePage = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{flex:1, display:'flex', flexDirection:'column', minHeight: isMobile ? 'calc(100vh - 56px)' : '100vh'}}>
    <StickyNav title="Resume" />
    <div style={{padding: isMobile ? '16px 20px' : '24px 56px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid rgba(17,17,17,0.12)'}}>
      <h1 style={{fontFamily:"'EB Garamond',serif", fontSize:'clamp(1.4rem,2.5vw,1.9rem)', fontWeight:400, color:'#111', margin:0}}>Resume</h1>
      <a href="assets/Profile.pdf" download style={{fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'#1B3A5C', letterSpacing:'0.02em', border:'1px solid rgba(27,58,92,0.35)', padding:'8px 14px', textDecoration:'none', whiteSpace:'nowrap'}}>↓ download pdf</a>
    </div>
    <iframe
      src="assets/Profile.pdf"
      style={{flex:1, width:'100%', border:'none', display:'block', minHeight: isMobile ? 500 : undefined}}
      title="Matias Guillen Resume"
    ></iframe>
    <p style={{padding:'12px 20px', fontFamily:"'EB Garamond',serif", fontSize:14, color:'#555', borderTop:'1px solid rgba(17,17,17,0.08)', textAlign:'center'}}>
      Having trouble viewing? <a href="assets/Profile.pdf" target="_blank" rel="noreferrer" style={{color:'#1B3A5C'}}>Open the PDF directly</a>.
    </p>
  </div>
  );
};

/* ─── Contact page ──────────────────────────────────────────────────────── */
const ContactDesktop = () => {
  const isMobile = useIsMobile();
  return (
  <div style={{flex:1}}>
    <StickyNav title="Contact" />
    <div style={{padding: isMobile ? '28px 20px 64px' : '40px 56px 96px', maxWidth:680}}>
      <div style={{marginBottom:36}}>
        <h1 style={{fontFamily:"'EB Garamond',serif",fontSize:'clamp(1.6rem,3vw,2.2rem)',fontWeight:400,color:'#111',margin:0}}>Contact</h1>
      </div>
      <p style={{fontFamily:"'EB Garamond',serif",fontSize:17,lineHeight:1.7,color:'#111',marginBottom:40,textWrap:'pretty'}}>
        I'm always happy to connect with others interested in RF electronics, antenna design, power systems, or any other engineering field.
      </p>
      {[['email','mattg.guillen@gmail.com','mailto:mattg.guillen@gmail.com'],['phone','(407) 907-5123','tel:4079075123'],['linkedin','linkedin.com/in/matias-guillen','https://linkedin.com/in/matias-guillen']].map(([label,val,href]) => (
        <div key={label}>
          <div style={{position:'relative'}}><div style={{position:'absolute',top:-3,left:0,width:5,height:5,background:'#1B3A5C',borderRadius:'50%'}}></div><div style={{borderTop:'1px solid rgba(17,17,17,0.12)'}}></div></div>
          <div style={{display:'flex',alignItems:'baseline',gap:isMobile?16:32,padding:'16px 0',minHeight:44,flexWrap:'wrap'}}>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:'#555',letterSpacing:'0.02em',width:72,flexShrink:0}}>{label}</span>
            <a href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer" style={{fontFamily:"'EB Garamond',serif",fontSize:17,color:'#1B3A5C',textDecoration:'none',wordBreak:'break-all'}}>{val}</a>
          </div>
        </div>
      ))}
      <div style={{borderTop:'1px solid rgba(17,17,17,0.12)'}}></div>
    </div>
  </div>
  );
};

/* ─── App ───────────────────────────────────────────────────────────────── */
const App = () => {
  const [page, setPage] = React.useState('home');
  const [detail, setDetail] = React.useState(null);
  const [detailType, setDetailType] = React.useState(null);
  const mainRef = React.useRef(null);
  const isMobile = useIsMobile();

  const navigate = (p) => { setPage(p); setDetail(null); if(mainRef.current) mainRef.current.scrollTop=0; };
  const openDetail = (item, type) => {
    item.photos = PHOTO_MAP[item.id] || [];
    setDetail(item); setDetailType(type);
    if(mainRef.current) mainRef.current.scrollTop=0;
  };

  let content;
  if (detail) {
    content = <DesktopDetail item={detail} type={detailType} onBack={() => { setDetail(null); if(mainRef.current) mainRef.current.scrollTop=0; }} />;
  } else {
    switch(page) {
      case 'home':       content = <HomeFull onNavigate={navigate} />; break;
      case 'projects':   content = <ProjectsIndex onSelect={p => openDetail(p,'project')} />; break;
      case 'leadership': content = <LeadershipIndex onSelect={l => openDetail(l,'leadership')} />; break;
      case 'experience': content = <ExperiencePage />; break;
      case 'resume':     content = <ResumePage />; break;
      case 'contact':    content = <ContactDesktop />; break;
      default:           content = <HomeFull onNavigate={navigate} />;
    }
  }

  const activePage = detail ? (detailType === 'project' ? 'projects' : detailType === 'leadership' ? 'leadership' : 'experience') : page;

  if (isMobile) {
    return (
      <div style={{display:'flex', flexDirection:'column', width:'100%', minHeight:'100vh'}}>
        <MobileHeader activePage={activePage} onNavigate={navigate} />
        <main style={{flex:1}}>
          {content}
        </main>
      </div>
    );
  }

  return (
    <div style={{display:'flex',width:'100%',minHeight:'100vh'}}>
      <Sidebar activePage={activePage} onNavigate={navigate} />
      <main ref={mainRef} style={{flex:1,overflowY:'auto',minHeight:'100vh'}}>
        {content}
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
