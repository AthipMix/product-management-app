import { Package, Pencil, Trash2 } from "lucide-react";

const ProductList = ({ products, onEdit, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-sky-200/80 bg-white/60 p-12 text-center shadow-sm backdrop-blur-sm sm:p-16">
        <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-600 shadow-inner ring-8 ring-sky-50">
          <Package className="size-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">ยังไม่มีข้อมูลสินค้าในระบบ</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 leading-relaxed">
          เริ่มต้นจัดการคลังสินค้าของคุณได้ง่ายๆ ด้วยการคลิกปุ่ม &quot;เพิ่มสินค้า&quot; ด้านบน
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            รายการสินค้าทั้งหมด
          </h2>
          <p className="text-sm text-slate-500">
            แสดงทั้งหมด {products.length} รายการ
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-semibold text-sky-700 shadow-sm">
          <span className="size-2 rounded-full bg-sky-500 animate-pulse" />
          {products.length} รายการ
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10"
            key={product.id}
          >
            {/* Image / Thumbnail Container */}
            <figure className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-slate-100 via-sky-50/50 to-blue-50/40">
              {product.image ? (
                <img
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">
                  <div className="grid size-14 place-items-center rounded-2xl bg-sky-100/70 text-sky-500">
                    <Package className="size-8" />
                  </div>
                  <span className="text-xs font-medium text-slate-400">ไม่มีรูปภาพสินค้า</span>
                </div>
              )}

              {/* Floating ID Tag */}
              <div className="absolute top-3 left-3 rounded-lg bg-slate-900/60 px-2.5 py-1 font-mono text-xs font-semibold text-white shadow-sm backdrop-blur-md">
                #{product.id}
              </div>

              {/* Floating Price Tag */}
              <div className="absolute top-3 right-3 rounded-full border border-sky-100 bg-white/95 px-3 py-1 text-sm font-bold text-sky-700 shadow-sm backdrop-blur-md">
                ฿{Number(product.price).toLocaleString()}
              </div>
            </figure>

            {/* Product Details */}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex-1">
                <h3
                  className="text-lg font-bold text-slate-800 transition-colors group-hover:text-sky-600 line-clamp-1"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2 min-h-[2.6rem]">
                  {product.description || "ไม่มีรายละเอียดเพิ่มเติม"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3.5">
                <button
                  className="inline-flex items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-100 hover:border-sky-300"
                  onClick={() => onEdit(product)}
                  aria-label={`แก้ไขสินค้า ${product.name}`}
                >
                  <Pencil className="size-3.5" />
                  แก้ไข
                </button>
                <button
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-100 hover:border-rose-300"
                  onClick={() => onDelete(product.id)}
                  aria-label={`ลบสินค้า ${product.name}`}
                >
                  <Trash2 className="size-3.5" />
                  ลบ
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductList;

