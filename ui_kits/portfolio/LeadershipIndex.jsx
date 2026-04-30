// LeadershipIndex.jsx — Leadership listing page

const LEADERSHIP = [
  { id: 'ieee-president', title: 'IEEE UCF President', date: 'Apr 2025 – Apr 2026', desc: 'Led 13-officer board; coordinated 30+ events with AMD, Northrop Grumman, and others', logo: '../../assets/ieee_ucf_logo.jpg' },
  { id: 'ieee-project-chair', title: 'IEEE UCF Project Chair', date: 'Apr 2024 – Apr 2025', desc: 'Implemented BOM-based budget approval process; delivered technical presentations to 100+ students', logo: '../../assets/ieee_ucf_logo.jpg' },
  { id: 'ieee-service', title: 'IEEE UCF Service Committee', date: 'Feb 2024 – Apr 2024', desc: 'FIRST Robotics, beach cleanups, E-Week school workshops', logo: '../../assets/ieee_ucf_logo.jpg' },
  { id: 'lead-scholars', title: 'UCF LEAD Scholars Member', date: 'Mar 2023 – Apr 2025', desc: 'Two-year servant leadership program; volunteered with Hope Helps, SERV, First Robotics', logo: '../../assets/university_of_central_florida_logo.jpg' },
];

const LeadershipIndex = ({ onNavigate, onSelectLeadership }) => {
  const [hovered, setHovered] = React.useState(null);
  return (
    <div style={liStyles.page}>
      <StickyNav title="leadership" onBack={() => onNavigate('home')} />
      <div style={liStyles.container}>
        <div style={liStyles.header}>
          <span style={liStyles.sectionNum}>§02</span>
          <h1 style={liStyles.h1}>Leadership</h1>
        </div>
        <div>
          {LEADERSHIP.map((item, i) => (
            <div key={item.id}>
              <div style={liStyles.dividerWrap}>
                <div style={liStyles.dividerNode}></div>
                <div style={liStyles.divider}></div>
              </div>
              <div
                style={{...liStyles.row, ...(hovered === i ? liStyles.rowHover : {})}}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelectLeadership(item)}
              >
                <span style={liStyles.rowTitle}>{item.title}</span>
                <span style={liStyles.rowDate}>{item.date}</span>
                <span style={liStyles.rowDesc}>{item.desc}</span>
              </div>
            </div>
          ))}
          <div style={liStyles.dividerWrap}>
            <div style={liStyles.dividerNode}></div>
            <div style={liStyles.divider}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const liStyles = {
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

Object.assign(window, { LeadershipIndex, LEADERSHIP });
