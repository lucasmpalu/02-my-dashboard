import { Metadata } from "next";
import { CartCounter } from "Q/app/shopping-cart";

export const metadata:Metadata = {
 title: 'Counter Page',
 description: 'Un simple contador',
};

const CounterPage = () => {


  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
        <span>Productos en el carrito</span>
        {/* Supongamos que el 20 es mandado del backend o base de datos, lo mandamos a un componente del lado del cliente */}
        <CartCounter value={20} />

    </div>
  )
}

export default CounterPage