import './MostPurchased.css';
import '../../index.css';
import { useData } from '../../hooks/useData';
import { Card } from './Card';

export const MostPurchasedSection = () => {
    const {datos } = useData();
    const mostPurchasedProducts = datos.filter(product => product.mas_comprado);

    return (
        <section className="mostPurchased-Container">
            <h2 style={{width: '100%'}}>Los más comprados</h2>
            <main className="products">
                    <ul>
                        {mostPurchasedProducts.map(product => {
                        return(
                            <Card product={product}/>
                        )
                    })}
                    </ul>
            </main>
        </section>
    );
}
