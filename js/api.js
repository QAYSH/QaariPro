/* ============================================
   QAARI — Al Quran Cloud API Wrapper (v2)
   ============================================ */

const QaariAPI = (() => {
    const BASE_URL = 'https://api.alquran.cloud/v1';
    const cache = new Map();

    // ── Reciters Database ──
    const RECITERS = [
        { id: 'ar.alafasy', name: 'Mishary Rashid Alafasy', nameAr: 'مشاري العفاسي', color: '#1DB954', image: 'assets/reciters/alafasy.png' },
        { id: 'ar.abdurrahmaansudais', name: 'Abdurrahmaan As-Sudais', nameAr: 'عبدالرحمن السديس', color: '#6366f1', image: 'assets/reciters/sudais.jpg' },
        { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)', nameAr: 'عبد الباسط عبد الصمد', color: '#ec4899', image: 'assets/reciters/abdulbasit.jpg' },
        { id: 'ar.abdulsamad', name: 'Abdul Samad', nameAr: 'عبدالباسط عبدالصمد', color: '#f59e0b', image: 'assets/reciters/abdulsamad.jpg' },
        { id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary', nameAr: 'محمود خليل الحصري', color: '#14b8a6', image: 'assets/reciters/husary.png' },
        { id: 'ar.husarymujawwad', name: 'Husary (Mujawwad)', nameAr: 'الحصري (المجود)', color: '#8b5cf6', image: 'assets/reciters/husarymujawwad.png' },
        { id: 'ar.minshawi', name: 'Mohamed Siddiq Al-Minshawi', nameAr: 'محمد صديق المنشاوي', color: '#ef4444', image: 'assets/reciters/minshawi.jpg' },
        { id: 'ar.minshawimujawwad', name: 'Minshawi (Mujawwad)', nameAr: 'المنشاوي (المجود)', color: '#f97316', image: 'assets/reciters/minshawi.jpg' },
        { id: 'ar.mahermuaiqly', name: 'Maher Al-Muaiqly', nameAr: 'ماهر المعيقلي', color: '#06b6d4', image: 'assets/reciters/muaiqly.png' },
        { id: 'ar.saoodshuraym', name: 'Saud Ash-Shuraym', nameAr: 'سعود الشريم', color: '#84cc16', image: 'assets/reciters/shuraym.png' },
        { id: 'ar.shaatree', name: 'Abu Bakr Ash-Shaatree', nameAr: 'أبو بكر الشاطري', color: '#a855f7', image: 'assets/reciters/shaatree.png' },
        { id: 'ar.ahmedajamy', name: 'Ahmed ibn Ali Al-Ajamy', nameAr: 'أحمد بن علي العجمي', color: '#e11d48', image: 'assets/reciters/ajamy.png' },
        { id: 'ar.abdullahbasfar', name: 'Abdullah Basfar', nameAr: 'عبد الله بصفر', color: '#0ea5e9', image: 'assets/reciters/basfar.jpg' },
        { id: 'ar.hanirifai', name: 'Hani Ar-Rifai', nameAr: 'هاني الرفاعي', color: '#10b981', image: 'assets/reciters/rifai.png' },
        { id: 'ar.hudhaify', name: 'Ali Al-Hudhaify', nameAr: 'علي الحذيفي', color: '#f43f5e', image: 'assets/reciters/hudhaify.jpg' },
        { id: 'ar.ibrahimakhbar', name: 'Ibrahim Al-Akhdar', nameAr: 'إبراهيم الأخضر', color: '#22c55e', image: 'assets/reciters/akhdar.png' },
        { id: 'ar.muhammadayyoub', name: 'Muhammad Ayyoub', nameAr: 'محمد أيوب', color: '#3b82f6', image: 'assets/reciters/ayyoub.jpg' },
        { id: 'ar.muhammadjibreel', name: 'Muhammad Jibreel', nameAr: 'محمد جبريل', color: '#d946ef', image: 'assets/reciters/jibreel.jpg' },
        { id: 'ar.parhizgar', name: 'Shahriar Parhizgar', nameAr: 'شهریار پرهیزگار', color: '#f59e0b', image: 'assets/reciters/parhizgar.jpg' },
        { id: 'ar.aymanswoaid', name: 'Ayman Sowaid', nameAr: 'أيمن سويد', color: '#64748b', image: 'assets/reciters/sowaid.jpg' },
    ];

    // ── Translation Editions ──
    const TRANSLATIONS = [
        { id: 'en.sahih', language: 'English', name: 'Saheeh International', flag: '🇬🇧' },
        { id: 'en.asad', language: 'English', name: 'Muhammad Asad', flag: '🇬🇧' },
        { id: 'en.pickthall', language: 'English', name: 'Pickthall', flag: '🇬🇧' },
        { id: 'ur.jalandhry', language: 'Urdu', name: 'Jalandhry', flag: '🇵🇰' },
        { id: 'ur.ahmedali', language: 'Urdu', name: 'Ahmed Ali', flag: '🇵🇰' },
        { id: 'fr.hamidullah', language: 'French', name: 'Hamidullah', flag: '🇫🇷' },
        { id: 'tr.diyanet', language: 'Turkish', name: 'Diyanet İşleri', flag: '🇹🇷' },
        { id: 'id.indonesian', language: 'Indonesian', name: 'Bahasa Indonesia', flag: '🇮🇩' },
        { id: 'bn.bengali', language: 'Bengali', name: 'Muhiuddin Khan', flag: '🇧🇩' },
        { id: 'de.aburida', language: 'German', name: 'Abu Rida', flag: '🇩🇪' },
        { id: 'es.cortes', language: 'Spanish', name: 'Julio Cortes', flag: '🇪🇸' },
        { id: 'ru.kuliev', language: 'Russian', name: 'Kuliev', flag: '🇷🇺' },
        { id: 'ml.abdulhameed', language: 'Malayalam', name: 'Abdul Hameed', flag: '🇮🇳' },
        { id: 'zh.majian', language: 'Chinese', name: 'Ma Jian', flag: '🇨🇳' },
    ];

    // ── Surah Juz Mapping + Context ──
    const SURAH_META = {
        1: { juz: [1], meaning: 'The Opening', context: 'The most recited surah in the world, repeated in every unit of prayer.' },
        2: { juz: [1, 2, 3], meaning: 'The Cow', context: 'The longest surah, covering laws, stories of past nations, and guidance for the Muslim community.' },
        3: { juz: [3, 4], meaning: 'The Family of Imran', context: 'Discusses the family of Imran, the birth of Maryam, Isa, and the Battle of Uhud.' },
        4: { juz: [4, 5, 6], meaning: 'The Women', context: 'Covers rights of women, inheritance laws, and family relations.' },
        5: { juz: [6, 7], meaning: 'The Table Spread', context: 'Discusses lawful food, fulfillment of contracts, and the story of Isa\'s disciples.' },
        6: { juz: [7, 8], meaning: 'The Cattle', context: 'Focuses on oneness of Allah, rejection of polytheism, and stories of previous prophets.' },
        7: { juz: [8, 9], meaning: 'The Heights', context: 'Tells the story of Adam, Musa, and the people of the heights between Paradise and Hell.' },
        8: { juz: [9, 10], meaning: 'The Spoils of War', context: 'Revealed after the Battle of Badr, discusses distribution of war spoils and trust in Allah.' },
        9: { juz: [10, 11], meaning: 'The Repentance', context: 'The only surah without Bismillah. Discusses treaties, hypocrites, and sincere repentance.' },
        10: { juz: [11], meaning: 'Jonah', context: 'Named after Prophet Yunus, emphasizes Allah\'s mercy and the truth of the Quran.' },
        18: { juz: [15, 16], meaning: 'The Cave', context: 'Contains four great stories: People of the Cave, the two gardens, Musa & Khidr, Dhul-Qarnayn.' },
        36: { juz: [22, 23], meaning: 'Ya-Sin', context: 'Called the Heart of the Quran. Covers resurrection, signs of Allah in nature, and the Day of Judgment.' },
        55: { juz: [27], meaning: 'The Most Merciful', context: 'Lists the blessings of Allah, repeatedly asking "Which of your Lord\'s favors will you deny?"' },
        56: { juz: [27], meaning: 'The Inevitable Event', context: 'Describes the Day of Judgment and the three groups: the forerunners, the right, and the left.' },
        67: { juz: [29], meaning: 'The Sovereignty', context: 'Reflects on Allah\'s dominion over creation and the consequences for disbelievers.' },
        78: { juz: [30], meaning: 'The Great News', context: 'Opens Juz Amma. Describes the Day of Resurrection and Allah\'s signs in nature.' },
        112: { juz: [30], meaning: 'Sincerity', context: 'Declares the oneness of Allah. Equal in reward to one-third of the Quran.' },
        113: { juz: [30], meaning: 'The Daybreak', context: 'Seeking refuge in Allah from external evils and darkness.' },
        114: { juz: [30], meaning: 'Mankind', context: 'The final surah, seeking refuge from the whisperer who whispers into the hearts of mankind.' },
    };

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
        TRANSLATIONS,
        SURAH_META,

        getSurahGradient,

        getReciter(id) {
            return RECITERS.find(r => r.id === id) || RECITERS[0];
        },

        getTranslation(id) {
            return TRANSLATIONS.find(t => t.id === id) || TRANSLATIONS[0];
        },

        getSurahMeta(number) {
            return SURAH_META[number] || null;
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
