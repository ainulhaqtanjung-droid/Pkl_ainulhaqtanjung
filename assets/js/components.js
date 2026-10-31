/**
 * components.js – Shared UI Components
 * Renders sidebar, header, toasts, modals
 */

const UI = {

    /**
     * Initialize the app layout (sidebar + header + content)
     * @param {string} activePage - current page identifier
     */
    init(activePage) {
        if (!Auth.requireLogin()) return false;

        const user = Auth.getUser();
        const body = document.body;

        // Build app layout wrapper
        const wrapper = document.getElementById('app');
        if (!wrapper) return false;

        // Sidebar overlay (mobile)
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.id = 'sidebarOverlay';
        overlay.addEventListener('click', () => this.toggleSidebar(false));
        body.appendChild(overlay);

        // Render sidebar
        const sidebar = document.createElement('aside');
        sidebar.className = 'sidebar';
        sidebar.id = 'sidebar';
        sidebar.innerHTML = this.renderSidebar(user, activePage);
        body.insertBefore(sidebar, wrapper);

        // Render header
        const header = document.getElementById('topHeader');
        if (header) {
            header.innerHTML = this.renderHeader(activePage);
        }

        // Render user info
        this.updateUserInfo(user);

        // Toast container
        if (!document.getElementById('toastContainer')) {
            const tc = document.createElement('div');
            tc.className = 'toast-container';
            tc.id = 'toastContainer';
            body.appendChild(tc);
        }

        return true;
    },

    /**
     * Render sidebar HTML
     */
    renderSidebar(user, activePage) {
        const role = user.role;
        const menuItems = this.getMenuForRole(role);

        let navHtml = '';
        let currentSection = '';

        menuItems.forEach(item => {
            if (item.section && item.section !== currentSection) {
                currentSection = item.section;
                navHtml += `<div class="nav-section-title">${item.section}</div>`;
            }
            const isActive = item.id === activePage ? ' active' : '';
            const badge = item.badge ? `<span class="badge${item.badgePulse ? ' pulse' : ''}">${item.badge}</span>` : '';
            navHtml += `
                <a href="${item.href}" class="nav-item${isActive}">
                    <span class="icon">${item.icon}</span>
                    <span>${item.label}</span>
                    ${badge}
                </a>
            `;
        });

        return `
            <div class="sidebar-header">
                <div class="logo-icon">📦</div>
                <div class="logo-text">
                    <h2>Sistem Material</h2>
                    <span>PT Kinarya Utama Teknik</span>
                </div>
            </div>
            <nav class="sidebar-nav">
                ${navHtml}
            </nav>
            <div class="sidebar-footer">
                <div class="sidebar-user">
                    <div class="avatar">${Auth.getInitials()}</div>
                    <div class="user-info">
                        <div class="name">${user.nama}</div>
                        <div class="role">${user.role}</div>
                    </div>
                    <button class="sidebar-logout" onclick="Auth.logout()" title="Keluar">🚪</button>
                </div>
            </div>
        `;
    },

    /**
     * Get menu items based on role
     */
    getMenuForRole(role) {
        const pendingCount = MockDB.material_keluar.filter(k => k.status === 'Menunggu').length;

        const allMenus = [
            { id: 'dashboard',   section: 'UTAMA',       icon: '📊', label: 'Dashboard',        href: 'dashboard.html',       roles: ['Kepala Operasional', 'Admin', 'Tim Lapangan'] },
            { id: 'material',    section: 'MATERIAL',    icon: '📋', label: 'Data Material',     href: 'material.html',        roles: ['Kepala Operasional', 'Admin'] },
            { id: 'masuk',       section: 'MATERIAL',    icon: '📥', label: 'Material Masuk',    href: 'material-masuk.html',  roles: ['Admin'] },
            { id: 'permintaan',  section: 'MATERIAL',    icon: '📤', label: 'Permintaan Material', href: 'permintaan.html',   roles: ['Admin', 'Tim Lapangan'], badge: role === 'Admin' && pendingCount > 0 ? pendingCount : null, badgePulse: true },
            { id: 'riwayat',     section: 'LAPORAN',     icon: '📜', label: 'Riwayat Material',  href: 'riwayat.html',         roles: ['Kepala Operasional', 'Admin'] },
            { id: 'laporan',     section: 'LAPORAN',     icon: '🖨️', label: 'Laporan Stok',      href: 'laporan.html',         roles: ['Kepala Operasional'] },
            { id: 'pengguna',    section: 'PENGATURAN',  icon: '👥', label: 'Kelola Pengguna',   href: 'pengguna.html',        roles: ['Kepala Operasional'] },
        ];

        return allMenus.filter(m => m.roles.includes(role));
    },

    /**
     * Render top header HTML
     */
    renderHeader(activePage) {
        const titles = {
            dashboard:  { title: 'Dashboard',         sub: 'Ringkasan sistem material' },
            material:   { title: 'Data Material',     sub: 'Kelola data material gudang' },
            masuk:      { title: 'Material Masuk',     sub: 'Catat penerimaan material' },
            permintaan: { title: 'Permintaan Material',sub: 'Kelola permintaan material' },
            riwayat:    { title: 'Riwayat Material',   sub: 'Riwayat transaksi material' },
            laporan:    { title: 'Laporan Stok',       sub: 'Laporan stok material' },
            pengguna:   { title: 'Kelola Pengguna',    sub: 'Manajemen pengguna sistem' },
        };

        const t = titles[activePage] || { title: 'Halaman', sub: '' };

        return `
            <div class="d-flex align-center gap-1">
                <button class="btn-mobile-menu" onclick="UI.toggleSidebar()">☰</button>
                <div class="page-title">${t.title} <small>${t.sub}</small></div>
            </div>
            <div class="header-actions">
                <span class="text-sm text-muted">${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
        `;
    },

    updateUserInfo(user) {
        // Already rendered in sidebar
    },

    /**
     * Toggle sidebar (mobile)
     */
    toggleSidebar(forceState) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        if (!sidebar) return;

        const isOpen = sidebar.classList.contains('open');
        const newState = forceState !== undefined ? forceState : !isOpen;

        sidebar.classList.toggle('open', newState);
        overlay.classList.toggle('show', newState);
    },

    /**
     * Show toast notification
     */
    showToast(message, type = 'info', duration = 4000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span>${icons[type] || ''}</span><span>${message}</span>`;

        toast.addEventListener('click', () => {
            toast.style.animation = 'toastSlide .3s ease reverse forwards';
            setTimeout(() => toast.remove(), 300);
        });

        container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'toastSlide .3s ease reverse forwards';
                setTimeout(() => toast.remove(), 300);
            }
        }, duration);
    },

    /**
     * Open modal
     */
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    },

    /**
     * Close modal
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    },

    /**
     * Confirm dialog
     */
    confirm(message) {
        return window.confirm(message);
    },

    /**
     * Render material select options
     */
    renderMaterialOptions(selectedId = null) {
        return MockDB.material.map(m =>
            `<option value="${m.id_material}" ${m.id_material === selectedId ? 'selected' : ''}>
                ${m.kode_material} – ${m.nama_material} (Stok: ${formatAngka(m.stok)} ${m.satuan})
            </option>`
        ).join('');
    },

    /**
     * Render satuan options
     */
    renderSatuanOptions(selected = '') {
        return ['Meter', 'Roll', 'Unit', 'Pcs'].map(s =>
            `<option value="${s}" ${s === selected ? 'selected' : ''}>${s}</option>`
        ).join('');
    },

    /**
     * Render role options
     */
    renderRoleOptions(selected = '') {
        return ['Kepala Operasional', 'Admin', 'Tim Lapangan'].map(r =>
            `<option value="${r}" ${r === selected ? 'selected' : ''}>${r}</option>`
        ).join('');
    },

    /**
     * Render status badge
     */
    renderStatusBadge(status) {
        const cls = status === 'Disetujui' ? 'disetujui' : status === 'Ditolak' ? 'ditolak' : 'menunggu';
        const icon = status === 'Disetujui' ? '✓' : status === 'Ditolak' ? '✕' : '⏳';
        return `<span class="badge-status ${cls}">${icon} ${status}</span>`;
    },

    /**
     * Render role badge
     */
    renderRoleBadge(role) {
        const cls = role === 'Kepala Operasional' ? 'kepala' : role === 'Admin' ? 'admin' : 'tim';
        return `<span class="badge-role ${cls}">${role}</span>`;
    },

    /**
     * Format stok with color
     */
    renderStok(material) {
        const cls = isStokRendah(material) ? 'stok-rendah' : 'stok-aman';
        const warning = isStokRendah(material) ? ' ⚠️' : '';
        return `<span class="${cls}">${formatAngka(material.stok)} ${material.satuan}${warning}</span>`;
    }
};
