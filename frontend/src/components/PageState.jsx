import { AlertCircle } from "lucide-react";

function PageState({ loading, error }) {
  if (loading) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-sky-100 bg-white/80 p-8 shadow-sm backdrop-blur-sm">
        <div className="relative">
          <div className="size-10 rounded-full border-4 border-sky-100 border-t-sky-600 animate-spin" />
        </div>
        <p className="text-sm font-medium text-slate-500">
          กำลังโหลดข้อมูลสินค้า... กรุณารอสักครู่
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-rose-800 shadow-sm"
      >
        <AlertCircle className="mt-0.5 size-5 shrink-0 text-rose-600" />
        <div className="flex-1 text-sm">
          <p className="font-semibold">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
          <p className="mt-0.5 text-rose-700">{error}</p>
        </div>
      </div>
    );
  }

  return null;
}

export default PageState;

