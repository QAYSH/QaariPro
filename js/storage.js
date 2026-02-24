/* ============================================
   QAARI — localStorage Helpers
   ============================================ */

const QaariStorage = (() => {
    const KEYS = {
        FAVORITES: 'qaari_favorites',
        HISTORY: 'qaari_history',
        PREFS: 'qaari_prefs',
    };

    function load(key, fallback) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch { return fallback; }
    }

    function save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) { console.warn('Storage save failed:', e); }
    }

    return {
        // ── Favorites ──
        getFavorites() {
            return load(KEYS.FAVORITES, { surahs: [], reciters: [] });
        },

        isFavorite(type, id) {
            const favs = this.getFavorites();
            return (favs[type] || []).includes(id);
        },

        toggleFavorite(type, id) {
            const favs = this.getFavorites();
            if (!favs[type]) favs[type] = [];
            const idx = favs[type].indexOf(id);
            if (idx > -1) {
                favs[type].splice(idx, 1);
            } else {
                favs[type].push(id);
            }
            save(KEYS.FAVORITES, favs);
            return idx === -1; // returns true if added
        },

        // ── Listening History ──
        getHistory() {
            return load(KEYS.HISTORY, []);
        },

        addToHistory(surahNum, reciterId, ayahIndex, surahName, reciterName) {
            let history = this.getHistory();
            // Remove existing entry for same surah+reciter
            history = history.filter(h => !(h.surahNum === surahNum && h.reciterId === reciterId));
            // Add to front
            history.unshift({
                surahNum,
                reciterId,
                ayahIndex,
                surahName,
                reciterName,
                timestamp: Date.now(),
            });
            // Keep only last 20
            if (history.length > 20) history = history.slice(0, 20);
            save(KEYS.HISTORY, history);
        },

        // ── Preferences ──
        getPrefs() {
            return load(KEYS.PREFS, {
                volume: 0.8,
                reciter: 'ar.alafasy',
                repeat: 'none', // none | surah | ayah
            });
        },

        setPref(key, value) {
            const prefs = this.getPrefs();
            prefs[key] = value;
            save(KEYS.PREFS, prefs);
        },
    };
})();
