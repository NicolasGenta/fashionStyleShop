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
import { AppProvider } from './context/app.jsx';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
    <BrowserRouter>
            <WindowsSizeProvider>
                <DataProvider>
                    <AppProvider>
                        <UserProvider>
                            <AppProfileProvider>
                                <CartProvider>
                                    <FiltersProvider>
                                        <App />
                                    </FiltersProvider>
                                </CartProvider>
                            </AppProfileProvider>
                        </UserProvider>
                    </AppProvider>
                </DataProvider>
            </WindowsSizeProvider>
    </BrowserRouter>
    </ThemeProvider>
)
