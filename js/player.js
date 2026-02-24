/* ============================================
   QAARI — Audio Player Engine
   ============================================ */

const QaariPlayer = (() => {
    let audio = new Audio();
    let state = {
        playing: false,
        surah: null,     // surah data object
        reciter: null,   // reciter object
        ayahs: [],       // array of ayah objects
        currentIndex: 0, // current ayah index
        duration: 0,
        currentTime: 0,
        volume: QaariStorage.getPrefs().volume || 0.8,
        repeat: QaariStorage.getPrefs().repeat || 'none', // none | surah | ayah
        loading: false,
    };

    const listeners = new Set();

    // ── Events ──
    function emit() {
        listeners.forEach(fn => fn({ ...state }));
    }

    audio.addEventListener('timeupdate', () => {
        state.currentTime = audio.currentTime;
        state.duration = audio.duration || 0;
        emit();
    });

    audio.addEventListener('loadedmetadata', () => {
        state.duration = audio.duration;
        state.loading = false;
        emit();
    });

    audio.addEventListener('ended', () => {
        if (state.repeat === 'ayah') {
            audio.currentTime = 0;
            audio.play();
            return;
        }
        // Auto-advance to next ayah
        if (state.currentIndex < state.ayahs.length - 1) {
            setAyah(state.currentIndex + 1);
        } else if (state.repeat === 'surah') {
            setAyah(0);
        } else {
            state.playing = false;
            emit();
        }
    });

    audio.addEventListener('waiting', () => {
        state.loading = true;
        emit();
    });

    audio.addEventListener('canplay', () => {
        state.loading = false;
        emit();
    });

    audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        state.loading = false;
        state.playing = false;
        emit();
    });

    // ── Core ──
    function setAyah(index) {
        if (!state.ayahs[index]) return;
        state.currentIndex = index;
        state.loading = true;
        audio.src = state.ayahs[index].audio;
        audio.play()
            .then(() => {
                state.playing = true;
                // Save to history
                if (state.surah && state.reciter) {
                    QaariStorage.addToHistory(
                        state.surah.number,
                        state.reciter.id,
                        index,
                        state.surah.englishName,
                        state.reciter.name
                    );
                }
                emit();
            })
            .catch(err => {
                console.error('Play failed:', err);
                state.loading = false;
                emit();
            });
        emit();
    }

    // ── Init volume ──
    audio.volume = state.volume;

    return {
        onStateChange(fn) {
            listeners.add(fn);
            return () => listeners.delete(fn);
        },

        getState() {
            return { ...state };
        },

        async loadSurah(surahNumber, reciterId = null) {
            const rid = reciterId || QaariStorage.getPrefs().reciter || 'ar.alafasy';
            const reciter = QaariAPI.getReciter(rid);

            state.loading = true;
            emit();

            try {
                const data = await QaariAPI.getSurah(surahNumber, rid);
                state.surah = data;
                state.reciter = reciter;
                state.ayahs = data.ayahs;
                state.currentIndex = 0;

                QaariStorage.setPref('reciter', rid);
                setAyah(0);
            } catch (err) {
                console.error('Failed to load surah:', err);
                state.loading = false;
                emit();
            }
        },

        play() {
            if (state.ayahs.length === 0) return;
            audio.play().then(() => {
                state.playing = true;
                emit();
            });
        },

        pause() {
            audio.pause();
            state.playing = false;
            emit();
        },

        togglePlay() {
            if (state.playing) this.pause();
            else this.play();
        },

        next() {
            if (state.currentIndex < state.ayahs.length - 1) {
                setAyah(state.currentIndex + 1);
            }
        },

        prev() {
            if (audio.currentTime > 3) {
                audio.currentTime = 0;
            } else if (state.currentIndex > 0) {
                setAyah(state.currentIndex - 1);
            }
        },

        seekTo(fraction) {
            if (state.duration) {
                audio.currentTime = fraction * state.duration;
            }
        },

        setVolume(vol) {
            state.volume = Math.max(0, Math.min(1, vol));
            audio.volume = state.volume;
            QaariStorage.setPref('volume', state.volume);
            emit();
        },

        cycleRepeat() {
            const modes = ['none', 'surah', 'ayah'];
            const idx = modes.indexOf(state.repeat);
            state.repeat = modes[(idx + 1) % modes.length];
            QaariStorage.setPref('repeat', state.repeat);
            emit();
        },

        playAyahAt(index) {
            setAyah(index);
        },

        changeReciter(reciterId) {
            if (state.surah) {
                this.loadSurah(state.surah.number, reciterId);
            } else {
                QaariStorage.setPref('reciter', reciterId);
            }
        },
    };
})();
