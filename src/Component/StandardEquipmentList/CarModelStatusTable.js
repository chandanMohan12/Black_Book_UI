import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, Button, Stack, Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SwapVertIcon from '@mui/icons-material/SwapVert';

const getStatusStyle = (status) => {
  switch (status) {
    case "Approved": return { color: "#4CAF50" };
    case "Not Approved": return { color: "#F44336" };
    case "In Progress": return { color: "#FB8C00" };
    default: return {};
  }
};

const CarModelStatusTable = ({staticData}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedData = [...staticData].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (!key) return 0;

    const valA = a[key] ?? '';
    const valB = b[key] ?? '';
    
    const dateKeys = ['updated'];
    const isDate = dateKeys.includes(key);
    
    if (valA === "N/A") return 1;
    if (valB === "N/A") return -1;

    const aVal = isDate ? new Date(valA) : valA.toString().toLowerCase();
    const bVal = isDate ? new Date(valB) : valB.toString().toLowerCase();

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(staticData.length / rowsPerPage);

  return (
    <Box p={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#2DA490', border:'1px solid #CBC9C9' }}>
            <TableRow>
              {['model', 'trimLevel', 'jiraNumber', 'status', 'updated'].map((colKey, i) => (
                <TableCell
                  key={i}
                  sx={{ color: "white", fontSize: 16, fontWeight: 700 }}
                  onClick={() => handleSort(colKey)}
                  style={{ cursor: 'pointer' }}
                >
                  {colKey === 'model' ? 'Model' :
                   colKey === 'trimLevel' ? 'Trim Level' :
                   colKey === 'jiraNumber' ? 'Jira Number' :
                   colKey === 'status' ? 'Status' :
                   colKey === 'updated' ? 'Last Updated Date' : colKey}
                  <SwapVertIcon sx={{ verticalAlign: "middle", ml: 1 }} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f3fdfb" } }}
                onClick={() => navigate("/comparison", { state: row })}
              >
                <TableCell style={{ color: '#26292D', fontSize: 14, fontWeight: 700 }}>{row.model}</TableCell>
                <TableCell style={{ color: '#625F5C', fontSize: 14, fontWeight: 500 }}>{row.trimLevel}</TableCell>
                <TableCell style={{ color: '#625F5C', fontSize: 14, fontWeight: 500 }}>{row.jiraNumber}</TableCell>
                <TableCell style={{ color: '#2B90FD', fontSize: 14, fontWeight: 700, ...getStatusStyle(row.status) }}>
                  <li>{row.status}</li>
                </TableCell>
                <TableCell style={{ color: '#625F5C', fontSize: 14, fontWeight: 500 }}>{row.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Box display="flex" justifyContent="flex-start" mb={2}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="rows-per-page-label">Rows per page</InputLabel>
              <Select
                labelId="rows-per-page-label"
                value={rowsPerPage}
                label="Rows per page"
                onChange={(e) => {
                  setRowsPerPage(e.target.value);
                  setPage(1); 
                }}
              >
                {[5, 10, 15, 20].map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Stack direction="row" spacing={1}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((pg, i) => (
              <Button
                key={i}
                size="small"
                variant="text"
                onClick={() => setPage(pg)}
                sx={{
                  minWidth: 32,
                  padding: "4px 8px",
                  color: pg === page ? "#1F292E" : '#666E79',
                  borderBottom: pg === page ? '2px solid #1F292E' : '2px solid transparent',
                  borderRadius: 0,
                  fontWeight: pg === page ? 'bold' : 'normal'
                }}
              >
                {pg}
              </Button>
            ))}
          </Stack>
          <Box>
            <Button
              size="small"
              sx={{ color: '#1F292E', border: '1px solid #969493', mr: 2, p: 1 }}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              startIcon={<span>&larr;</span>}
            >
              Previous
            </Button>

            <Button
              size="small"
              sx={{ color: '#1F292E', border: '1px solid #969493', p: 1 }}
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              endIcon={<span>&rarr;</span>}
            >
              Next
            </Button>
          </Box>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default CarModelStatusTable;
