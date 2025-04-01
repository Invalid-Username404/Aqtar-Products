import { api } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import DeleteButton from "@/components/DeleteButton";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Product } from "@/utils/api";

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[]>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const id = parseInt((await params).id);
    if (isNaN(id)) return { title: "Product Not Found - Store" };

    const product = await api.getProduct(id);

    return {
      title: `${product.title} - Store`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.image, alt: product.title }],
        type: "website",
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    // Error is intentionally not used
    return { title: "Product Not Found - Store" };
  }
}

// Generate structured data for product
function generateJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.rate,
        reviewCount: product.rating.count,
      },
    }),
  };
}

export default async function ProductPage({ params }: Props) {
  try {
    const id = parseInt((await params).id);
    if (isNaN(id)) notFound();

    const product = await api.getProduct(id);

    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateJsonLd(product)),
          }}
        />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 relative aspect-square bg-white rounded-lg shadow-sm">
            <Suspense
              fallback={
                <div className="animate-pulse bg-gray-200 h-full w-full" />
              }
            >
              <Image
                src={product.image}
                alt={`Product image of ${product.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "contain" }}
                priority
                className="rounded-lg"
                aria-hidden="false"
              />
            </Suspense>
          </div>

          <section
            className="md:w-1/2 space-y-5 px-2"
            aria-labelledby="product-heading"
          >
            <h1 id="product-heading" className="text-2xl md:text-3xl font-bold">
              {product.title}
            </h1>
            <p
              className="text-3xl font-bold"
              aria-label={`Price: $${product.price.toFixed(2)}`}
            >
              ${product.price.toFixed(2)}
            </p>

            {product.rating && (
              <div
                className="flex items-center gap-2"
                aria-label={`Rating: ${product.rating.rate} out of 5 stars. ${product.rating.count} reviews.`}
              >
                <span className="text-yellow-500" aria-hidden="true">
                  ★
                </span>
                <span>
                  {product.rating.rate}{" "}
                  <span className="text-gray-600">
                    ({product.rating.count} reviews)
                  </span>
                </span>
              </div>
            )}

            <div className="bg-gray-100 px-4 py-2 rounded-full inline-block">
              <span className="text-sm font-medium">{product.category}</span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="sr-only">Product description</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <Link
                href={`/product/edit/${id}`}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                aria-label="Edit this product"
              >
                Edit Product
              </Link>
              <DeleteButton id={id} />
            </div>
          </section>
        </div>

        <div className="mt-12 pb-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-colors"
            aria-label="Back to all products"
          >
            <span aria-hidden="true">←</span> Back to products
          </Link>
        </div>
      </main>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    // Error is intentionally not used
    notFound();
  }
}
