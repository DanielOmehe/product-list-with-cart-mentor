import Image from "next/image";
import CartButton from "./button";
import AddItemsToCart from "./addItems";

const ProductListItem = ({ path, name, title, price, clickHandler, itemState }) => {
  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return (
    <div className="relative">
      <Image
        className={`rounded-xl ${itemState ? "border-2 border-red-500" : ""}`}
        src={path}
        width={400}
        height={400}
        alt={title}
      />
      <>
        {itemState ? (
          <AddItemsToCart />
        ) : (
          <CartButton clickEvent={clickHandler}/>
        )}
      </>
      <div className="mt-12">
        <small className="text-base text-gray-500">{name}</small>
        <h2 className="text-gray-800 capitlize text-base font-bold">{title}</h2>
        <h3 className="text-base font-semibold text-red-400">{formatPrice}</h3>
      </div>
    </div>
  );
};

export default ProductListItem;
