import Image from "next/image";
import ProductListHeader from "./header";
import useProductStore from "@/hooks/useProductStore";

const OrderSummary = () => {
  
  const startNewOrder = useProductStore((state) => state.startNewOrder);
  const cartItems = useProductStore((state) => state.cartItems);

  const CalculateTotalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatTotal = (amount) => {
    const formatPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

    return formatPrice;
  };

  return (
    <div
      // onClick={orderState}
      className="absolute py-52 z-20 w-full min-h-screen bg-black bg-opacity-35 top-0 left-0 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl w-2/5 p-7 bg-white h-auto"
      >
        <Image
          src={"/images/icon-order-confirmed.svg"}
          width={50}
          height={50}
          alt="check"
          className="mb-4"
        />
        <ProductListHeader variant={"mb-2"}>Order Confirmed</ProductListHeader>
        <p className="mb-4 text-base font-medium text-enjoy">
          We hope you enjoy your food
        </p>
        <div className="bg-red-50 mb-4 p-5 rounded-lg bg-opacity-60">
          <>
            {cartItems.map((item, indx) => {
              return (
                <div
                  key={indx}
                  className="flex items-center justify-between border-b-2 border-gray-100 text-gray-500"
                >
                  <div className="flex gap-4 py-4 items-center justify-start">
                    <Image
                      src={item?.path}
                      width={50}
                      height={50}
                      alt={item?.name}
                    />
                    <div>
                      <h3>{item?.name}</h3>
                      <div className="flex gap-3">
                        <h3 className="text-base font-semibold text-red-600">
                          {item?.quantity}x
                        </h3>
                        <p className="text-base font-medium">
                          @{formatTotal(item?.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xl font-medium">
                    {formatTotal(item?.quantity * item?.price)}
                  </p>
                </div>
              );
            })}
          </>
          <div className="flex items-center my-5 justify-between w-full text-gray-800">
            <p>Order Total</p>
            <h2 className="font-bold text-3xl">
              {cartItems.length > 0 ? formatTotal(CalculateTotalPrice) : 0}
            </h2>
          </div>
        </div>
        <button
          onClick={startNewOrder}
          className="w-full rounded-full bg-red-600 text-white text-base font-medium py-3"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;