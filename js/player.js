/* ============================================
   QAARI — Audio Player Engine (v2)
   ============================================ */

const QaariPlayer = (() => {
    let audio = new Audio();
    let preloadAudio = null; // for preloading next ayah
    let audioContext = null;
    let analyser = null;
    let sourceNode = null;
    let sleepTimerId = null;
    let sleepTimerEnd = 0;

    let state = {
        playing: false,
        surah: null,
        reciter: null,
        ayahs: [],
        currentIndex: 0,
        duration: 0,
        currentTime: 0,
        volume: QaariStorage.getPrefs().volume || 0.8,
        repeat: QaariStorage.getPrefs().repeat || 'none',
        speed: QaariStorage.getPrefs().speed || 1,
        loading: false,
        continuousPlay: QaariStorage.getPrefs().continuousPlay !== false,
        sleepTimer: 0, // minutes remaining, 0 = off
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
        } else if (state.continuousPlay && state.surah && state.surah.number < 114) {
            // Continuous surah playback — auto-advance to next surah
            const nextSurah = state.surah.number + 1;
            const reciterId = state.reciter ? state.reciter.id : null;
            publicAPI.loadSurah(nextSurah, reciterId);
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

    // ── Preload next ayah ──
    function preloadNext(index) {
        const nextIdx = index + 1;
        if (nextIdx < state.ayahs.length && state.ayahs[nextIdx]) {
            preloadAudio = new Audio();
            preloadAudio.preload = 'auto';
            preloadAudio.src = state.ayahs[nextIdx].audio;
        }
    }

    // ── Core ──
    function setAyah(index) {
        if (!state.ayahs[index]) return;
        state.currentIndex = index;
        state.loading = true;
        audio.src = state.ayahs[index].audio;
        audio.playbackRate = state.speed;
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
                // Preload next ayah
                preloadNext(index);
            })
            .catch(err => {
                console.error('Play failed:', err);
                state.loading = false;
                emit();
            });
        emit();
    }

    // ── Web Audio API for Visualizer (deferred) ──
    // Only connect to audio element when visualizer is explicitly opened,
    // to avoid CORS issues that silence audio on file:// or cross-origin.
    function initAudioContext() {
        if (audioContext) return;
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 128;
            analyser.smoothingTimeConstant = 0.8;
            // Only connect source when we have an audio context
            // This requires crossOrigin on audio for CDN sources
            audio.crossOrigin = 'anonymous';
            sourceNode = audioContext.createMediaElementSource(audio);
            sourceNode.connect(analyser);
            analyser.connect(audioContext.destination);
        } catch (e) {
            console.warn('Web Audio API not available:', e);
            audioContext = null;
            analyser = null;
        }
    }

    // ── Init ──
    audio.volume = state.volume;
    audio.playbackRate = state.speed;

    // ── Public API ──
    const publicAPI = {
        onStateChange(fn) {
            listeners.add(fn);
            return () => listeners.delete(fn);
        },

        getState() {
            return { ...state };
        },

        getAnalyser() {
            // Only init audio context when visualizer is explicitly requested
            if (!audioContext) {
                initAudioContext();
                // If we just connected crossOrigin, we may need to reload current src
                if (audio.src && sourceNode) {
                    const currentSrc = audio.src;
                    const currentTime = audio.currentTime;
                    const wasPlaying = !audio.paused;
                    audio.src = currentSrc;
                    audio.currentTime = currentTime;
                    if (wasPlaying) audio.play().catch(() => { });
                }
            }
            return analyser;
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
                // Audio context is only initialized when visualizer is opened
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

        // ── Speed Control ──
        setSpeed(rate) {
            const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
            state.speed = speeds.includes(rate) ? rate : 1;
            audio.playbackRate = state.speed;
            QaariStorage.setPref('speed', state.speed);
            emit();
        },

        cycleSpeed() {
            const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
            const idx = speeds.indexOf(state.speed);
            const next = speeds[(idx + 1) % speeds.length];
            this.setSpeed(next);
        },

        // ── Sleep Timer ──
        setSleepTimer(minutes) {
            if (sleepTimerId) clearTimeout(sleepTimerId);
            if (minutes <= 0) {
                state.sleepTimer = 0;
                sleepTimerEnd = 0;
                emit();
                return;
            }
            state.sleepTimer = minutes;
            sleepTimerEnd = Date.now() + minutes * 60 * 1000;
            sleepTimerId = setTimeout(() => {
                this.pause();
                state.sleepTimer = 0;
                sleepTimerEnd = 0;
                emit();
            }, minutes * 60 * 1000);
            emit();
        },

        clearSleepTimer() {
            if (sleepTimerId) clearTimeout(sleepTimerId);
            sleepTimerId = null;
            state.sleepTimer = 0;
            sleepTimerEnd = 0;
            emit();
        },

        getSleepTimerRemaining() {
            if (!sleepTimerEnd) return 0;
            return Math.max(0, Math.ceil((sleepTimerEnd - Date.now()) / 1000 / 60));
        },

        // ── Continuous Play ──
        toggleContinuousPlay() {
            state.continuousPlay = !state.continuousPlay;
            QaariStorage.setPref('continuousPlay', state.continuousPlay);
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

        // ── Queue Integration ──
        async playNextInQueue() {
            const queue = QaariStorage.getQueue();
            if (queue.length === 0) return false;
            const next = queue[0];
            QaariStorage.removeFromQueue(0);
            await this.loadSurah(next.surahNum, next.reciterId);
            return true;
        },
    };

    return publicAPI;
})();
