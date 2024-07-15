import React from 'react';
import { useRef, useEffect } from 'react';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { Cart } from './componentes/Store/Cart';
import Footer from './componentes/Footer';
import { createObserver } from './util/observer';

function App() {

  const targetRef = useRef(null);

  useEffect(() => {
    const callback = (entry) => {
      if (entry.isIntersecting) {
        console.log('Element is in view');
      } else {
        console.log('Element is out of view');
      }
    };

    const observer = createObserver(callback);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <>
    <Cart></Cart>
    <AppRoutes/>
    {/* <Footer /> */}
    </>
  );
}

export default App;