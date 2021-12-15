import axios from 'axios';
import { Product } from '../../model/domain/interfaces/Product';

class ProductAPI {
	url: string = `https://fakestoreapi.com/products`;

	get(): Promise<Array<Product>> {
		return(
            axios
             .get('https://fakestoreapi.com/products')
        )
	}
}

export default ProductAPI;