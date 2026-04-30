// ProjectsIndex.jsx — Projects listing page

const PROJECTS = [
  { id: 'buck-converter', title: 'Buck Converter Design', date: 'Jan 2024', desc: 'Switching power supply for embedded audio amplifier; PCB layout in KiCad' },
  { id: 'antenna-sim', title: 'Phased Array Antenna Simulation', date: 'Sep 2023', desc: 'Beamforming model and far-field pattern analysis in MATLAB' },
  { id: 'rf-fixture', title: 'RF Test Fixture Fabrication', date: 'Apr 2024', desc: 'SolidWorks-designed FDM fixture improving RF signal path integrity at Lockheed' },
  { id: 'circuit-comp', title: '2nd Place — Circuit Design Competition', date: 'Mar 2024', desc: 'Competing team design at UCF: analog signal conditioning circuit' },
  { id: 'ltspice-filter', title: 'Active Filter Network Analysis', date: 'Nov 2023', desc: 'Butterworth low-pass filter simulation and component sensitivity in LTSpice' },
];

const ProjectsIndex = ({ onNavigate, onSelectProject }) => {
  const [hovered, setHovered] = React.useState(null);
  return (
    <div style={piStyles.page}>
      <StickyNav title="projects" onBack={() => onNavigate('home')} />
      <div style={piStyles.container}>
        <div style={piStyles.header}>
          <span style={piStyles.sectionNum}>§01</span>
          <h1 style={piStyles.h1}>Projects</h1>
        </div>
        <div>
          {PROJECTS.map((p, i) => (
            <div key={p.id}>
              <div style={piStyles.dividerWrap}>
                <div style={piStyles.dividerNode}></div>
                <div style={piStyles.divider}></div>
              </div>
              <div
                style={{...piStyles.row, ...(hovered === i ? piStyles.rowHover : {})}}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelectProject(p)}
              >
                <span style={piStyles.rowTitle}>{p.title}</span>
                <span style={piStyles.rowDate}>{p.date}</span>
                <span style={piStyles.rowDesc}>{p.desc}</span>
              </div>
            </div>
          ))}
          <div style={piStyles.dividerWrap}>
            <div style={piStyles.dividerNode}></div>
            <div style={piStyles.divider}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const piStyles = {
  page: { minHeight: '100vh', background: '#FAFAF7', backgroundImage: 'radial-gradient(circle,rgba(17,17,17,0.04) 1px,transparent 1px)', backgroundSize: '20px 20px' },
  container: { maxWidth: 680, margin: '0 auto', padding: '40px 20px 64px' },
  header: { marginBottom: 32 },
  sectionNum: { display: 'block', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#1B3A5C', letterSpacing: '0.02em', marginBottom: 4 },
  h1: { fontFamily: "'EB Garamond',serif", fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 400, color: '#111', margin: 0 },
  dividerWrap: { position: 'relative' },
  dividerNode: { position: 'absolute', top: -3, left: 0, width: 5, height: 5, background: '#1B3A5C', borderRadius: '50%', zIndex: 1 },
  divider: { borderTop: '1px solid rgba(17,17,17,0.12)' },
  row: { display: 'grid', gridTemplateColumns: '1fr auto', gridTemplateRows: 'auto auto', columnGap: 16, alignItems: 'baseline', padding: '14px 0', minHeight: 44, cursor: 'pointer', transition: 'background 0.1s' },
  rowHover: { background: 'rgba(27,58,92,0.04)', margin: '0 -20px', padding: '14px 20px' },
  rowTitle: { fontFamily: "'EB Garamond',serif", fontSize: 17, color: '#111', gridColumn: 1, gridRow: 1 },
  rowDate: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#555', letterSpacing: '0.02em', gridColumn: 2, gridRow: 1, whiteSpace: 'nowrap' },
  rowDesc: { fontFamily: "'EB Garamond',serif", fontStyle: 'italic', fontSize: 15, color: '#555', gridColumn: '1 / -1', gridRow: 2, marginTop: 2 },
};

Object.assign(window, { ProjectsIndex, PROJECTS });
