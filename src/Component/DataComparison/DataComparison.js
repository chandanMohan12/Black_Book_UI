import React, { useState } from "react";
import { Box, Typography, Button, Select, MenuItem, Snackbar,Alert ,Dialog, DialogTitle, DialogContent, DialogActions, } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PDFPreviewer from "./PDFPreviewer";
import AiGeneratedData from "./AiGeneratedData";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningIcon from '@mui/icons-material/Warning';

const DataComparison = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const pdfFiles = [
    { label: "2025-s-class-sedan-order-guide-en_us", value: "/pdfs/2025-s-class-sedan-order-guide-en_us.pdf" },
    { label: "2025-s-class-sedan-guide", value: "/pdfs/025-s-class-sedan-guide.pdf" },
    { label: "std_equip_data_attribute.xlxs", value: "/pdfs/std_equip_data_attribute.xlxs" },
  ];

  const initialData = {
    Dimensions: [
      { subCategory: "Base Curb Weight (lbs)", value: "3,858", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Cargo Volume (cu ft)", value: "5.1", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Seating Capacity", value: ["2", "4", "5", "7"], lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "EPA Range (miles)", value: "279", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Estimated Fuel Economy (city miles)", value: "18", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Front Head Room (in)", value: "38.6", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Transmission Type", value: ["Manual", "Automatic", "CVT"], lastUpdatedDate: "2024-12-03 20:45:13" }, 
      { subCategory: "Drive Type", value: ["FWD", "RWD", "AWD", "4WD"], lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Front Leg Room (in)", value: "41.6", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Front Shoulder Room (in)", value: "57.8", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Height (in)", value: "66.3", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Length (in)", value: "185.4", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Rear Head Room (in)", value: "38.3", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Rear Leg Room (in)", value: "39.5", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Rear Shoulder Room (in)", value: "56.3", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Track Width - Front (in)", value: "64.2", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Track Width - Rear (in)", value: "64.0", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Wheelbase (in)", value: "109.8", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Width (in)", value: "74.4", lastUpdatedDate: "2024-12-03 20:45:13" }
    ],
    "Drivetrain - Axle": [
      { subCategory: "Differential", value: "Limited slip", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Ratio", value: "3.73",  lastUpdatedDate: "2024-12-03 20:45:13" }
    ],
    "Drivetrain - Electric Motor": [
      { subCategory: "Battery",  value: "Sealed Nickel-Metal Hydride (NI‑MH)", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Battery - Power Output (kw)", value: "45",  lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Estimated Charging Time (hours @ voltage)", value: "4.0 @ 240V", lastUpdatedDate: "2024-12-03 20:45:13" }
    ],
    "Drivetrain - Engine": [
      { subCategory: "Bore (in)", value: "3.62", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Cam Configuration", value: "SOHC", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Cylinder Configuration", value: "V",lastUpdatedDate: "2024-12-03 20:45:13" }
    ],
    "Drivetrain - Transmission": [
      { subCategory: "# of Gears", value: "4", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Manual/Automatic", value: "A", lastUpdatedDate: "2024-12-03 20:45:13" }
    ],
    Exterior: [
      { subCategory: "Liftgate/Tailgate", value: "Liftgate w/liftglass", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Roof",  value: "Convertible top, manual", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Running Boards", value: "Body-color", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Tire Size", value: "215/60R16", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Tire Size - Front", value: "225/45R17", lastUpdatedDate: "2024-12-03 20:45:13" }
    ],
    Interior: [
      { subCategory: "Air Conditioning",value: "Air filter", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Audio - Brand", value: "Bose",lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Entertainment", value: "Video Game Port", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Heat/Ventilation Systems", value: "Heater, rear", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Moonroof/Sunroof",value: "Moonroof, power", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Navigation", value: "Voice-activated", lastUpdatedDate: "2024-12-03 20:45:13" }
    ],
    Mechanical: [
      { subCategory: "Brakes - ABS",   value: null,  lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Brakes - Front", value: "Disc", lastUpdatedDate: "2024-12-03 20:45:13" }
    ],
    Safety: [
      { subCategory: "3-Point Seat Belts - Front", value: null, lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "3-Point Seat Belts - Outer Rear", value: null, lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "3-Point Seat Belts - Rear", value: "Center", lastUpdatedDate: "2024-12-03 20:45:13" }
    ],
    Warranty: [
      { subCategory: "Anti-Corrosion", value: "5-year/Unlimited-mile", lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Basic", value: "3-year/50,000-mile",  lastUpdatedDate: "2024-12-03 20:45:13" },
      { subCategory: "Bumper-to-Bumper",  value: "4-year/50,000-mile, Gold Key Limited", lastUpdatedDate: "2024-12-03 20:45:13" }
    ]
  };

  const [selectedFile, setSelectedFile] = useState(pdfFiles[0].value);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);

  const leftWidth = expanded ? "40%" : "10%";

  const handleUpdate = () => {
    setOpenSnackbar(true);
  }

  const handleApproveClick = () => {
    setOpenApproveDialog(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ color: "#1F292E", fontWeight: 500, fontSize: 24, m: 2 }}>
        Data Comparison
      </Typography>
      <Box 
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        color: "#625F5C",
        width: "100%",
        justifyContent: "space-between",
      }}>
      <Button
        size="small"
        sx={{ color: "#1F292E", fontWeight: 800, fontSize: 14, m: 2 }}
        startIcon={<span style={{ color: "#2DA490" }}>&larr;</span>}
        onClick={() => navigate(-1)}
      >
        <span style={{ color: "#2DA490" }}>Vehicle Data </span> /&nbsp;&nbsp; {state?.model}&nbsp;<span style={{color:'#625F5C'}}>({state?.trimLevel})</span>
      </Button>

      <Typography sx={{ color: "#26292D", fontWeight: 500, fontSize: 18, m: 2 }}>
      Jira Number : <span style={{fontWeight:600}}>{state?.jiraNumber}</span>
      </Typography>
      </Box>
      <Box sx={{ mt: 4, display: "flex", width: "100%", height: "75vh" }}>
        <Box
          sx={{
            width: leftWidth,
            transition: "width 0.3s ease",
            p: 2,
            m: 2,
            mt: 0,
            background: '#F2F1F1',
            borderRadius: '10px',
            overflow: "auto",
            gap: 2,
          }}
        >
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#625F5C', fontSize: 18, fontWeight: 700 }}>
              Original Data
            </Typography>
            <Button size="small" onClick={() => setExpanded(!expanded)} sx={{ mb: 2 }}>
              <img
                src={expanded ? "/Icons/ExpandLess.png" : "/Icons/ExpandMore.png"}
                alt="Toggle"
                style={{ width: 20, height: 20 }}
              />
            </Button>
          </Box>

         { expanded? 
            <Select
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
            size="small"
            
            sx={{ mb: 2, background: 'white', borderRadius: 1 }}
          >
            {pdfFiles.map((file) => (
              <MenuItem key={file.value} value={file.value}>
                {file.label}
              </MenuItem>
            ))}
          </Select>:''}

          {expanded ? (
            <PDFPreviewer pdfFileUrl={selectedFile} />
          ) : (
            <Box>
              <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 1, color:'#26292D' }}>Files</Typography>
              {pdfFiles.map((file) => (
              <Typography
                key={file.value}
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  mb: 1,
                  color: file.value === selectedFile ? '#2DA490' : '#625F5C',
                  borderBottom: '1px solid #625F5C',
                  p: 2,
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedFile(file.value)}
              >
                {file.label}
              </Typography>
            ))}

            </Box>
          )}
        </Box>

        <Box
          sx={{
            p: 2,
            m: 2,
            mt: 0,
            borderRadius: '10px',
            overflow: "auto",
            background: '#82B9B029',
            gap: 2,
            width: expanded?"55%":"80%",
          }}
        >
          <AiGeneratedData initialData={initialData} />
        </Box>
      </Box>

      <Box sx={{ width: '100%', textAlign: 'right' }}>
        <Box
          sx={{
            p: 2,
            width: '40%',
            ml: 'auto',
            display: 'grid',
            gridTemplateColumns: '1fr auto auto auto',
            columnGap: 2,
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: '#625F5C', fontSize: 12, fontWeight: 600 }}>
            Last Updated: 12/10/2023
          </Typography>
          <Button sx={{ color: '#E52424', border: '1px solid #E52424', fontSize: 16, fontWeight: 500 }}>
            Cancel
          </Button>
          <Button sx={{ color: '#26292D', border: '1px solid #26292D', fontSize: 16, fontWeight: 500 }} onClick={handleUpdate}>
            Update
          </Button>
          <Button sx={{ color: 'white', background: '#26292D', fontSize: 16, fontWeight: 500 }} onClick={handleApproveClick}>
            Approve
          </Button>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          icon={<CheckCircleOutlineIcon sx={{ color: '#50B702', mr: 1 }} />}
          sx={{
            backgroundColor: '#F2F8EE',
            color: '#26292D',
            boxShadow: 'none',
            borderRadius: 4,
            border: '1px solid #50B702',
            minWidth: 300,
          }}
        >
          <Typography sx={{ fontWeight: 600 , color:'#50B702', fontSize:'16px'}}>Success !</Typography>
          <Typography sx={{color:'#969493', fontWeight:500, fontSize:'14px'}}>The Value or Description has been Updated</Typography>
        </Alert>
      </Snackbar>

      <Dialog
        open={openApproveDialog}
        onClose={() => setOpenApproveDialog(false)}
        aria-labelledby="approve-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="approve-dialog-title" sx={{ textAlign: 'center' }}>
          <WarningIcon sx={{ fontSize: 40, color: '#E87C01', mb: 1 , background:"#F9F1D4", p:2, borderRadius:"40px"}} />
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pt: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Are you sure you want to Approve?
          </Typography>
          <Typography sx={{ color: '#969493' }}>
            You cannot make further changes once approved.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={() => setOpenApproveDialog(false)}
            sx={{ color: '#E52424', border: '1px solid #E52424', mr: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => navigate(-1)}
            sx={{ color: 'white', background: '#26292D' }}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataComparison;
