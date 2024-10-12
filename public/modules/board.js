export class Board {
	constructor() {
		this.state = [
			[0,0,0],
			[0,0,0],
			[0,0,0]
		];
	}

	render(handleClick, container) {
		const table = document.createElement('table');

		for (let i = 0; i < 3; i++) {
			const tr = document.createElement('tr');
			for (let j = 0; j < 3; j++) {
				const td = document.createElement('td');
				td.id = `cell${i}${j}`;
				td.className = "square"; 
				td.addEventListener('click', () => handleClick(td, i, j));
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		document.getElementById(container).appendChild(table);
	}

}