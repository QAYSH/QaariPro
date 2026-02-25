/* ============================================
   QAARI — UI Rendering Module (v3 — 20 features)
   ============================================ */

const QaariUI = (() => {
  const content = () => document.getElementById('content');

  // ── SVG Icons ──
  const ICONS = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="19,20 9,12 19,4"/><rect x="5" y="4" width="2" height="16"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,4 15,12 5,20"/><rect x="17" y="4" width="2" height="16"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    heartFilled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
    repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="17,1 21,5 17,9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7,23 3,19 7,15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"/></svg>',
    bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
    bookmarkFilled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    queue: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    moon: '☪',
  };

  // ── Helpers ──
  function formatTime(sec) {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const icons = { success: '', info: '', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type] || ''}</span>${msg}`;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('hiding'); setTimeout(() => toast.remove(), 250); }, 2500);
  }

  // ── Skeleton Loading ──
  function renderSkeletonGrid(count = 8) {
    let cards = '';
    for (let i = 0; i < count; i++) {
      cards += `<div class="skeleton-card stagger-item" style="animation-delay:${i * 0.04}s">
        <div class="skeleton-line w-30 h-lg"></div><div class="skeleton-line w-80"></div><div class="skeleton-line w-50"></div>
        <div style="display:flex;gap:8px;margin-top:auto"><div class="skeleton-line w-30" style="height:22px;border-radius:12px"></div><div class="skeleton-line w-30" style="height:22px;border-radius:12px"></div></div>
      </div>`;
    }
    return `<div class="card-grid">${cards}</div>`;
  }

  function renderLoading() {
    return `<div class="content-wrapper"><div class="section">${renderSkeletonGrid(8)}</div></div>`;
  }

  function renderError(msg, retryFn) {
    return `<div class="error-state"><div class="error-icon">⚠️</div><div class="error-title">${msg}</div>
      <div class="error-desc">Check your internet connection and try again.</div>
      <button class="btn btn-primary" style="margin-top:8px" onclick="${retryFn}">Retry</button></div>`;
  }

  // ── Reciter Avatar ──
  function reciterAvatarHTML(reciter) {
    if (reciter.image) {
      return `<img class="reciter-avatar-img" src="${reciter.image}" alt="${reciter.name}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span style="display:none;width:100%;height:100%;align-items:center;justify-content:center">${reciter.name.charAt(0)}</span>`;
    }
    return `<span>${reciter.name.charAt(0)}</span>`;
  }

  // ── Card Renderers ──
  function surahCard(surah) {
    return `<div class="surah-card stagger-item" data-surah="${surah.number}" onclick="QaariRouter.navigate('/surah/${surah.number}')">
      <div class="surah-card-top">
        <div class="surah-number">${surah.number}</div>
        <button class="surah-play-btn" onclick="event.stopPropagation(); QaariPlayer.loadSurah(${surah.number})" aria-label="Play ${surah.englishName}">${ICONS.play}</button>
      </div>
      <div class="surah-card-body">
        <div class="surah-name-arabic">${surah.name}</div>
        <div class="surah-name-english">${surah.englishName}</div>
        <div class="surah-translation">${surah.englishNameTranslation}</div>
      </div>
      <div class="surah-meta">
        <span class="badge ${surah.revelationType === 'Meccan' ? 'badge-meccan' : 'badge-medinan'}">${surah.revelationType}</span>
        <span class="badge badge-ayahs">${surah.numberOfAyahs} Ayahs</span>
      </div>
    </div>`;
  }

  function reciterCard(reciter) {
    return `<div class="reciter-card stagger-item" onclick="QaariRouter.navigate('/reciter/${reciter.id}')">
      <div class="reciter-avatar" style="background: linear-gradient(135deg, ${reciter.color}, ${reciter.color}dd)">
        ${reciterAvatarHTML(reciter)}
        <div class="reciter-play-overlay">${ICONS.play}</div>
      </div>
      <div class="reciter-name">${reciter.name}</div>
      <div class="reciter-name-arabic">${reciter.nameAr}</div>
    </div>`;
  }

  // ═══════════════════════════════════════
  // PAGE: HOME
  // ═══════════════════════════════════════
  async function renderHome() {
    content().innerHTML = renderLoading();
    try {
      const surahs = await QaariAPI.getSurahs();
      const history = QaariStorage.getHistory();
      const reciters = QaariAPI.RECITERS;
      const popular = [1, 2, 18, 36, 55, 56, 67, 78, 112, 114].map(n => surahs.find(s => s.number === n)).filter(Boolean);
      const juzAmma = surahs.filter(s => s.number >= 78);

      let html = `<div class="content-wrapper">
        <div class="hero pattern-bg"><div class="hero-content">
          <div class="hero-label">${ICONS.moon} The Noble Quran</div>
          <h1 class="hero-title">Listen to the<br/>Holy Quran</h1>
          <p class="hero-subtitle">Stream beautiful recitations from the world's most renowned Qaris. 114 Surahs, 20 reciters, verse-by-verse audio.</p>
          <div class="hero-actions">
            <button class="btn btn-primary" onclick="QaariPlayer.loadSurah(1)">${ICONS.play} Start Listening</button>
            <button class="btn btn-secondary" onclick="QaariRouter.navigate('/surahs')">${ICONS.book} Browse Surahs</button>
          </div>
        </div></div>`;

      // Continue Listening
      if (history.length > 0) {
        html += `<div class="section"><div class="section-header">
          <h2 class="section-title">Continue Listening</h2>
          <span class="section-link" onclick="if(confirm('Clear history?')){QaariStorage.clearHistory();QaariUI.renderHome()}">Clear</span>
        </div><div class="card-grid card-grid-lg">
          ${history.slice(0, 6).map(h => {
          const gradient = QaariAPI.getSurahGradient(h.surahNum);
          return `<div class="continue-card" onclick="QaariPlayer.loadSurah(${h.surahNum}, '${h.reciterId}')">
              <div class="continue-card-art" style="background: ${gradient}">${h.surahNum}</div>
              <div class="continue-card-info">
                <div class="continue-card-title">${h.surahName}</div>
                <div class="continue-card-sub">${h.reciterName} • Ayah ${h.ayahIndex + 1}</div>
              </div>
            </div>`;
        }).join('')}
        </div></div>`;
      }

      // Featured Reciters
      html += `<div class="section"><div class="section-header">
        <h2 class="section-title">Featured Reciters</h2>
        <span class="section-link" onclick="QaariRouter.navigate('/reciters')">Show all</span>
      </div><div class="card-grid">${reciters.slice(0, 6).map(r => reciterCard(r)).join('')}</div></div>`;

      // Popular Surahs
      html += `<div class="section"><div class="section-header">
        <h2 class="section-title">Popular Surahs</h2>
        <span class="section-link" onclick="QaariRouter.navigate('/surahs')">Show all</span>
      </div><div class="card-grid">${popular.map(s => surahCard(s)).join('')}</div></div>`;

      // Juz Amma
      html += `<div class="section"><div class="section-header"><h2 class="section-title">Juz 'Amma</h2></div>
        <div class="card-grid">${juzAmma.slice(0, 12).map(s => surahCard(s)).join('')}</div></div>`;

      html += '</div>';
      content().innerHTML = html;
    } catch (err) {
      content().innerHTML = renderError('Failed to load', 'QaariUI.renderHome()');
    }
  }

  // ═══════════════════════════════════════
  // PAGE: ALL SURAHS
  // ═══════════════════════════════════════
  async function renderSurahList() {
    content().innerHTML = renderLoading();
    try {
      const surahs = await QaariAPI.getSurahs();
      let filterType = 'all';
      function render() {
        let list = surahs;
        if (filterType === 'meccan') list = list.filter(s => s.revelationType === 'Meccan');
        else if (filterType === 'medinan') list = list.filter(s => s.revelationType === 'Medinan');
        content().innerHTML = `<div class="content-wrapper"><div class="section">
          <div class="section-header"><h2 class="section-title">All Surahs</h2>
            <div class="flex gap-2">
              <button class="btn btn-ghost ${filterType === 'all' ? 'text-accent' : ''}" onclick="window._surahFilter('all')">All</button>
              <button class="btn btn-ghost ${filterType === 'meccan' ? 'text-accent' : ''}" onclick="window._surahFilter('meccan')">Meccan</button>
              <button class="btn btn-ghost ${filterType === 'medinan' ? 'text-accent' : ''}" onclick="window._surahFilter('medinan')">Medinan</button>
            </div>
          </div><div class="card-grid">${list.map(s => surahCard(s)).join('')}</div>
        </div></div>`;
      }
      window._surahFilter = (type) => { filterType = type; render(); };
      render();
    } catch (err) {
      content().innerHTML = renderError('Failed to load surahs', 'QaariUI.renderSurahList()');
    }
  }

  // ═══════════════════════════════════════
  // PAGE: ALL RECITERS
  // ═══════════════════════════════════════
  function renderReciterList() {
    content().innerHTML = `<div class="content-wrapper"><div class="section">
      <div class="section-header"><h2 class="section-title">All Reciters</h2></div>
      <div class="card-grid card-grid-lg">${QaariAPI.RECITERS.map(r => reciterCard(r)).join('')}</div>
    </div></div>`;
  }

  // ═══════════════════════════════════════
  // PAGE: SURAH DETAIL (translations, bookmarks, info, share)
  // ═══════════════════════════════════════
  async function renderSurahDetail(params) {
    const surahNum = parseInt(params.id);
    content().innerHTML = renderLoading();
    try {
      const surahs = await QaariAPI.getSurahs();
      const surah = surahs.find(s => s.number === surahNum);
      if (!surah) { content().innerHTML = '<div class="empty-state"><div class="empty-title">Surah not found</div></div>'; return; }

      const currentReciter = QaariStorage.getPrefs().reciter || 'ar.alafasy';
      const currentTranslation = QaariStorage.getPrefs().translation || 'en.sahih';
      const reciter = QaariAPI.getReciter(currentReciter);
      const translationInfo = QaariAPI.getTranslation(currentTranslation);

      const [data, translation] = await Promise.all([
        QaariAPI.getSurah(surahNum, currentReciter),
        QaariAPI.getSurahTranslation(surahNum, currentTranslation).catch(() => null)
      ]);

      const gradient = QaariAPI.getSurahGradient(surahNum);
      const isFav = QaariStorage.isFavorite('surahs', surahNum);
      const playerState = QaariPlayer.getState();
      const meta = QaariAPI.getSurahMeta(surahNum);

      content().innerHTML = `<div class="content-wrapper">
        <div class="detail-header">
          <div class="detail-art" style="background: ${gradient}">
            <div class="detail-art-number">${surahNum}</div>
            <div class="detail-art-name">${surah.name}</div>
          </div>
          <div class="detail-info">
            <div class="detail-type">Surah</div>
            <h1 class="detail-title">${surah.englishName}</h1>
            <div class="detail-subtitle">${surah.englishNameTranslation}</div>
            <div class="detail-stats">
              <span class="badge ${surah.revelationType === 'Meccan' ? 'badge-meccan' : 'badge-medinan'}">${surah.revelationType}</span>
              <span class="dot"></span><span>${surah.numberOfAyahs} Ayahs</span>
              ${meta ? `<span class="dot"></span><span class="badge badge-juz">Juz ${meta.juz.join(', ')}</span>` : ''}
              <span class="dot"></span><span>${reciter.name}</span>
            </div>
            <div class="detail-actions">
              <button class="btn btn-primary" onclick="QaariPlayer.loadSurah(${surahNum}, '${currentReciter}')">${ICONS.play} Play All</button>
              <button class="favorite-btn ${isFav ? 'active' : ''}" id="surah-fav-btn" onclick="QaariUI.toggleSurahFav(${surahNum})">${isFav ? ICONS.heartFilled : ICONS.heart}</button>
              ${meta ? `<button class="btn btn-ghost" onclick="QaariUI.showSurahInfo(${surahNum})" title="Surah Info">${ICONS.info} Info</button>` : ''}
              <button class="btn btn-ghost" onclick="QaariUI.addSurahToQueue(${surahNum}, '${currentReciter}', '${surah.englishName}', '${reciter.name}')" title="Add to queue">${ICONS.plus} Queue</button>
              <button class="btn btn-ghost" onclick="QaariUI.shareSurah(${surahNum}, '${currentReciter}')" title="Share">${ICONS.share}</button>
            </div>
            <div class="reciter-selector">
              <button class="reciter-select-btn" onclick="QaariUI.toggleReciterDropdown()">${ICONS.mic} <span class="reciter-name-text">${reciter.name}</span> <span class="chevron">▾</span></button>
              <div class="reciter-dropdown" id="reciterDropdown">
                ${QaariAPI.RECITERS.map(r => `<div class="reciter-dropdown-item ${r.id === currentReciter ? 'selected' : ''}" onclick="QaariUI.selectReciter('${r.id}', ${surahNum})">
                  <div class="reciter-item-avatar" style="background:${r.color}">${reciterAvatarHTML(r)}</div>
                  <div><div class="reciter-item-name">${r.name}</div><div class="reciter-item-name-ar">${r.nameAr}</div></div>
                </div>`).join('')}
              </div>
            </div>
            <div style="margin-top:var(--space-3);width:100%">
              <select class="translation-select" onchange="QaariStorage.setPref('translation',this.value);QaariUI.renderSurahDetail({id:${surahNum}})" aria-label="Translation language">
                ${QaariAPI.TRANSLATIONS.map(t => `<option value="${t.id}" ${t.id === currentTranslation ? 'selected' : ''}>${t.flag} ${t.language} — ${t.name}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>
        <div class="list-grid" id="ayahList">
          ${data.ayahs.map((ayah, i) => {
        const isPlaying = playerState.surah && playerState.surah.number === surahNum && playerState.currentIndex === i && playerState.playing;
        const translationText = translation && translation.ayahs && translation.ayahs[i] ? translation.ayahs[i].text : '';
        const isBookmarked = QaariStorage.isBookmarked(surahNum, i);
        return `<div class="ayah-item ${isPlaying ? 'playing' : ''}" data-ayah-index="${i}" onclick="QaariUI.playAyah(${surahNum}, '${currentReciter}', ${i})">
              <div class="ayah-text">${ayah.text}</div>
              ${translationText ? `<div class="ayah-translation">${translationText}</div>` : ''}
              <div class="ayah-actions">
                <div class="ayah-number">${isPlaying ? '<div class="equalizer"><div class="equalizer-bar"></div><div class="equalizer-bar"></div><div class="equalizer-bar"></div><div class="equalizer-bar"></div></div>' : ayah.numberInSurah}</div>
                <button class="ayah-play-btn" aria-label="Play Ayah ${ayah.numberInSurah}">${isPlaying ? ICONS.pause : ICONS.play}</button>
                <button class="ayah-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" onclick="event.stopPropagation();QaariUI.toggleBookmark(${surahNum},${i},'${surah.englishName}')" aria-label="Bookmark">${isBookmarked ? ICONS.bookmarkFilled : ICONS.bookmark}</button>
              </div>
            </div>`;
      }).join('')}
        </div>
      </div>`;
    } catch (err) {
      content().innerHTML = renderError('Failed to load surah', `QaariUI.renderSurahDetail({id:${surahNum}})`);
    }
  }

  // ═══════════════════════════════════════
  // PAGE: RECITER DETAIL
  // ═══════════════════════════════════════
  async function renderReciterDetail(params) {
    const reciterId = params.id;
    const reciter = QaariAPI.getReciter(reciterId);
    if (!reciter) { content().innerHTML = '<div class="empty-state"><div class="empty-title">Reciter not found</div></div>'; return; }
    content().innerHTML = renderLoading();
    try {
      const surahs = await QaariAPI.getSurahs();
      const isFav = QaariStorage.isFavorite('reciters', reciterId);
      content().innerHTML = `<div class="content-wrapper">
        <div class="detail-header">
          <div class="detail-art" style="background: linear-gradient(135deg, ${reciter.color}, ${reciter.color}aa); border-radius: var(--radius-full); overflow: hidden">
            ${reciter.image ? `<img src="${reciter.image}" alt="${reciter.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ''}
            <span style="${reciter.image ? 'display:none;' : ''}font-size:72px;font-weight:800;color:#fff;width:100%;height:100%;display:flex;align-items:center;justify-content:center">${reciter.name.charAt(0)}</span>
          </div>
          <div class="detail-info">
            <div class="detail-type">Reciter</div>
            <h1 class="detail-title">${reciter.name}</h1>
            <div class="detail-subtitle arabic-text" style="font-size: var(--text-2xl)">${reciter.nameAr}</div>
            <div class="detail-stats"><span>114 Surahs available</span></div>
            <div class="detail-actions">
              <button class="btn btn-primary" onclick="QaariPlayer.loadSurah(1, '${reciterId}')">${ICONS.play} Play</button>
              <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="QaariUI.toggleReciterFav('${reciterId}')">${isFav ? ICONS.heartFilled : ICONS.heart}</button>
            </div>
          </div>
        </div>
        <div class="section"><h2 class="section-title" style="margin-bottom: var(--space-6)">All Surahs</h2>
          <div class="card-grid">${surahs.map(s => `<div class="surah-card stagger-item" onclick="QaariRouter.navigate('/surah/${s.number}')">
            <div class="surah-card-top"><div class="surah-number">${s.number}</div>
              <button class="surah-play-btn" onclick="event.stopPropagation(); QaariPlayer.loadSurah(${s.number}, '${reciterId}')" aria-label="Play">${ICONS.play}</button>
            </div>
            <div class="surah-card-body"><div class="surah-name-arabic">${s.name}</div><div class="surah-name-english">${s.englishName}</div></div>
            <div class="surah-meta"><span class="badge badge-ayahs">${s.numberOfAyahs} Ayahs</span></div>
          </div>`).join('')}</div>
        </div>
      </div>`;
    } catch (err) {
      content().innerHTML = renderError('Failed to load', `QaariUI.renderReciterDetail({id:'${reciterId}'})`);
    }
  }

  // ═══════════════════════════════════════
  // PAGE: FAVORITES
  // ═══════════════════════════════════════
  async function renderFavorites() {
    const favs = QaariStorage.getFavorites();
    if (favs.surahs.length === 0 && favs.reciters.length === 0) {
      content().innerHTML = `<div class="content-wrapper"><div class="empty-state" style="min-height:60vh">
        <div class="empty-icon">❤️</div><div class="empty-title">No favorites yet</div>
        <div class="empty-desc">Start adding your favorite surahs and reciters</div>
        <button class="btn btn-primary" style="margin-top:16px" onclick="QaariRouter.navigate('/surahs')">Browse Surahs</button>
      </div></div>`;
      return;
    }
    try {
      const surahs = await QaariAPI.getSurahs();
      let html = '<div class="content-wrapper">';
      if (favs.reciters.length > 0) {
        const favReciters = favs.reciters.map(id => QaariAPI.getReciter(id)).filter(Boolean);
        html += `<div class="section"><h2 class="section-title">Favorite Reciters</h2>
          <div class="card-grid" style="margin-top:var(--space-6)">${favReciters.map(r => reciterCard(r)).join('')}</div></div>`;
      }
      if (favs.surahs.length > 0) {
        const favSurahs = favs.surahs.map(num => surahs.find(s => s.number === num)).filter(Boolean);
        html += `<div class="section"><h2 class="section-title">Favorite Surahs</h2>
          <div class="card-grid" style="margin-top:var(--space-6)">${favSurahs.map(s => surahCard(s)).join('')}</div></div>`;
      }
      html += '</div>';
      content().innerHTML = html;
    } catch (err) {
      content().innerHTML = renderError('Failed to load favorites', 'QaariUI.renderFavorites()');
    }
  }

  // ═══════════════════════════════════════
  // PAGE: BOOKMARKS
  // ═══════════════════════════════════════
  function renderBookmarks() {
    const bookmarks = QaariStorage.getBookmarks();
    if (bookmarks.length === 0) {
      content().innerHTML = `<div class="content-wrapper"><div class="empty-state" style="min-height:60vh">
        <div class="empty-icon">🔖</div><div class="empty-title">No bookmarks yet</div>
        <div class="empty-desc">Bookmark ayahs while reading to save them here</div>
        <button class="btn btn-primary" style="margin-top:16px" onclick="QaariRouter.navigate('/surahs')">Browse Surahs</button>
      </div></div>`;
      return;
    }
    content().innerHTML = `<div class="content-wrapper"><div class="section">
      <div class="section-header"><h2 class="section-title">Bookmarks</h2></div>
      <div class="list-grid" style="gap:var(--space-3)">
        ${bookmarks.map(b => {
      const gradient = QaariAPI.getSurahGradient(b.surahNum);
      return `<div class="bookmark-card" onclick="QaariRouter.navigate('/surah/${b.surahNum}')">
            <div class="bookmark-card-art" style="background:${gradient}">${b.surahNum}</div>
            <div class="bookmark-card-info">
              <div class="bookmark-card-title">${b.surahName} — Ayah ${b.ayahIndex + 1}</div>
              <div class="bookmark-card-sub">${new Date(b.timestamp).toLocaleDateString()}</div>
              ${b.note ? `<div class="bookmark-card-note">"${b.note}"</div>` : ''}
            </div>
            <button class="bookmark-card-remove" onclick="event.stopPropagation();QaariStorage.removeBookmark('${b.id}');QaariUI.renderBookmarks()">${ICONS.x}</button>
          </div>`;
    }).join('')}
      </div>
    </div></div>`;
  }

  // ═══════════════════════════════════════
  // SEARCH (fuzzy — Arabic, English, number)
  // ═══════════════════════════════════════
  async function renderSearch(query) {
    if (!query || query.trim().length < 2) {
      content().innerHTML = `<div class="content-wrapper"><div class="empty-state" style="min-height:50vh">
        <div class="empty-icon">${ICONS.search}</div>
        <div class="empty-title" style="margin-top:16px">Search the Quran</div>
        <div class="empty-desc">Search by surah name (English or Arabic), number, or reciter</div>
      </div></div>`;
      return;
    }
    const q = query.trim().toLowerCase();
    try {
      const surahs = await QaariAPI.getSurahs();
      const matchedSurahs = surahs.filter(s =>
        s.englishName.toLowerCase().includes(q) ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        s.name.includes(query.trim()) || // Arabic match
        s.number.toString() === q
      );
      const matchedReciters = QaariAPI.RECITERS.filter(r =>
        r.name.toLowerCase().includes(q) || r.nameAr.includes(query.trim())
      );
      let html = '<div class="content-wrapper">';
      html += `<h2 class="section-title" style="margin-bottom:var(--space-6)">Results for "${query}"</h2>`;
      if (matchedReciters.length > 0) {
        html += `<div class="section"><h3 style="font-size:var(--text-lg);color:var(--text-secondary);margin-bottom:var(--space-4)">Reciters</h3>
          <div class="card-grid">${matchedReciters.map(r => reciterCard(r)).join('')}</div></div>`;
      }
      if (matchedSurahs.length > 0) {
        html += `<div class="section"><h3 style="font-size:var(--text-lg);color:var(--text-secondary);margin-bottom:var(--space-4)">Surahs</h3>
          <div class="card-grid">${matchedSurahs.map(s => surahCard(s)).join('')}</div></div>`;
      }
      if (matchedSurahs.length === 0 && matchedReciters.length === 0) {
        html += `<div class="empty-state"><div class="empty-icon">🔍</div><div class="empty-title">No results found</div><div class="empty-desc">Try searching with a different term</div></div>`;
      }
      html += '</div>';
      content().innerHTML = html;
    } catch (err) {
      content().innerHTML = renderError('Search failed', `QaariUI.renderSearch('${query}')`);
    }
  }

  // ═══════════════════════════════════════
  // NOW-PLAYING FULLSCREEN VIEW (+ visualizer)
  // ═══════════════════════════════════════
  function showNowPlaying() {
    const state = QaariPlayer.getState();
    if (!state.surah) return;
    const gradient = QaariAPI.getSurahGradient(state.surah.number);
    const isFav = QaariStorage.isFavorite('surahs', state.surah.number);

    const overlay = document.createElement('div');
    overlay.className = 'now-playing-overlay';
    overlay.id = 'nowPlayingOverlay';
    overlay.innerHTML = `
      <button class="now-playing-close" onclick="QaariUI.closeNowPlaying()">${ICONS.chevronDown}</button>
      <div class="now-playing-art" style="background: ${gradient}">
        <div class="surah-num-big">${state.surah.number}</div>
        <div class="surah-name-ar">${state.surah.name || ''}</div>
      </div>
      <div class="now-playing-title">${state.surah.englishName}</div>
      <div class="now-playing-subtitle">${state.reciter ? state.reciter.name : ''}</div>
      <canvas class="now-playing-visualizer" id="npVisualizer"></canvas>
      <div class="now-playing-progress">
        <div class="now-playing-progress-bar" onclick="QaariUI._npSeek(event)">
          <div class="now-playing-progress-fill" id="npProgressFill" style="width:${state.duration ? (state.currentTime / state.duration * 100) : 0}%"></div>
        </div>
        <div class="now-playing-time">
          <span id="npTimeCurrent">${formatTime(state.currentTime)}</span>
          <span id="npAyahInfo">Ayah ${state.currentIndex + 1} / ${state.ayahs.length}</span>
          <span id="npTimeDuration">${formatTime(state.duration)}</span>
        </div>
      </div>
      <div class="now-playing-controls">
        <button class="now-playing-ctrl-btn ${state.repeat !== 'none' ? 'active' : ''}" onclick="QaariPlayer.cycleRepeat()">
          ${ICONS.repeat}${state.repeat === 'ayah' ? '<span style="font-size:8px;position:absolute;bottom:8px">1</span>' : ''}
        </button>
        <button class="now-playing-ctrl-btn" onclick="QaariPlayer.prev()">${ICONS.prev}</button>
        <button class="now-playing-play-btn" id="npPlayBtn" onclick="QaariPlayer.togglePlay()">${state.playing ? ICONS.pause : ICONS.play}</button>
        <button class="now-playing-ctrl-btn" onclick="QaariPlayer.next()">${ICONS.next}</button>
        <button class="now-playing-ctrl-btn ${isFav ? 'active' : ''}" onclick="QaariUI._npToggleFav()">${isFav ? ICONS.heartFilled : ICONS.heart}</button>
      </div>
      <div class="now-playing-extras">
        <button class="speed-badge ${state.speed !== 1 ? 'active' : ''}" onclick="QaariPlayer.cycleSpeed()">${state.speed}x</button>
        <button class="now-playing-ctrl-btn" id="npShareBtn" onclick="QaariUI._npShare()" title="Share">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </button>
      </div>
      <div class="now-playing-volume">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="color:var(--text-tertiary);flex-shrink:0">
          <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
        <input type="range" class="now-playing-volume-slider" id="npVolumeSlider" min="0" max="1" step="0.01" value="${QaariPlayer.getState().volume || 0.8}" oninput="QaariPlayer.setVolume(this.value)" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="color:var(--text-tertiary);flex-shrink:0">
          <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
      </div>`;

    document.body.appendChild(overlay);
    startNowPlayingVisualizer();

    window._npUpdateInterval = setInterval(() => {
      const s = QaariPlayer.getState();
      const fill = document.getElementById('npProgressFill');
      const cur = document.getElementById('npTimeCurrent');
      const dur = document.getElementById('npTimeDuration');
      const info = document.getElementById('npAyahInfo');
      const btn = document.getElementById('npPlayBtn');
      if (fill && s.duration) fill.style.width = `${(s.currentTime / s.duration) * 100}%`;
      if (cur) cur.textContent = formatTime(s.currentTime);
      if (dur) dur.textContent = formatTime(s.duration);
      if (info && s.ayahs.length) info.textContent = `Ayah ${s.currentIndex + 1} / ${s.ayahs.length}`;
      if (btn) btn.innerHTML = s.playing ? ICONS.pause : ICONS.play;
    }, 250);
  }

  function closeNowPlaying() {
    const overlay = document.getElementById('nowPlayingOverlay');
    if (overlay) {
      overlay.classList.add('closing');
      clearInterval(window._npUpdateInterval);
      if (window._npVisRAF) cancelAnimationFrame(window._npVisRAF);
      setTimeout(() => overlay.remove(), 300);
    }
  }

  // ── Audio Visualizer ──
  function startNowPlayingVisualizer() {
    const canvas = document.getElementById('npVisualizer');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const analyser = QaariPlayer.getAnalyser();
    if (!analyser) return;
    const bufLen = analyser.frequencyBinCount;
    const dataArr = new Uint8Array(bufLen);

    function draw() {
      window._npVisRAF = requestAnimationFrame(draw);
      if (!document.getElementById('npVisualizer')) { cancelAnimationFrame(window._npVisRAF); return; }
      analyser.getByteFrequencyData(dataArr);
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barCount = 48;
      const barW = canvas.width / barCount;
      const step = Math.floor(bufLen / barCount);
      for (let i = 0; i < barCount; i++) {
        const val = dataArr[i * step] / 255;
        const h = val * canvas.height * 0.9;
        const hue = 150 + i * 2;
        ctx.fillStyle = `hsla(${hue}, 70%, 55%, ${0.4 + val * 0.6})`;
        ctx.fillRect(i * barW + 1, canvas.height - h, barW - 2, h);
      }
    }
    draw();
  }

  // ═══════════════════════════════════════
  // PLAYER BAR UI UPDATE
  // ═══════════════════════════════════════
  function updatePlayerBar(state) {
    const bar = document.getElementById('playerBar');
    if (!bar) return;
    if (!state.surah) {
      bar.classList.add('hidden');
      document.querySelector('.mobile-bottom-nav')?.classList.remove('player-active');
      return;
    }
    bar.classList.remove('hidden');
    document.querySelector('.mobile-bottom-nav')?.classList.add('player-active');

    // Cover art
    const cover = bar.querySelector('.player-cover');
    if (cover && state.surah) {
      cover.style.background = QaariAPI.getSurahGradient(state.surah.number);
      cover.style.cursor = 'pointer';
      cover.onclick = () => showNowPlaying();
      cover.innerHTML = state.playing
        ? `<span style="font-size:12px;font-weight:700">${state.surah.number}</span><div class="equalizer"><div class="equalizer-bar"></div><div class="equalizer-bar"></div><div class="equalizer-bar"></div></div>`
        : `<span style="font-size:14px;font-weight:700">${state.surah.number}</span>`;
    }

    const trackName = bar.querySelector('.player-track-name');
    const trackArtist = bar.querySelector('.player-track-artist');
    if (trackName && state.surah) { trackName.textContent = state.surah.englishName; trackName.style.cursor = 'pointer'; trackName.onclick = () => showNowPlaying(); }
    if (trackArtist && state.reciter) { trackArtist.textContent = state.reciter.name; trackArtist.style.cursor = 'pointer'; trackArtist.onclick = () => QaariRouter.navigate(`/reciter/${state.reciter.id}`); }

    const playBtn = bar.querySelector('.player-play-btn');
    if (playBtn) playBtn.innerHTML = state.playing ? ICONS.pause : ICONS.play;

    const progressBar = bar.querySelector('.player-progress-bar');
    if (progressBar && state.duration) progressBar.style.width = `${(state.currentTime / state.duration) * 100}%`;

    const timeCurrent = bar.querySelector('.player-time-current');
    const timeDuration = bar.querySelector('.player-time-duration');
    if (timeCurrent) timeCurrent.textContent = formatTime(state.currentTime);
    if (timeDuration) timeDuration.textContent = formatTime(state.duration);

    const ayahCounter = bar.querySelector('.player-ayah-counter');
    if (ayahCounter && state.ayahs.length) ayahCounter.textContent = `Ayah ${state.currentIndex + 1} / ${state.ayahs.length}`;

    const repeatBtn = bar.querySelector('.player-repeat-btn');
    if (repeatBtn) {
      repeatBtn.classList.toggle('active', state.repeat !== 'none');
      let label = '';
      if (state.repeat === 'ayah') label = '<span style="font-size:8px;position:absolute;bottom:2px">1</span>';
      repeatBtn.innerHTML = ICONS.repeat + label;
    }

    const volSlider = bar.querySelector('.volume-slider');
    if (volSlider) {
      volSlider.value = state.volume;
      const pct = state.volume * 100;
      volSlider.style.background = `linear-gradient(to right, var(--accent) ${pct}%, var(--bg-hover) ${pct}%)`;
    }

    const favBtn = bar.querySelector('.player-fav-btn');
    if (favBtn && state.surah) {
      const isFav = QaariStorage.isFavorite('surahs', state.surah.number);
      favBtn.classList.toggle('active', isFav);
      favBtn.innerHTML = isFav ? ICONS.heartFilled : ICONS.heart;
    }

    // Speed badge
    const speedBtn = document.getElementById('playerSpeedBtn');
    if (speedBtn) {
      speedBtn.textContent = state.speed + 'x';
      speedBtn.classList.toggle('active', state.speed !== 1);
    }

    updatePlayingAyahInList(state);
  }

  function updatePlayingAyahInList(state) {
    const ayahList = document.getElementById('ayahList');
    if (!ayahList || !state.surah) return;
    ayahList.querySelectorAll('.ayah-item').forEach((el, i) => {
      const isPlaying = state.currentIndex === i && state.playing;
      el.classList.toggle('playing', isPlaying);
      const numEl = el.querySelector('.ayah-number');
      if (numEl) numEl.innerHTML = isPlaying ? '<div class="equalizer"><div class="equalizer-bar"></div><div class="equalizer-bar"></div><div class="equalizer-bar"></div><div class="equalizer-bar"></div></div>' : (i + 1).toString();
      const playBtn = el.querySelector('.ayah-play-btn');
      if (playBtn) playBtn.innerHTML = isPlaying ? ICONS.pause : ICONS.play;
    });
    // Auto-scroll to playing ayah
    const playingEl = ayahList.querySelector('.ayah-item.playing');
    if (playingEl) playingEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ═══════════════════════════════════════
  // MODALS & DRAWERS
  // ═══════════════════════════════════════
  function showSurahInfo(surahNum) {
    const meta = QaariAPI.getSurahMeta(surahNum);
    if (!meta) return;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `<div class="modal-content">
      <div class="modal-header"><h2>Surah Info</h2><button class="modal-close" onclick="this.closest('.modal-overlay').remove()">${ICONS.x}</button></div>
      <div class="modal-body">
        <div class="surah-info-grid">
          <div class="surah-info-item"><div class="surah-info-label">Meaning</div><div class="surah-info-value">${meta.meaning}</div></div>
          <div class="surah-info-item"><div class="surah-info-label">Juz</div><div class="surah-info-value">${meta.juz.join(', ')}</div></div>
        </div>
        ${meta.context ? `<div class="surah-info-context">${meta.context}</div>` : ''}
      </div>
    </div>`;
    document.body.appendChild(overlay);
  }

  function showShortcutsModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'shortcutsModal';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `<div class="modal-content">
      <div class="modal-header"><h2>Keyboard Shortcuts</h2><button class="modal-close" onclick="this.closest('.modal-overlay').remove()">${ICONS.x}</button></div>
      <div class="modal-body"><div class="shortcuts-grid">
        <div class="shortcut-item"><kbd class="shortcut-key">Space</kbd><span class="shortcut-desc">Play / Pause</span></div>
        <div class="shortcut-item"><kbd class="shortcut-key">←</kbd><span class="shortcut-desc">Previous Ayah</span></div>
        <div class="shortcut-item"><kbd class="shortcut-key">→</kbd><span class="shortcut-desc">Next Ayah</span></div>
        <div class="shortcut-item"><kbd class="shortcut-key">↑</kbd><span class="shortcut-desc">Volume Up</span></div>
        <div class="shortcut-item"><kbd class="shortcut-key">↓</kbd><span class="shortcut-desc">Volume Down</span></div>
        <div class="shortcut-item"><kbd class="shortcut-key">S</kbd><span class="shortcut-desc">Cycle Speed</span></div>
        <div class="shortcut-item"><kbd class="shortcut-key">R</kbd><span class="shortcut-desc">Cycle Repeat</span></div>
        <div class="shortcut-item"><kbd class="shortcut-key">Q</kbd><span class="shortcut-desc">Toggle Queue</span></div>
        <div class="shortcut-item"><kbd class="shortcut-key">?</kbd><span class="shortcut-desc">This dialog</span></div>
        <div class="shortcut-item"><kbd class="shortcut-key">Esc</kbd><span class="shortcut-desc">Close overlays</span></div>
      </div></div></div>`;
    document.body.appendChild(overlay);
  }

  function showQueueDrawer() {
    if (document.getElementById('queueDrawer')) { closeQueueDrawer(); return; }
    const queue = QaariStorage.getQueue();
    const drawer = document.createElement('div');
    drawer.className = 'queue-drawer';
    drawer.id = 'queueDrawer';
    drawer.innerHTML = `<div class="queue-drawer-header"><h2>Play Queue</h2>
      <button class="modal-close" onclick="QaariUI.closeQueueDrawer()">${ICONS.x}</button></div>
      <div class="queue-drawer-body">
        ${queue.length === 0 ? '<div class="empty-state" style="padding:var(--space-8)"><div class="empty-icon">📋</div><div class="empty-title" style="font-size:var(--text-md)">Queue is empty</div><div class="empty-desc">Add surahs from the browse page</div></div>' :
        queue.map((item, i) => `<div class="queue-item">
            <div class="queue-item-art" style="background:${QaariAPI.getSurahGradient(item.surahNum)}">${item.surahNum}</div>
            <div class="queue-item-info"><div class="queue-item-title">${item.surahName}</div><div class="queue-item-sub">${item.reciterName}</div></div>
            <button class="queue-item-remove" onclick="QaariStorage.removeFromQueue(${i});QaariUI.showQueueDrawer()">${ICONS.x}</button>
          </div>`).join('')}
      </div>
      ${queue.length > 0 ? `<div class="queue-drawer-footer"><button class="btn btn-ghost" style="color:var(--danger)" onclick="QaariStorage.clearQueue();QaariUI.showQueueDrawer()">Clear Queue</button></div>` : ''}`;
    document.body.appendChild(drawer);
  }

  function closeQueueDrawer() {
    const drawer = document.getElementById('queueDrawer');
    if (drawer) { drawer.classList.add('closing'); setTimeout(() => drawer.remove(), 250); }
  }

  // ═══════════════════════════════════════
  // PUBLIC METHODS
  // ═══════════════════════════════════════
  return {
    renderHome, renderSurahList, renderReciterList, renderSurahDetail,
    renderReciterDetail, renderFavorites, renderBookmarks, renderSearch,
    updatePlayerBar, showNowPlaying, closeNowPlaying,
    showShortcutsModal, showQueueDrawer, closeQueueDrawer, showSurahInfo,
    ICONS, formatTime, showToast,

    playAyah(surahNum, reciterId, index) {
      const ps = QaariPlayer.getState();
      if (ps.surah && ps.surah.number === surahNum && ps.currentIndex === index && ps.playing) {
        QaariPlayer.pause();
      } else if (ps.surah && ps.surah.number === surahNum && ps.reciter && ps.reciter.id === reciterId) {
        QaariPlayer.playAyahAt(index);
      } else {
        QaariPlayer.loadSurah(surahNum, reciterId).then(() => { setTimeout(() => QaariPlayer.playAyahAt(index), 500); });
      }
    },

    toggleSurahFav(surahNum) {
      const added = QaariStorage.toggleFavorite('surahs', surahNum);
      const btn = document.getElementById('surah-fav-btn');
      if (btn) { btn.classList.toggle('active', added); btn.innerHTML = added ? ICONS.heartFilled : ICONS.heart; }
      showToast(added ? 'Added to favorites' : 'Removed from favorites', added ? 'success' : 'info');
    },

    toggleReciterFav(reciterId) {
      const added = QaariStorage.toggleFavorite('reciters', reciterId);
      showToast(added ? 'Added to favorites' : 'Removed from favorites', added ? 'success' : 'info');
      renderReciterDetail({ id: reciterId });
    },

    toggleReciterDropdown() {
      const dd = document.getElementById('reciterDropdown');
      if (!dd) return;
      const isOpen = dd.classList.toggle('open');
      if (isOpen) {
        // Get the resolved background color
        const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary').trim() || '#1a1a2e';
        // Apply bottom-sheet styles directly
        dd.style.cssText = `
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          top: auto;
          width: 100vw;
          max-height: 60vh;
          z-index: 10000;
          border-radius: 16px 16px 0 0;
          box-shadow: 0 -8px 32px rgba(0,0,0,0.5);
          padding: 16px 16px 32px;
          overflow-y: auto;
          background: ${bgColor};
          border-top: 1px solid rgba(255,255,255,0.1);
        `;
        // Add backdrop overlay
        let backdrop = document.getElementById('reciterBackdrop');
        if (!backdrop) {
          backdrop = document.createElement('div');
          backdrop.id = 'reciterBackdrop';
          backdrop.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;';
          backdrop.onclick = () => {
            dd.classList.remove('open');
            dd.style.display = 'none';
            backdrop.remove();
          };
          document.body.appendChild(backdrop);
        }
      } else {
        dd.style.display = 'none';
        document.getElementById('reciterBackdrop')?.remove();
      }
    },

    selectReciter(reciterId, surahNum) {
      QaariStorage.setPref('reciter', reciterId);
      QaariPlayer.changeReciter(reciterId);
      renderSurahDetail({ id: surahNum });
    },

    toggleBookmark(surahNum, ayahIndex, surahName) {
      if (QaariStorage.isBookmarked(surahNum, ayahIndex)) {
        const bm = QaariStorage.getBookmarks().find(b => b.surahNum === surahNum && b.ayahIndex === ayahIndex);
        if (bm) QaariStorage.removeBookmark(bm.id);
        showToast('Bookmark removed', 'info');
      } else {
        QaariStorage.addBookmark(surahNum, ayahIndex, surahName);
        showToast('Ayah bookmarked', 'success');
      }
      // Update UI inline
      const ayahList = document.getElementById('ayahList');
      if (ayahList) {
        const items = ayahList.querySelectorAll('.ayah-item');
        if (items[ayahIndex]) {
          const btn = items[ayahIndex].querySelector('.ayah-bookmark-btn');
          const isNowBookmarked = QaariStorage.isBookmarked(surahNum, ayahIndex);
          if (btn) { btn.classList.toggle('bookmarked', isNowBookmarked); btn.innerHTML = isNowBookmarked ? ICONS.bookmarkFilled : ICONS.bookmark; }
        }
      }
    },

    addSurahToQueue(surahNum, reciterId, surahName, reciterName) {
      QaariStorage.addToQueue(surahNum, reciterId, surahName, reciterName);
      showToast(`Added to queue`, 'success');
    },

    shareSurah(surahNum, reciterId) {
      const url = `${window.location.origin}${window.location.pathname}#/surah/${surahNum}`;
      if (navigator.share) {
        navigator.share({ title: 'QaariPro', text: `Listen to Surah ${surahNum}`, url });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => showToast('Link copied to clipboard', 'info'));
      }
    },

    _npSeek(e) {
      const bar = e.currentTarget;
      const rect = bar.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      QaariPlayer.seekTo(Math.max(0, Math.min(1, pct)));
    },

    _npToggleFav() {
      const state = QaariPlayer.getState();
      if (state.surah) {
        QaariStorage.toggleFavorite('surahs', state.surah.number);
        closeNowPlaying();
        setTimeout(() => showNowPlaying(), 50);
      }
    },

    _npShare() {
      const state = QaariPlayer.getState();
      if (!state.surah) return;
      const url = `${window.location.origin}${window.location.pathname}#/surah/${state.surah.number}`;
      const text = `Listen to ${state.surah.englishName} by ${state.reciter ? state.reciter.name : 'QaariPro'}`;
      if (navigator.share) {
        navigator.share({ title: 'QaariPro', text, url });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => showToast('Link copied!', 'info'));
      }
    },
  };
})();
