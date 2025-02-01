import Image from "next/image";
import ProductListHeader from "./header";

const CartContainer = () => {
  return (
    <div className="w-96 absolute right-28 p-6 bg-white rounded-xl">
      <ProductListHeader variant={"text-red-600"}>
        Your Cart (<>{0}</>)
      </ProductListHeader>
      <CartBodyEmpty />
    </div>
  );
};

export default CartContainer;

const CartBodyEmpty = ()=>{
    return(
        <div className="text-center mt-10 w-full">
            <Image className="m-auto mb-4" src="/images/illustration-empty-cart.svg" width={100} height={100} alt="empty cart" />
            <p className="empty-cart-text mb-4 text-base text-yellow-700 font-semibold">Your Added Items will appear here</p>
        </div>
    )
};