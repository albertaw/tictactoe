<!doctype html>
<html>
	<head>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		<button id="btnStartBingo" class="start">Bingo</button>
		<div id="bingo">
			<div id="letters"></div>
			<div id="numbers"></div><br>
			<table id="table">
				<thead>
					<th>B</th>
					<th>I</th>
					<th>N</th>
					<th>G</th>
					<th>O</th>
				</thead>
			</table>
			<p>
				<button id="reload">New Card</button>
				<button id="checkBingo">Bingo!</button>
			</p>
		</div>
		<script src="jquery.js"></script>
		<script src="bingo3.0.js"></script>
		<script src="Bingo.event.js"></script>
	</body>
</html>