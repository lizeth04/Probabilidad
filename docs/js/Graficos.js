class Graficos {
  constructor(ctx, data, clases, type) {
    this.ctx = ctx;
		this.data = data;
		this.clases = this.generateClases(clases);
		this.generateColors();
    this.grafico = this.graficar(type);
  }
  graficar(type) {
    return new Chart(this.ctx, {
      type: type,
      data: {
        labels: this.clases,
        datasets: [{
          label: 'fa',
          data: this.data,
          backgroundColor: this.backgroundColor,
          borderColor: this.borderColor,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
				},
				title: {
					display: true,
					text: 'Curvas de Frecuencia'
				},
				elements: {
					line: {
							tension: 0
					}
				}
      }
    });
	}

	generateClases(clases) {
		let labelClases = [];
		for (const clase of clases) {
			labelClases.push(`${clase.min} - ${clase.max}`);
		}
		return labelClases;
	}
	
	generateColors() {
		this.backgroundColor = [];
		this.borderColor = [];
		for (const d of this.data) {
			let colorRand = this._getColorRandom(0.2);
			let colorRandF = colorRand.replace('0.2', '1');
			this.backgroundColor.push(colorRand);
			this.borderColor.push(colorRandF);
		}
	}

  _getRandom() {
		return Math.round(Math.random() * 255) - Math.round(Math.random() * 85);
  }

  _getColorRandom(opacity) {
		return `rgba(${this._getRandom()},${this._getRandom()},${this._getRandom()},${opacity})`;
	}
	
	resetChart() {
		var aux = this.chart.data.datasets[0];
		this.chart.data.datasets = [];
		this.chart.data.datasets[0] = aux;
		this.chart.data.datasets[0].data = [];
		this.chart.data.labels = [];
		this.chart.update();
	}

	removeData() {
		this.chart.data.labels.pop();
		this.chart.data.datasets.forEach((dataset) => {
				dataset.data.pop();
		});
		this.chart.update();
	}

	addData(chart, label, data) {
		chart.data.labels.push(label);
		chart.data.datasets.forEach((dataset) => {
				dataset.data.push(data);
		});
		chart.update();
	}

	addDataset(chart, labels, data) {
		chart.data.datasets.push(data);
		chart.data.labels = labels;
		chart.update();
	}
}
