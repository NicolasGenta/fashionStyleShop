import './MostPurchased.css';
import '../../index.css';
import { useData } from '../../hooks/useData';
import { Card } from './Card';

export const MostPurchasedSection = () => {
    const {datos } = useData();
    const mostPurchasedProducts = datos.filter(product => product.MostPurchasedSection ===1);

    return (
        <section className="mostPurchased-Container">
            <h2 style={{width: '100%'}}>Los más comprados</h2>
            <main className="products">
                    <ul>
                    {mostPurchasedProducts.map(product => (
                        <Card key={product.codigo_producto} product={product} />
                         
                         ))}
                    </ul>
            </main>
        </section>
    );
}
