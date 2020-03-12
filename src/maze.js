import React from "react";
import {Algorithm} from "./Algorithm";
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

        pen.fillStyle = 'lightgreen';
        let startPoint = [1,1];
        let endPoint = null;
        //start Point
        pen.fillRect( startPoint[0]* size, startPoint[1] * size, size, size);

        let bfs = new Algorithm(startPoint, endPoint, is_wall, m.height, m.width, size, pen);
        bfs.bfs();

    }
    render() {
        return (
            <canvas ref="canvas" width={1300} height={500}/>
        );
    }
}
export default Maze;