import { useState, useMemo, useEffect } from 'react'

// ─── Icons (inline SVG) ───────────────────────────────────────────────────────
const ScissorsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
  </svg>
)
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)
const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.66A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z"/>
  </svg>
)
const TagIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
)
const EmptyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

// ─── Initial seed data ────────────────────────────────────────────────────────
const SEED = [
  { id: 1, name: 'James Holloway',   phone: '071-234-5678', service: 'Fade Cut',      price: 1800, status: 'Completed', date: '2025-05-10' },
  { id: 2, name: 'Amara Perera',     phone: '077-876-5432', service: 'Beard Trim',    price: 900,  status: 'Pending',   date: '2025-05-14' },
  { id: 3, name: 'Reuben Silva',     phone: '076-112-3344', service: 'Full Haircut',  price: 1500, status: 'Completed', date: '2025-05-12' },
  { id: 4, name: 'Tanya Mendis',     phone: '070-998-7766', service: 'Colour & Cut',  price: 4500, status: 'In Progress', date: '2025-05-15' },
  { id: 5, name: 'Dilan Rajapaksa',  phone: '075-321-0000', service: 'Scalp Treatment', price: 2200, status: 'Pending', date: '2025-05-16' },
]

const SERVICES = ['Fade Cut', 'Beard Trim', 'Full Haircut', 'Colour & Cut', 'Scalp Treatment', 'Kids Cut', 'Hot Towel Shave', 'Perm']
const STATUSES = ['Pending', 'In Progress', 'Completed', 'Cancelled']

const STATUS_COLORS = {
  'Pending':     { bg: 'rgba(201,168,76,0.12)', color: '#c9a84c', dot: '#c9a84c' },
  'In Progress': { bg: 'rgba(52,152,219,0.12)', color: '#5ba3d9', dot: '#5ba3d9' },
  'Completed':   { bg: 'rgba(39,174,96,0.12)',  color: '#4caf7d', dot: '#4caf7d' },
  'Cancelled':   { bg: 'rgba(192,57,43,0.12)',  color: '#c0392b', dot: '#c0392b' },
}

let nextId = SEED.length + 1

// ─── Modal Component ──────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()} className="animate-scale">
        <div style={styles.modalHeader}>
          <span style={styles.modalTitle}>{title}</span>
          <button style={styles.closeBtn} onClick={onClose}><CloseIcon /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ─── Form Component ───────────────────────────────────────────────────────────
function ClientForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || {
    name: '', phone: '', service: SERVICES[0], price: '', status: 'Pending', date: new Date().toISOString().split('T')[0]
  })
  const [errors, setErrors] = useState({})

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = 'Enter a valid price'
    if (!form.date) e.date = 'Date is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSave({ ...form, price: Number(form.price) })
  }

  return (
    <div style={styles.formBody}>
      <div style={styles.formGrid}>
        <Field label="Client Name" error={errors.name} icon={<UserIcon />}>
          <input style={{ ...styles.input, ...(errors.name ? styles.inputError : {}) }}
            value={form.name} onChange={e => set('name', e.target.value)}
            placeholder="Full name" />
        </Field>
        <Field label="Phone" error={errors.phone} icon={<PhoneIcon />}>
          <input style={{ ...styles.input, ...(errors.phone ? styles.inputError : {}) }}
            value={form.phone} onChange={e => set('phone', e.target.value)}
            placeholder="07X-XXX-XXXX" />
        </Field>
        <Field label="Service" icon={<TagIcon />}>
          <select style={styles.input} value={form.service} onChange={e => set('service', e.target.value)}>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Price (LKR)" error={errors.price}>
          <input style={{ ...styles.input, ...(errors.price ? styles.inputError : {}) }}
            type="number" value={form.price} onChange={e => set('price', e.target.value)}
            placeholder="0.00" min="0" />
        </Field>
        <Field label="Status">
          <select style={styles.input} value={form.status} onChange={e => set('status', e.target.value)}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Date" error={errors.date}>
          <input style={{ ...styles.input, ...(errors.date ? styles.inputError : {}) }}
            type="date" value={form.date} onChange={e => set('date', e.target.value)} />
        </Field>
      </div>
      <div style={styles.formActions}>
        <button style={styles.btnSecondary} onClick={onCancel}>Cancel</button>
        <button style={styles.btnPrimary} onClick={handleSubmit}>
          {initial ? 'Save Changes' : 'Add Client'}
        </button>
      </div>
    </div>
  )
}

function Field({ label, error, icon, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>
        {icon && <span style={{ marginRight: 4, opacity: 0.6 }}>{icon}</span>}
        {label}
      </label>
      {children}
      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  )
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────
function DeleteConfirm({ client, onConfirm, onCancel }) {
  return (
    <div style={styles.formBody}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
        Are you sure you want to remove <strong style={{ color: 'var(--text-primary)' }}>{client.name}</strong> from the records?
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>This action cannot be undone.</p>
      <div style={{ ...styles.formActions, marginTop: 24 }}>
        <button style={styles.btnSecondary} onClick={onCancel}>Cancel</button>
        <button style={{ ...styles.btnPrimary, background: 'var(--danger)', boxShadow: 'none' }} onClick={onConfirm}>
          Delete Client
        </button>
      </div>
    </div>
  )
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar({ clients }) {
  const total = clients.length
  const revenue = clients.filter(c => c.status === 'Completed').reduce((s, c) => s + c.price, 0)
  const pending = clients.filter(c => c.status === 'Pending').length
  const completed = clients.filter(c => c.status === 'Completed').length

  return (
    <div style={styles.statsBar}>
      {[
        { label: 'Total Clients', value: total },
        { label: 'Revenue (LKR)', value: revenue.toLocaleString() },
        { label: 'Pending', value: pending },
        { label: 'Completed', value: completed },
      ].map((s, i) => (
        <div key={i} style={styles.statCard}>
          <span style={styles.statValue}>{s.value}</span>
          <span style={styles.statLabel}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [clients, setClients]         = useState(SEED)
  const [search, setSearch]           = useState('')
  const [filterStatus, setFilter]     = useState('All')
  const [modal, setModal]             = useState(null) // null | 'add' | 'edit' | 'delete'
  const [selected, setSelected]       = useState(null)
  const [sortKey, setSortKey]         = useState('date')
  const [sortDir, setSortDir]         = useState('desc')
  const [toastMsg, setToastMsg]       = useState('')

  const toast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2800)
  }

  const filtered = useMemo(() => {
    let list = [...clients]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.service.toLowerCase().includes(q)
      )
    }
    if (filterStatus !== 'All') list = list.filter(c => c.status === filterStatus)
    list.sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey]
      if (sortKey === 'price') { va = Number(va); vb = Number(vb) }
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return list
  }, [clients, search, filterStatus, sortKey, sortDir])

  const handleAdd = (data) => {
    setClients(c => [...c, { ...data, id: nextId++ }])
    setModal(null)
    toast('Client added successfully')
  }

  const handleEdit = (data) => {
    setClients(c => c.map(x => x.id === selected.id ? { ...data, id: selected.id } : x))
    setModal(null)
    setSelected(null)
    toast('Client updated successfully')
  }

  const handleDelete = () => {
    setClients(c => c.filter(x => x.id !== selected.id))
    setModal(null)
    setSelected(null)
    toast('Client removed')
  }

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const SortArrow = ({ k }) => (
    <span style={{ marginLeft: 4, opacity: sortKey === k ? 1 : 0.25, fontSize: 11 }}>
      {sortKey === k ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  )

  return (
    <div style={styles.app}>
      {/* ── Header ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brand}>
            <span style={styles.brandIcon}><ScissorsIcon /></span>
            <div>
              <h1 style={styles.brandName}>SmartCut</h1>
              <span style={styles.brandSub}>Client Management</span>
            </div>
          </div>
          <button style={styles.btnPrimary} onClick={() => setModal('add')}>
            <PlusIcon /> <span style={{ marginLeft: 6 }}>Add Client</span>
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {/* ── Stats ── */}
        <StatsBar clients={clients} />

        {/* ── Toolbar ── */}
        <div style={styles.toolbar}>
          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}><SearchIcon /></span>
            <input
              style={styles.searchInput}
              placeholder="Search by name, phone or service…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button style={styles.clearBtn} onClick={() => setSearch('')}>
                <CloseIcon />
              </button>
            )}
          </div>
          <div style={styles.filters}>
            {['All', ...STATUSES].map(s => (
              <button
                key={s}
                style={{ ...styles.filterBtn, ...(filterStatus === s ? styles.filterBtnActive : {}) }}
                onClick={() => setFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ── */}
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {[
                  { key: 'name',    label: 'Client' },
                  { key: 'service', label: 'Service' },
                  { key: 'price',   label: 'Price (LKR)' },
                  { key: 'date',    label: 'Date' },
                  { key: 'status',  label: 'Status' },
                ].map(col => (
                  <th key={col.key} style={styles.th} onClick={() => toggleSort(col.key)}>
                    {col.label}<SortArrow k={col.key} />
                  </th>
                ))}
                <th style={{ ...styles.th, textAlign: 'right', cursor: 'default' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div style={styles.empty}>
                      <span style={{ opacity: 0.2, color: 'var(--gold)' }}><EmptyIcon /></span>
                      <p style={{ marginTop: 12, color: 'var(--text-muted)' }}>
                        {search || filterStatus !== 'All' ? 'No results match your search.' : 'No clients yet. Add your first one!'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map((c, i) => {
                const sc = STATUS_COLORS[c.status] || {}
                return (
                  <tr key={c.id} style={styles.tr} className="animate-fade"
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}>
                    <td style={styles.td}>
                      <div style={styles.clientName}>{c.name}</div>
                      <div style={styles.clientPhone}>{c.phone}</div>
                    </td>
                    <td style={styles.td}><span style={styles.serviceTag}>{c.service}</span></td>
                    <td style={{ ...styles.td, fontVariantNumeric: 'tabular-nums', color: 'var(--gold-light)', fontWeight: 500 }}>
                      {c.price.toLocaleString()}
                    </td>
                    <td style={{ ...styles.td, color: 'var(--text-secondary)' }}>{c.date}</td>
                    <td style={styles.td}>
                      <span style={{ ...styles.statusBadge, background: sc.bg, color: sc.color }}>
                        <span style={{ ...styles.statusDot, background: sc.dot }} />
                        {c.status}
                      </span>
                    </td>
                    <td style={{ ...styles.td, textAlign: 'right' }}>
                      <div style={styles.actions}>
                        <button style={styles.actionBtn}
                          title="Edit"
                          onClick={() => { setSelected(c); setModal('edit') }}>
                          <EditIcon />
                        </button>
                        <button style={{ ...styles.actionBtn, ...styles.actionBtnDanger }}
                          title="Delete"
                          onClick={() => { setSelected(c); setModal('delete') }}>
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div style={styles.tableFooter}>
          Showing <strong style={{ color: 'var(--gold)' }}>{filtered.length}</strong> of {clients.length} clients
        </div>
      </main>

      {/* ── Modals ── */}
      {modal === 'add' && (
        <Modal title="New Client" onClose={() => setModal(null)}>
          <ClientForm onSave={handleAdd} onCancel={() => setModal(null)} />
        </Modal>
      )}
      {modal === 'edit' && selected && (
        <Modal title="Edit Client" onClose={() => { setModal(null); setSelected(null) }}>
          <ClientForm initial={selected} onSave={handleEdit} onCancel={() => { setModal(null); setSelected(null) }} />
        </Modal>
      )}
      {modal === 'delete' && selected && (
        <Modal title="Delete Client" onClose={() => { setModal(null); setSelected(null) }}>
          <DeleteConfirm client={selected} onConfirm={handleDelete}
            onCancel={() => { setModal(null); setSelected(null) }} />
        </Modal>
      )}

      {/* ── Toast ── */}
      {toastMsg && (
        <div style={styles.toast} className="animate-slide">{toastMsg}</div>
      )}
    </div>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  app: {
    minHeight: '100vh',
    background: 'var(--bg-primary)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backdropFilter: 'blur(12px)',
  },
  headerInner: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  brandIcon: {
    width: 42,
    height: 42,
    background: 'var(--gold-dim)',
    border: '1px solid var(--border-accent)',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--gold)',
  },
  brandName: {
    fontFamily: 'var(--font-display)',
    fontSize: 22,
    fontWeight: 900,
    color: 'var(--gold)',
    lineHeight: 1.1,
    letterSpacing: '-0.5px',
  },
  brandSub: {
    fontSize: 11,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },
  main: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '28px 24px',
    width: '100%',
    flex: 1,
  },
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 16,
    marginBottom: 28,
  },
  statCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  statValue: {
    fontFamily: 'var(--font-display)',
    fontSize: 28,
    fontWeight: 700,
    color: 'var(--gold)',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 11,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  toolbar: {
    display: 'flex',
    gap: 12,
    marginBottom: 20,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchWrap: {
    flex: 1,
    minWidth: 220,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)',
    display: 'flex',
  },
  searchInput: {
    width: '100%',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 6,
    padding: '9px 36px 9px 36px',
    color: 'var(--text-primary)',
    fontSize: 13,
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  clearBtn: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    display: 'flex',
    padding: 2,
  },
  filters: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
  },
  filterBtn: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    borderRadius: 20,
    padding: '6px 14px',
    fontSize: 12,
    fontWeight: 500,
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  },
  filterBtnActive: {
    background: 'var(--gold-dim)',
    border: '1px solid var(--border-accent)',
    color: 'var(--gold)',
  },
  tableWrap: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    overflow: 'hidden',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg-secondary)',
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  tr: {
    borderBottom: '1px solid var(--border)',
    transition: 'background 0.12s',
  },
  td: {
    padding: '13px 16px',
    verticalAlign: 'middle',
    fontSize: 13,
    color: 'var(--text-primary)',
  },
  clientName: {
    fontWeight: 500,
    color: 'var(--text-primary)',
  },
  clientPhone: {
    fontSize: 11,
    color: 'var(--text-muted)',
    marginTop: 2,
  },
  serviceTag: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    borderRadius: 4,
    padding: '3px 8px',
    fontSize: 12,
    color: 'var(--text-secondary)',
    whiteSpace: 'nowrap',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
    padding: '4px 10px',
    fontSize: 12,
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    flexShrink: 0,
  },
  actions: {
    display: 'flex',
    gap: 6,
    justifyContent: 'flex-end',
  },
  actionBtn: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    borderRadius: 6,
    padding: '6px 8px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.15s',
  },
  actionBtnDanger: {
    color: 'var(--danger)',
    borderColor: 'rgba(192,57,43,0.3)',
    background: 'var(--danger-dim)',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
  },
  tableFooter: {
    marginTop: 12,
    fontSize: 12,
    color: 'var(--text-muted)',
    textAlign: 'right',
  },
  // Modal
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    backdropFilter: 'blur(4px)',
    padding: 20,
  },
  modal: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    width: '100%',
    maxWidth: 520,
    boxShadow: 'var(--shadow)',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: '18px 22px 14px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    display: 'flex',
    padding: 4,
    borderRadius: 4,
  },
  formBody: {
    padding: '20px 22px 22px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px 16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border)',
    borderRadius: 6,
    padding: '9px 12px',
    color: 'var(--text-primary)',
    fontSize: 13,
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  },
  inputError: {
    borderColor: 'var(--danger)',
  },
  errorText: {
    fontSize: 11,
    color: 'var(--danger)',
    marginTop: -2,
  },
  formActions: {
    display: 'flex',
    gap: 10,
    justifyContent: 'flex-end',
    marginTop: 20,
    paddingTop: 16,
    borderTop: '1px solid var(--border)',
  },
  btnPrimary: {
    background: 'var(--gold)',
    color: '#0d0d0d',
    border: 'none',
    borderRadius: 6,
    padding: '9px 20px',
    fontWeight: 600,
    fontSize: 13,
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'var(--shadow-gold)',
    transition: 'opacity 0.15s',
    letterSpacing: '0.3px',
  },
  btnSecondary: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border)',
    borderRadius: 6,
    padding: '9px 18px',
    fontWeight: 500,
    fontSize: 13,
    transition: 'all 0.15s',
  },
  toast: {
    position: 'fixed',
    bottom: 28,
    right: 28,
    background: 'var(--bg-card)',
    border: '1px solid var(--border-accent)',
    color: 'var(--gold)',
    borderRadius: 8,
    padding: '12px 20px',
    fontSize: 13,
    fontWeight: 500,
    boxShadow: 'var(--shadow)',
    zIndex: 200,
  },
}
