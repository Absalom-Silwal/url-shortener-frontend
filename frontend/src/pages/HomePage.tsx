import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CssBaseline,
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Card,
  TextField,
  Button
} from "@mui/material";

function HomePage() {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ longUrl })
      });

      const data = await response.json();
      navigate("/result",{state:data});
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <>
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
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
              />
              <Button variant="contained" onClick={handleShorten}>
                Shorten URL
              </Button>
            </div>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
