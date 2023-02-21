const { faker } = require('@faker-js/faker');

faker.locale = "es"



const getProductosTestList = async () => {

    const dataList = [];

    for (let i = 0; i < 5; i++) {
        const data = {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image()

        }
        dataList.push(data);
    }

    return dataList;
}


module.exports = getProductosTestList