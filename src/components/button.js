import Image from "next/image";

const CartButton = ({ clickEvent }) => {
  return (
    <button
      className="flex items-center text-base justify-center absolute left-14 py-2.5 px-8 gap-2 top-64 bg-white rounded-full border-2 border-gray-300"
      onClick={clickEvent}
    >
      <Image src={"/images/icon-add-to-cart.svg"} width={25} height={25} />{" "}
      <h3 className="font-semibold text-base">Add to Cart</h3>{" "}
    </button>
  );
};

export default CartButton;
