import { ProductResponse } from "./modules/product";

export default async function Page() {
  let data = await fetch("http://localhost:9000/api/product", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICItc2hNYzBSSG1PZzFfTXI0eFFqYkdtTzdJcjBQZGtBOHFtbWpIVHZlU2hBIn0.eyJleHAiOjE3MzI0MTcxNjIsImlhdCI6MTczMjQxNjg2MiwianRpIjoiYTViODY5MjktNjY1MC00MzM1LWFjYzYtNjJiOTk0ZWMyNjljIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgxL3JlYWxtcy9hZWEiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMzI4NDRjYWMtNzBjMS00YTVjLWJjMmQtMWUxMTE2ZWVmZDJiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiY2xpZW50LWNyZWRlbnRpYWxzLWlkIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtY2xpZW50LWNyZWRlbnRpYWxzLWlkIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRIb3N0IjoiMTkyLjE2OC42NS4xIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LWNsaWVudC1jcmVkZW50aWFscy1pZCIsImNsaWVudEFkZHJlc3MiOiIxOTIuMTY4LjY1LjEiLCJjbGllbnRfaWQiOiJjbGllbnQtY3JlZGVudGlhbHMtaWQifQ.RRZudBdxAYHxHj1Cmvxvk4w8iib36OhZ6CRDg0gkFOIiW85UivOxU5jScnn68yxCB0MHBIh7H6BBxyNQvdKMH3WclUZSkmjNQ78ujv6uZfYc9Uy63rCcDrUF9PWoBD-cXhq1NLgyXHhQ7ebfpn9XlJ_KfmqpcbMKQoLAUpRfRtqM4-uV-PbZej5HpmLvJNJve-LbYcVYilRu61yGyde9-IXm2DjyWqkaNDiynSQXvycGTJGKrrWge7n4BfC9adW4Vgg_jyfyNDbvWXxE6DLHz8Ts2vtGgYs9DMkpey9si-N1CddTRRaRZa7nEZK2DzkUoYnddsUwqxH75JyGohV4hw`,
    },
  });
  console.log(data);

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
