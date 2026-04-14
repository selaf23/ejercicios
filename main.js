class Nodo {
  constructor(puntuacion) {
    this.puntuacion = puntuacion;
    this.hijoIzquierdo = null;
    this.hijoDerecho = null;
  }
}

class BST {
  constructor() {
    this.raiz = null;
  }

  insertar(puntuacion) {
    const nuevoNodo = new Nodo(puntuacion);

    if (!this.raiz) {
      this.raiz = nuevoNodo;
      return;
    }

    let nodoActual = this.raiz;

    while (true) {
      if (puntuacion < nodoActual.puntuacion) {
        if (!nodoActual.hijoIzquierdo) {
          nodoActual.hijoIzquierdo = nuevoNodo;
          break;
        }
        nodoActual = nodoActual.hijoIzquierdo;
      } else if (puntuacion > nodoActual.puntuacion) {
        if (!nodoActual.hijoDerecho) {
          nodoActual.hijoDerecho = nuevoNodo;
          break;
        }
        nodoActual = nodoActual.hijoDerecho;
      } else {
        break;
      }
    }
  }

  minimo() {
    if (!this.raiz) return null;

    let nodoActual = this.raiz;
    while (nodoActual.hijoIzquierdo) {
      nodoActual = nodoActual.hijoIzquierdo;
    }
    return nodoActual.puntuacion;
  }

  maximo() {
    if (!this.raiz) return null;

    let nodoActual = this.raiz;
    while (nodoActual.hijoDerecho) {
      nodoActual = nodoActual.hijoDerecho;
    }
    return nodoActual.puntuacion;
  }

  top_n(cantidad) {
    const mejoresPuntuaciones = [];
    this._recorrerDescendente(this.raiz, cantidad, mejoresPuntuaciones);
    return mejoresPuntuaciones;
  }

  _recorrerDescendente(nodo, limite, resultados) {
    if (!nodo || resultados.length >= limite) return;

    this._recorrerDescendente(nodo.hijoDerecho, limite, resultados);

    if (resultados.length < limite) {
      resultados.push(nodo.puntuacion);
    }

    this._recorrerDescendente(nodo.hijoIzquierdo, limite, resultados);
  }
}

const torneo = new BST();
const puntos = [3200, 4100, 1800, 5000, 2700, 3900, 4600];

puntos.forEach((p) => torneo.insertar(p));

console.log("Mínimo:", torneo.minimo());
console.log("Máximo:", torneo.maximo());
console.log("Top 3:", torneo.top_n(3));
