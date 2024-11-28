import { getServerSession } from "next-auth";
import { ProductResponse } from "./modules/product";
import { authOptions } from "../api/auth/[...nextauth]/route";

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
        <ul>
          <li key={product.id}>{product.name}</li>
          <li>{product.description}</li>
          <li>{product.price}</li>
        </ul>
      ))}
    </>
  );
}
