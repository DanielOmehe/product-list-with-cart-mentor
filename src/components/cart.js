import Image from "next/image";

const formatNumber = (number) => {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

  return formattedNumber;
};

const CartContainer = ({ children }) => {
  return (
    <div className="md:w-full w-1/3 h-auto product-cart p-6 bg-white rounded-xl">
      {children}
    </div>
  );
};

export default CartContainer;

export const CartBodyEmpty = () => {
  return (
    <div className="text-center mt-10 w-full">
      <Image
        className="m-auto mb-4"
        src="/images/illustration-empty-cart.svg"
        width={100}
        height={100}
        alt="empty cart"
      />
      <p className="empty-cart-text mb-4 text-base text-yellow-700 font-semibold">
        Your Added Items will appear here
      </p>
    </div>
  );
};

export const CartBodySelected = ({ children, cartItems, confirmOrder }) => {
  const total_price = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="mt-6">{children}</div>
      <div className="flex items-center justify-between py-4">
        <h3 className="text-base">Order Total</h3>
        <h3 className="font-bold text-2xl">{formatNumber(total_price)}</h3>
      </div>
      <div className="flex items-center w-full justify-center bg-red-50 gap-2 py-4 rounded-lg mb-4">
        <Image src={"/images/icon-carbon-neutral.svg"} width={25} height={25} alt="carbon" />
        <p>This is a <span>carbon neutral</span> delivery</p>
      </div>
      <button onClick={confirmOrder} className="confirm-order w-full text-white rounded-full py-3 text-lg text-base">Confirm order</button>
    </>
  );
};

export const CartItem = ({ item }) => {
  return (
    <div className="flex mb-3 border-b-2 py-2 items-center justify-between">
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
        <div className="flex item-center justify-start gap-2">
          <p className="font-semibold text-red-900 text-quantity">
            {item.quantity}x
          </p>
          <p className="text-base text-color">@{formatNumber(item.price)}</p>
          <p className="text-base font-semibold text-color">
            {formatNumber(item.quantity * item.price)}
          </p>
        </div>
      </div>
      <button className="p-1 rounded-full border-2 close-btn">
        <Image
          src={"/images/icon-remove-item.svg"}
          width={15}
          height={15}
          alt="x"
        />
      </button>
    </div>
  );
};
