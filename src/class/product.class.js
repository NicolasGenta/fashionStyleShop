export class Product {
    name;
    description;
    price;
    mostPurchased;
    discont;
    image
    categoria;
    emprendimiento;

    constructor(name, description, price, mostPurchased, discont, image, categoria, emprendimiento){
        this.name = name;
        this.description = description;
        this.price = price;
        this.mostPurchased = mostPurchased;
        this.discont = discont;
        this.image = image;
        this.categoria = categoria;
        this.emprendimiento = emprendimiento
    }

    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    }

    
}