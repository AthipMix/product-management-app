import { Image as ImageIcon, Pencil, PlusCircle, X } from "lucide-react";

function ProductForm({
  editingId,
  name,
  price,
  description,
  image,
  isSubmitting,
  onNameChange,
  onPriceChange,
  onDescriptionChange,
  onImageChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-sky-500/5 backdrop-blur-sm">
      <div className="p-6 sm:p-8">
        {/* Form Title & Icon */}
        <div className="mb-6 flex items-center gap-3.5 border-b border-slate-100 pb-5">
          <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 text-sky-600 shadow-inner">
            {editingId ? (
              <Pencil className="size-6" />
            ) : (
              <PlusCircle className="size-6" />
            )}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              {editingId ? "แก้ไขข้อมูลสินค้า" : "เพิ่มรายการสินค้าใหม่"}
            </h2>
            <p className="text-sm text-slate-500">
              {editingId
                ? "ปรับปรุงรายละเอียดสินค้าและราคาในระบบ"
                : "กรอกข้อมูลสินค้าเพื่อบันทึกลงในฐานข้อมูลระบบ"}
            </p>
          </div>
        </div>

        {/* Form Inputs */}
        <form
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
          onSubmit={onSubmit}
        >
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              ชื่อสินค้า <span className="text-rose-500">*</span>
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
              type="text"
              required
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              placeholder="เช่น iPhone 15 Pro Max"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              ราคา (บาท) <span className="text-rose-500">*</span>
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
              type="number"
              step="any"
              min="0"
              required
              value={price}
              onChange={(event) => onPriceChange(event.target.value)}
              placeholder="เช่น 29000"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              รายละเอียดสินค้า
            </label>
            <textarea
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100 resize-none"
              value={description}
              onChange={(event) => onDescriptionChange(event.target.value)}
              placeholder="ระบุสเปก ฟังก์ชันการใช้งาน หรือข้อมูลสินค้าเพิ่มเติม..."
              rows={3}
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              URL รูปภาพสินค้า
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-all focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100"
              type="url"
              value={image}
              onChange={(event) => onImageChange(event.target.value)}
              placeholder="https://example.com/product-image.jpg"
            />
          </div>

          {/* Live Image Preview Card */}
          {image && (
            <div className="flex items-center gap-4 rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50/60 to-cyan-50/30 p-3.5 md:col-span-2">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-sky-200 bg-white shadow-sm">
                <img
                  src={image}
                  alt="ตัวอย่างรูปภาพ"
                  className="size-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-700">
                  <ImageIcon className="size-3.5" />
                  <span>ตัวอย่างรูปภาพสินค้า</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-slate-500">{image}</p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-3 md:col-span-2 md:flex-row md:justify-end">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-800 active:scale-[0.98]"
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              <X className="size-4" />
              ยกเลิก
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition-all hover:from-sky-600 hover:to-blue-700 hover:shadow-lg hover:shadow-sky-500/25 active:scale-[0.98] disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>กำลังบันทึกข้อมูล...</span>
                </>
              ) : editingId ? (
                <>
                  <Pencil className="size-4" />
                  <span>บันทึกการแก้ไข</span>
                </>
              ) : (
                <>
                  <PlusCircle className="size-4" />
                  <span>บันทึกข้อมูลสินค้า</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProductForm;

