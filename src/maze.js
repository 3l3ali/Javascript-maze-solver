import React from "react";
import {Algorithm} from "./Algorithm";
class Maze extends React.Component {
    is_wall =  new Map();
    delay =  require("delay");
    size = 20;
    maze = require('amazejs');
    pen = null;
    componentDidMount() {
        this.updateCanvas();
    }
    async updateCanvas() {
        this.pen = this.refs.canvas.getContext('2d');
        this.pen.fillStyle = '#DDDDDD';

        await (this.drawMazeBorders(this.size, this.pen, 25, 65));
        //await (this.drawMaze());

        this.pen.fillStyle = 'lightgreen';
        let startPoint = [10,10];
        let endPoint = null;
        //start Point
        this.pen.fillRect(startPoint[0]* this.size, startPoint[1] * this.size, this.size, this.size);

        let bfs = new Algorithm(startPoint, endPoint, this.is_wall, 25, 65, this.size, this.pen);
        bfs.bfs();
    }
    render() {
        return (
            <canvas ref="canvas" width={1300} height={500}/>
        );
    }
    async drawMaze(){
        let size =  this.size;
        let pen =  this.pen;
        var m = new this.maze.Backtracker(this.refs.canvas.width / size, this.refs.canvas.height / size);
        m.generate();
        pen.fillStyle = '#DDDDDD';
        for(var row = 0; row < m.height; row++) {
            for(var col = 0; col < m.width; col++) {
                await this.delay(0.1);
                pen.beginPath();
                if(m.get(row, col)){
                    pen.fillStyle = 'white';
                    pen.fillRect(col * size, row * size, size, size);
                    this.is_wall.set(col+""+row, false);
                }
                else{
                    pen.fillStyle = '#DDDDDD';
                    pen.fillRect(col * size, row * size, size, size);
                    this.is_wall.set(col+""+row, true);
                }
            }
        }
    }
    async drawMazeBorders(size, pen, width, height){
        this.is_wall.clear();
        var my= (width - 1) * size;
        var mx= (height - 1) * size;
        for(var col=0;col<height;col++){
            pen.fillRect(col*size, 0, size, size);
            pen.fillRect(col*size, my, size, size);
            this.is_wall.set(col + " " + 0, true);
            this.is_wall.set(col + " " + (width - 1), true);
            await this.delay(3);
        }
        for(var row=0;row<width;row++){
            pen.fillRect(0, row*size, size, size);
            pen.fillRect(mx, row*size, size, size);
            this.is_wall.set(0 + " " + row, true);
            this.is_wall.set((height - 1) + " " + row, true);
            await this.delay(3);
        }
    }
}
export default Maze;