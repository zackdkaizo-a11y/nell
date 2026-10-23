export default function FormularioUsuario({ form, setForm, editingId, onSubmit, onCancel, error, success }) {
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  return <section className="panel">
    <div className="section-heading"><div><span className="eyebrow">COMUNIDAD</span><h2>{editingId ? 'Editar usuario' : 'Registrar usuario'}</h2></div></div>
    {error && <div className="inline-message error-text" role="alert">{error}</div>}
    {success && <div className="inline-message success-text" role="status">{success}</div>}
    <form onSubmit={onSubmit} className="user-form">
      <label>Identificación<input name="identificacion" value={form.identificacion} onChange={update} placeholder="Solo números" inputMode="numeric" /></label>
      <label>Nombre completo<input name="nombre" value={form.nombre} onChange={update} placeholder="Tu nombre" /></label>
      <label>Correo electrónico<input name="correo" type="email" value={form.correo} onChange={update} placeholder="nombre@correo.com" /></label>
      <div className="form-actions"><button className="button primary" type="submit">{editingId ? 'Guardar cambios' : 'Registrar'}</button>{editingId && <button className="button secondary" type="button" onClick={onCancel}>Cancelar</button>}</div>
    </form>
  </section>
}
