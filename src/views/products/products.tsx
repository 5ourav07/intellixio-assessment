"use client";

import { BackToHome } from "@/components/backToHome/backToHome";
import { PRODUCTS_DATA } from "@/data/productsData";
import { usePagination } from "@/hooks/usePagination";
import { Product } from "@/types";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { ProductList } from "@/views/products/productList/productList";
import { ProductModal } from "@/views/products/productModal/productModal";
import { useModalStore } from "@/zStore/modalStore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

const ProductsContent: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = useModalStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  useEffect(() => {
    const productId = searchParams.get("product-id");
    if (productId) {
      const product = PRODUCTS_DATA.find((p) => p.id.toString() === productId);
      if (product) {
        setSelectedProduct(product);
      }
    } else {
      setSelectedProduct(null); // Close modal if no query parameter
    }
  }, [searchParams, setSelectedProduct]);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    router.push(`?product-id=${product.id}`);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    router.push("/products");
  };

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export const Products: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
};
