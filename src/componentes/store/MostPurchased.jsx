import './MostPurchased.css';
import '../../index.css';
import { useData } from '../../hooks/useData';
import { Card } from './Card';

export const MostPurchasedSection = () => {
    const {datos } = useData();
    const mostPurchasedProducts = datos.filter(product => product.mas_comprado ===1);

    return (
        <section className="mostPurchased-Container">
            <h2 style={{width: '100%'}}>Los más comprados</h2>
            <main>
                    <ul style={{ display: 'flex', justifyContent: 'start', height: '100%', overflowX: 'scroll', overflowY: 'hidden', scrollbarWidth: 'none', padding: '1rem 3rem' }}>
                    {mostPurchasedProducts.map(product => (
                        <Card key={product.codigo_producto} product={product} />
                    
                    ))}
                    </ul>
            </main>
        </section>
    );
}
