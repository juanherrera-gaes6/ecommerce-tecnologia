import './App.css';
import { useEffect, useState } from 'react';

function App() {

  //Estados para el formulario
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  //Estados para lista de productos
  const [registros, setRegistros] = useState([]);

  //Estados para saber si estamos editando
  const [editIndex, setEditIndex] = useState(null);

  //Cargar productos al iniciar
  useEffect(() => {
    cargarProductos();
  }, [])

  //Funcion para cargar productos
  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:3001/productos');
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      alert('error al cargar los productos');
    }
  };

  //Funcion para guardar o actualizar el producto
  const registrarProductos = async (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Actualizar el producto existente
      try {
        const productos = registros[editIndex];
        const response = await fetch(`http://localhost:3001/productos/${productos.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, precio, stock, categoria, descripcion })

        });

        if (response.ok) {
          const nuevosRegistros = [...registros];
          nuevosRegistros[editIndex] = { ...productos, nombre, precio, stock, categoria, descripcion };
          setRegistros(nuevosRegistros);
          setEditIndex(null);
          alert('Producto actualizado correctamente');
        } else {
          alert('Error al actualizar el producto');
        }

      } catch (error) {
        alert('Error de conexion al actualizar el producto');
      }
    } else {
      //Crear nuevo producto
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
      } catch (error) {
        alert('Error de conexion al guardar el producto');
      }
    }

    //Limpiar el formulario
    setNombre("");
    setPrecio(0);
    setStock(0);
    setCategoria("");
    setDescripcion("");
  };

  //Función eliminar producto cuando el usuario oprime el boton eliminar

  const eliminarRegistro = async (idx) => {
    const productos = registros[idx]; // Obtenemos el empleado al eliminar por el indice
    try {
      const response = await fetch(`http://localhost:3001/productos/${productos.id}`, {
        method: 'DELETE'  //Metodo HTTP para eliminar
      });

      if (response.ok) {
        setRegistros(registros.filter((_, i) => i !== idx)) //Quitamos el elemento con ese indice

        if (editIndex === idx) {
          setEditIndex(null);
          setNombre("");
          setPrecio(0);
          setStock(0);
          setCategoria("");
          setDescripcion("");
        }
        alert('Producto eliminado correctamente');
      } else {
        alert('Error al eliminar el producto');
      }
    }
    catch (error) {
      alert('Error de conexión al eliminar');
    }
  }

  const editarRegistro = (idx) => {
    const reg = registros[idx];
    setNombre(reg.nombre);
    setPrecio(reg.precio);
    setStock(reg.stock);
    setCategoria(reg.categoria);
    setDescripcion(reg.descripcion);
    setEditIndex(idx);
  };

  return (
    <div className="min-vh-100 bg-light">

      {/* Header */}
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
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body">
                <h6 className="fw-bold mb-3 text-primary">
                  {editIndex !== null ? "Editar Producto" : "Añadir Producto"}
                </h6>

                <form onSubmit={registrarProductos}>

                  <div className="mb-3">
                    <label className="form-label">Nombre del producto</label>
                    <input className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input type="number" className="form-control" value={precio} onChange={e => setPrecio(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input type="number" className="form-control" value={stock} onChange={e => setStock(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <input className="form-control" value={categoria} onChange={e => setCategoria(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea rows="2" className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
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
            <div className="card shadow-sm h-100 border-0">
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
                          <td className="text-truncate" style={{ maxWidth: "120px" }}>{reg.descripcion}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-light border me-2 rounded-circle text-primary"
                              onClick={() => editarRegistro(idx)}
                              title="Editar"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>

                            <button
                              className="btn btn-sm btn-light border rounded-circle text-danger"
                              onClick={() => eliminarRegistro(idx)}
                              title="Eliminar"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
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
