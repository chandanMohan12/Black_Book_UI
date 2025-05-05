import React, { useEffect,useState, useMemo,useRef } from "react";
import {
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import CarModelStatusTable from "./CarModelStatusTable";
import HistoryIcon from "@mui/icons-material/History";
import RuleIcon from "@mui/icons-material/Rule";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchIcon from "@mui/icons-material/Search";

const staticData = [
  {
    model: "2025 Mercedes S-class Sedan",
    status: "Not Approved",
    updated: "01/04/24 18:20:00",
    trimLevel: "S500V4",
    jiraNumber: "VMUS-121",
  },
  {
    model: "2025 Cadillac Optiq",
    status: "Not Approved",
    updated: "20/12/24 14:27:39",
    trimLevel: "S580V4",
    jiraNumber: "VMUS-122",
  },
  {
    model: "2025 Kia EV6",
    status: "In Progress",
    updated: "N/A",
    trimLevel: "S580eV4",
    jiraNumber: "VMUS-123",
  },
  {
    model: "2025 BMW 8-Series",
    status: "Approved",
    updated: "18/12/24 09:40:05",
    trimLevel: "E500V4",
    jiraNumber: "VMUS-124",
  },
  {
    model: "2025 Cadillac XT4",
    status: "In Progress",
    updated: "N/A",
    trimLevel: "CLE926",
    jiraNumber: "VMUS-125",
  },
  {
    model: "2025 Audi SQ6 e-tron",
    status: "In Progress",
    updated: "N/A",
    trimLevel: "SQ06V7",
    jiraNumber: "VMUS-126",
  },
  {
    model: "2025 GMC Yukon XL",
    status: "Approved",
    updated: "18/12/24 09:40:05",
    trimLevel: "CT40V1",
    jiraNumber: "VMUS-127",
  },
  {
    model: "2025 GMC Yukon",
    status: "Not Approved",
    updated: "18/12/24 09:40:05",
    trimLevel: "XT00V3",
    jiraNumber: "VMUS-128",
  },
  {
    model: "2025 Toyota Tundra",
    status: "In Progress",
    updated: "N/A",
    trimLevel: "T000R2",
    jiraNumber: "VMUS-129",
  },
  {
    model: "2025 Acura RDX",
    status: "Approved",
    updated: "18/12/24 09:40:05",
    trimLevel: "RDX010",
    jiraNumber: "VMUS-130",
  },
  {
    model: "2025 Nissan Rouge",
    status: "Approved",
    updated: "18/12/24 09:40:05",
    trimLevel: "S500R4",
    jiraNumber: "VMUS-131",
  },
  {
    model: "2025 Jeep Gladiator",
    status: "In Progress",
    updated: "N/A",
    trimLevel: "G600T1",
    jiraNumber: "VMUS-132",
  },
  {
    model: "2024 Tesla Model Y",
    status: "Approved",
    updated: "12/11/24 08:12:30",
    trimLevel: "TMY001",
    jiraNumber: "VMUS-133",
  },
  {
    model: "2024 Hyundai Ioniq 5",
    status: "Not Approved",
    updated: "05/11/24 17:00:00",
    trimLevel: "ION05V3",
    jiraNumber: "VMUS-134",
  },
  {
    model: "2024 Ford F-150 Lightning",
    status: "Approved",
    updated: "03/11/24 11:11:11",
    trimLevel: "F150L3",
    jiraNumber: "VMUS-135",
  },
  {
    model: "2023 Toyota Prius",
    status: "Not Approved",
    updated: "25/10/23 09:00:00",
    trimLevel: "PRI500",
    jiraNumber: "VMUS-136",
  },
  {
    model: "2023 Honda Civic",
    status: "In Progress",
    updated: "01/11/23 15:15:15",
    trimLevel: "CVC001",
    jiraNumber: "VMUS-137",
  },
  {
    model: "2024 Chevrolet Bolt EUV",
    status: "Not Approved",
    updated: "N/A",
    trimLevel: "BOLT3E",
    jiraNumber: "VMUS-138",
  },
  {
    model: "2024 Lexus RX 500h",
    status: "Approved",
    updated: "10/12/24 16:30:00",
    trimLevel: "RX500H",
    jiraNumber: "VMUS-139",
  },
  {
    model: "2025 Mazda CX-90",
    status: "Approved",
    updated: "02/01/25 10:10:10",
    trimLevel: "CX90T1",
    jiraNumber: "VMUS-140",
  },
  {
    model: "2025 Subaru Outback",
    status: "Not Approved",
    updated: "N/A",
    trimLevel: "OUTB22",
    jiraNumber: "VMUS-141",
  },
  {
    model: "2024 Volvo XC90",
    status: "Not Approved",
    updated: "13/09/24 14:30:30",
    trimLevel: "XC9023",
    jiraNumber: "VMUS-142",
  },
  {
    model: "2024 Polestar 2",
    status: "Approved",
    updated: "19/12/24 18:18:18",
    trimLevel: "PST222",
    jiraNumber: "VMUS-143",
  },
  {
    model: "2023 Rivian R1T",
    status: "In Progress",
    updated: "N/A",
    trimLevel: "R1T001",
    jiraNumber: "VMUS-144",
  },
  {
    model: "2023 Lucid Air",
    status: "Approved",
    updated: "20/12/23 13:13:13",
    trimLevel: "LCAIR1",
    jiraNumber: "VMUS-145",
  },
  {
    model: "2024 Porsche Taycan",
    status: "Not Approved",
    updated: "21/12/24 12:12:12",
    trimLevel: "TAY911",
    jiraNumber: "VMUS-146",
  },
  {
    model: "2026 Honda Accord",
    status: "In Progress",
    updated: "N/A",
    trimLevel: "HACD26",
    jiraNumber: "VMUS-147",
  },
  {
    model: "2026 Genesis GV80",
    status: "Not Approved",
    updated: "N/A",
    trimLevel: "GV8026",
    jiraNumber: "VMUS-148",
  },
  {
    model: "2024 Alfa Romeo Tonale",
    status: "Approved",
    updated: "22/12/24 17:45:00",
    trimLevel: "TON2024",
    jiraNumber: "VMUS-149",
  },
  {
    model: "2025 Mini Cooper Electric",
    status: "Not Approved",
    updated: "N/A",
    trimLevel: "MCE2025",
    jiraNumber: "VMUS-150",
  },
  {
    model: "2025 Ford Mustang Mach-E",
    status: "Approved",
    updated: "01/01/25 01:01:01",
    trimLevel: "MACHE5",
    jiraNumber: "VMUS-151",
  },
  {
    model: "2024 Chrysler Pacifica Hybrid",
    status: "Not Approved",
    updated: "18/12/24 19:19:19",
    trimLevel: "PAC-HYB",
    jiraNumber: "VMUS-152",
  },
  {
    model: "2023 Volkswagen ID.4",
    status: "Not Approved",
    updated: "N/A",
    trimLevel: "ID42023",
    jiraNumber: "VMUS-153",
  },
  {
    model: "2026 Kia Sportage",
    status: "Approved",
    updated: "05/01/26 09:09:09",
    trimLevel: "SPTG26",
    jiraNumber: "VMUS-154",
  },
  {
    model: "2025 Infiniti QX60",
    status: "Not Approved",
    updated: "N/A",
    trimLevel: "QX60V4",
    jiraNumber: "VMUS-155",
  },
  {
    model: "2025 Chevrolet Silverado EV",
    status: "In Progress",
    updated: "N/A",
    trimLevel: "SLV-E25",
    jiraNumber: "VMUS-156",
  },
  {
    model: "2024 BMW iX",
    status: "Not Approved",
    updated: "17/12/24 20:00:00",
    trimLevel: "BMWIX44",
    jiraNumber: "VMUS-157",
  },
  {
    model: "2023 Mercedes EQB",
    status: "Approved",
    updated: "15/11/23 18:45:00",
    trimLevel: "EQB350",
    jiraNumber: "VMUS-158",
  },
  {
    model: "2026 Toyota Sequoia",
    status: "In Progress",
    updated: "N/A",
    trimLevel: "SEQ26X",
    jiraNumber: "VMUS-159",
  },
  {
    model: "2024 Dodge Durango",
    status: "Not Approved",
    updated: "N/A",
    trimLevel: "DURX44",
    jiraNumber: "VMUS-160",
  },
];

const steps = ["Select Year", "Select Make", "Select Model", "Search"];

const StandardEquipmentList = () => {
  const [filters, setFilters] = useState({
    year: null,
    status: "Not Approved",
    make: "",
    model: "",
  });
  const iframeRef = useRef();
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const activeStep = useMemo(() => {
    if (!filters.year) return 0;
    if (!filters.make || filters.make === "All") return 1;
    if (!filters.model || filters.model === "All") return 2;
    return 3;
  }, [filters]);

  const statusCount = staticData.filter(
    (item) => item.status === filters.status
  ).length;
  const statusIcon = {
    "Not Approved": <RuleIcon sx={{ verticalAlign: "middle", mr: 0.5 }} />,
    "In Progress": <HistoryIcon sx={{ verticalAlign: "middle", mr: 0.5 }} />,
    Approved: (
      <CheckCircleOutlineIcon sx={{ verticalAlign: "middle", mr: 0.5 }} />
    ),
  }[filters.status];
  const statusColor = {
    "Not Approved": "#E52424",
    "In Progress": "#E87C01",
    Approved: "#4CAF50",
  }[filters.status];

  const makeDisabled = filters.year === null;
  const modelDisabled = !filters.make || filters.make === "All";
  const searchDisabled = !filters.model || filters.model === "All";

  const statusOptions = ["Approved", "In Progress", "Not Approved"];
  const makeOptions = [
    "All",
    "Mercedes",
    "Cadillac",
    "Kia",
    "BMW",
    "Audi",
    "GMC",
    "Toyota",
    "Acura",
  ];

  const modelOptions = [
    "All",
    "S-class Sedan",
    "Optiq",
    "EV6",
    "8-Series",
    "XT4",
    "SQ6 e-tron",
    "Yukon XL",
    "Tundra",
    "RDX",
  ];

  useEffect(() => {
    const token = '12oiwenw';
    const userId = 'jxndxnwun';
  
    const message = {
      type: 'AUTH_TOKEN',
      token,
      userId
    };
  
    const sendAuthToken = () => {
      iframeRef.current?.contentWindow.postMessage(message, 'https://d3m8kccplmhuxh.cloudfront.net');
    };
  
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = sendAuthToken;
    }
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ p: 3, backgroundColor: "#F9F9FB", borderRadius: 2, m: 4, mb: 0 }}
      >
        <Typography
          sx={{ color: "#26292D", fontWeight: 700, fontSize: 24, mb: 3 }}
        >
          Vehicle Data
        </Typography>

        <Grid container spacing={2} sx={{ m: 1, mt: 2 }} alignItems="center">
          {/* Total Count */}
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              sx={{
                color: "#625F5C",
                fontWeight: 600,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              Total Count:
              <Box
                component="span"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                {statusIcon}
                <span style={{ color: statusColor, fontWeight: 700 }}>
                  {statusCount}
                </span>
                <span>{filters.status}</span>
              </Box>
            </Typography>
          </Grid>

          {/* Status Dropdown */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                sx={{ color: "#26292D", fontWeight: 600, fontSize: 16 }}
              >
                Status
              </Typography>
              <FormControl size="medium" sx={{ width: "320px" }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  label="Status"
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center">
          {/* Year */}
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year"]}
                  label="Year"
                  value={filters.year ? dayjs(`${filters.year}`) : null}
                  maxDate={dayjs()}
                  onChange={(newVal) =>
                    setFilters((f) => ({ ...f, year: newVal?.year() }))
                  }
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          {/* Make */}
          <Grid item xs={12} sm={3}>
            <FormControl
              size="medium"
              sx={{ width: "320px" }}
              disabled={makeDisabled}
            >
              <InputLabel>Make</InputLabel>
              <Select
                name="make"
                value={filters.make}
                onChange={handleFilterChange}
                label="Make"
              >
                {makeOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Model */}
          <Grid item xs={12} sm={3}>
            <FormControl
              size="medium"
              sx={{ width: "320px" }}
              disabled={modelDisabled}
            >
              <InputLabel>Model</InputLabel>
              <Select
                name="model"
                value={filters.model}
                onChange={handleFilterChange}
                label="Model"
              >
                {modelOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Search Stepper */}
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                mt: 2,
                "& .MuiStepIcon-root": {
                  color: "#B0B0B0",
                },
                "& .Mui-active .MuiStepIcon-root": {
                  color: "#2DA490",
                },
                "& .Mui-completed .MuiStepIcon-root": {
                  color: "#2DA490",
                },
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  {index === steps.length - 1 && activeStep === index ? (
                    <Button
                      startIcon={<SearchIcon />}
                      disabled={searchDisabled}
                      sx={{
                        color: "white",
                        background: "#26292D",
                        "&.Mui-disabled": {
                          backgroundColor: "#B0B0B0",
                          color: "#F0F0F0",
                          opacity: 1,
                        },
                      }}
                    >
                      Search
                    </Button>
                  ) : (
                    <StepLabel>{label}</StepLabel>
                  )}
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>
      </Box>
      {/* <iframe
        ref={iframeRef}
        src="https://d3m8kccplmhuxh.cloudfront.net"
        width="100%"
        height="500px"
        style={{ border: 'none' }}
        title="Embedded Example Website"
      /> */}
      <CarModelStatusTable staticData={staticData} />
    </Box>
  );
};

export default StandardEquipmentList;
