export class Product {
  constructor(
    _name,
    _price,
    _img,
    _desc,
    _type,
    _screen,
    _backCamera,
    _frontCamera
  ) {
    this.name = _name;
    this.price = _price;
    this.img = _img;
    this.desc = _desc;
    this.type = _type;
    this.screen = _screen;
    this.backCamera = _backCamera;
    this.frontCamera = _frontCamera;
  }
}

export class Cart {
  constructor(_id, _name, _price, _img, _screen, _backCamera, _frontCamera) {
    this.id = _id;
    this.name = _name;
    this.price = _price;
    this.img = _img;
    this.screen = _screen;
    this.backCamera = _backCamera;
    this.frontCamera = _frontCamera;
    this.quality = 1;
  }
  total() {
    return this.quality * this.price;
  }
}
