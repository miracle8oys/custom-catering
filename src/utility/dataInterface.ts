export interface ItemInterface {
  id: string;
  name: string;
  desc: string;
  available: boolean;
  price: number;
  category: Array<string>;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  pic: string;
}

export interface SubCartInterface {
  id: string;
  name: string;
  desc: string;
  price: number;
  category: Array<string>;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  pic: string;
  schedule: Array<number>;
  status: number;
  subTotal: number;
  durations: number;
  note: string;
}

export interface CartInterface {
  uid: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  items: Array<SubCartInterface>;
}

export interface TransferInterface {
  id: string;
  channel: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  deficit: number;
  img: string;
  uid: string;
  phone: string;
  name: string;
}
