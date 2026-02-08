import AdminSkeleton from "@/components/AdminSkeleton";
import Form from "@/components/Form";
import { categoryAttributes } from "../_data/categoryAttributes";
import CategoryImageUpload from "@/components/CategoryImageUpload";

export default function CategoryPageSkeleton() {
  const fakeAction = async () => {
    "use server";
  };
  const renderFormFallback = () => {
    return (
      <main className="grid grid-cols-4 w-full h-full gap-x-4 mt-8 max-h-[400px]">
        <section className="Section">
          <h2>Category list</h2>
          <div className="skeleton h-6 mt-4 w-50" />
          <div className="skeleton h-6 mt-2 w-45" />
          <div className="skeleton h-6 mt-2 w-40" />
        </section>
        <div className="Section col-[2/-1]">
          <Form action={fakeAction} fields={categoryAttributes}>
            <section className="mt-16 flex">
              <CategoryImageUpload />
            </section>
          </Form>
        </div>
      </main>
    );
  };

  return <AdminSkeleton heading="Categories" content={renderFormFallback} />;
}
