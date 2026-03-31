import {useState} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import {
  CssBaseline,
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Card,
  TextField,
  Button,
  Paper,
  Alert,
  Snackbar
} from "@mui/material";

function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [copied,setCopied] = useState(false)

  if (!state) {
    return <h2>No data received</h2>;
  }

  const handleCopy = ()=>{
    navigator.clipboard.writeText(state.short_url);
    setCopied(true)
  }

  return (
    <div>
      <CssBaseline />
      <Container maxWidth={false} sx={{ px: 0 }}>
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <AppBar
            position="static"
            sx={{ display: "flex", justifyContent: "center", padding: "30px" }}
          >
            <Toolbar variant="dense" sx={{ textAlign: "center" }}>
              <Typography variant="h6" color="inherit">
                Short URL by Absalom
              </Typography>
            </Toolbar>
          </AppBar>

          <Card sx={{ minWidth: 275, padding: "50px", width: "70%" }}>
            <h1>Paste the URL to be shortened</h1>

            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                fullWidth
                label="Enter the link here"
                value={state.short_url}
              />
              <Button variant="contained" onClick={handleCopy} >
                Copy URL
              </Button>
              {copied && (
                <Snackbar
                  open={copied}
                  autoHideDuration={2000}
                  onClose={() => setCopied(false)}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <Alert severity="success" onClose={() => setCopied(false)}>
                    Text copied successfully
                  </Alert>
                </Snackbar>
              )}
            </div>
            <div>
                <p>Long Url: {state.long_url}</p>
            </div>
            <div style={{margin:'10px'}}>
                <Paper elevation={3} style={{backgroundColor:"#cfe8fc",padding:'1px',color:"#1976d2"}} >
                    <p style={{padding:"0px 10px"}}>Total Click of your short URL:{state.count}</p> 
                </Paper>
            </div>
            <div style={{margin:'10px'}}>  
            <Button
                fullWidth
                variant="outlined"
                onClick={()=>{navigate("/")}}
                style={{padding:'10px'}}
            >
                shorten another URL
            </Button>
            </div>
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default ResultPage;
