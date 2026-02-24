/* ============================================
   QAARI — App Initialization
   ============================================ */

(function QaariApp() {
    'use strict';

    // ── Register Routes ──
    QaariRouter.register('/', () => QaariUI.renderHome());
    QaariRouter.register('/surahs', () => QaariUI.renderSurahList());
    QaariRouter.register('/reciters', () => QaariUI.renderReciterList());
    QaariRouter.register('/surah/:id', (params) => QaariUI.renderSurahDetail(params));
    QaariRouter.register('/reciter/:id', (params) => QaariUI.renderReciterDetail(params));
    QaariRouter.register('/favorites', () => QaariUI.renderFavorites());
    QaariRouter.register('/search', () => QaariUI.renderSearch(''));

    // ── Sidebar Navigation ──
    document.querySelectorAll('.nav-item[data-route]').forEach(item => {
        item.addEventListener('click', () => {
            QaariRouter.navigate(item.dataset.route);
            // Close mobile sidebar
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
        // Don't trigger if typing in search
        if (e.target.tagName === 'INPUT') return;

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
        }
    });

    // ── Close dropdowns on outside click ──
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.reciter-selector')) {
            document.getElementById('reciterDropdown')?.classList.remove('open');
        }
    });

    // ── Init Volume ──
    const prefs = QaariStorage.getPrefs();
    QaariPlayer.setVolume(prefs.volume);

    // ── Start Router ──
    QaariRouter.start();

    console.log('🕌 Qaari — Audio Quran Streaming Platform loaded');
})();
