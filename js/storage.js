/* ============================================
   QAARI — localStorage Helpers (v2)
   ============================================ */

const QaariStorage = (() => {
    const KEYS = {
        FAVORITES: 'qaari_favorites',
        HISTORY: 'qaari_history',
        PREFS: 'qaari_prefs',
        BOOKMARKS: 'qaari_bookmarks',
        QUEUE: 'qaari_queue',
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

        clearHistory() {
            save(KEYS.HISTORY, []);
        },

        // ── Bookmarks ──
        getBookmarks() {
            return load(KEYS.BOOKMARKS, []);
        },

        addBookmark(surahNum, ayahIndex, surahName, note = '') {
            const bookmarks = this.getBookmarks();
            // Don't add duplicate
            if (bookmarks.some(b => b.surahNum === surahNum && b.ayahIndex === ayahIndex)) return false;
            bookmarks.unshift({
                id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
                surahNum,
                ayahIndex,
                surahName,
                note,
                timestamp: Date.now(),
            });
            save(KEYS.BOOKMARKS, bookmarks);
            return true;
        },

        removeBookmark(id) {
            let bookmarks = this.getBookmarks();
            bookmarks = bookmarks.filter(b => b.id !== id);
            save(KEYS.BOOKMARKS, bookmarks);
        },

        isBookmarked(surahNum, ayahIndex) {
            return this.getBookmarks().some(b => b.surahNum === surahNum && b.ayahIndex === ayahIndex);
        },

        // ── Queue ──
        getQueue() {
            return load(KEYS.QUEUE, []);
        },

        addToQueue(surahNum, reciterId, surahName, reciterName) {
            const queue = this.getQueue();
            queue.push({ surahNum, reciterId, surahName, reciterName, addedAt: Date.now() });
            save(KEYS.QUEUE, queue);
            return queue.length;
        },

        removeFromQueue(index) {
            const queue = this.getQueue();
            queue.splice(index, 1);
            save(KEYS.QUEUE, queue);
        },

        clearQueue() {
            save(KEYS.QUEUE, []);
        },

        // ── Preferences ──
        getPrefs() {
            return load(KEYS.PREFS, {
                volume: 0.8,
                reciter: 'ar.alafasy',
                repeat: 'none',
                speed: 1,
                theme: 'dark',
                translation: 'en.sahih',
                continuousPlay: true,
            });
        },

        setPref(key, value) {
            const prefs = this.getPrefs();
            prefs[key] = value;
            save(KEYS.PREFS, prefs);
        },
    };
})();
