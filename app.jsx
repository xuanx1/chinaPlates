/* global React, ReactDOM, PROVINCES, PLATE_TYPES, ANATOMY, MAP_PATHS, MAP_LABELS */
const { useState, useEffect, useRef, useMemo } = React;

/* ---------- Plate component ---------- */
function Plate({ chars, bg, fg, accent, size = 'hero', className = '' }) {
  const styleObj = {};
  if (bg && bg.startsWith('linear-gradient')) styleObj.background = bg;
  else styleObj.background = bg;
  if (fg) styleObj.color = fg;

  return (
    <div className={`plate has-texture size-${size} ${chars.length >= 9 ? 'has-8' : ''} ${bg === '#000000' ? 'bolts-light' : ''} ${className}`} style={styleObj}>
      {chars.map((ch, i) => {
        const isHanzi = /[\u4e00-\u9fa5]/.test(ch);
        const isDot = ch === '·';
        const isAccentChar = accent && (ch === '警' || ch === '使');
        const charStyle = isAccentChar ? { color: accent } : {};
        return (
          <span
            key={i}
            className={`plate-char ${isHanzi ? 'hanzi' : ''} ${isDot ? 'dot' : ''}`}
            style={charStyle}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
}

/* ---------- Scroll reveal hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .diagram');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view');
      });
    }, { threshold: 0.2 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Hero ---------- */
function HeroDiagram({ chars, bg, fg }) {
  const wrapRef = useRef(null);
  const plateRef = useRef(null);
  const [geo, setGeo] = useState(null);

  useEffect(() => {
    function measure() {
      const wrap = wrapRef.current;
      const plate = plateRef.current && plateRef.current.querySelector('.plate');
      if (!wrap || !plate) return;
      const wr = wrap.getBoundingClientRect();
      const pr = plate.getBoundingClientRect();
      const slots = plate.querySelectorAll('.plate-char');
      const centers = Array.from(slots).map(s => {
        const sr = s.getBoundingClientRect();
        return { cx: sr.left + sr.width/2 - wr.left, top: sr.top - wr.top, bot: sr.bottom - wr.top };
      });
      setGeo({
        w: wr.width, h: wr.height,
        plateTop: pr.top - wr.top,
        plateBot: pr.bottom - wr.top,
        slots: centers
      });
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, []);

  // All four labels below the plate, anchored under their target slot
  const ribbons = [
    { num: '01', label: 'Province', cn: '省份简称', slot: 0, level: 0 },
    { num: '02', label: 'Issuing Authority', cn: '发牌机关', slot: 1, level: 1 },
    { num: '03', label: 'Separator', cn: '分隔符', slot: 2, level: 0 },
    { num: '04', label: 'Sequence', cn: '序号', slot: 'sequence', level: 1 },
  ];

  return (
    <div className="diagram" ref={wrapRef}>
      <div ref={plateRef}>
        <Plate chars={chars} bg={bg} fg={fg} size="hero" />
      </div>

      {geo && (
        <svg className="diagram-svg" viewBox={`0 0 ${geo.w} ${geo.h}`} preserveAspectRatio="none">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="#9a9a9a" />
            </marker>
          </defs>
          {ribbons.map((r, i) => {
            const startY = geo.plateBot - 64;
            const dropY = geo.plateBot + 6 + r.level * 70;

            if (r.slot === 'sequence') {
              const first = geo.slots[3];
              const last = geo.slots[7];
              if (!first || !last) return null;
              const left = first.cx - 32;
              const right = last.cx + 32;
              const midX = (left + right) / 2;
              const bracketY = startY + 5;
              const bracketD = `M ${left} ${bracketY - 8} L ${left} ${bracketY} L ${right} ${bracketY} L ${right} ${bracketY - 8}`;
              const dropD = `M ${midX} ${bracketY} L ${midX} ${dropY}`;
              return (
                <g key={i} style={{ transitionDelay: `${i * 150}ms` }}>
                  <path className="annot-line" d={bracketD} style={{ transitionDelay: `${i * 150}ms` }} />
                  <path className="annot-line" d={dropD} style={{ transitionDelay: `${i * 150 + 200}ms` }} />
                </g>
              );
            }

            const slot = geo.slots[r.slot];
            if (!slot) return null;
            const startX = slot.cx;
            const sY = r.slot === 2 ? startY - 60 : startY;
            const d = `M ${startX} ${sY} L ${startX} ${dropY}`;
            return (
              <g key={i} style={{ transitionDelay: `${i * 150}ms` }}>
                <path className="annot-line" d={d} markerStart="url(#arrow)" style={{ transitionDelay: `${i * 150}ms` }} />
                <circle className="annot-dot" cx={startX} cy={sY} r="2.5" style={{ transitionDelay: `${i * 150 + 400}ms` }} />
              </g>
            );
          })}
        </svg>
      )}

      {geo && ribbons.map((r, i) => {
        let cx;
        if (r.slot === 'sequence') {
          const first = geo.slots[3];
          const last = geo.slots[7];
          if (!first || !last) return null;
          cx = (first.cx + last.cx) / 2;
        } else {
          const slot = geo.slots[r.slot];
          if (!slot) return null;
          cx = slot.cx;
        }
        const top = geo.plateBot + 12 + r.level * 70;
        return (
          <div
            key={i}
            className={`annot-label delay-${i + 1}`}
            style={{
              left: cx,
              top,
              transform: 'translateX(-50%)',
              textAlign: 'center'
            }}
          >
            <span className="lbl">{r.label}</span>
            <span className="cn">{r.cn}</span>
          </div>
        );
      })}
    </div>
  );
}

function Hero({ currentProvince, setCurrentProvince }) {
  const [seq, setSeq] = useState(['F', '0', 'A', '8', '8']);
  const cityLetter = 'A';

  useEffect(() => {
    const id = setInterval(() => {
      const pool = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
      const next = Array.from({ length: 5 }, () => pool[Math.floor(Math.random() * pool.length)]);
      setSeq(next);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  const chars = [currentProvince.char, cityLetter, '·', ...seq];

  return (
    <section id="hero">
      <div className="sec-num reveal">§ 01 — THE PLATE</div>
      <h2 className="sec-head reveal">Seven characters. Thirty-one provinces. One billion possibilities.</h2>
      <p className="sec-dek reveal delay-1">
        Every car in mainland China carries a plate that begins with a single Chinese character — the abbreviation of the
        province where it was registered. What follows is a code: a letter for the city, a dot, and five
        alphanumeric digits chosen from a constrained alphabet.
      </p>

      <div className="hero-stage">
        <HeroDiagram chars={chars} bg="#1e4fa3" fg="#ffffff" />

        <div className="ticker reveal">
          <div className="ticker-label">Tap a province character to swap the plate</div>
          <div className="ticker-grid">
            {PROVINCES.map((p) => (
              <div
                key={p.char}
                className={`ticker-cell ${p.char === currentProvince.char ? 'active' : ''}`}
                onClick={() => setCurrentProvince(p)}
                title={`${p.name} · ${p.pinyin}`}
              >
                <span className="tc-char">{p.char}</span>
                <span className="tc-pinyin">{p.pinyin}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Map ---------- */
function ChinaMap({ active, setActive }) {
  const wrapRef = useRef(null);
  const [tip, setTip] = useState({ show: false, x: 0, y: 0, p: null });

  function handleEnter(p, e) {
    const rect = wrapRef.current.getBoundingClientRect();
    setTip({ show: true, x: e.clientX - rect.left, y: e.clientY - rect.top, p });
  }
  function handleMove(e) {
    const rect = wrapRef.current.getBoundingClientRect();
    setTip((t) => ({ ...t, x: e.clientX - rect.left, y: e.clientY - rect.top }));
  }
  function handleLeave() { setTip((t) => ({ ...t, show: false })); }

  return (
    <section id="map">
      <div className="sec-num reveal">§ 02 — GEOGRAPHY</div>
      <h2 className="sec-head reveal">A character for every place a car might be born.</h2>
      <p className="sec-dek reveal delay-1">
        Twenty-three provinces, five autonomous regions, and four direct-controlled municipalities each
        get a single hanzi. Some are obvious — 京 for Beijing, 沪 for Shanghai. Others are archaic: 鲁 for
        Shandong, 粤 for Guangdong, 黔 once stood for Guizhou before the simpler 贵 took over.
      </p>

      <div className="map-wrap">
        <div ref={wrapRef} style={{ position: 'relative' }} onMouseMove={handleMove}>
          <svg className="map-svg" viewBox={window.MAP_VIEWBOX || "0 0 1000 700"} xmlns="http://www.w3.org/2000/svg">
            {/* Outer hint */}
            <text x="40" y="60" fontFamily="var(--sans)" fontSize="11" fill="#999" letterSpacing="0.2em">CHINA · 中国</text>
            <text x="40" y="78" fontFamily="var(--serif)" fontSize="13" fill="#666" fontStyle="italic">31 plate-issuing regions</text>

            {PROVINCES.map((p) => {
              const d = MAP_PATHS[p.char];
              if (!d) return null;
              const isActive = active && active.char === p.char;
              return (
                <path
                  key={p.char}
                  d={d}
                  className={`map-province ${isActive ? 'active' : ''}`}
                  onMouseEnter={(e) => handleEnter(p, e)}
                  onMouseLeave={handleLeave}
                  onClick={() => setActive(p)}
                />
              );
            })}
            {PROVINCES.map((p) => {
              const pos = MAP_LABELS[p.char];
              if (!pos) return null;
              const isActive = active && active.char === p.char;
              return (
                <g key={`l-${p.char}`} className={`map-label-g ${isActive ? 'on-active' : ''}`}>
                  <text
                    x={pos[0]} y={pos[1] - 5}
                    className={`map-label ${isActive ? 'on-active' : ''}`}
                  >
                    {p.char}
                  </text>
                  <text
                    x={pos[0]} y={pos[1] + 9}
                    className={`map-pinyin ${isActive ? 'on-active' : ''}`}
                  >
                    {p.pinyin}
                  </text>
                </g>
              );
            })}
          </svg>

          {tip.show && tip.p && (
            <div className="map-tooltip show" style={{ left: tip.x, top: tip.y }}>
              <strong>{tip.p.char} — {tip.p.name}</strong>
              <span className="pinyin">{tip.p.pinyin}</span>
              <div style={{ marginTop: 4 }}>{tip.p.region} · {tip.p.pop}</div>
            </div>
          )}
        </div>

        {/* Detail card */}
        <div className="detail-card">
          {active ? (
            <>
              <div className="char-wrap">
                <div className="big-char">{active.char}</div>
                <div className="pinyin">{active.pinyin}</div>
              </div>
              <div className="name">{active.name}</div>
              <div className="en">{active.en}</div>
              <div className="stat-row">
                <div>
                  <div className="stat-label">Capital</div>
                  <div className="stat-val">{active.capital}</div>
                </div>
                <div>
                  <div className="stat-label">Population</div>
                  <div className="stat-val">{active.pop}</div>
                </div>
              </div>
              <div className="note">{active.note}</div>
            </>
          ) : (
            <>
              <div className="char-wrap">
                <div className="big-char" style={{ color: 'var(--rule-strong)' }}>?</div>
                <div className="pinyin">hover the map</div>
              </div>
              <div className="name">Pick a province</div>
              <div className="en">Each character below is a province's official plate prefix.</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Plate types ---------- */
function PlateTypes() {
  return (
    <section id="types">
      <div className="sec-num reveal">§ 03 — THE COLORS</div>
      <h2 className="sec-head reveal">Six color codes. One quick read of who you are on the road.</h2>
      <p className="sec-dek reveal delay-1">
        Long before you can read the characters, the plate's color tells you what kind of vehicle is coming.
        Blue is private. Yellow is heavy. Green is electric. Black is foreign. White, with a single red character,
        is a reminder you should probably let it pass.
      </p>

      <div className="types-grid">
        {PLATE_TYPES.map((t, i) => (
          <div key={t.id} className="type-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
            <Plate
              chars={t.sample}
              bg={t.bg}
              fg={t.fg}
              accent={t.accent}
              size="md"
            />
            <div className="type-meta">
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t.name}</h3>
              <span className="cn">{t.cn}</span>
            </div>
            <p>{t.desc}</p>
            <span className="issued">{t.issued}</span>
          </div>
        ))}
      </div>

      <div className="funfacts-grid reveal">
        <div className="ff">
          <div className="sec-num">FUN FACT 01</div>
          <p>
            The letters <strong>I</strong> and <strong>O</strong> never appear in the alphanumeric sequence — they
            look too much like 1 and 0.
          </p>
        </div>
        <div className="ff">
          <div className="sec-num">FUN FACT 02</div>
          <p>
            In Shanghai, a plate can cost more than the car. Auctions regularly clear at <strong>¥90,000+</strong>,
            and each round has a 90-second bidding window.
          </p>
        </div>
        <div className="ff">
          <div className="sec-num">FUN FACT 03</div>
          <p>
            The 2016 green plate added an eighth slot specifically to make EVs visually distinct — a rare format
            change in the system's 30-year history.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- App ---------- */
function App() {
  const [currentProvince, setCurrentProvince] = useState(PROVINCES.find(p => p.char === '京'));
  const [active, setActive] = useState(PROVINCES.find(p => p.char === '京'));
  useReveal();

  return (
    <div className="page">
      {/* Masthead */}
      <header className="masthead">
        <div className="kicker">A Visual Field Guide</div>
        <h1>
          Reading the <span className="accent">Chinese</span><br />
          License Plate
        </h1>
        <p className="standfirst">
          Every car in China carries seven characters that locate it in space, regulation, and class — a
          compact code spanning thirty-one provinces, six colors, and one famously expensive auction in Shanghai.
        </p>
        <div className="byline">
          <strong>The Plate Desk</strong> · Visualization · 8 min read
        </div>
      </header>

      <Hero currentProvince={currentProvince} setCurrentProvince={setCurrentProvince} />
      <ChinaMap active={active} setActive={setActive} />
      <PlateTypes />

      <div className="coda">
        <span>End · 完</span>
        <span>Sources: Ministry of Public Security · GA 36-2018</span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
