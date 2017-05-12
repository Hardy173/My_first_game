var ball = {
	speedY: 1,
	speedX: 1,
	dx: 1,
	dy: -1,
	
	color : 'white',
	x: 0,
	y: 0,
	radius : 5,
	clear: function () {
		this.speedX = 2;
		this.speedY = 2;
		this.dx = 1;
		this.dy = -1;
	},
	draw: function() {
		drawCircle(this.x, this.y, this.radius, this.color);
	},
	init : function(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	},
	move : function() {
		this.x += this.speedX * this.dx;
		this.y += this.speedY * this.dy;
	},
	collision : function () {
		for(var i in grid.nodes) {
			var enemy = grid.nodes[i];
			if (isCollision(this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2, enemy.x, enemy.y, enemy.width, enemy.height)) {
				this.dy *= -1;
				grid.destroy(i);
				this.speedY += 0.1;
				player.speed += 0.1;
				player.updScore(1);
				//столкновение произошло c этой штукой
			}
		}
		if (isCollision(this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2, player.x, player.y, player.width, player.height)) {
				this.dy *= -1;
				if (this.dx == player.dx) {
					this.speedX *= 1.2;
				} else {
					this.speedX /= player.dx !=0 ? 1.2 : 1;
				}
				this.dx = player.dx || this.dx;
				//столкновение произошло c игроком
		}
		if (this.x +this.radius >= width) {
			this.dx = -1;
		}
		
		if (this.x - this.radius <= 0) {
			this.dx = 1;
		}
		if(this.y - this.radius <= 0) {
			this.dy = 1;
		}
		if(this.y >= height) {
			if (player.hp < 1) {
				player.hp = 3;
				player.score = 0;
				grid.clear();
				ball.clear();
				grid.create(map);
			}
			player.updHp(1);
			ball.init(player.x+Math.ceil(player.width/2), player.y-10, 5, 'white');
		}
		
	},
	
};