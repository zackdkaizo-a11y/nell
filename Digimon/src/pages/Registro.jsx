import { useState } from 'react'
import FormularioUsuario from '../components/FormularioUsuario'

const emptyForm = { identificacion: '', nombre: '', correo: '' }

export default function Registro({ users, setUsers }) {
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const cancelEdit = () => { setForm(emptyForm); setEditingId(null); setError(''); setSuccess('') }
  const submit = (event) => {
    event.preventDefault(); setError(''); setSuccess('')
    const identificacion = form.identificacion.trim()
    const nombre = form.nombre.trim()
    const correo = form.correo.trim()
    if (!identificacion || !nombre || !correo) return setError('Todos los campos son obligatorios.')
    if (!/^\d+$/.test(identificacion)) return setError('La identificación debe contener solo números.')
    if (!correo.includes('@')) return setError('Ingresa un correo electrónico válido que incluya @.')
    const duplicate = users.some((user) => user.identificacion === identificacion && user.identificacion !== editingId)
    if (duplicate) return setError(`Ya existe un usuario con la identificación ${identificacion}.`)
    if (editingId !== null) {
      setUsers((current) => current.map((user) => user.identificacion === editingId ? { identificacion, nombre, correo } : user))
      setSuccess('Los cambios del usuario se guardaron correctamente.')
    } else {
      setUsers((current) => [...current, { identificacion, nombre, correo }])
      setSuccess('Usuario registrado correctamente.')
    }
    setForm(emptyForm); setEditingId(null)
  }
  const edit = (user) => { setEditingId(user.identificacion); setForm({ ...user }); setError(''); setSuccess('') }
  const remove = (user) => {
    if (!window.confirm(`¿Seguro que deseas eliminar a ${user.nombre}?`)) return
    setUsers((current) => current.filter((item) => item.identificacion !== user.identificacion))
    if (editingId === user.identificacion) cancelEdit()
    setError(''); setSuccess(`Se eliminó el registro de ${user.nombre}.`)
  }

  return <main className="page-shell"><section className="page-intro"><span className="eyebrow">COMUNIDAD / 003</span><h1>Registro de <span>usuarios</span></h1><p>Administra los usuarios registrados en Digimon Explorer.</p></section>
    <div className="registration-layout"><FormularioUsuario form={form} setForm={setForm} editingId={editingId} onSubmit={submit} onCancel={cancelEdit} error={error} success={success} />
      <section className="panel users-panel"><div className="section-heading"><div><span className="eyebrow">DIRECTORIO</span><h2>Usuarios registrados</h2></div><span className="total-pill">{users.length} total</span></div>
        {!users.length ? <div className="empty-users"><span>◎</span><p>Aún no hay usuarios registrados.</p><small>Completa el formulario para añadir el primero.</small></div> : <div className="users-list">{users.map((user) => <article className="user-row" key={user.identificacion}><div className="user-avatar">{user.nombre.trim().charAt(0).toUpperCase()}</div><div className="user-info"><strong>{user.nombre}</strong><span>ID: {user.identificacion}</span><small>{user.correo}</small></div><div className="user-actions"><button className="mini-button" onClick={() => edit(user)}>Editar</button><button className="mini-button danger" onClick={() => remove(user)}>Eliminar</button></div></article>)}</div>}
      </section>
    </div>
    <p className="privacy-note">Los registros se mantienen en el estado de React mientras la aplicación está abierta, tal como solicita la guía.</p>
  </main>
}
