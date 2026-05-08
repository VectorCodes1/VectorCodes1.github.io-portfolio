// DetailPage.jsx — Project or Leadership detail with spec block + photo gallery

const DetailPage = ({ item, type, onBack }) => {
  const [zoomSrc, setZoomSrc] = React.useState(null);

  const specs = item.specs || defaultSpecs(item, type);
  const photos = item.photos || [];

  return (
    <div style={dpStyles.page}>
      {zoomSrc && (
        <div style={dpStyles.zoomOverlay} onClick={() => setZoomSrc(null)}>
          <img src={zoomSrc} alt="zoomed" style={dpStyles.zoomImg} />
        </div>
      )}

      <StickyNav title={item.id} onBack={onBack} />

      <div style={dpStyles.container}>
        {/* Title */}
        <div style={dpStyles.titleBlock}>
          <span style={dpStyles.sectionNum}>{type === 'project' ? '§01' : '§02'} {type}</span>
          <h1 style={dpStyles.h1}>{item.title}</h1>
        </div>

        {/* Spec Block */}
        <dl style={dpStyles.specBlock}>
          {specs.map(([k, v]) => (
            <React.Fragment key={k}>
              <dt style={dpStyles.specKey}>{k}</dt>
              <dd style={dpStyles.specVal}>{v}</dd>
            </React.Fragment>
          ))}
        </dl>

        {/* Context */}
        <p style={dpStyles.body}>{item.desc}</p>

        {/* Gallery */}
        {photos.length > 0 && (
          <div style={dpStyles.gallery}>
            {photos.map((photo, i) => (
              <figure key={i} style={dpStyles.figure}>
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  style={dpStyles.img}
                  onClick={() => setZoomSrc(photo.src)}
                />
                <figcaption style={dpStyles.caption}>
                  Fig. {i + 1} — {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function defaultSpecs(item, type) {
  if (type === 'project') {
    return [
      ['Date', item.date],
      ['Tools', 'KiCad, LTSpice, MATLAB'],
      ['Status', 'Completed'],
    ];
  }
  return [
    ['Role', item.title],
    ['Period', item.date],
    ['Organization', 'IEEE UCF'],
  ];
}

const dpStyles = {
  page: { minHeight: '100vh', background: '#FAFAF7', backgroundImage: 'radial-gradient(circle,rgba(17,17,17,0.04) 1px,transparent 1px)', backgroundSize: '20px 20px' },
  container: { maxWidth: 680, margin: '0 auto', padding: '40px 20px 96px' },
  titleBlock: { marginBottom: 32 },
  sectionNum: { display: 'block', fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#1B3A5C', letterSpacing: '0.02em', marginBottom: 6, textTransform: 'lowercase' },
  h1: { fontFamily: "'EB Garamond',serif", fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 400, color: '#111', margin: 0 },
  specBlock: { display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '5px 40px', padding: '16px 0', borderTop: '1px solid rgba(17,17,17,0.12)', borderBottom: '1px solid rgba(17,17,17,0.12)', marginBottom: 32, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.02em', listStyle: 'none' },
  specKey: { color: '#555', fontWeight: 400 },
  specVal: { color: '#111', fontWeight: 500 },
  body: { fontFamily: "'EB Garamond',serif", fontSize: 17, lineHeight: 1.65, color: '#111', marginBottom: 0, textWrap: 'pretty' },
  gallery: { display: 'flex', flexDirection: 'column', gap: 48, marginTop: 48 },
  figure: { margin: 0 },
  img: { width: '100%', display: 'block', cursor: 'zoom-in' },
  caption: { fontFamily: "'EB Garamond',serif", fontStyle: 'italic', fontSize: 14, color: '#555', marginTop: 8 },
  zoomOverlay: { position: 'fixed', inset: 0, background: 'rgba(17,17,17,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, cursor: 'zoom-out' },
  zoomImg: { maxWidth: '95vw', maxHeight: '92vh', objectFit: 'contain' },
};

Object.assign(window, { DetailPage });
