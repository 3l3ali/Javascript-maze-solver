
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
    leftUp = [-1, -1]
    leftDown = [-1, 1]
    rightUp = [1, -1]
    rightDown = [1, 1]

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
        //To implement, different color for tree level
        //var colors = ['orange', 'pink', 'lightblue', 'purple', 'brown'];
        this.pen.fillStyle = 'lightblue';
        let size = this.size;
        this.parent =  new Map();
        let i = 0;
        while (this.que.length > 0) {
            //To implement, different color for each tree level
            //this.pen.fillStyle = colors[i%5];
            let firstElement =  this.que.shift();

            //Check if we found the end point
            if (firstElement[0] === this.endPoint[0] && firstElement[1 ]=== this.endPoint[1]) {
                this.back_track(firstElement, 0);
                break;
            }

            //For optimization
            if(this.is_visited.get(firstElement[0] + " " + firstElement[1]))
                continue;

            //for debugging
            if (i == 3000)
                break;

            //To give an animation effect and see the traversal
            await this.delay(0.1);
            i = i + 1;
            this.is_visited.set(firstElement[0] + " " + firstElement[1], true);

            //So we don't over draw the startpoint
            if (firstElement[0] != this.startPoint[0] || firstElement[1] != this.startPoint[1]) {
                this.pen.fillStyle = 'lightblue';
                //We use begin Path for optimization
                //If we keep drawing on the canvas without clearing the path
                //It will slow down with every frame
                this.pen.beginPath();
                this.pen.fillRect(firstElement[0] * size, firstElement[1] * size, size, size);
            }

            //We are searching up right down left
            this.all_directions().forEach(direction => {
                var new_coordinate = this.new_coordinate(firstElement, direction);
                if(new_coordinate !== '-1') {
                    this.que.push(new_coordinate);
                    this.parent.set(new_coordinate[0] + " " + new_coordinate[1], firstElement);
                }
            });
        }
    }

    new_coordinate =  (function(a, b) {
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
        console.log(newx+"   "+ newy);
        return new_cordinate;
    });

    //TO DO
    //Add horizontal directions
    all_directions = (function (){
        return [this.up, this.right, this.down, this.left];
    });

    async back_track (parent, moves) {
        if (parent == undefined)
            return moves;
        this.pen.fillStyle = 'orange';
        this.pen.beginPath();
        await this.delay(2);
        if(parent[0] !== this.startPoint[0] || parent[1] !== this.startPoint[1])
            if(parent[0] !== this.endPoint[0] || parent[1] !== this.endPoint[1])
                this.pen.fillRect(parent[0] * this.size, parent[1] * this.size, this.size, this.size);
        this.back_track(this.parent.get(parent[0] + " " + parent[1]), moves + 1);
    };
    async dfs(){
        this.pen.fillStyle = 'lightblue';
        this.parent =  new Map();
        this.dfsAlgorithm();
    }
    async dfsAlgorithm(){
        let stack = []
        stack.push(this.startPoint);
        while (stack.length > 0) {
            let element = stack.pop();
            let size = this.size;
            if (element[0] === this.endPoint[0] && element[1] === this.endPoint[1]) {
                this.back_track(element, 0);
                return;
            }
            //For optimization
            if (this.is_visited.get(element[0] + " " + element[1]))
                return;

            //To give an animation effect and see the traversal
            await this.delay(0.4);
            this.is_visited.set(element[0] + " " + element[1], true);
            //So we don't over draw the startpoint
            if (element[0] != this.startPoint[0] || element[1] != this.startPoint[1]) {
                let colors = ['lightblue', 'black', 'blue'];
                this.pen.fillStyle = colors[Math.random() * 3];
                //We use begin Path for optimization
                //If we keep drawing on the canvas without clearing the path
                //It will slow down with every frame
                this.pen.beginPath();
                this.pen.fillRect(element[0] * size, element[1] * size, size, size);
            }

            //We are searching up right down left
            this.all_directions().forEach(direction => {
                let new_coordinate = this.new_coordinate(element, direction);
                if (new_coordinate !== '-1') {
                    stack.push(new_coordinate)
                    this.parent.set(new_coordinate[0] + " " + new_coordinate[1], element);
                }
            });
        }
    }


}