import { getServerSession } from "next-auth";
import { ProductResponse } from "./modules/product";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ProductForm from "./components/productForm";

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
    <Container maxWidth="lg" className="mt-5">
      <Typography variant="h2" className="d-inline-flex justify-center">All products</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="mt-3 border border-lime-300">
        <ProductForm accessToken={session?.access_token} />
      </div>
      </Container>
    </>
  );
}
