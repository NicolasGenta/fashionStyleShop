import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FiltersProvider } from './context/filters.jsx'
import { CartProvider } from './context/cart.jsx'
import { DataProvider } from './context/data.jsx'
import { WindowsSizeProvider } from './context/windowsSize.jsx'
import { AppProfileProvider } from './context/appProfile.jsx'
import { UserProvider } from './context/userContex.jsx'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
            <WindowsSizeProvider>
                <DataProvider>
                    <UserProvider>
                        <AppProfileProvider>
                            <CartProvider>
                                <FiltersProvider>
                                    <App />
                                </FiltersProvider>
                            </CartProvider>
                        </AppProfileProvider>
                    </UserProvider>
                </DataProvider>
            </WindowsSizeProvider>
    </BrowserRouter>
)
