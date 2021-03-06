import React from "react";
import {Algorithm} from "./Algorithm";
import {Button} from 'react-bootstrap';
import '../css/mazepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Maze extends React.Component {
    is_wall = new Map();
    delay = require("delay");
    size = 20;
    maze = require('amazejs');
    pen = null;
    startPoint = [];
    endPoint = [];
    algo = null

    componentDidMount() {
        this.updateCanvas();
    }

    async updateCanvas() {
        this.pen = this.refs.canvas.getContext('2d');
        this.pen.fillStyle = '#DDDDDD';

        await (this.drawMazeBorders(this.size, this.pen, 25, 65));
        //await (this.drawMaze());

        this.pen.fillStyle = 'lightgreen';
        this.startPoint = [1, 1];
        this.endPoint = [63, 23];
        this.pen.fillRect(this.startPoint[0] * this.size, this.startPoint[1] * this.size, this.size, this.size);
        this.pen.fillStyle = 'red';
        this.pen.fillRect(this.endPoint[0] * this.size, this.endPoint[1] * this.size, this.size, this.size);

        //We are binding this so it can see the class variables
        this.refs.BFS.addEventListener("click", this.startBFS.bind(this));
        this.refs.DFS.addEventListener("click", this.startDFS.bind(this));
        this.refs.generateMaze.addEventListener("click", this.drawMaze.bind(this));
    }

    render() {
        return (
            <div id="mazepage">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="maze-navbar">
                                <Button className="maze-link" ref="BFS"> Solve BFS </Button>
                                <Button className="maze-link" ref="DFS"> Solve DFS </Button>
                                <Button className="maze-link" ref="generateMaze">Generate Maze</Button>
                                <Button className="maze-link" >Draw</Button>
                                <Button className="maze-link" >Clear</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="maze-canvas">
                    <canvas ref="canvas" width={1300} height={500}/>
                </div>
                <div className="moves-bar text-center">
                    <label style={{color: "white"}}>Moves: 0</label>
                    <label ref="optimalMoves" style={{color: "white"}}></label>
                </div>
            </div>
        );
    }

    async drawMaze() {
        let size = this.size;
        let pen = this.pen;
        var m = new this.maze.Backtracker(this.refs.canvas.width / size, this.refs.canvas.height / size);
        m.generate();
        pen.fillStyle = '#DDDDDD';
        this.is_wall.clear();
        for (var row = 0; row < m.height; row++) {
            await this.delay(50);
            for (var col = 0; col < m.width; col++) {
                if (col === this.startPoint[0] && row === this.startPoint[1])
                    continue;
                if (col === this.endPoint[0] && row === this.endPoint[1])
                    continue;
                pen.beginPath();
                if (m.get(row, col)) {
                    pen.fillStyle = 'white';
                    pen.fillRect(col * size, row * size, size, size);
                } else {
                    pen.fillStyle = '#DDDDDD';
                    pen.fillRect(col * size, row * size, size, size);
                    this.is_wall.set(col + " " + row, true);
                }
            }
        }
    }

    async drawMazeBorders(size, pen, width, height) {
        this.is_wall.clear();
        var my = (width - 1) * size;
        var mx = (height - 1) * size;
        for (var col = 0; col < height; col++) {
            pen.fillRect(col * size, 0, size, size);
            pen.fillRect(col * size, my, size, size);
            this.is_wall.set(col + " " + 0, true);
            this.is_wall.set(col + " " + (width - 1), true);
            await this.delay(3);
        }
        for (var row = 0; row < width; row++) {
            pen.fillRect(0, row * size, size, size);
            pen.fillRect(mx, row * size, size, size);
            this.is_wall.set(0 + " " + row, true);
            this.is_wall.set((height - 1) + " " + row, true);
            await this.delay(3);
        }
    }

    async startBFS() {
        this.algo = new Algorithm(this.startPoint, this.endPoint, this.is_wall, 25, 65, this.size, this.pen);
        this.algo.bfs();
    }
    async startDFS() {
        this.algo = new Algorithm(this.startPoint, this.endPoint, this.is_wall, 25, 65, this.size, this.pen);
        this.algo.dfs();
    }
}
export default Maze;