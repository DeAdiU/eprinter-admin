import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import ArticleIcon from '@mui/icons-material/Article';
import Header from "../../components/Header";
import FeedIcon from '@mui/icons-material/Feed';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import StatBox from "../../components/StatBox";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
const URL = "https://barcklays.onrender.com/api/employee/dashboard/"
let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InNvaGFtNCIsImVtYWlsIjoiZW1wb3llZTFAZ21haWwuY29tIiwicm9sZSI6IkNVU1RPTUVSX0NBUkVfUkVQIiwiZW1wbG95ZWVfaWQiOiIxMjM0NTY3ODkxIiwiaWF0IjoxNzEyNDI0NzcwfQ.nmS57dnlbM0wZzV330qqVSR0-36i72jszkqENiuw-4s'


const Dashboard = () => {
  const theme = useTheme();
  const [activeComplaints, setActiveComplaints] = useState([]);
  const [recentResolvedComplaints, setRecentResolvedComplaints] = useState([]);
  const navigate=useNavigate();

  const colors = tokens(theme.palette.mode);
  const currencies = [
    {
      value: 'Active',
      label: 'Active',
    },
    {
      value: 'Sleep',
      label: 'Break',
    },
    {
      value: 'Inactive',
      label: 'Inactive',
    }, 
  ];
  useEffect(() => {
    handleSubmit({ preventDefault: () => { } });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!URL) {
        console.log('URL is not defined');
        return;
      }

      const config = {
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
      };

      const response = await axios.get(URL, config);

      if (!response?.data) {
        console.log('Response data is empty');
        return;
      }
      console.log(response.data)
      setActiveComplaints(response.data.activeComplaints);
      setRecentResolvedComplaints(response.data.recentResolvedComplaints);
    } catch (err) {
      console.log(err);
    }
  }

  let progress=recentResolvedComplaints.length/(activeComplaints.length+recentResolvedComplaints.length)*100
  let total=activeComplaints.length+recentResolvedComplaints.length
  let progressact=(activeComplaints.length/total)*100
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={activeComplaints.length+recentResolvedComplaints.length}
            subtitle="Total number of complaints"
            progress="1"
            increase={'+100%'}
            icon={
              <ArticleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={activeComplaints.length} 
            subtitle="Number of Active Complaints"
            progress={activeComplaints.length/total}
            increase={"+"+progressact+'%'}
            icon={
              <FeedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={recentResolvedComplaints.length}
            subtitle="Number of Resolved Complaints"
            progress={recentResolvedComplaints.length/(activeComplaints.length+recentResolvedComplaints.length)}
            increase={"+"+progress+'%'}
            icon={
              <FactCheckIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
            <TextField
            id="outlined-select-currency"
            select
            label="Mode"
            defaultValue="Active"
            sx={{ color: colors.greenAccent[600], fontSize: "26px",padding:"auto",m:1,width:"275px" }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value} sx={{ color: colors.greenAccent[600] }}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          height="600px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Assigned Complaints
            </Typography>
          </Box>
          {activeComplaints.map((complain, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              cursor="pointer"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {complain.title}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {complain.product_name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{complain.severity}</Box>
              <Button
                variant="contained"
                color='secondary'
                p="5px 10px"
                borderRadius="4px"
                onClick={() => {
                  navigate(`/${complain.id}`, { state: complain });
                }}
              >
                {complain.status}
              </Button>
            </Box>
          ))}
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          height="600px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recently Solved Complaints
            </Typography>
          </Box>
          {recentResolvedComplaints.map((solve, i) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {solve.title}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {solve.product_name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{solve.resolution_time}</Box>
              <Box
              >
                {solve.status}
              </Box>
            </Box>
          ))}
        </Box>
        
      </Box>
    </Box>
  );
};

export default Dashboard;
