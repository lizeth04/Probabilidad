class MedidasCentralizacion {
  constructor(data, n, min, max) {
    this.data = data;
    this.n = n;
    this.min = min;
    this.max = max;
  }

  calcR() {
    return this.max - this.min;
  }

  calcK() {
    return Math.round(Math.sqrt(this.n, 2));
  }

  calcCj() {
    return Math.round(this.calcR() / this.calcK());
  }

  calcClases() {
    let k = this.calcK();
    let cj = this.calcCj();
    let clases = [];
    let min = this.min;
    clases.push({
      min,
      max: (min + cj) - 1
		});
		let i = 1;
		while(true) {
			if (i >= k) {
				break;
			}
			min += cj;
      let range = {
				min: min,
        max: (min + cj) - 1
      }
			i++;
			// Validando la última clase
			if (i == k && range.max < this.data[this.data.length-1]) {
				range.max += 1;
			}
			clases.push(range);
		}
    return clases;
  }

  calcFa() {
    let clases = this.calcClases();
    let counters = [];
    for (const clase of clases) {
      let cont = 0;
      for (const num of this.data) {
        if (num >= clase.min && num <= clase.max) {
          cont++;
        }
      }
      counters.push(cont);
    }
    return counters;
  }

  calcFaA() {
    let fa = this.calcFa();
    let cont = 0;
    let faA = [];
    for (const num of fa) {
      cont += num;
      faA.push(cont);
    }
    return faA;
  }

  calcFr() {
    let fa = this.calcFa();
    let fr = [];
    let cont = 0;
    for (const num of fa) {
      let aux = (num * 100) / this.n;
      cont += aux;
      fr.push(aux);
    }
    return fr;
  }

  calcFrA() {
    let fr = this.calcFr();
    let frA = [];
    let cont = 0;
    for (const num of fr) {
      cont += num;
      frA.push(cont);
    }
    return frA;
  }

  calcFi() {
    let clases = this.calcClases();
    let fi = [];
    for (const clase of clases) {
      let aux = (clase.min + clase.max) / 2;
      fi.push(aux);
    }
    return fi;
  }

  calcFa_x_fi() {
    let fa = this.calcFa();
    let fi = this.calcFi();
    let fa_x_fi = [];
    for (const index in fa) {
      let aux = fa[index] * fi[index];
      fa_x_fi.push(aux);
    }
    return fa_x_fi;
  }

  calcFa_log_fi() {
    let fa = this.calcFa();
    let fi = this.calcFi();
    let fa_log_fi = [];
    for (const index in fa) {
      let aux = fa[index] * Math.log10(fi[index]);
      fa_log_fi.push(aux.toFixed(2));
    }
    return fa_log_fi;
  }

  calcFa_d_fi() {
    let fa = this.calcFa();
    let fi = this.calcFi();
    let fa_d_fi = [];
    for (const index in fa) {
      let aux = fa[index] / fi[index];
      fa_d_fi.push(aux.toFixed(2));
    }
    return fa_d_fi;
  }

  calcFi_2_x_fa() {
    let fa = this.calcFa();
    let fi = this.calcFi();
    let fa_x_fi = [];
    for (const index in fa) {
      let aux = Math.pow(fi[index], 2) * fa[index];
      fa_x_fi.push(aux.toFixed(2));
    }
    return fa_x_fi;
  }

  // Media Geometrica
  calcX_DA() {
    let fa = this.calcFa();
    let fi = this.calcFi();
    let cont = 0;
    for (const index in fa) {
			cont += fa[index] * fi[index];	
    }
    let x = cont / this.n;
    return x.toFixed(2);
	}
	
	calcMg_DA() {
		let fa = this.calcFa();
    let fi = this.calcFi();
    let cont = 0;
    for (const index in fa) {
			cont += fa[index] * Math.log10(fi[index]);	
    }
    let mg = Math.pow(10, cont / this.n);
    return mg.toFixed(2);
	}

	calcMa_DA() {
		let fa = this.calcFa();
    let fi = this.calcFi();
    let cont = 0;
    for (const index in fa) {
			cont += fa[index] / fi[index];
    }
    let ma = this.n / cont;
    return ma.toFixed(2);
	}

	calcMc_DA() {
		let fa = this.calcFa();
    let fi = this.calcFi();
    let cont = 0;
    for (const index in fa) {
			cont += Math.pow(fi[index], 2) * fa[index];	
    }
    let mc = Math.sqrt(cont / this.n);
    return mc.toFixed(2);
	}

	calcDm_DA() {
		let fa = this.calcFa();
		let fi = this.calcFi();
		let x = this.calcX_DA();
    let cont = 0;
    for (const index in fa) {
			cont += fa[index] * Math.abs(fi[index] - x);	
    }
    let dm = cont / this.n;
    return dm.toFixed(2);
	}

	calcMd_DA() {
		let clases = this.calcClases();
		let fa = this.calcFa();
		let faA = this.calcFaA();
		let mitad = this.calcMd_DNA();
		let i = 0;
		let md = 0;
		let l = 0;
		let fa_md = 0;
		let f = 0;
		for (const index in clases) {
			if (mitad >= clases[index].min && mitad <= clases[index].max) {
				l = clases[index].min;
				fa_md = index === 0 ? 0 : faA[index-1];
				f = fa[index];
				i = clases[index].max - clases[index].min;
				break;
			}
		}
		md = l + (((this.n/2) - fa_md) / f) * i;
		return md.toFixed(2);
	}

	calcModa_DA() {
		const fa = this.calcFa();
		const clases = this.calcClases();
		const maximo = Math.max(...fa);
		let moda = 0;
		for (const i in fa) {
			if (fa[i] === maximo) {
				moda = (clases[i].min + clases[i].max) / 2;
				break;
			}
		}
		return moda;
	}

	// D.N.A
	calcX_DNA() {
		let cont = 0;
		for (const num of this.data) {
			cont += num;
		}
		let x = cont / this.n;
		return x.toFixed(2);
	}

	calcMg_DNA() {
		let cont = 1;
		for (const num of this.data) {
			cont *= num;
		}
		let mg = Math.pow(cont, 1/this.n);
		return mg.toFixed(2);
	}

	calcMa_DNA() {
		let cont = 0;
		for (const num of this.data) {
			cont += 1 / num;
		}
		let x = this.n / cont;
		return x.toFixed(2);
	}

	calcMc_DNA() {
		let cont = 0;
		for (const num of this.data) {
			cont += Math.pow(num, 2);
		}
		let x = Math.sqrt(cont / this.n);
		return x.toFixed(2);
	}

	calcDm_DNA() {
		const mx = this.calcX_DNA();
		let cont = 0;
		for (const num of this.data) {
			cont += Math.abs(num - mx);
		}
		let x = cont / this.n;
		return x.toFixed(2);
	}

	calcMd_DNA() {
		let md = 0;
		let mitad = this.n / 2;
		if (this.n % 2 === 0) {
			md = (this.data[mitad-1] + this.data[mitad]) / 2;
		} else {
			md =  this.data[mitad-1] / 2;
		}
		return md;
	}

	calcModa_DNA() {
		let moda = {};
		let modas = [];
		let contMax = 0;

		for (const num of this.data) {
			if (!moda[num]) {
				moda[num] = 1;
			} else {
				moda[num]++;
			}

			if (moda[num] > contMax) {
				modas = [num];
				contMax = moda[num];
			} else if (moda[num] === contMax) {
				modas.push(num);
				contMax = moda[num];
			}
		}
		return modas;
	}

  // Adicionales
  calcQ_DA(k) {
    const clases = this.calcClases();
    const faA = this.calcFaA();
    const fa = this.calcFa();
    const q = this.data[this.calcQ_DNA(k)-1];
    let qk = 0;
    for (const i in clases) {
			if (q >= clases[i].min && q <= clases[i].max) {
				let lk = clases[i].min;
				let Fk = i === 0 ? 0 : faA[i-1];
        let fk = fa[i];
        let c = clases[i].max - clases[i].min;
        qk = lk + ((k * (this.n / 4) - Fk)/(fk)) * c;
				break;  
			}
    }
    return qk.toFixed(2);
  }
  
  calcD_DA(k) {
    const clases = this.calcClases();
    const faA = this.calcFaA();
    const fa = this.calcFa();
    const d = this.data[this.calcD_DNA(k)-1];
    let dk = 0;
    for (const i in clases) {
			if (d >= clases[i].min && d <= clases[i].max) {
				let lk = clases[i].min;
				let Fk = i === 0 ? 0 : faA[i-1];
        let fk = fa[i];
        let c = clases[i].max - clases[i].min;
        dk = lk + ((k * (this.n / 10) - Fk)/(fk)) * c;
				break;  
			}
    }
    return dk.toFixed(2);
  }
  
  calcP_DA(k) {
    const clases = this.calcClases();
    const faA = this.calcFaA();
    const fa = this.calcFa();
    const p = this.data[this.calcP_DNA(k)-1];
    let pk = 0;
    for (const i in clases) {
			if (p >= clases[i].min && p <= clases[i].max) {
				let lk = clases[i].min;
				let Fk = i === 0 ? 0 : faA[i-1];
        let fk = fa[i];
        let c = clases[i].max - clases[i].min;
        pk = lk + ((k * (this.n / 100) - Fk)/(fk)) * c;
				break;  
			}
    }
    return pk.toFixed(2);
  }

  calcP_DNA(k) {
    return Math.round((this.n / 100) * k);
  }

  calcD_DNA(k) {
    return Math.round((this.n / 10) * k);
  }

  calcQ_DNA(k) {
    return Math.round((this.n / 4) * k);
  }

  getNumFromData(k) {
    return k === 0 ? -1 : this.data[k-1];
  }
}
