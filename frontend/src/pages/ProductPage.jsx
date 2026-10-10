import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { PlusCircle, Search, XCircle } from "lucide-react";
import ProductHeader from "../components/ProductHeader";
import ProductList from "../components/ProductList";
import PageState from "../components/PageState";
import { deleteProduct, getProducts } from "../services/productService";
import {
  confirmDelete,
  showError,
  showSuccess,
} from "../services/alertService";

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadingProducts = async () => {
      setLoading(true);
      setError("");
      try {
        setProducts(await getProducts());
      } catch (err) {
        setError(err.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
      } finally {
        setLoading(false);
      }
    };
    loadingProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!(await confirmDelete())) return;
    try {
      await deleteProduct(id);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id),
      );
      showSuccess("ลบสินค้าสำเร็จ", "รายการสินค้าถูกลบออกจากระบบเรียบร้อย");
    } catch (err) {
      showError(err);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <ProductHeader />

        {/* Action & Filter Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 sm:p-4 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อสินค้า หรือ รายละเอียด..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-10 pr-9 text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="ล้างการค้นหา"
              >
                <XCircle className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-end gap-3">
            <Link
              to="/product/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition-all hover:from-sky-600 hover:to-blue-700 hover:shadow-lg hover:shadow-sky-500/25 active:scale-[0.98]"
            >
              <PlusCircle className="size-4" />
              <span>เพิ่มสินค้าใหม่</span>
            </Link>
          </div>
        </div>

        {/* Loading and Error States */}
        <PageState loading={loading} error={error} />

        {/* Product Grid or Search Empty State */}
        {!loading && !error && (
          filteredProducts.length === 0 && searchQuery ? (
            <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-12 text-center shadow-sm">
              <Search className="mx-auto size-12 text-sky-400/80" />
              <h3 className="mt-3 text-lg font-bold text-slate-800">
                ไม่พบสินค้าที่ตรงกับคำค้นหา &quot;{searchQuery}&quot;
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                ลองตรวจสอบตัวสะกดหรือค้นหาด้วยคำอื่น
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 inline-flex items-center rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-700 hover:bg-sky-100"
              >
                ล้างคำค้นหา
              </button>
            </div>
          ) : (
            <ProductList
              products={filteredProducts}
              onEdit={(product) => navigate(`/product/${product.id}/edit`)}
              onDelete={handleDelete}
            />
          )
        )}
      </div>
    </main>
  );
};

export default ProductPage;

