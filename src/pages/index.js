import Image from "next/image";
import { Red_Hat_Text } from "next/font/google";
import ProductList from "@/components/productList";
import ProductListHeader from "@/components/header";
import ProductListContainer from "@/components/productListContainer";

const redHatSans = Red_Hat_Text({
  variable: "--font-red-hat-sans",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main
      className={`${redHatSans.variable} py-16 px-40 flex bg-red-50 min-h-screen w-screen box-border font-[family-name:var(--font-geist-sans)]`}
    >
      <ProductList>
        <ProductListHeader>Desserts</ProductListHeader>
        <ProductListContainer></ProductListContainer>
      </ProductList>
    </main>
  );
}
