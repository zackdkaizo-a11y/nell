export default function Estado({ type = 'info', title, children }) {
  return <div className={`state-message state-${type}`} role={type === 'error' ? 'alert' : 'status'}>
    {type === 'loading' && <span className="spinner" aria-hidden="true" />}
    <strong>{title}</strong>
    {children && <p>{children}</p>}
  </div>
}
