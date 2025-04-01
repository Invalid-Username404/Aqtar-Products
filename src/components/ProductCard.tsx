import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/utils/api";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative w-full aspect-square">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "contain" }}
          className="p-4"
        />
      </div>
      <div className="p-4">
        <h2 className="font-medium text-lg line-clamp-2 h-14">
          {product.title}
        </h2>
        <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
