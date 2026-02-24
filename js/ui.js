/* ============================================
   QAARI — UI Rendering Module (v2)
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
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"/></svg>',
    maximize: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15,3 21,3 21,9"/><polyline points="9,21 3,21 3,15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
    moon: '☪',
  };

  // ── Helpers ──
  function formatTime(sec) {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // ── Skeleton Loading (replaces spinner) ──
  function renderSkeletonGrid(count = 8) {
    let cards = '';
    for (let i = 0; i < count; i++) {
      cards += `
        <div class="skeleton-card stagger-item" style="animation-delay:${i * 0.04}s">
          <div class="skeleton-line w-30 h-lg"></div>
          <div class="skeleton-line w-80"></div>
          <div class="skeleton-line w-50"></div>
          <div style="display:flex;gap:8px;margin-top:auto">
            <div class="skeleton-line w-30" style="height:22px;border-radius:12px"></div>
            <div class="skeleton-line w-30" style="height:22px;border-radius:12px"></div>
          </div>
        </div>
      `;
    }
    return `<div class="card-grid">${cards}</div>`;
  }

  function renderLoading() {
    return `<div class="content-wrapper"><div class="section">${renderSkeletonGrid(8)}</div></div>`;
  }

  // ── Reciter Avatar (image or fallback initial) ──
  function reciterAvatarHTML(reciter) {
    if (reciter.image) {
      return `<img class="reciter-avatar-img" src="${reciter.image}" alt="${reciter.name}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span style="display:none;width:100%;height:100%;align-items:center;justify-content:center">${reciter.name.charAt(0)}</span>`;
    }
    return `<span>${reciter.name.charAt(0)}</span>`;
  }

  // ── Card Renderers ──
  function surahCard(surah) {
    return `
      <div class="surah-card stagger-item" data-surah="${surah.number}" onclick="QaariRouter.navigate('/surah/${surah.number}')">
        <div class="surah-card-top">
          <div class="surah-number">${surah.number}</div>
          <button class="surah-play-btn" onclick="event.stopPropagation(); QaariPlayer.loadSurah(${surah.number})" aria-label="Play ${surah.englishName}">
            ${ICONS.play}
          </button>
        </div>
        <div class="surah-card-body">
          <div class="surah-name-arabic">${surah.name}</div>
          <div class="surah-name-english">${surah.englishName}</div>
          <div class="surah-translation">${surah.englishNameTranslation}</div>
        </div>
        <div class="surah-meta">
          <span class="badge ${surah.revelationType === 'Meccan' ? 'badge-meccan' : 'badge-medinan'}">
            ${surah.revelationType}
          </span>
          <span class="badge badge-ayahs">${surah.numberOfAyahs} Ayahs</span>
        </div>
      </div>
    `;
  }

  function reciterCard(reciter) {
    return `
      <div class="reciter-card stagger-item" onclick="QaariRouter.navigate('/reciter/${reciter.id}')">
        <div class="reciter-avatar" style="background: linear-gradient(135deg, ${reciter.color}, ${reciter.color}dd)">
          ${reciterAvatarHTML(reciter)}
          <div class="reciter-play-overlay">
            ${ICONS.play}
          </div>
        </div>
        <div class="reciter-name">${reciter.name}</div>
        <div class="reciter-name-arabic">${reciter.nameAr}</div>
      </div>
    `;
  }

  // ── Page: Home ──
  async function renderHome() {
    content().innerHTML = renderLoading();

    try {
      const surahs = await QaariAPI.getSurahs();
      const history = QaariStorage.getHistory();
      const reciters = QaariAPI.RECITERS;

      const popular = [1, 2, 18, 36, 55, 56, 67, 78, 112, 114].map(n => surahs.find(s => s.number === n)).filter(Boolean);
      const juzAmma = surahs.filter(s => s.number >= 78);

      let html = `
        <div class="content-wrapper">
          <!-- Hero -->
          <div class="hero pattern-bg">
            <div class="hero-content">
              <div class="hero-label">${ICONS.moon} The Noble Quran</div>
              <h1 class="hero-title">Listen to the<br/>Holy Quran</h1>
              <p class="hero-subtitle">Stream beautiful recitations from the world's most renowned Qaris. 114 Surahs, 20 reciters, verse-by-verse audio.</p>
              <div class="hero-actions">
                <button class="btn btn-primary" onclick="QaariPlayer.loadSurah(1)">
                  ${ICONS.play} Start Listening
                </button>
                <button class="btn btn-secondary" onclick="QaariRouter.navigate('/surahs')">
                  ${ICONS.book} Browse Surahs
                </button>
              </div>
            </div>
          </div>
      `;

      // Continue Listening
      if (history.length > 0) {
        html += `
          <div class="section">
            <div class="section-header">
              <h2 class="section-title">Continue Listening</h2>
            </div>
            <div class="card-grid card-grid-lg">
              ${history.slice(0, 6).map(h => {
          const gradient = QaariAPI.getSurahGradient(h.surahNum);
          return `
                  <div class="continue-card" onclick="QaariPlayer.loadSurah(${h.surahNum}, '${h.reciterId}')">
                    <div class="continue-card-art" style="background: ${gradient}">${h.surahNum}</div>
                    <div class="continue-card-info">
                      <div class="continue-card-title">${h.surahName}</div>
                      <div class="continue-card-sub">${h.reciterName} • Ayah ${h.ayahIndex + 1}</div>
                    </div>
                  </div>
                `;
        }).join('')}
            </div>
          </div>
        `;
      }

      // Featured Reciters
      html += `
        <div class="section">
          <div class="section-header">
            <h2 class="section-title">Featured Reciters</h2>
            <span class="section-link" onclick="QaariRouter.navigate('/reciters')">Show all</span>
          </div>
          <div class="card-grid">
            ${reciters.slice(0, 6).map(r => reciterCard(r)).join('')}
          </div>
        </div>
      `;

      // Popular Surahs
      html += `
        <div class="section">
          <div class="section-header">
            <h2 class="section-title">Popular Surahs</h2>
            <span class="section-link" onclick="QaariRouter.navigate('/surahs')">Show all</span>
          </div>
          <div class="card-grid">
            ${popular.map(s => surahCard(s)).join('')}
          </div>
        </div>
      `;

      // Juz Amma
      html += `
        <div class="section">
          <div class="section-header">
            <h2 class="section-title">Juz 'Amma</h2>
          </div>
          <div class="card-grid">
            ${juzAmma.slice(0, 12).map(s => surahCard(s)).join('')}
          </div>
        </div>
      `;

      html += '</div>';
      content().innerHTML = html;
    } catch (err) {
      content().innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">⚠️</div>
          <div class="empty-title">Failed to load</div>
          <div class="empty-desc">Check your internet connection and try again.</div>
          <button class="btn btn-primary" style="margin-top: 16px" onclick="QaariUI.renderHome()">Retry</button>
        </div>
      `;
    }
  }

  // ── Page: All Surahs ──
  async function renderSurahList() {
    content().innerHTML = renderLoading();

    try {
      const surahs = await QaariAPI.getSurahs();
      let filterType = 'all';

      function render() {
        let list = surahs;
        if (filterType === 'meccan') list = list.filter(s => s.revelationType === 'Meccan');
        else if (filterType === 'medinan') list = list.filter(s => s.revelationType === 'Medinan');

        content().innerHTML = `
          <div class="content-wrapper">
            <div class="section">
              <div class="section-header">
                <h2 class="section-title">All Surahs</h2>
                <div class="flex gap-2">
                  <button class="btn btn-ghost ${filterType === 'all' ? 'text-accent' : ''}" onclick="window._surahFilter('all')">All</button>
                  <button class="btn btn-ghost ${filterType === 'meccan' ? 'text-accent' : ''}" onclick="window._surahFilter('meccan')">Meccan</button>
                  <button class="btn btn-ghost ${filterType === 'medinan' ? 'text-accent' : ''}" onclick="window._surahFilter('medinan')">Medinan</button>
                </div>
              </div>
              <div class="card-grid">
                ${list.map(s => surahCard(s)).join('')}
              </div>
            </div>
          </div>
        `;
      }

      window._surahFilter = (type) => { filterType = type; render(); };
      render();
    } catch (err) {
      content().innerHTML = '<div class="empty-state"><div class="empty-icon">⚠️</div><div class="empty-title">Failed to load surahs</div></div>';
    }
  }

  // ── Page: All Reciters ──
  function renderReciterList() {
    content().innerHTML = `
      <div class="content-wrapper">
        <div class="section">
          <div class="section-header">
            <h2 class="section-title">All Reciters</h2>
          </div>
          <div class="card-grid card-grid-lg">
            ${QaariAPI.RECITERS.map(r => reciterCard(r)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ── Page: Surah Detail (with English Translation) ──
  async function renderSurahDetail(params) {
    const surahNum = parseInt(params.id);
    content().innerHTML = renderLoading();

    try {
      const surahs = await QaariAPI.getSurahs();
      const surah = surahs.find(s => s.number === surahNum);
      if (!surah) {
        content().innerHTML = '<div class="empty-state"><div class="empty-title">Surah not found</div></div>';
        return;
      }

      const currentReciter = QaariStorage.getPrefs().reciter || 'ar.alafasy';
      const reciter = QaariAPI.getReciter(currentReciter);

      // Fetch Arabic audio + English translation in parallel
      const [data, translation] = await Promise.all([
        QaariAPI.getSurah(surahNum, currentReciter),
        QaariAPI.getSurahTranslation(surahNum, 'en.sahih').catch(() => null)
      ]);

      const gradient = QaariAPI.getSurahGradient(surahNum);
      const isFav = QaariStorage.isFavorite('surahs', surahNum);
      const playerState = QaariPlayer.getState();

      content().innerHTML = `
        <div class="content-wrapper">
          <!-- Header -->
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
                <span class="dot"></span>
                <span>${surah.numberOfAyahs} Ayahs</span>
                <span class="dot"></span>
                <span>${reciter.name}</span>
              </div>
              <div class="detail-actions">
                <button class="btn btn-primary" onclick="QaariPlayer.loadSurah(${surahNum}, '${currentReciter}')">
                  ${ICONS.play} Play All
                </button>
                <button class="favorite-btn ${isFav ? 'active' : ''}" id="surah-fav-btn"
                  onclick="QaariUI.toggleSurahFav(${surahNum})">
                  ${isFav ? ICONS.heartFilled : ICONS.heart}
                </button>
                <div class="reciter-selector">
                  <button class="reciter-select-btn" onclick="QaariUI.toggleReciterDropdown()">
                    ${ICONS.mic} ${reciter.name} ▾
                  </button>
                  <div class="reciter-dropdown" id="reciterDropdown">
                    ${QaariAPI.RECITERS.map(r => `
                      <div class="reciter-dropdown-item ${r.id === currentReciter ? 'selected' : ''}"
                        onclick="QaariUI.selectReciter('${r.id}', ${surahNum})">
                        <div style="width:28px;height:28px;border-radius:50%;background:${r.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;overflow:hidden">
                          ${reciterAvatarHTML(r)}
                        </div>
                        <div>
                          <div style="font-size:13px;font-weight:500">${r.name}</div>
                          <div style="font-size:11px;color:var(--text-tertiary);font-family:var(--font-arabic);direction:rtl">${r.nameAr}</div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Ayah List -->
          <div class="list-grid" id="ayahList">
            ${data.ayahs.map((ayah, i) => {
        const isPlaying = playerState.surah && playerState.surah.number === surahNum && playerState.currentIndex === i && playerState.playing;
        const translationText = translation && translation.ayahs && translation.ayahs[i] ? translation.ayahs[i].text : '';
        return `
                <div class="ayah-item ${isPlaying ? 'playing' : ''}" data-ayah-index="${i}" onclick="QaariUI.playAyah(${surahNum}, '${currentReciter}', ${i})">
                  <div class="ayah-number">
                    ${isPlaying ? '<div class="equalizer"><div class="equalizer-bar"></div><div class="equalizer-bar"></div><div class="equalizer-bar"></div><div class="equalizer-bar"></div></div>' : ayah.numberInSurah}
                  </div>
                  <div class="ayah-text">${ayah.text}</div>
                  <button class="ayah-play-btn" aria-label="Play Ayah ${ayah.numberInSurah}">
                    ${isPlaying ? ICONS.pause : ICONS.play}
                  </button>
                </div>
                ${translationText ? `<div class="ayah-translation">${translationText}</div>` : ''}
              `;
      }).join('')}
          </div>
        </div>
      `;
    } catch (err) {
      content().innerHTML = '<div class="empty-state"><div class="empty-icon">⚠️</div><div class="empty-title">Failed to load surah</div></div>';
    }
  }

  // ── Page: Reciter Detail ──
  async function renderReciterDetail(params) {
    const reciterId = params.id;
    const reciter = QaariAPI.getReciter(reciterId);
    if (!reciter) {
      content().innerHTML = '<div class="empty-state"><div class="empty-title">Reciter not found</div></div>';
      return;
    }

    content().innerHTML = renderLoading();

    try {
      const surahs = await QaariAPI.getSurahs();
      const isFav = QaariStorage.isFavorite('reciters', reciterId);

      content().innerHTML = `
        <div class="content-wrapper">
          <div class="detail-header">
            <div class="detail-art" style="background: linear-gradient(135deg, ${reciter.color}, ${reciter.color}aa); border-radius: var(--radius-full); overflow: hidden">
              ${reciter.image
          ? `<img src="${reciter.image}" alt="${reciter.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ''}
              <span style="${reciter.image ? 'display:none;' : ''}font-size:72px;font-weight:800;color:#fff;width:100%;height:100%;display:flex;align-items:center;justify-content:center">${reciter.name.charAt(0)}</span>
            </div>
            <div class="detail-info">
              <div class="detail-type">Reciter</div>
              <h1 class="detail-title">${reciter.name}</h1>
              <div class="detail-subtitle arabic-text" style="font-size: var(--text-2xl)">${reciter.nameAr}</div>
              <div class="detail-stats">
                <span>114 Surahs available</span>
              </div>
              <div class="detail-actions">
                <button class="btn btn-primary" onclick="QaariPlayer.loadSurah(1, '${reciterId}')">
                  ${ICONS.play} Play
                </button>
                <button class="favorite-btn ${isFav ? 'active' : ''}"
                  onclick="QaariUI.toggleReciterFav('${reciterId}')">
                  ${isFav ? ICONS.heartFilled : ICONS.heart}
                </button>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title" style="margin-bottom: var(--space-6)">All Surahs</h2>
            <div class="card-grid">
              ${surahs.map(s => `
                <div class="surah-card stagger-item" onclick="QaariRouter.navigate('/surah/${s.number}')">
                  <div class="surah-card-top">
                    <div class="surah-number">${s.number}</div>
                    <button class="surah-play-btn" onclick="event.stopPropagation(); QaariPlayer.loadSurah(${s.number}, '${reciterId}')" aria-label="Play">
                      ${ICONS.play}
                    </button>
                  </div>
                  <div class="surah-card-body">
                    <div class="surah-name-arabic">${s.name}</div>
                    <div class="surah-name-english">${s.englishName}</div>
                  </div>
                  <div class="surah-meta">
                    <span class="badge badge-ayahs">${s.numberOfAyahs} Ayahs</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } catch (err) {
      content().innerHTML = '<div class="empty-state"><div class="empty-icon">⚠️</div><div class="empty-title">Failed to load</div></div>';
    }
  }

  // ── Page: Favorites ──
  async function renderFavorites() {
    const favs = QaariStorage.getFavorites();
    const hasFavs = favs.surahs.length > 0 || favs.reciters.length > 0;

    if (!hasFavs) {
      content().innerHTML = `
        <div class="content-wrapper">
          <div class="empty-state" style="min-height: 60vh">
            <div class="empty-icon">❤️</div>
            <div class="empty-title">No favorites yet</div>
            <div class="empty-desc">Start adding your favorite surahs and reciters</div>
            <button class="btn btn-primary" style="margin-top: 16px" onclick="QaariRouter.navigate('/surahs')">Browse Surahs</button>
          </div>
        </div>
      `;
      return;
    }

    try {
      const surahs = await QaariAPI.getSurahs();
      let html = '<div class="content-wrapper">';

      if (favs.reciters.length > 0) {
        const favReciters = favs.reciters.map(id => QaariAPI.getReciter(id)).filter(Boolean);
        html += `
          <div class="section">
            <h2 class="section-title">Favorite Reciters</h2>
            <div class="card-grid" style="margin-top: var(--space-6)">
              ${favReciters.map(r => reciterCard(r)).join('')}
            </div>
          </div>
        `;
      }

      if (favs.surahs.length > 0) {
        const favSurahs = favs.surahs.map(num => surahs.find(s => s.number === num)).filter(Boolean);
        html += `
          <div class="section">
            <h2 class="section-title">Favorite Surahs</h2>
            <div class="card-grid" style="margin-top: var(--space-6)">
              ${favSurahs.map(s => surahCard(s)).join('')}
            </div>
          </div>
        `;
      }

      html += '</div>';
      content().innerHTML = html;
    } catch (err) {
      content().innerHTML = '<div class="empty-state"><div class="empty-icon">⚠️</div><div class="empty-title">Failed to load favorites</div></div>';
    }
  }

  // ── Search ──
  async function renderSearch(query) {
    if (!query || query.trim().length < 2) {
      content().innerHTML = `
        <div class="content-wrapper">
          <div class="empty-state" style="min-height: 50vh">
            <div class="empty-icon">${ICONS.search}</div>
            <div class="empty-title" style="margin-top: 16px">Search the Quran</div>
            <div class="empty-desc">Search by surah name or reciter</div>
          </div>
        </div>
      `;
      return;
    }

    const q = query.trim().toLowerCase();

    try {
      const surahs = await QaariAPI.getSurahs();

      const matchedSurahs = surahs.filter(s =>
        s.englishName.toLowerCase().includes(q) ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        s.number.toString() === q
      );

      const matchedReciters = QaariAPI.RECITERS.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.nameAr.includes(query.trim())
      );

      let html = '<div class="content-wrapper">';
      html += `<h2 class="section-title" style="margin-bottom: var(--space-6)">Results for "${query}"</h2>`;

      if (matchedReciters.length > 0) {
        html += `
          <div class="section">
            <h3 style="font-size: var(--text-lg); color: var(--text-secondary); margin-bottom: var(--space-4)">Reciters</h3>
            <div class="card-grid">
              ${matchedReciters.map(r => reciterCard(r)).join('')}
            </div>
          </div>
        `;
      }

      if (matchedSurahs.length > 0) {
        html += `
          <div class="section">
            <h3 style="font-size: var(--text-lg); color: var(--text-secondary); margin-bottom: var(--space-4)">Surahs</h3>
            <div class="card-grid">
              ${matchedSurahs.map(s => surahCard(s)).join('')}
            </div>
          </div>
        `;
      }

      if (matchedSurahs.length === 0 && matchedReciters.length === 0) {
        html += `
          <div class="empty-state">
            <div class="empty-icon">🔍</div>
            <div class="empty-title">No results found</div>
            <div class="empty-desc">Try searching with a different term</div>
          </div>
        `;
      }

      html += '</div>';
      content().innerHTML = html;
    } catch (err) {
      content().innerHTML = '<div class="empty-state"><div class="empty-icon">⚠️</div><div class="empty-title">Search failed</div></div>';
    }
  }

  // ══════════════════════════════════════
  //  NOW-PLAYING FULLSCREEN VIEW
  // ══════════════════════════════════════
  function showNowPlaying() {
    const state = QaariPlayer.getState();
    if (!state.surah) return;

    const gradient = QaariAPI.getSurahGradient(state.surah.number);
    const isFav = QaariStorage.isFavorite('surahs', state.surah.number);

    const overlay = document.createElement('div');
    overlay.className = 'now-playing-overlay';
    overlay.id = 'nowPlayingOverlay';

    overlay.innerHTML = `
      <button class="now-playing-close" onclick="QaariUI.closeNowPlaying()">
        ${ICONS.chevronDown}
      </button>

      <div class="now-playing-art" style="background: ${gradient}">
        <div class="surah-num-big">${state.surah.number}</div>
        <div class="surah-name-ar">${state.surah.name || ''}</div>
      </div>

      <div class="now-playing-title">${state.surah.englishName}</div>
      <div class="now-playing-subtitle">${state.reciter ? state.reciter.name : ''}</div>

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
          ${ICONS.repeat}
          ${state.repeat === 'ayah' ? '<span style="font-size:8px;position:absolute;bottom:8px">1</span>' : ''}
        </button>
        <button class="now-playing-ctrl-btn" onclick="QaariPlayer.prev()">
          ${ICONS.prev}
        </button>
        <button class="now-playing-play-btn" id="npPlayBtn" onclick="QaariPlayer.togglePlay()">
          ${state.playing ? ICONS.pause : ICONS.play}
        </button>
        <button class="now-playing-ctrl-btn" onclick="QaariPlayer.next()">
          ${ICONS.next}
        </button>
        <button class="now-playing-ctrl-btn ${isFav ? 'active' : ''}" onclick="QaariUI._npToggleFav()">
          ${isFav ? ICONS.heartFilled : ICONS.heart}
        </button>
      </div>

      <div class="now-playing-ayah-info" id="npAyahText"></div>
    `;

    document.body.appendChild(overlay);

    // Store update callback reference
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
      setTimeout(() => overlay.remove(), 300);
    }
  }

  // ── Player Bar UI Update ──
  function updatePlayerBar(state) {
    const bar = document.getElementById('playerBar');
    if (!bar) return;

    if (!state.surah) {
      bar.classList.add('hidden');
      // Update mobile bottom nav position
      document.querySelector('.mobile-bottom-nav')?.classList.remove('player-active');
      return;
    }

    bar.classList.remove('hidden');
    // Shift mobile bottom nav up when player is active
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

    // Track info (clickable → opens now-playing)
    const trackName = bar.querySelector('.player-track-name');
    const trackArtist = bar.querySelector('.player-track-artist');
    if (trackName && state.surah) {
      trackName.textContent = state.surah.englishName;
      trackName.style.cursor = 'pointer';
      trackName.onclick = () => showNowPlaying();
    }
    if (trackArtist && state.reciter) {
      trackArtist.textContent = state.reciter.name;
      trackArtist.style.cursor = 'pointer';
      trackArtist.onclick = () => QaariRouter.navigate(`/reciter/${state.reciter.id}`);
    }

    // Play/Pause button
    const playBtn = bar.querySelector('.player-play-btn');
    if (playBtn) playBtn.innerHTML = state.playing ? ICONS.pause : ICONS.play;

    // Progress bar
    const progressBar = bar.querySelector('.player-progress-bar');
    if (progressBar && state.duration) {
      progressBar.style.width = `${(state.currentTime / state.duration) * 100}%`;
    }

    // Time display
    const timeCurrent = bar.querySelector('.player-time-current');
    const timeDuration = bar.querySelector('.player-time-duration');
    if (timeCurrent) timeCurrent.textContent = formatTime(state.currentTime);
    if (timeDuration) timeDuration.textContent = formatTime(state.duration);

    // Ayah counter
    const ayahCounter = bar.querySelector('.player-ayah-counter');
    if (ayahCounter && state.ayahs.length) {
      ayahCounter.textContent = `Ayah ${state.currentIndex + 1} / ${state.ayahs.length}`;
    }

    // Repeat button
    const repeatBtn = bar.querySelector('.player-repeat-btn');
    if (repeatBtn) {
      repeatBtn.classList.toggle('active', state.repeat !== 'none');
      let label = '';
      if (state.repeat === 'ayah') label = '<span style="font-size:8px;position:absolute;bottom:2px">1</span>';
      repeatBtn.innerHTML = ICONS.repeat + label;
    }

    // Volume
    const volSlider = bar.querySelector('.volume-slider');
    if (volSlider) {
      volSlider.value = state.volume;
      const pct = state.volume * 100;
      volSlider.style.background = `linear-gradient(to right, var(--accent) ${pct}%, var(--bg-hover) ${pct}%)`;
    }

    // Fav button in player
    const favBtn = bar.querySelector('.player-fav-btn');
    if (favBtn && state.surah) {
      const isFav = QaariStorage.isFavorite('surahs', state.surah.number);
      favBtn.classList.toggle('active', isFav);
      favBtn.innerHTML = isFav ? ICONS.heartFilled : ICONS.heart;
    }

    // Update playing ayah in list if on the surah detail page
    updatePlayingAyahInList(state);
  }

  function updatePlayingAyahInList(state) {
    const ayahList = document.getElementById('ayahList');
    if (!ayahList || !state.surah) return;

    ayahList.querySelectorAll('.ayah-item').forEach((el, i) => {
      const isPlaying = state.currentIndex === i && state.playing;
      el.classList.toggle('playing', isPlaying);

      const numEl = el.querySelector('.ayah-number');
      if (numEl) {
        numEl.innerHTML = isPlaying
          ? '<div class="equalizer"><div class="equalizer-bar"></div><div class="equalizer-bar"></div><div class="equalizer-bar"></div><div class="equalizer-bar"></div></div>'
          : (i + 1).toString();
      }

      const playBtn = el.querySelector('.ayah-play-btn');
      if (playBtn) playBtn.innerHTML = isPlaying ? ICONS.pause : ICONS.play;
    });
  }

  // ── Public Methods ──
  return {
    renderHome,
    renderSurahList,
    renderReciterList,
    renderSurahDetail,
    renderReciterDetail,
    renderFavorites,
    renderSearch,
    updatePlayerBar,
    showNowPlaying,
    closeNowPlaying,
    ICONS,
    formatTime,

    // Action handlers called from HTML
    playAyah(surahNum, reciterId, index) {
      const ps = QaariPlayer.getState();
      if (ps.surah && ps.surah.number === surahNum && ps.currentIndex === index && ps.playing) {
        QaariPlayer.pause();
      } else if (ps.surah && ps.surah.number === surahNum && ps.reciter && ps.reciter.id === reciterId) {
        QaariPlayer.playAyahAt(index);
      } else {
        QaariPlayer.loadSurah(surahNum, reciterId).then(() => {
          setTimeout(() => QaariPlayer.playAyahAt(index), 500);
        });
      }
    },

    toggleSurahFav(surahNum) {
      QaariStorage.toggleFavorite('surahs', surahNum);
      const btn = document.getElementById('surah-fav-btn');
      if (btn) {
        const isFav = QaariStorage.isFavorite('surahs', surahNum);
        btn.classList.toggle('active', isFav);
        btn.innerHTML = isFav ? ICONS.heartFilled : ICONS.heart;
      }
    },

    toggleReciterFav(reciterId) {
      QaariStorage.toggleFavorite('reciters', reciterId);
      QaariRouter.refresh();
    },

    toggleReciterDropdown() {
      const dd = document.getElementById('reciterDropdown');
      if (dd) dd.classList.toggle('open');
    },

    selectReciter(reciterId, surahNum) {
      QaariStorage.setPref('reciter', reciterId);
      const dd = document.getElementById('reciterDropdown');
      if (dd) dd.classList.remove('open');
      QaariRouter.refresh();
    },

    _npSeek(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      QaariPlayer.seekTo(pct);
    },

    _npToggleFav() {
      const state = QaariPlayer.getState();
      if (state.surah) {
        QaariStorage.toggleFavorite('surahs', state.surah.number);
        // Refresh the now-playing overlay
        closeNowPlaying();
        showNowPlaying();
      }
    },
  };
})();
