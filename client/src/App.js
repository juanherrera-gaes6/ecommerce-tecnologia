import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [registros, setRegistros] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:3001/productos');
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      alert('Error al cargar los productos');
    }
  };

  const registrarProductos = async (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const producto = registros[editIndex];
      try {
        const response = await fetch(`http://localhost:3001/productos/${producto.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, precio, stock, categoria, descripcion })
        });

        if (response.ok) {
          const nuevosRegistros = [...registros];
          nuevosRegistros[editIndex] = { ...producto, nombre, precio, stock, categoria, descripcion };
          setRegistros(nuevosRegistros);
          setEditIndex(null);
          alert('Producto actualizado correctamente');
        } else {
          alert('Error al actualizar el producto');
        }
      } catch {
        alert('Error de conexión al actualizar el producto');
      }
    } else {
      try {
        const response = await fetch('http://localhost:3001/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, precio, stock, categoria, descripcion })
        });

        const data = await response.json();
        if (response.ok) {
          setRegistros([...registros, data]);
          alert('Producto guardado correctamente');
        } else {
          alert('Error al guardar producto');
        }
      } catch {
        alert('Error de conexión al guardar el producto');
      }
    }

    setNombre("");
    setPrecio("");
    setStock("");
    setCategoria("");
    setDescripcion("");
  };

  const eliminarRegistro = async (idx) => {
    const producto = registros[idx];
    try {
      const response = await fetch(`http://localhost:3001/productos/${producto.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setRegistros(registros.filter((_, i) => i !== idx));
        alert('Producto eliminado correctamente');
      } else {
        alert('Error al eliminar el producto');
      }
    } catch {
      alert('Error de conexión al eliminar');
    }
  };

  const editarRegistro = (idx) => {
    const reg = registros[idx];
    setNombre(reg.nombre);
    setPrecio(reg.precio);
    setStock(reg.stock);
    setCategoria(reg.categoria);
    setDescripcion(reg.descripcion);
    setEditIndex(idx);
  };

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((p) => p.id === producto.id);
    if (!existe) setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((p) => p.id !== id));
  };

  const totalCarrito = carrito.reduce((acc, p) => acc + Number(p.precio), 0);

  const crearOrden = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    const orden = {
      productos: carrito,
      total: totalCarrito,
      fecha: new Date().toLocaleString(),
    };

    console.log("🧾 Orden generada:", orden);
    alert(`Orden creada exitosamente. Total: $${totalCarrito}`);
    setCarrito([]);
  };

  return (
    <div className="min-vh-100 bg-light">
      <header className="py-3 bg-primary shadow-sm">
        <h3 className="text-center text-white fw-bold">Tienda de Tecnología</h3>
      </header>

      <div className="container mt-4">
        <div className="alert alert-info shadow-sm text-center">
          <h5 className="mb-0">Bienvenido a la tienda de tecnología</h5>
        </div>

        <div className="row g-4">
          {/* Formulario */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h6 className="fw-bold mb-3 text-primary">
                  {editIndex !== null ? "Editar Producto" : "Añadir Producto"}
                </h6>

                <form onSubmit={registrarProductos}>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input type="number" className="form-control" value={stock} onChange={(e) => setStock(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <input className="form-control" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                  </div>

                  <button className="btn btn-primary w-100">
                    {editIndex !== null ? "Actualizar Producto" : "Agregar Producto"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h6 className="fw-bold mb-3 text-primary">Consultar Productos</h6>

                <div className="table-responsive">
                  <table className="table align-middle table-hover">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registros.map((reg, idx) => (
                        <tr key={idx}>
                          <td>{reg.nombre}</td>
                          <td>${reg.precio}</td>
                          <td>{reg.stock}</td>
                          <td>{reg.categoria}</td>
                          <td>{reg.descripcion}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-success me-2" onClick={() => agregarAlCarrito(reg)}>🛒</button>
                            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editarRegistro(idx)}>✏️</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarRegistro(idx)}>🗑️</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 🛒 Carrito */}
                <div className="mt-4">
                  <h6 className="fw-bold text-primary">Carrito de Compras</h6>
                  {carrito.length === 0 ? (
                    <p>No hay productos en el carrito</p>
                  ) : (
                    <ul className="list-group">
                      {carrito.map((p) => (
                        <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                          {p.nombre} - ${p.precio}
                          <button className="btn btn-sm btn-danger" onClick={() => eliminarDelCarrito(p.id)}>X</button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <h6 className="mt-3">Total: ${totalCarrito}</h6>
                  <button className="btn btn-success w-100 mt-2" onClick={crearOrden}>Crear Orden de Compra</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
