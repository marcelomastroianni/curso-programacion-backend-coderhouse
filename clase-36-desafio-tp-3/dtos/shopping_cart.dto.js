

class ShoppingCartDto {

    constructor(uuid, timestamp, product_list) {
        this.uuid = uuid;
        this.timestamp = timestamp;
        this.product_list = product_list;
    }

    addProduct(product) {
        this.product_list.push(product);
    }

    removeProduct(product) {
        this.product_list = this.product_list.filter((p) => p.uuid !== product.uuid);
    }

}

class CreateShoppingCartDto {

    constructor(timestamp) {
        this.timestamp = timestamp;
        this.products = [];
    }

}


module.exports = {CreateShoppingCartDto, ShoppingCartDto}
