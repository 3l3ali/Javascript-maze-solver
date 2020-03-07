import React from "react";
class Maze extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const pen = this.refs.canvas.getContext('2d');
        pen.fillStyle = '#DDDDDD';

        var size = 10;
        var maze = require('amazejs');
        var m = new maze.Backtracker(this.refs.canvas.width / size, this.refs.canvas.height / size);
        m.generate();
        var is_wall =  new Map();

        for(var row = 0; row < m.height; row++) {
            for(var col = 0; col < m.width; col++) {
               if(m.get(row, col)){
                    pen.fillStyle = 'white';
                    pen.fillRect(col * size, row * size, size, size);
                    is_wall.set(row+""+col, false);
                }
               else{
                   pen.fillStyle = '#DDDDDD';
                   pen.fillRect(col * size, row * size, size, size);
                   is_wall.set(row+""+col, true);
               }
            }
        }
        var left = [-1, 0];
        var right = [1, 0];
        var down = [0, -1];
        var up = [0, 1];
        var que =  [[1,1]];
        var is_visited = new Map();

        function new_coordinates(a, b) {
            var newx =  a[0] + b[0];
            var newy = a[1] + b[1];
            if (newy < 0 || newy > m.height)
                return '-1';
            if (newx < 0 || newx > m.width)
                return '-1';
            var new_cordinates = [newx, newy];

            if (is_visited.get(newx+""+newy) == true || is_wall.get(newy+""+newx) == true) {
                return '-1';
            }
            console.log(newx+"   "+ newy);
            return new_cordinates;
        }

        pen.fillStyle = 'lightgreen';
        const delay =  require("delay");
        pen.fillRect(que[0][0] * size, que[0][1] * size, size, size);
        async function bfs () {
            pen.fillStyle = 'lightblue';
            var i = 0;
            while (que.length > 0) {
                if(i == 90000)
                    break;
                await delay(10);
                i = i + 1;
                is_visited.set(que[0][0]+""+que[0][1], true);

                if(que[0][0]!= 0 || que[0][1] != 0) {
                    pen.fillRect(que[0][0] * size, que[0][1] * size, size, size);
                }

                var newleft = new_coordinates(que[0], left);
                var newright = new_coordinates(que[0], right);
                var newup = new_coordinates(que[0], up);
                var newdown = new_coordinates(que[0], down);

                if (newleft !== '-1') {
                    que.push(newleft);
                }
                if (newup !== '-1') {
                    que.push(newup);
                }
                if (newdown !== '-1') {
                    que.push(newdown);
                }
                if (newright !== '-1') {
                    que.push(newright);
                }
                que.shift();
            }
        }
        bfs();
    }
    render() {
        return (
            <canvas ref="canvas" width={1300} height={500}/>
        );
    }
}
export default Maze;