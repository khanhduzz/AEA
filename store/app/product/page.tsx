import { getServerSession } from "next-auth";
import { ProductResponse } from "./modules/product";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProductForm from "./components/ProductForm";


export default async function Page() {
  const session = await getServerSession(authOptions)
  let data = await fetch("http://localhost:9000/api/product", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${session?.access_token}`
    },
    credentials: "include",
  });

  let products: ProductResponse[] = await data.json();
  return (
    <>
      {products.map((product) => (
        <ul key={product.id} className="pb-10">
          <li key={product.id}>{product.name}</li>
          <li>{product.description}</li>
          <li>{product.price}</li>
        </ul>
      ))}
      <div className="mt-3 border border-lime-300">
        <ProductForm accessToken={session?.access_token} />
      </div>
    </>
  );
}
