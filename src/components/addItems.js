import { useState } from "react";
import Image from "next/image";

const AddItemsToCart = () => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity <= 0) return;
    setQuantity((quantity) => quantity - 1);
  };
  const increaseQuantity = () => setQuantity((quantity) => quantity + 1);
  return (
    <div className="flex items-center w-48 justify-between absolute left-10 py-2.5 px-4 gap-2 top-56 bg-red-500 rounded-full text-white">
      <button className="border-2 rounded-full px-1 py-3 border-white" onClick={decreaseQuantity}>
        <Image
          src={"/images/icon-decrement-quantity.svg"}
          width={20}
          height={20}
        />
      </button>
      <p className="text-lg font-medium">{quantity}</p>
      <button className="border-2 rounded-full p-1 border-white" onClick={increaseQuantity}>
        <Image
          src={"/images/icon-increment-quantity.svg"}
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default AddItemsToCart;
