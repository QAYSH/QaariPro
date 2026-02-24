/* ============================================
   QAARI — Al Quran Cloud API Wrapper
   ============================================ */

const QaariAPI = (() => {
    const BASE_URL = 'https://api.alquran.cloud/v1';
    const cache = new Map();

    // ── Reciters Database ──
    const RECITERS = [
        { id: 'ar.alafasy', name: 'Mishary Rashid Alafasy', nameAr: 'مشاري العفاسي', color: '#1DB954', image: 'assets/reciters/alafasy.png' },
        { id: 'ar.abdurrahmaansudais', name: 'Abdurrahmaan As-Sudais', nameAr: 'عبدالرحمن السديس', color: '#6366f1', image: 'assets/reciters/sudais.png' },
        { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)', nameAr: 'عبد الباسط عبد الصمد', color: '#ec4899', image: 'assets/reciters/abdulbasit.png' },
        { id: 'ar.abdulsamad', name: 'Abdul Samad', nameAr: 'عبدالباسط عبدالصمد', color: '#f59e0b', image: '' },
        { id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', nameAr: 'محمود خليل الحصري', color: '#14b8a6', image: '' },
        { id: 'ar.husarymujawwad', name: 'Husary (Mujawwad)', nameAr: 'الحصري (المجود)', color: '#8b5cf6', image: '' },
        { id: 'ar.minshawi', name: 'Mohamed Siddiq Al-Minshawi', nameAr: 'محمد صديق المنشاوي', color: '#ef4444', image: '' },
        { id: 'ar.minshawimujawwad', name: 'Minshawi (Mujawwad)', nameAr: 'المنشاوي (المجود)', color: '#f97316', image: '' },
        { id: 'ar.mahermuaiqly', name: 'Maher Al-Muaiqly', nameAr: 'ماهر المعيقلي', color: '#06b6d4', image: '' },
        { id: 'ar.saoodshuraym', name: 'Saud Ash-Shuraym', nameAr: 'سعود الشريم', color: '#84cc16', image: '' },
        { id: 'ar.shaatree', name: 'Abu Bakr Ash-Shaatree', nameAr: 'أبو بكر الشاطري', color: '#a855f7', image: '' },
        { id: 'ar.ahmedajamy', name: 'Ahmed ibn Ali Al-Ajamy', nameAr: 'أحمد بن علي العجمي', color: '#e11d48', image: '' },
        { id: 'ar.abdullahbasfar', name: 'Abdullah Basfar', nameAr: 'عبد الله بصفر', color: '#0ea5e9', image: '' },
        { id: 'ar.hanirifai', name: 'Hani Ar-Rifai', nameAr: 'هاني الرفاعي', color: '#10b981', image: '' },
        { id: 'ar.hudhaify', name: 'Ali Al-Hudhaify', nameAr: 'علي الحذيفي', color: '#f43f5e', image: '' },
        { id: 'ar.ibrahimakhbar', name: 'Ibrahim Al-Akhdar', nameAr: 'إبراهيم الأخضر', color: '#22c55e', image: '' },
        { id: 'ar.muhammadayyoub', name: 'Muhammad Ayyoub', nameAr: 'محمد أيوب', color: '#3b82f6', image: '' },
        { id: 'ar.muhammadjibreel', name: 'Muhammad Jibreel', nameAr: 'محمد جبريل', color: '#d946ef', image: '' },
        { id: 'ar.parhizgar', name: 'Shahriar Parhizgar', nameAr: 'شهریار پرهیزگار', color: '#f59e0b', image: '' },
        { id: 'ar.aymanswoaid', name: 'Ayman Sowaid', nameAr: 'أيمن سويد', color: '#64748b', image: '' },
    ];

    // ── Gradient pairings for surah art ──
    const SURAH_GRADIENTS = [
        ['#1DB954', '#0d9b6a'], ['#6366f1', '#4338ca'], ['#ec4899', '#be185d'],
        ['#f59e0b', '#d97706'], ['#14b8a6', '#0d9488'], ['#8b5cf6', '#7c3aed'],
        ['#ef4444', '#dc2626'], ['#f97316', '#ea580c'], ['#06b6d4', '#0891b2'],
        ['#84cc16', '#65a30d'], ['#a855f7', '#9333ea'], ['#e11d48', '#be123c'],
    ];

    function getSurahGradient(surahNumber) {
        const pair = SURAH_GRADIENTS[(surahNumber - 1) % SURAH_GRADIENTS.length];
        return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`;
    }

    // ── API Helper ──
    async function fetchAPI(endpoint) {
        if (cache.has(endpoint)) return cache.get(endpoint);

        try {
            const res = await fetch(`${BASE_URL}${endpoint}`);
            if (!res.ok) throw new Error(`API error: ${res.status}`);
            const json = await res.json();
            if (json.code === 200) {
                cache.set(endpoint, json.data);
                return json.data;
            }
            throw new Error(json.status || 'API error');
        } catch (err) {
            console.error('Qaari API Error:', err);
            throw err;
        }
    }

    // ── Public Methods ──
    return {
        RECITERS,

        getSurahGradient,

        getReciter(id) {
            return RECITERS.find(r => r.id === id) || RECITERS[0];
        },

        async getSurahs() {
            return fetchAPI('/surah');
        },

        async getSurah(number, reciterEdition = 'ar.alafasy') {
            return fetchAPI(`/surah/${number}/${reciterEdition}`);
        },

        async getAyah(ayahNumber, reciterEdition = 'ar.alafasy') {
            return fetchAPI(`/ayah/${ayahNumber}/${reciterEdition}`);
        },

        async getSurahTranslation(number, edition = 'en.sahih') {
            return fetchAPI(`/surah/${number}/${edition}`);
        },

        getAudioUrl(reciterEdition, ayahNumber) {
            return `https://cdn.islamic.network/quran/audio/128/${reciterEdition}/${ayahNumber}.mp3`;
        },

        getReciterAvatar(reciter) {
            if (reciter.image) {
                return `<img class="reciter-avatar-img" src="${reciter.image}" alt="${reciter.name}" onerror="this.parentElement.innerHTML='<span>${reciter.name.charAt(0)}</span>'" />`;
            }
            return `<span>${reciter.name.charAt(0)}</span>`;
        },
    };
})();
