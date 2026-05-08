// ExperiencePage.jsx — Lockheed Martin + IEEE timeline

const EXPERIENCE = [
  {
    id: 'lockheed', title: 'CWEP — Test Engineering', org: 'Lockheed Martin', date: 'Apr 2024 – Apr 2026',
    logo: '../../assets/lockheed_martin_logo.jpg',
    desc: 'Component-level failure analysis and root-cause investigations on sensor hardware. Designed and fabricated custom RF test fixtures using SolidWorks and FDM to improve signal integrity. Managed calibration schedules across a large inventory of test assets and mentored incoming CWEPs.',
    specs: [['Role','CWEP – Test Engineering'],['Employer','Lockheed Martin'],['Period','Apr 2024 – Apr 2026'],['Location','Orlando, FL'],['Focus','RF Signal Integrity, Sensor HW'],['Tools','SolidWorks, FDM, KiCad, LTSpice']],
  },
  {
    id: 'ieee-president', title: 'President', org: 'IEEE UCF', date: 'Apr 2025 – Apr 2026',
    logo: '../../assets/ieee_ucf_logo.jpg',
    desc: 'Oversaw the largest EE student organization at UCF — a board of 13 officers across six functional areas supporting nearly 500 active members. Coordinated 30 events with major companies including AMD and Northrop Grumman.',
    specs: [['Role','President'],['Org','IEEE UCF'],['Period','Apr 2025 – Apr 2026'],['Members','~500 active'],['Events','30 (AMD, Northrop Grumman, …)'],['Board','13 officers, 6 areas']],
  },
  {
    id: 'ieee-project-chair', title: 'Project Chair', org: 'IEEE UCF', date: 'Apr 2024 – Apr 2025',
    logo: '../../assets/ieee_ucf_logo.jpg',
    desc: 'Coordinated across multiple technical areas, implementing a formal BOM-based budget approval process. Delivered technical presentations that significantly increased chapter active membership.',
    specs: [['Role','Project Chair'],['Org','IEEE UCF'],['Period','Apr 2024 – Apr 2025']],
  },
  {
    id: 'lead-scholars', title: 'LEAD Scholars Member', org: 'UCF', date: 'Mar 2023 – Apr 2025',
    logo: '../../assets/university_of_central_florida_logo.jpg',
    desc: 'Two-year leadership development program focused on servant leadership and community service. Dedicated time to Hope Helps, SERV, FIRST Robotics, and E-Week 2024.',
    specs: [['Role','LEAD Scholars Member'],['Org','UCF LEAD Scholars Academy'],['Period','Mar 2023 – Apr 2025']],
  },
];

const ExperiencePage = ({ onNavigate }) => {
  const [hovered, setHovered] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  if (selected) {
    return <DetailPage item={selected} type="experience" onBack={() => setSelected(null)} />;
  }

  return (
    <div style={expStyles.page}>
      <StickyNav title="experience" onBack={() => onNavigate('home')} />
      <div style={expStyles.container}>
        <div style={expStyles.titleBlock}>
          <span style={expStyles.sectionNum}>§03</span>
          <h1 style={expStyles.h1}>Experience</h1>
        </div>
        <div>
          {EXPERIENCE.map((item, i) => (
            <div key={item.id}>
              <div style={expStyles.dividerWrap}>
                <div style={expStyles.dividerNode}></div>
                <div style={expStyles.divider}></div>
              </div>
              <div
                style={{...expStyles.row, ...(hovered===i ? expStyles.rowHover : {})}}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(item)}
              >
                <div style={expStyles.rowLeft}>
                  <img src={item.logo} alt={item.org} style={expStyles.logo} />
                  <div>
                    <div style={expStyles.rowTitle}>{item.title}</div>
                    <div style={expStyles.rowOrg}>{item.org}</div>
                  </div>
                </div>
                <div style={expStyles.rowDate}>{item.date}</div>
              </div>
            </div>
          ))}
          <div style={expStyles.dividerWrap}>
            <div style={expStyles.dividerNode}></div>
            <div style={expStyles.divider}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const expStyles = {
  page: { minHeight: '100vh', background: '#FAFAF7', backgroundImage: 'radial-gradient(circle,rgba(17,17,17,0.04) 1px,transparent 1px)', backgroundSize: '20px 20px' },
  container: { maxWidth: 680, margin: '0 auto', padding: '40px 20px 64px' },
  titleBlock: { marginBottom: 32 },
  sectionNum: { display: 'block', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#1B3A5C', letterSpacing: '0.02em', marginBottom: 4 },
  h1: { fontFamily: "'EB Garamond',serif", fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 400, color: '#111', margin: 0 },
  dividerWrap: { position: 'relative' },
  dividerNode: { position: 'absolute', top: -3, left: 0, width: 5, height: 5, background: '#1B3A5C', borderRadius: '50%', zIndex: 1 },
  divider: { borderTop: '1px solid rgba(17,17,17,0.12)' },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '14px 0', minHeight: 56, cursor: 'pointer', transition: 'background 0.1s' },
  rowHover: { background: 'rgba(27,58,92,0.04)', margin: '0 -20px', padding: '14px 20px' },
  rowLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  logo: { width: 28, height: 28, objectFit: 'contain', flexShrink: 0 },
  rowTitle: { fontFamily: "'EB Garamond',serif", fontSize: 17, color: '#111' },
  rowOrg: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#555', letterSpacing: '0.02em', marginTop: 2 },
  rowDate: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: '#555', letterSpacing: '0.02em', whiteSpace: 'nowrap', flexShrink: 0 },
};

Object.assign(window, { ExperiencePage, EXPERIENCE });
