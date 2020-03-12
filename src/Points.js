export class Points {
    left = [-1, 0];
    right = [1, 0];
    down = [0, -1];
    up = [0, 1];
    maxHeight = 0;
    maxWidth = 0;

    constructor(maxHeight, maxWidth) {
        this.maxHeight = maxHeight;
        this.maxWidth = maxWidth;
    }

        new_coordinates = (function(a, b, is_wall, is_visited) {
        let maxHeight = this.maxHeight;
        let maxWidth =  this.maxWidth;

        var newx =  a[0] + b[0];
        var newy = a[1] + b[1];
        if (newy < 0 || newy > maxHeight)
            return '-1';
        if (newx < 0 || newx > maxWidth)
            return '-1';
        var new_cordinates = [newx, newy];

        if (is_visited.get(newx+""+newy) == true || is_wall.get(newy+""+newx) == true) {
            return '-1';
        }
        console.log(newx+"   "+ newy);
        return new_cordinates;
    });

    all_directions = (function (){
        return [this.up, this.right, this.down, this.left];
    });
}