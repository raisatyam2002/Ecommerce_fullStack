import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { UserMenu } from "../../components/Layout/UserMenu";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
const defaultTheme = createTheme();
export const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const { user } = auth;
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/v1/auth/profile",
        {
          name: name,
          password: password,
          address: address,
          phone: phone,
        },
        {
          headers: {
            Authorization: "Bearer " + auth?.token,
          },
        }
      );
      // console.log("update ddata ", data);

      if (data.success) {
        setName(data.user.name);
        setEmail(data.user.email);
        setPhone(data.user.phone);
        setAddress(data.user.address);
        setPassword(data.user.password);
        setAuth({ ...auth, user: data.user });
        let ls = localStorage.getItem("auth") as unknown as any;
        if (ls) {
          ls = JSON.parse(ls);
          ls.user = data.user;
          localStorage.setItem("auth", JSON.stringify(ls));
        }

        toast.success("user detailed updated succesfully");
      } else {
        toast.error("error 1 while updating user detail");
      }
    } catch (error) {
      console.log("update error", error);
      toast.error("error 2");
    }
  };
  return (
    <Layout>
      <div className="grid grid-cols-[1fr_3fr] gap-4 m-4">
        <div>
          <UserMenu />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg m-3">
          <h1>Profile</h1>
          <div>
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h1 className="text-3xl flex justify-center ">
                    Register Form
                  </h1>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="given-name"
                          name="firstName"
                          required
                          fullWidth
                          id="firstName"
                          // label="Full Name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          autoFocus
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          // label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="Phone Number"
                          // label="Phone Number"
                          type="Phone Number"
                          id="Phone Number"
                          autoComplete="Phone Number"
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          value={phone}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="Address"
                          // label="Address"
                          type="Address"
                          id="Address"
                          autoComplete="Address"
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                          value={address}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Update
                    </Button>
                    <Grid container justifyContent="flex-end"></Grid>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
};
