export class Usuario {
  constructor({ id, nombre, email, password, rol }) {
    this.id = id || null;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol || 'cliente'; // Valor por defecto si no se especifica
  }
}
