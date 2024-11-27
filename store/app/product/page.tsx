import { ProductResponse } from "./modules/product";

export default async function Page() {
  let data = await fetch("http://localhost:9000/api/product", {
    method: "GET",
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
