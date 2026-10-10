import Swal from "sweetalert2";

const getErrorMessage = (error) => {
  if (typeof error === "string") return error;

  try {
    const response = JSON.parse(error.message);
    return response.error || response.message || error.message;
  } catch {
    return error?.message || "เกิดข้อผิดพลาดในการทำรายการ";
  }
};

const showError = (error) =>
  Swal.fire({
    icon: "error",
    title: "เกิดข้อผิดพลาด",
    text: getErrorMessage(error),
    confirmButtonText: "ตกลง",
    confirmButtonColor: "#0284c7",
    customClass: {
      popup: "rounded-3xl",
      confirmButton: "rounded-xl font-medium px-5 py-2.5",
    },
  });

const showSuccess = (title, text) =>
  Swal.fire({
    icon: "success",
    title,
    text,
    timer: 1600,
    showConfirmButton: false,
    customClass: {
      popup: "rounded-3xl",
    },
  });

const confirmDelete = () =>
  Swal.fire({
    icon: "warning",
    title: "ยืนยันการลบสินค้า",
    text: "คุณต้องการลบรายการสินค้านี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้",
    showCancelButton: true,
    confirmButtonText: "ลบสินค้า",
    cancelButtonText: "ยกเลิก",
    confirmButtonColor: "#e11d48",
    cancelButtonColor: "#94a3b8",
    reverseButtons: true,
    customClass: {
      popup: "rounded-3xl",
      confirmButton: "rounded-xl font-medium px-5 py-2.5",
      cancelButton: "rounded-xl font-medium px-5 py-2.5",
    },
  }).then((result) => result.isConfirmed);

export { confirmDelete, showError, showSuccess };

