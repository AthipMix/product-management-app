import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import PageState from "../components/PageState.jsx";
import ProductForm from "../components/ProductForm.jsx";
import ProductHeader from "../components/ProductHeader.jsx";
import { showError, showSuccess } from "../services/alertService.js";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../services/productService.js";

function ProductFormPage({ isEditing = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) return;

    const loadProduct = async () => {
      try {
        const product = await getProduct(id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description ?? "");
        setImage(product.image ?? "");
      } catch (requestError) {
        setError(requestError.message);
        showError(requestError);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, isEditing]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !price) {
      showError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsSubmitting(true);
    try {
      const product = {
        name,
        price: Number(price),
        description: description || null,
        image: image || null,
      };
      if (isEditing) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      await showSuccess(isEditing ? "แก้ไขสินค้าสำเร็จ" : "เพิ่มสินค้าสำเร็จ");
      navigate("/product");
    } catch (requestError) {
      showError(requestError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <ProductHeader
          title={isEditing ? "แก้ไขข้อมูลสินค้า" : "เพิ่มรายการสินค้าใหม่"}
          subtitle={
            isEditing
              ? `กำลังแก้ไขข้อมูลสินค้ารหัส #${id}`
              : "กรอกข้อมูลเพื่อเพิ่มรายการสินค้าใหม่เข้าสู่คลังสินค้า"
          }
          badge={isEditing ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
        />

        {/* Back navigation button */}
        <div className="flex items-center justify-between">
          <Link
            to="/product"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-sky-600 hover:border-sky-200"
          >
            <ArrowLeft className="size-4" />
            <span>กลับไปยังหน้ารายการสินค้า</span>
          </Link>
        </div>

        <PageState loading={loading} error={error} />
        {!loading && !error && (
          <ProductForm
            editingId={isEditing ? id : null}
            name={name}
            price={price}
            description={description}
            image={image}
            isSubmitting={isSubmitting}
            onNameChange={setName}
            onPriceChange={setPrice}
            onDescriptionChange={setDescription}
            onImageChange={setImage}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/product")}
          />
        )}
      </div>
    </main>
  );
}

export default ProductFormPage;
