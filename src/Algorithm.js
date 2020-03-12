
export class Algorithm{
    delay =  require("delay");
    is_visited = new Map();
    startPoint  = [0, 0]
    endPoint  = [0, 0]
    que = [];
    is_wall =  new Map();
    maxHeight = null;
    maxWidth = null;
    size = null;
    pen = null;
    left = [-1, 0];
    right = [1, 0];
    down = [0, -1];
    up = [0, 1];

    constructor(startPoint, endPoint, is_wall, maxHeight, maxWidth, size, pen) {
        this.startPoint = startPoint;
        this.endPoint =  endPoint;
        this.que.push(startPoint);
        this.is_wall = is_wall;
        this.pen = pen;
        this.size =  size;
        this.maxHeight = maxHeight;
        this.maxWidth =  maxWidth;
    }

    async bfs () {
        this.pen.fillStyle = 'lightblue';
        let size = this.size;
        let i = 0;
        while (this.que.length > 0) {
            if (i == 90000)
                break;

            await this.delay(10);
            i = i + 1;
            let firstElement = this.que[0];
            this.is_visited.set(firstElement[0] + "" + firstElement[1], true);

            if (firstElement[0] != this.startPoint[0] || firstElement[1] != this.startPoint[1]) {
                this.pen.fillRect(this.que[0][0] * size, this.que[0][1] * size, size, size);
            }

            var newleft = this.new_coordinates(firstElement, this.left);
            var newright = this.new_coordinates(firstElement, this.right);
            var newup = this.new_coordinates(firstElement, this.up);
            var newdown = this.new_coordinates(firstElement, this.down);

            if (newleft !== '-1') {
                this.que.push(newleft);
            }
            if (newup !== '-1') {
                this.que.push(newup);
            }
            if (newdown !== '-1') {
                this.que.push(newdown);
            }
            if (newright !== '-1') {
                this.que.push(newright);
            }
            this.que.shift();
        }
    }

    new_coordinates = (function(a, b) {
        let maxHeight = this.maxHeight;
        let maxWidth =  this.maxWidth;

        var newx =  a[0] + b[0];
        var newy = a[1] + b[1];
        if (newy < 0 || newy > maxHeight)
            return '-1';
        if (newx < 0 || newx > maxWidth)
            return '-1';
        var new_cordinates = [newx, newy];

        if (this.is_visited.get(newx+""+newy) == true || this.is_wall.get(newy+""+newx) == true) {
            return '-1';
        }
        console.log(newx+"   "+ newy);
        return new_cordinates;
    });

    all_directions = (function (){
        return [this.up, this.right, this.down, this.left];
    });

}