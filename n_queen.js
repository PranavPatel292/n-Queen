let board = []
let row_count = -1;
let n  = 4; //size of the board

for(let i = 0; i < n; ++i){
		const row = new Array(n).fill(0)
		board.push(row)
}

function init(){
	let n = parseInt(document.getElementById('grid_number').value)
	board = [];
	if(row_count != -1){
		while(row_count != -1){
			document.getElementById('myTable').deleteRow(row_count)
			row_count--;
		}
	}
	for(let i = 0; i < n; ++i){
		const row = new Array(n).fill(0)
		board.push(row)
	}
	draw1()
}


function reset(){
	console.log(board)
	board = [];
	for(let i = 0; i < n; ++i){
		const row = new Array(n).fill(0)
		board.push(row)
	}

	if(row_count != -1){
		while(row_count != -1){
			document.getElementById('myTable').deleteRow(row_count)
			row_count--;
		}
	}
	document.getElementById('grid_number').value = 4;
	document.getElementById('grid_number').innerHTML = 4;
	draw1();
	console.log(board)
}


function isSafe(board, row, col){
	let i, j;

	let dia1 = row - col;
	let dia2 = row + col; 

	//check the upper coloum of the board
	for(i = row - 1; i >= 0; --i){
		if(board[i][col]) return false
	}
	
	//check the lower coloum of the board
	for(i = row + 1; i < n; ++i){
		if(board[i][col])	return false;
	}

	//check for the left side row;
	for(j = col - 1; i >= 0; --i){
		if(board[row][j]) return false;
	}

	//check for the right side row;
	for(i = col + 1; i < n; ++i){
		if(board[row][i]) return false;
	}

	//check the first diagonal 
	for(i = 0; i < n; ++i){
		for(j = 0; j < n; ++j){
			if(i == row && j == col) continue
			if((i - j) == dia1 && board[i][j]) return false
		}
	}


	//check the second diagonal
	for(i = 0; i < n; ++i){
		for(j = 0; j < n; ++j){
			if(i == row && j == col) continue
			if((i + j) == dia2 && board[i][j]) return false
		}
	}

	return true;
}

draw1();	

function draw1(){
	let table = document.getElementById('myTable');
	for(let i = 0; i < board.length; ++i){
		let row = table.insertRow(i);
		row_count++;
		for(let j = 0; j < board[i].length; ++j){
			let cell = row.insertCell(j);
			cell.onclick = function(){ 
				let image_tag = document.createElement('img'); 
				let image_name = i.toString()+j.toString()+"image"; 
				image_tag.setAttribute("src", "./download.png"); 
				image_tag.setAttribute("style", "height: 100px"); 
				image_tag.setAttribute("style", "width: 100px");
					if(!document.getElementById(image_name)) {  
						board[i][j] = 1; 
						if(isSafe(board, i, j)){
							cell.append(image_tag);
						}else{
							alert("Can not palce queen at this place!");
						}
					} else {
					 	null
					} 
			};
			cell.innerHTML = "";
		}
	}
}



