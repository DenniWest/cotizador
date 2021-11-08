import React, { Component } from 'react';
import swal from 'sweetalert';

class App extends Component {

  constructor() {
    super();
    this.state = {
      departamento_origen: '',
      ciudad_origen: '',
      departamento_destino: '',
      ciudad_destino: '',
      flete_total: '',
      _id: '',
      cotizacion: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addCotizacion = this.addCotizacion.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addCotizacion(e) {
    e.preventDefault();
    if (this.state._id) {
      fetch(`http://localhost:3777/api/cotizacion/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          departamento_origen: this.state.departamento_origen,
          ciudad_origen: this.state.ciudad_origen,
          departamento_destino: this.state.departamento_destino,
          ciudad_destino: this.state.ciudad_destino,
          flete_total: this.state.flete_total
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          swal("Excelente!", "Cotización actualizada!", "success");
          this.setState({  _id: '', departamento_destino: '', ciudad_destino: '', departamento_origen: '', ciudad_origen: '', flete_total: '' });
          this.fetchCotizacion();
        });
    } else {
      fetch('http://localhost:3777/api/cotizacion', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          swal("Excelente!", "Cotización creada!", "success");
          this.setState({ departamento_destino: '', ciudad_destino: '', departamento_origen: '', ciudad_origen: '', flete_total: '' });
          this.fetchCotizacion();
        })
        .catch(err => console.error(err));
    }

  }

  deleteCotizacion(id) {
    swal({
      title: "Estas seguro?",
      text: "Una vez eliminado, no podras recuperar este registro!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:3777/api/cotizacion/${id}`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              
              this.fetchCotizacion();
            });
        swal("Poof! Tu registro ha sido eliminado!", {
          icon: "success",
        });
      } else {
        swal("Tu registro está a salvo!");
      }
    });
  }

  editCotizacion(id) {
    fetch(`http://localhost:3777/api/cotizacion/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          departamento_origen: data.departamento_origen,
          ciudad_origen: data.ciudad_origen,
          departamento_destino: data.departamento_destino,
          ciudad_destino: data.ciudad_destino,
          flete_total: data.flete_total,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchCotizacion();
  }

  fetchCotizacion() {
    fetch('http://localhost:3777/api/cotizacion')
      .then(res => res.json())
      .then(data => {
        this.setState({ cotizacion: data });
        console.log(this.state.cotizacion);
      });
  }

  number_format(amount, decimals) {

    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) 
        return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
}

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-dark darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">COTIZACIÓN TRANSPORTE</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addCotizacion}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="departamento_origen" onChange={this.handleChange} value={this.state.departamento_origen} type="text" placeholder="Departamento de origen" autoFocus />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="ciudad_origen" onChange={this.handleChange} value={this.state.ciudad_origen} type="text" placeholder="Ciudad de origen" autoFocus />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="departamento_destino" onChange={this.handleChange} value={this.state.departamento_destino} type="text" placeholder="Departamento destino" autoFocus />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="ciudad_destino" onChange={this.handleChange} value={this.state.ciudad_destino} type="text" placeholder="Ciudad destino" autoFocus />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="flete_total" onChange={this.handleChange} value={this.state.flete_total} placeholder="Flete total" type="text"></input>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-success">
                      Crear
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Dep origen</th>
                    <th scope="col">Ciudad origen</th>
                    <th scope="col">Dep destino</th>
                    <th scope="col">Ciudad destino</th>
                    <th scope="col">Total fletes</th>
                  </tr>
                </thead>
                <tbody>
                {
                    this.state.cotizacion.map(cotizacion => {
                      return (
                        <tr key={cotizacion._id}>
                          <td>{cotizacion.departamento_origen}</td>
                          <td>{cotizacion.ciudad_origen}</td>
                          <td>{cotizacion.departamento_destino}</td>
                          <td>{cotizacion.ciudad_destino}</td>
                          <td>${this.number_format(cotizacion.flete_total,2)}</td>
                          <td>
                            <button onClick={() => this.deleteCotizacion(cotizacion._id)} className="btn btn-danger">
                              <i className="material-icons">delete</i>
                            </button>
                            <button onClick={() => this.editCotizacion(cotizacion._id)} className="btn btn-primary" style={{ margin: '4px' }}>
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }                  
                </tbody>
              </table>
            </div>
          </div>
      
          
          
        </div>
        


      </div>
    )
  }
}

export default App;