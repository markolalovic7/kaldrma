import { useNavigate } from 'react-router-dom';
import { Product } from '../../../model/domain/interfaces/Product';
import './product-list.scss';

interface ProductListProps {
    products: any;
}

function ProductList({ products }: ProductListProps) {
    let navigate = useNavigate();
    return (
        <section className="product-list">
            {products.map((product: Product) => {
                return (
                    <article key={product.id}>
                        <div onClick={() => navigate(`/${product.id}`)}>
                            <figure>
                                <img src={product.image} alt={product.title} />
                            </figure>
                            <h2>{product.title}</h2>
                        </div>
                        <b>{product.category}</b>
                        <p>
                            {product.price} <span>RSD</span>
                        </p>
                        {/* <details>{product.description}</details> */}
                    </article>
                );
            })}
        </section>
    );
}

export default ProductList;
