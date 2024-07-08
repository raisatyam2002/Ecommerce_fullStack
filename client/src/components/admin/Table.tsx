import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import App from "./OpenModal";
import { useState } from "react";
export default function BasicTable({
  categories,
  handleDelete,
  updatedName,
  setUpdatedName,
  handleUpdate,
}: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Actions</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category: any) => (
            <TableRow
              key={category._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category.name}
              </TableCell>
              <TableCell align="right">
                <button
                  className="bg-blue-400 w-16"
                  onClick={() => {
                    setIsModalOpen(true);
                    setId(category._id);
                  }}
                >
                  Edit{" "}
                </button>
              </TableCell>
              <TableCell align="right">
                <button
                  className="bg-red-600 w-16"
                  onClick={() => {
                    handleDelete(category._id);
                  }}
                >
                  Delete{" "}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <App
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        updatedName={updatedName}
        setUpdatedName={setUpdatedName}
        handleUpdate={handleUpdate}
        id={id}
      />
    </TableContainer>
  );
}
