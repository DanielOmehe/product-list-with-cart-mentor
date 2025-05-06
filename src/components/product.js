import useProductStore from "@/hooks/useProductStore";
import Image from "next/image";

const ProductListItem = ({
  indx,
  path,
  name,
  title,
  price,
}) => {

  const cartItems = useProductStore((state) => state.cartItems),
  addToCart = useProductStore(state => state.addProductToCart),
  increaseProductQuantity = useProductStore(({ incrementItemQuantity }) => incrementItemQuantity),
  decreaseProductQuantity = useProductStore(({ decrementItemQuantity }) => decrementItemQuantity),
  isSelected = cartItems.some((item) => item.id === indx),
  itemInCart = cartItems.find(item => item.id === indx);

  const formatPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return (
    <div className="relative">
      <Image
        className={`rounded-xl ${isSelected ? "border-2 border-red-500" : ""}`}
        src={path}
        width={400}
        height={400}
        alt={title}
      />
      <>
        {isSelected ? (
          <div className="flex items-center relative w-3/4 md:w-3/4 md:ml-12 text-base justify-between py-2.5 px-4 gap-2 z-10 ml-10 -mt-5 bg-red-500 rounded-full text-white 2xl:border-black 2xl-border-2">
            <button
              className="border-2 rounded-full px-1.5 py-3 border-white"
              onClick={() => decreaseProductQuantity(indx)}
            >
              <Image
                src={"/images/icon-decrement-quantity.svg"}
                width={15}
                height={15}
                alt="minus sign"
              />
            </button>
            <p className="text-lg font-medium">{itemInCart.quantity}</p>
            <button
              className="border-2 rounded-full p-1.5 border-white"
              onClick={() => increaseProductQuantity(indx)}
            >
              <Image
                src={"/images/icon-increment-quantity.svg"}
                width={15}
                height={15}
                alt="plus sign"
              />
            </button>
          </div>
        ) : (
          <button
            className="flex items-center relative w-4/5 text-base justify-center py-2.5 px-8 gap-2 z-10 ml-7 -mt-5 bg-white rounded-full hover:border-2 hover:border-red-500 hover:text-red-500 border-2 border-gray-300"
            onClick={() => addToCart({ path, name, title, price }, indx)}
          >
            <Image
              src={"/images/icon-add-to-cart.svg"}
              width={25}
              height={25}
              alt="cart"
            />
            <h3 className="font-semibold text-gray-700 text-base">Add to Cart</h3>
          </button>
        )}
      </>
      <div className="mt-3">
        <small className="text-base color-rose">{name}</small>
        <h2 className="text-gray-800 capitlize text-base font-bold">{title}</h2>
        <h3 className="text-base font-semibold text-red-400">{formatPrice}</h3>
      </div>
    </div>
  );
};

export default ProductListItem