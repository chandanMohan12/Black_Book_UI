import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  MenuItem, Select
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");

const AiGeneratedData = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = Object.keys(data);

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
    setSearchTerm(""); 
  };

  const handleValueChange = (category, index, newValue) => {
    setData(prev => {
      const updatedCategory = [...prev[category]];
      updatedCategory[index] = {
        ...updatedCategory[index],
        value: newValue,
        lastUpdatedDate: new Date().toLocaleString("en-GB"),
      };
      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term) return;
    const regex = new RegExp(escapeRegExp(term), 'i');
    for (let i = 0; i < categories.length; i++) {
      if (data[categories[i]].some(item => regex.test(item.subCategory))) {
        setTabValue(i);
        break;
      }
    }
  };

  const currentList = data[categories[tabValue]] || [];
  const regex = new RegExp(escapeRegExp(searchTerm), 'i');
  const displayedRows = currentList.filter(row =>
    !searchTerm || regex.test(row.subCategory)
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 500, color: '#26292D' }}>
          <img
            src="/Icons/Sparkling.png"
            alt="Sparkling Icon"
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          AI Generated Data
        </Typography>
        <TextField
          size="small"
          placeholder="Search sub-category"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ ml: 'auto', width: 300 }}
        />
      </Box>

      <Tabs value={tabValue} 
        onChange={handleTabChange} 
        variant="scrollable" 
        scrollButtons="auto" 
        sx={{ mb: 2, background: 'white', borderRadius: '10px', minHeight: '48px' }} 
        TabIndicatorProps={{ style: { display: "none" } }}
        >
        {categories.map((cat, index) => (
          <Tab
            key={cat}
            label={cat}
            sx={{
              border: '1px solid #F2F1F1',
              color: '#26292D',
              fontSize: '14px',
              fontWeight: '600',
              borderRadius: 1,
              minHeight: '48px',
              textTransform: 'none',
              mr: 1,
              backgroundColor: 'transparent',
              "&.Mui-selected": {
                color: '#FFFFFF',
                backgroundColor: '#000000',
              },
              "&:hover": {
                backgroundColor: tabValue === index ? '#000' : '#f5f5f5',
              },
            }}
          />
        ))}
      </Tabs>

      <Box>
        <Table>
          <TableHead sx={{ backgroundColor: '#2DA490' }}>
            <TableRow>
              <TableCell sx={{ color: '#FFF', fontWeight: 700 }}>Sub Category <SwapVertIcon sx={{ verticalAlign: "middle", ml: 1 }} /></TableCell>
              <TableCell sx={{ color: '#FFF', fontWeight: 700 }}>Description</TableCell>
              <TableCell sx={{ color: '#FFF', fontWeight: 700 }}>Last Updated Date <SwapVertIcon sx={{ verticalAlign: "middle", ml: 1 }} /></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {displayedRows.map((row, idx) => {
    const isArray = Array.isArray(row.value);
    const currentValue = isArray ? row.value[0] : row.value || '';

    return (
      <TableRow key={idx}>
        <TableCell>{row.subCategory}</TableCell>
        <TableCell>
          {isArray ? (
            <Select
              value={currentValue}
              onChange={e =>
                handleValueChange(categories[tabValue], idx, [e.target.value])
              }
              fullWidth
              size="small"
              sx={{ background: 'white', width: '200px' }}
            >
              {row.value.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <TextField
              value={currentValue}
              onChange={e =>
                handleValueChange(categories[tabValue], idx, e.target.value)
              }
              fullWidth
              size="small"
              sx={{ background: 'white', width: '200px' }}
            />
          )}
        </TableCell>
        <TableCell>{row.lastUpdatedDate}</TableCell>
      </TableRow>
    );
  })}
</TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default AiGeneratedData;
