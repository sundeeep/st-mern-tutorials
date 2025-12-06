class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        let area = this.length * this.width;
        console.log(area);
    }
}

// const phoneScreen = new Rectangle(700, 350)

class Square extends Rectangle{
    constructor(side) {
        super(side, side); // calls the constructor function of base class
        this.side = side;
    }

    logArea() {
        this.getArea();
    }
}

const appleWatchScreen = new Square(150);
console.log(appleWatchScreen);