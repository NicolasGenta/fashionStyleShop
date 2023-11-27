import './Footer.css';

export function Footer () {
    return(
      <section className='footer'>
            <table className="table">
              <thead>
                <tr className='redes'>
                  <th scope="col">Redes</th>
                  <th scope="col">Medios de pagos</th>
                  <th scope="col">Información</th>
                </tr>
              </thead>
              <tbody>
                <tr className='logo'>
                  <td >
                    <img className="instagram" src='data:image/jpeg;base64,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'/>
                  </td>
                  <td >
                    <img className='pagoFacil' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQWNed0fVMZ9sZzQYhSJwRhrUxU6Mth_MKPNGcIx1B9g&s'></img>
                  </td>
                  <td className='direccion'>Santa Catalina Nº456</td>
                </tr>
                <tr className='medios'>
                  <td >
                    <img className='facebook' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAYFBMVEU6VZ/////k5/E4U54oSJqqtNJGX6QuTJs8WKGirc4dQpevuNLM0eTR1+fX3ewxT5zq7fT19vpoerGHlMCWosjDyt9xgrWNm8R6irtdcq5ida5Va6u9xNyBkL9LY6adp8rQSJs3AAABhUlEQVRoge3Y3ZKDIAwFYBZwsVYb6brVbtv1/d+yt8UB7TCJXPSca8Zv/CMhSiEIgiAIghSNIWebZewOMFl7/hmq3zZMV4njTl2O/VcsXSMtjzoKi9uGplNKFrYNHdOyrE11t0ZL2nSNf2I72KbeoOVs49YfuKBtqNqixWw6b9JStqG2mO2mbVrMTm6k4rb5e4MWsu1c0F6pIMK2ufkE508vOUr0Dqmf+351ryEBWlH0D/MPS0aCC+LGmD3u0Rsqe4jQrduDVjZWRyaR1/uW7W/y7zpl6/+C9jds2LBhw34ri8vuaRtVB3HRWrJYVNcstpt7HSTWKuplepaKbldHG8lcytk83USe3TPIubZmaR7z7JalZ86zq4L3PRS0H+Vsf2bZZLPsnuewkGVrnv08y+5Mufu+85wNs+xDQXvkOY9n2SwVNM/214I2U/9G0yHIHBnb+ypcMywbzGw8mJu5JjLr0XW4Rmrc9TFnA9iwYcOGDRs2bNiwYcOGDRs2bNiwYcP+TPsJnPsfG8cUuoEAAAAASUVORK5CYII='/>
                  </td>
                  <td>
                    <img className='mercadoPago' src='data:image/png;base64,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'></img>
                  </td>
                  <td>Ciudad de Posadas Provincia De Misiones Argentina</td>
                </tr>
                <tr className='info'>
                  <td>
                    <img className='twitter' src='data:image/png;base64,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'/>
                  </td>
                  <td >
                  <img className='cuentaDni' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnQoA0VSxfnfMCC19TmH7CnfhUcV-iYoo0GiFdsESn1g&s'></img>
                  </td>
                  <td>Numero Telefónico: 0554446698752</td>
                </tr>
              </tbody>
          </table>
      </section>
  )
}
export default Footer;