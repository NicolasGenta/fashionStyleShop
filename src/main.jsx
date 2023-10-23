import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FiltersProvider } from './context/filters.jsx'
import { CartProvider } from './context/cart.jsx'
import { DataProvider } from './context/data.jsx'
import { WindowsSizeProvider } from './context/windowsSize.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <WindowsSizeProvider>
        <DataProvider>
            <CartProvider>
                <FiltersProvider>
                    <App />
                </FiltersProvider>
            </CartProvider>
        </DataProvider>
    </WindowsSizeProvider>
)
