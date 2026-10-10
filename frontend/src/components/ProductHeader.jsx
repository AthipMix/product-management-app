import { Package, Sparkles } from "lucide-react";

const ProductHeader = ({
  title = "Product Management System",
  subtitle = "จัดการสินค้าและราคาได้อย่างสะดวก รวดเร็ว และเป็นระบบในที่เดียว",
  badge = "ระบบจัดการสินค้า"
}) => {
  return (
    <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 px-6 py-8 text-white shadow-xl shadow-sky-600/15 sm:px-8 sm:py-10">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -right-12 -top-12 size-60 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 size-60 rounded-full bg-blue-400/25 blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 top-0 size-32 rounded-full bg-white/10 blur-2xl" />

      <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-3.5 flex items-center gap-2.5">
            <div className="grid size-12 place-items-center rounded-2xl bg-white/20 shadow-inner ring-1 ring-white/30 backdrop-blur-md">
              <Package className="size-6 text-white" />
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
              <Sparkles className="size-3 text-cyan-200" />
              {badge}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="mt-2 max-w-xl text-sm font-light text-sky-100/90 sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;

