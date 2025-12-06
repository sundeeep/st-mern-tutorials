/**
 * 1. Object.assign(): Copies enumerable properties of all the source objects to target
 * and returned that shallow copy of target object.
 * 
 * Core Use Cases:
 * 1. Merging one or two objects
 * 2. Overriding defaults with user config
 * 3. We can shallow merge of objects 
 * 4. Clonning the simple objects
 * 
 * 2. Object.create()
 * -> Creates a new object instance with a specified prototype
 * 
 * Core Use Cases:
 * 1. Protype-based inheritance without using classes.
 * 2. Object.create(null) -> Create objects with no prototype
 * 3. Customize the prototypal chains
 */

// const defaults = {
//     theme: "dark",
//     size: "md"
// }

// const user = {
//     theme: "light"
// }

// const finalConfigForSystem = Object.assign({}, defaults, user)

// console.log(finalConfigForSystem);
// console.log(defaults)
// console.log(user)



// Object.create()

const animal = {
    eat: function(){
        console.log("Animal Can Eat!")
    }
}

const dog = Object.create(animal); // Best Practice
// dog -> {}.__proto__ -> animal // [[Protype]]

dog.bark = function(){
    console.log("Dog can bark!")
}
console.log(dog);

// dog.__proto__ == Object.prototype
// dog.__proto__ == animal -> animal.__proto__ == Object.prototype // prototypal chain
// dog.__proto__ = animal; //DON't DO this! It's not a best practice!