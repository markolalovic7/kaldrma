import ProductAPI from "./ProductAPI";

export let api: API;

export class API {
	product = new ProductAPI();
}