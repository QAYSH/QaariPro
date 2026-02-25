/* ============================================
   QAARI — App Initialization (v2)
   ============================================ */

(function QaariApp() {
    'use strict';

    // ── Theme Init ──
    const initTheme = () => {
        const pref = QaariStorage.getPrefs().theme || 'dark';
        if (pref === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', pref);
        }
        updateThemeIcon();
    };

    const updateThemeIcon = () => {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;
        const theme = document.documentElement.getAttribute('data-theme');
        btn.textContent = theme === 'light' ? '☀️' : '🌙';
        // Update theme-color meta
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'light' ? '#f8f9fa' : '#0a0a0f');
    };

    initTheme();

    // ── Theme Toggle ──
    document.getElementById('themeToggle')?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        QaariStorage.setPref('theme', next);
        updateThemeIcon();
    });

    // System theme change listener
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (QaariStorage.getPrefs().theme === 'system') {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            updateThemeIcon();
        }
    });

    // ── Register Routes ──
    QaariRouter.register('/', () => QaariUI.renderHome());
    QaariRouter.register('/surahs', () => QaariUI.renderSurahList());
    QaariRouter.register('/reciters', () => QaariUI.renderReciterList());
    QaariRouter.register('/surah/:id', (params) => QaariUI.renderSurahDetail(params));
    QaariRouter.register('/reciter/:id', (params) => QaariUI.renderReciterDetail(params));
    QaariRouter.register('/favorites', () => QaariUI.renderFavorites());
    QaariRouter.register('/bookmarks', () => QaariUI.renderBookmarks());
    QaariRouter.register('/search', () => QaariUI.renderSearch(''));

    // ── Sidebar Navigation ──
    document.querySelectorAll('.nav-item[data-route]').forEach(item => {
        item.addEventListener('click', () => {
            QaariRouter.navigate(item.dataset.route);
            closeMobileSidebar();
        });
    });

    // ── Mobile Sidebar Toggle ──
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    function closeMobileSidebar() {
        sidebar?.classList.remove('open');
        overlay?.classList.remove('active');
    }

    hamburger?.addEventListener('click', () => {
        sidebar?.classList.toggle('open');
        overlay?.classList.toggle('active');
    });

    overlay?.addEventListener('click', closeMobileSidebar);

    // ── Search ──
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;

    searchInput?.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const val = e.target.value;
        searchTimeout = setTimeout(() => {
            if (val.length >= 2) {
                QaariUI.renderSearch(val);
            } else if (val.length === 0) {
                QaariRouter.refresh();
            }
        }, 300);
    });

    searchInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            QaariRouter.refresh();
        }
    });

    // ── Player State → UI Sync ──
    QaariPlayer.onStateChange((state) => {
        QaariUI.updatePlayerBar(state);
    });

    // ── Player Controls Wiring ──
    document.getElementById('playerPlayBtn')?.addEventListener('click', () => QaariPlayer.togglePlay());
    document.getElementById('playerPrevBtn')?.addEventListener('click', () => QaariPlayer.prev());
    document.getElementById('playerNextBtn')?.addEventListener('click', () => QaariPlayer.next());
    document.getElementById('playerRepeatBtn')?.addEventListener('click', () => QaariPlayer.cycleRepeat());
    document.getElementById('playerSpeedBtn')?.addEventListener('click', () => QaariPlayer.cycleSpeed());

    // Queue button
    document.getElementById('queueBtn')?.addEventListener('click', () => QaariUI.showQueueDrawer());

    // Share button
    document.getElementById('shareBtn')?.addEventListener('click', () => {
        const state = QaariPlayer.getState();
        if (state.surah) QaariUI.shareSurah(state.surah.number, state.reciter?.id);
    });

    // Sleep timer button
    document.getElementById('sleepTimerBtn')?.addEventListener('click', (e) => {
        if (e.target.closest('.sleep-timer-dropdown')) return;
        document.getElementById('sleepTimerDropdown')?.classList.toggle('open');
    });

    // Progress bar click
    document.querySelector('.player-progress-container')?.addEventListener('click', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        QaariPlayer.seekTo(pct);
    });

    // Volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    volumeSlider?.addEventListener('input', (e) => {
        QaariPlayer.setVolume(parseFloat(e.target.value));
    });

    // Volume icon toggle
    document.getElementById('volumeBtn')?.addEventListener('click', () => {
        const state = QaariPlayer.getState();
        if (state.volume > 0) {
            QaariPlayer._prevVol = state.volume;
            QaariPlayer.setVolume(0);
        } else {
            QaariPlayer.setVolume(QaariPlayer._prevVol || 0.8);
        }
    });

    // Player fav button
    document.querySelector('.player-fav-btn')?.addEventListener('click', () => {
        const state = QaariPlayer.getState();
        if (state.surah) {
            QaariStorage.toggleFavorite('surahs', state.surah.number);
            QaariUI.updatePlayerBar(state);
        }
    });

    // ── Keyboard Shortcuts ──
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.code) {
            case 'Space':
                e.preventDefault();
                QaariPlayer.togglePlay();
                break;
            case 'ArrowRight':
                QaariPlayer.next();
                break;
            case 'ArrowLeft':
                QaariPlayer.prev();
                break;
            case 'ArrowUp':
                e.preventDefault();
                QaariPlayer.setVolume(QaariPlayer.getState().volume + 0.1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                QaariPlayer.setVolume(QaariPlayer.getState().volume - 0.1);
                break;
            case 'Escape':
                QaariUI.closeNowPlaying();
                QaariUI.closeQueueDrawer();
                document.querySelector('.modal-overlay')?.remove();
                document.getElementById('sleepTimerDropdown')?.classList.remove('open');
                document.getElementById('reciterDropdown')?.classList.remove('open');
                break;
        }

        // Letter shortcuts
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
            switch (e.key) {
                case '?':
                    QaariUI.showShortcutsModal();
                    break;
                case 's':
                case 'S':
                    QaariPlayer.cycleSpeed();
                    break;
                case 'r':
                case 'R':
                    QaariPlayer.cycleRepeat();
                    break;
                case 'q':
                case 'Q':
                    QaariUI.showQueueDrawer();
                    break;
            }
        }
    });

    // ── Close dropdowns on outside click ──
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.reciter-selector')) {
            document.getElementById('reciterDropdown')?.classList.remove('open');
        }
        if (!e.target.closest('.sleep-timer-btn')) {
            document.getElementById('sleepTimerDropdown')?.classList.remove('open');
        }
    });

    // ── Init Volume ──
    const prefs = QaariStorage.getPrefs();
    QaariPlayer.setVolume(prefs.volume);
    if (prefs.speed && prefs.speed !== 1) QaariPlayer.setSpeed(prefs.speed);

    // ── Start Router ──
    QaariRouter.start();

    console.log('🕌 QaariPro — Audio Quran Streaming Platform loaded (v2)');
})();
