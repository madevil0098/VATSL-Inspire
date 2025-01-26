export default class Point {
    constructor(x, y, color = "white", radius = 5) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = radius;
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.stroke();
    }
  
    isHit(x, y) {
      return Math.hypot(this.x - x, this.y - y) < this.radius + 5;
    }
  }