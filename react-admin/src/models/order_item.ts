export class OrderItem {
    constructor(
        public id = 0,
        public product_title: string,
        public price: number,
        public quantity: number
    ) { }
}