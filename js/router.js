/* ============================================
   QAARI — Hash Router (v2: smooth transitions)
   ============================================ */

const QaariRouter = (() => {
    const routes = {};
    let currentRoute = null;

    function parseHash() {
        const hash = window.location.hash.slice(1) || '/';
        const [path, ...rest] = hash.split('?');
        const segments = path.split('/').filter(Boolean);
        return { path, segments };
    }

    function matchRoute(path) {
        const segments = path.split('/').filter(Boolean);

        for (const [pattern, handler] of Object.entries(routes)) {
            const patternSegments = pattern.split('/').filter(Boolean);
            if (patternSegments.length !== segments.length) continue;

            const params = {};
            let match = true;

            for (let i = 0; i < patternSegments.length; i++) {
                if (patternSegments[i].startsWith(':')) {
                    params[patternSegments[i].slice(1)] = decodeURIComponent(segments[i]);
                } else if (patternSegments[i] !== segments[i]) {
                    match = false;
                    break;
                }
            }

            if (match) return { handler, params };
        }

        if (routes['/']) return { handler: routes['/'], params: {} };
        return null;
    }

    async function handleRoute() {
        const { path } = parseHash();
        if (path === currentRoute) return;
        currentRoute = path;

        const result = matchRoute(path);
        if (!result) return;

        // Update active nav (sidebar + mobile bottom nav)
        document.querySelectorAll('.nav-item[data-route]').forEach(el => {
            const route = el.dataset.route;
            const isActive = route === (path === '' ? '/' : path) ||
                (route !== '/' && path.startsWith(route));
            el.classList.toggle('active', isActive);
        });

        const contentEl = document.getElementById('content');
        if (!contentEl) return;

        // Smooth page transition — fade out, swap, fade in
        contentEl.classList.add('page-exit');

        await new Promise(r => setTimeout(r, 150));

        // Scroll main content to top
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.scrollTop = 0;

        try {
            await result.handler(result.params);
        } catch (err) {
            console.error('Route error:', err);
        }

        contentEl.classList.remove('page-exit');
        contentEl.classList.add('page-enter');
        setTimeout(() => contentEl.classList.remove('page-enter'), 400);
    }

    return {
        register(pattern, handler) {
            routes[pattern] = handler;
        },

        navigate(path) {
            window.location.hash = path;
        },

        start() {
            window.addEventListener('hashchange', handleRoute);
            handleRoute();
        },

        getCurrentRoute() {
            return currentRoute;
        },

        refresh() {
            currentRoute = null;
            handleRoute();
        },
    };
})();
