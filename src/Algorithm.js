
export class Algorithm{
    delay =  require("delay");
    is_visited = new Map();
    startPoint  = [0, 0]
    endPoint  = [0, 0]
    Queue = require("queue");
    que =  [];
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
        //var colors = ['orange', 'pink', 'lightblue', 'purple', 'brown'];
        this.pen.fillStyle = 'lightblue';
        let size = this.size;
        let i = 0;
        while (this.que.length > 0) {
            //this.pen.fillStyle = colors[i%5];
            let firstElement =  this.que.shift();

            if (firstElement[0]=== 1 && firstElement[1]===12)
                console.log(firstElement);

            if(this.is_visited.get(firstElement[0] + " " + firstElement[1]))
                continue;

            //for debugging
            if (i == 3000)
                break;

            await this.delay(0.4);
            i = i + 1;
            this.is_visited.set(firstElement[0] + " " + firstElement[1], true);

            if (firstElement[0] != this.startPoint[0] || firstElement[1] != this.startPoint[1]) {
                this.pen.fillStyle = 'lightblue';
                this.pen.beginPath();
                this.pen.fillRect(firstElement[0] * size, firstElement[1] * size, size, size);
            }

            let traverse = this.all_directions();
            traverse.forEach(direction => {
                var new_coordinate = this.new_coordinate(firstElement, direction);
                if(new_coordinate !== '-1')
                    this.que.push(new_coordinate);
            });
        }
    }

    new_coordinate (a, b) {
        let maxHeight = this.maxHeight;
        let maxWidth =  this.maxWidth;
        var newx =  a[0] + b[0];
        var newy = a[1] + b[1];
        if (newy < 0 || newy > maxHeight)
            return '-1';
        if (newx < 0 || newx > maxWidth)
            return '-1';

        var new_cordinate = [newx, newy];

        if (this.is_visited.get(newx + " " + newy) || this.is_wall.get(newx + " " + newy)) {
            return '-1';
        }
        //console.log(newx+"   "+ newy);
        return new_cordinate;
    };

    all_directions = (function (){
        return [this.up, this.right, this.down, this.left];
    });

}