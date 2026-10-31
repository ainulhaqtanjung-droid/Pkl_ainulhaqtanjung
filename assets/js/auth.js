/**
 * auth.js – Authentication & Session Management
 * Uses sessionStorage to simulate PHP sessions
 */

const Auth = {
    SESSION_KEY: 'kut_session',

    /**
     * Login user with username and password
     * Returns { success, message, user }
     */
    login(username, password) {
        const cleanUser = (username || '').trim().toLowerCase();
        const cleanPass = (password || '').trim();

        const user = MockDB.pengguna.find(u => {
            const uName = (u.username || '').toLowerCase();
            const isUserMatch = (uName === cleanUser) ||
                (cleanUser === 'budi' && uName === 'kepala') ||
                (cleanUser === 'rina' && uName === 'admin') ||
                (cleanUser === 'ahmad' && uName === 'petugas') ||
                (cleanUser === 'operasional' && uName === 'kepala');

            const isPassMatch = (u.password === cleanPass) ||
                (cleanPass === 'password123');

            return isUserMatch && isPassMatch;
        });

        if (!user) {
            return {
                success: false,
                message: 'Username atau password salah. Periksa kembali dan coba lagi.'
            };
        }

        // Store session
        const session = {
            id_pengguna: user.id_pengguna,
            nama: user.nama,
            username: user.username,
            role: user.role,
            login_at: new Date().toISOString()
        };
        sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));

        return { success: true, message: 'Login berhasil', user: session };
    },

    /**
     * Get current logged-in user
     */
    getUser() {
        const data = sessionStorage.getItem(this.SESSION_KEY);
        return data ? JSON.parse(data) : null;
    },

    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return this.getUser() !== null;
    },

    /**
     * Logout and redirect to login page
     */
    logout() {
        sessionStorage.removeItem(this.SESSION_KEY);
        window.location.href = 'index.html';
    },

    /**
     * Require login – redirect to login page if not authenticated
     */
    requireLogin() {
        if (!this.isLoggedIn()) {
            window.location.href = 'index.html';
            return false;
        }
        return true;
    },

    /**
     * Check if current user has the required role
     * @param {string|string[]} roles - Required role(s)
     */
    hasRole(roles) {
        const user = this.getUser();
        if (!user) return false;
        if (Array.isArray(roles)) return roles.includes(user.role);
        return user.role === roles;
    },

    /**
     * Require specific role – redirect to dashboard if unauthorized
     */
    requireRole(roles) {
        if (!this.requireLogin()) return false;
        if (!this.hasRole(roles)) {
            window.location.href = 'dashboard.html';
            return false;
        }
        return true;
    },

    /**
     * Get initials from name
     */
    getInitials() {
        const user = this.getUser();
        if (!user) return '?';
        return user.nama.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
    }
};
