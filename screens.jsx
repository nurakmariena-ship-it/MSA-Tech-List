// screens.jsx — individual screen components for Parts Logger

const { useState, useEffect } = React;

// Shared marine top bar
function TopBar({ title, subtitle, onBack, online, lang, showLogo }) {
  const t = I18N[lang];
  return (
    <div className="topbar">
      {onBack && (
        <button className="back" onClick={onBack} aria-label="Back">
          <I.Arrow size={18} color="#F5EEDC" />
        </button>
      )}
      {showLogo && !onBack && (
        <div style={{
          background: '#F5EEDC',
          borderRadius: 10,
          padding: '8px 12px',
          display: 'flex', alignItems: 'center',
          flexShrink: 0,
        }}>
          <img src="assets/msa-logo.png" alt="MSA" style={{ height: 44, width: 'auto', display: 'block' }} />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {subtitle && <div className="subtitle">{subtitle}</div>}
        <div className="title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
      </div>
      <div className={`sync-chip ${online ? '' : 'offline'}`}>
        <span className="dot" />
        {online ? (lang === 'ms' ? 'ONLINE' : 'ONLINE') : (lang === 'ms' ? 'LUAR' : 'OFFLINE')}
      </div>
    </div>
  );
}

// 1) Home — active job + list of logged items
function HomeScreen({ lang, online, log, onScan, onSearch, onUnknown, onSubmit }) {
  const t = I18N[lang];
  const totalQty = log.reduce((s, r) => s + r.qty, 0);
  return (
    <div className="screen">
      <TopBar title="Parts Logger" subtitle={lang === 'ms' ? 'MARINE SUPPLIES ASIA' : 'MARINE SUPPLIES ASIA'} online={online} lang={lang} showLogo />
      <div className="rope-divider" />

      {/* Active job card */}
      <div style={{ padding: '16px 16px 10px' }}>
        <div className="section-label">{t.job}</div>
        <div className="card" style={{ background: '#0B2A3B', color: 'var(--cream)', borderColor: 'transparent' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{t.boat}</div>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 0.3, display: 'flex', alignItems: 'center', gap: 8 }}>
                <I.Boat size={22} color="#B8894D" /> SV Sula
              </div>
              <div className="mono" style={{ fontSize: 11, opacity: 0.7, marginTop: 6 }}>PRJ-2026-0418 · Kuah Jetty</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: 1, textTransform: 'uppercase' }}>{t.items_logged}</div>
              <div className="mono" style={{ fontSize: 32, fontWeight: 700, color: '#F5EEDC', lineHeight: 1 }}>{totalQty}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 14, paddingTop: 12, borderTop: '1px dashed rgba(255,255,255,0.18)' }}>
            <div>
              <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 1, textTransform: 'uppercase' }}>{t.tech}</div>
              <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <I.User size={14} color="#F5EEDC" /> Hafifi
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, opacity: 0.6, letterSpacing: 1, textTransform: 'uppercase' }}>{t.date}</div>
              <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <I.Calendar size={14} color="#F5EEDC" /> 23 Apr 2026
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scan CTA */}
      <div style={{ padding: '4px 16px 10px' }}>
        <button className="btn primary full lg" onClick={onScan} style={{ padding: '18px', fontSize: 17 }}>
          <I.Scan size={22} color="#F5EEDC" />
          {t.scan_product}
        </button>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button className="btn ghost" onClick={onSearch} style={{ flex: 1, fontSize: 13 }}>
            <I.Search size={16} /> {lang === 'ms' ? 'Cari' : 'Search'}
          </button>
          <button className="btn ghost" onClick={onUnknown} style={{ flex: 1, fontSize: 13 }}>
            <I.Question size={16} /> {lang === 'ms' ? 'Tak Dikenali' : 'Unknown'}
          </button>
        </div>
      </div>

      <div className="rope-divider thin" style={{ margin: '6px 16px' }} />

      {/* Usage log */}
      <div style={{ padding: '10px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="section-label">{t.usage_log}</div>
        {log.length === 0 && (
          <div className="card tinted" style={{ textAlign: 'center', padding: '28px 14px', borderStyle: 'dashed' }}>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>
              {lang === 'ms' ? 'Belum ada item. Imbas produk pertama anda.' : 'No items yet. Scan your first product.'}
            </div>
          </div>
        )}
        {log.map((row, i) => (
          <div key={i} className="line-item">
            <div>
              <div className="name">{row.name}</div>
              <div className="code mono">{row.code}</div>
            </div>
            <div>
              <div className="qty">{row.qty}</div>
              <div className="uom">{row.uom === 'm' ? t.metres : (row.qty === 1 ? t.unit : t.units)}</div>
            </div>
            {row.unknown && (
              <div style={{ gridColumn: '1 / -1', marginTop: 4 }}>
                <span className="chip bad" style={{ fontSize: 10 }}>
                  <I.Question size={11} color="#D9523A" /> {t.flag_review}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit */}
      {log.length > 0 && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--line-2)', paddingTop: 12 }}>
          <button className="btn primary full" onClick={onSubmit}>
            <I.Cloud size={18} color="#F5EEDC" /> {t.submit_job}
          </button>
        </div>
      )}
    </div>
  );
}

// 2) Scan camera view
function ScanScreen({ lang, online, onBack, onDetect }) {
  const t = I18N[lang];
  // Simulate auto-detect after a moment
  useEffect(() => {
    const id = setTimeout(() => onDetect(CATALOG[0]), 2400);
    return () => clearTimeout(id);
  }, []);
  return (
    <div className="screen" style={{ background: '#000' }}>
      <div className="topbar" style={{ background: 'transparent', borderBottom: 'none', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2 }}>
        <button className="back" onClick={onBack}>
          <I.Close size={18} color="#F5EEDC" />
        </button>
        <div style={{ flex: 1 }}>
          <div className="subtitle">{t.scan_product}</div>
          <div className="title">{t.scan_hint}</div>
        </div>
        <div className="sync-chip" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <I.Flash size={14} color="#F5EEDC" />
        </div>
      </div>
      <div className="viewfinder">
        <div className="scan-target">
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
          <div className="scan-line" />
          {/* Faux product label peeking into view */}
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%) rotate(-3deg)',
            background: '#fff',
            padding: '14px 18px',
            borderRadius: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center',
          }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: 1, color: '#555' }}>ASIA PUMP</div>
            <div className="barcode">
              {[2,1,3,1,2,3,1,2,1,3,2,1,3,1,2,2,1,3,1,2,3,1,2,1,3,2].map((w,i)=>(
                <span key={i} style={{ width: w*1.5 }} />
              ))}
            </div>
            <div className="mono" style={{ fontSize: 11, color: '#111', letterSpacing: 1.5 }}>9 556789 001234</div>
          </div>
        </div>
        {/* Bottom hint */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 32,
          textAlign: 'center', color: '#F5EEDC', fontSize: 13,
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
        }}>
          <div style={{ opacity: 0.9 }}>{t.scan_hint}</div>
          <div style={{ marginTop: 4, fontSize: 11, opacity: 0.65, letterSpacing: 0.5 }}>
            EAN · CODE-128 · QR
          </div>
        </div>
      </div>
    </div>
  );
}

// 3) Scan match result
function MatchScreen({ lang, online, product, onBack, onConfirm }) {
  const t = I18N[lang];
  return (
    <div className="screen">
      <TopBar title={t.scan_success} subtitle={lang === 'ms' ? 'LANGKAH 3 / 5' : 'STEP 3 OF 5'} onBack={onBack} online={online} lang={lang} />
      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Success banner */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(31,138,76,0.08)',
          border: '1px solid rgba(31,138,76,0.25)',
          borderRadius: 12, padding: '10px 12px',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--ok)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <I.Check size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ok)' }}>{t.scan_success}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>EAN · {product.barcode}</div>
          </div>
        </div>

        {/* Product card */}
        <div className="card">
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            {/* Placeholder image */}
            <div style={{
              width: 80, height: 80, flexShrink: 0,
              borderRadius: 10,
              background: 'repeating-linear-gradient(45deg, #EADFC5 0 6px, #F5EEDC 6px 12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px dashed var(--rope)',
            }}>
              <I.Pkg size={32} color="#B8894D" />
            </div>
            <div style={{ flex: 1 }}>
              <div className="chip ghost" style={{ marginBottom: 6 }}>{product.brand}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.25 }}>
                {product.name}
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>{product.category}</div>
            </div>
          </div>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, borderTop: '1px dashed var(--line)', paddingTop: 10 }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 1, textTransform: 'uppercase' }}>Product code</div>
              <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{product.code}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 1, textTransform: 'uppercase' }}>Location</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{product.location}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 1, textTransform: 'uppercase' }}>On hand</div>
              <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{product.stock} {product.uom}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 1, textTransform: 'uppercase' }}>Unit</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--navy)' }}>{product.uom === 'm' ? 'per metre' : 'each'}</div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <button className="btn primary full lg" onClick={onConfirm}>
          {t.confirm_add} <I.Arrow size={18} color="#F5EEDC" style={{ transform: 'rotate(180deg)' }}/>
        </button>
        <button className="btn ghost full" onClick={onBack}>
          <I.Scan size={16} /> {lang === 'ms' ? 'Imbas semula' : 'Scan again'}
        </button>
      </div>
    </div>
  );
}

// 4) Quantity entry
function QtyScreen({ lang, online, product, onBack, onSave }) {
  const t = I18N[lang];
  const [qty, setQty] = useState(1);
  const isMetres = product.uom === 'm';
  return (
    <div className="screen">
      <TopBar title={t.quantity} subtitle={lang === 'ms' ? 'LANGKAH 4 / 5' : 'STEP 4 OF 5'} onBack={onBack} online={online} lang={lang} />
      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Compact product summary */}
        <div className="card tinted">
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>{product.name}</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{product.code}</div>
        </div>

        {/* Stepper */}
        <div style={{ background: '#fff', border: '1px solid var(--line-2)', borderRadius: 14, padding: '8px 10px 18px' }}>
          <div className="stepper">
            <button onClick={() => setQty(Math.max(isMetres ? 0.5 : 1, qty - (isMetres ? 0.5 : 1)))}>
              <I.Minus size={26} color="#0B2A3B" />
            </button>
            <div>
              <div className="value">{isMetres ? qty.toFixed(1) : qty}</div>
              <div className="uom-label">{isMetres ? t.metres : (qty === 1 ? t.unit : t.units)}</div>
            </div>
            <button onClick={() => setQty(qty + (isMetres ? 0.5 : 1))}>
              <I.Plus size={26} color="#0B2A3B" />
            </button>
          </div>
          {/* quick presets */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 4 }}>
            {(isMetres ? [1, 5, 10, 20] : [1, 2, 5, 10]).map(n => (
              <button
                key={n}
                onClick={() => setQty(n)}
                style={{
                  appearance: 'none',
                  border: '1px solid var(--line)',
                  background: qty === n ? 'var(--navy)' : '#fff',
                  color: qty === n ? 'var(--cream)' : 'var(--ink-2)',
                  padding: '6px 14px',
                  borderRadius: 100,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >{n}</button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <button className="btn primary full lg" onClick={() => onSave(qty)}>
          <I.Check size={18} color="#F5EEDC" /> {t.save_item}
        </button>
        <button className="btn ghost full" onClick={onBack}>{t.cancel}</button>
      </div>
    </div>
  );
}

// 5) Manual search
function SearchScreen({ lang, online, onBack, onPick }) {
  const t = I18N[lang];
  const [q, setQ] = useState('');
  const [fullCat, setFullCat] = useState(null);
  useEffect(() => {
    fetch('catalogue.json')
      .then(r => r.json())
      .then(data => setFullCat(data))
      .catch(() => {});
  }, []);
  const source = fullCat || CATALOG;
  const query = q.toLowerCase().trim();
  const results = !query
    ? source.slice(0, 40)
    : source.filter(p =>
        (p.code || '').toLowerCase().includes(query) ||
        (p.name || '').toLowerCase().includes(query) ||
        (p.brand || '').toLowerCase().includes(query)
      ).slice(0, 40);
  const totalMatches = !query
    ? source.length
    : source.filter(p =>
        (p.code || '').toLowerCase().includes(query) ||
        (p.name || '').toLowerCase().includes(query) ||
        (p.brand || '').toLowerCase().includes(query)
      ).length;
  return (
    <div className="screen">
      <TopBar title={t.manual_search} onBack={onBack} online={online} lang={lang} />
      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="field">
          <label>{t.search_placeholder}</label>
          <div style={{ position: 'relative' }}>
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="MP-100 · Shroud · Pump…"
              style={{ paddingLeft: 40, width: '100%' }}
            />
            <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }}>
              <I.Search size={18} />
            </div>
          </div>
        </div>
        <div className="section-label">{t.results} · {totalMatches}{totalMatches > 40 ? ` (showing 40)` : ''}{!fullCat ? ' · loading…' : ''}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {results.map(p => (
            <button
              key={p.code}
              onClick={() => onPick({ ...p, uom: p.uom || 'ea', brand: p.brand || 'MSA', category: p.category || '—', barcode: p.barcode || p.code, location: p.location || '—', stock: p.stock ?? '—' })}
              style={{
                appearance: 'none', border: '1px solid var(--line-2)',
                background: '#fff', textAlign: 'left',
                borderRadius: 12, padding: 12, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <div style={{
                width: 40, height: 40, flexShrink: 0, borderRadius: 8,
                background: 'repeating-linear-gradient(45deg, #EADFC5 0 5px, #F5EEDC 5px 10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px dashed var(--rope)',
              }}>
                <I.Pkg size={18} color="#B8894D" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.name}
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{p.code}</div>
              </div>
              {p.price != null && (
                <div className="mono" style={{ fontSize: 12, color: 'var(--navy)', fontWeight: 600, flexShrink: 0 }}>
                  {typeof p.price === 'number' ? p.price.toFixed(2) : p.price}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// 6) Unknown item
function UnknownScreen({ lang, online, onBack, onSave }) {
  const t = I18N[lang];
  const [desc, setDesc] = useState('Cable offcut — 4mm² red');
  const [qty, setQty] = useState(1.5);
  const [hasPhoto, setHasPhoto] = useState(true);
  return (
    <div className="screen">
      <TopBar title={t.unknown_title} onBack={onBack} online={online} lang={lang} />
      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{t.unknown_sub}</div>

        {/* Photo slot */}
        <button
          onClick={() => setHasPhoto(!hasPhoto)}
          style={{
            appearance: 'none', border: '1.5px dashed var(--rope)',
            background: hasPhoto ? 'var(--navy)' : 'var(--cream)',
            borderRadius: 12,
            height: 140,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 10, cursor: 'pointer',
            color: hasPhoto ? 'var(--cream)' : 'var(--ink-2)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {hasPhoto ? (
            <>
              <div style={{ position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent), repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 8px, transparent 8px 16px)' }} />
              <div style={{ position: 'relative', textAlign: 'center' }}>
                <I.Camera size={28} color="#F5EEDC" />
                <div style={{ fontSize: 12, marginTop: 6, opacity: 0.8 }}>IMG_20260423_1142.jpg</div>
              </div>
            </>
          ) : (
            <>
              <I.Camera size={26} color="#B8894D" />
              <div style={{ fontSize: 14, fontWeight: 500 }}>{t.take_photo}</div>
            </>
          )}
        </button>

        <div className="field">
          <label>{t.description}</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
            style={{ resize: 'none', fontFamily: 'inherit' }}
          />
        </div>

        <div className="field">
          <label>{t.quantity}</label>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              onClick={() => setQty(Math.max(0.5, qty - 0.5))}
              style={{
                width: 44, height: 44, borderRadius: 10,
                border: '1px solid var(--line)', background: '#fff',
                fontSize: 20, fontWeight: 600, color: 'var(--navy)', cursor: 'pointer',
              }}
            >−</button>
            <input
              value={qty}
              onChange={(e) => setQty(parseFloat(e.target.value) || 0)}
              style={{ flex: 1, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 600 }}
            />
            <button
              onClick={() => setQty(qty + 0.5)}
              style={{
                width: 44, height: 44, borderRadius: 10,
                border: '1px solid var(--line)', background: '#fff',
                fontSize: 20, fontWeight: 600, color: 'var(--navy)', cursor: 'pointer',
              }}
            >+</button>
          </div>
        </div>

        <div style={{
          background: 'rgba(217,82,58,0.06)', border: '1px solid rgba(217,82,58,0.2)',
          borderRadius: 10, padding: 10,
          display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--bad)',
        }}>
          <I.Question size={16} color="#D9523A" />
          <span>{t.flag_review}</span>
        </div>

        <div style={{ flex: 1 }} />

        <button
          className="btn primary full lg"
          onClick={() => onSave({ code: 'UNKNOWN-' + Date.now().toString().slice(-5), name: desc, qty, uom: 'ea', unknown: true })}
        >
          <I.Check size={18} color="#F5EEDC" /> {t.save_item}
        </button>
      </div>
    </div>
  );
}

// 7) Submit confirmation
function SubmitScreen({ lang, online, itemCount, onDone }) {
  const t = I18N[lang];
  return (
    <div className="screen">
      <TopBar title={t.sync_done} online={online} lang={lang} />
      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, textAlign: 'center' }}>
        <div className="success-seal">
          <I.Check size={54} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>{t.sync_done}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55, maxWidth: 280 }}>{t.sync_sub}</div>
        </div>
        <div className="card tinted" style={{ width: '100%', textAlign: 'left' }}>
          <div className="section-label" style={{ marginBottom: 10 }}>{lang === 'ms' ? 'RINGKASAN HANTARAN' : 'SUBMISSION SUMMARY'}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0' }}>
            <span style={{ color: 'var(--ink-2)' }}>{t.boat}</span>
            <span style={{ fontWeight: 600, color: 'var(--navy)' }}>SV Sula</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0' }}>
            <span style={{ color: 'var(--ink-2)' }}>{t.tech}</span>
            <span style={{ fontWeight: 600, color: 'var(--navy)' }}>Hafifi</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0' }}>
            <span style={{ color: 'var(--ink-2)' }}>{t.items_logged}</span>
            <span className="mono" style={{ fontWeight: 700, color: 'var(--navy)' }}>{itemCount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderTop: '1px dashed var(--line)', marginTop: 4, paddingTop: 10 }}>
            <span style={{ color: 'var(--ink-2)' }}>{lang === 'ms' ? 'Destinasi' : 'Destination'}</span>
            <span className="mono" style={{ fontWeight: 600, color: 'var(--navy)', fontSize: 11 }}>MarineOps.xlsx › ProjectUsage</span>
          </div>
        </div>
        <button className="btn primary full lg" onClick={onDone}>
          <I.Arrow size={18} color="#F5EEDC" style={{ transform: 'rotate(180deg)' }} /> {t.done}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { TopBar, HomeScreen, ScanScreen, MatchScreen, QtyScreen, SearchScreen, UnknownScreen, SubmitScreen });
