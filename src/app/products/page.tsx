import React, { Suspense } from "react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import ProductsCatalogClient from "@/components/products/ProductsCatalogClient";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  // Fetch categories
  const { data: categories } = await supabaseAdmin
    .from("categories")
    .select("id, slug, title, description, description_en, description_de, icon, display_order, created_at")
    .order("display_order", { ascending: true });

  // Fetch active products
  const { data: products } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-navy font-bold">
          Loading catalog...
        </div>
      }
    >
      <ProductsCatalogClient 
        categories={categories || []} 
        products={products || []} 
      />
    </Suspense>
  );
}
