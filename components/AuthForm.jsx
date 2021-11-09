import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText,
  Button,
  Box,
  Alert,
  Collapse,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setSignup, authState } from "../store/features/authSlice";

export default function AuthForm(props) {
  const { formType } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth, status, error } = useSelector(authState);
  const [showPassword, setShowPassword] = useState({
    password: false,
    repassword: false,
  });

  const [authInputs, setAuthInputs] = useState(null);

  const [isEmpty, setIsEmpty] = useState(false);

  const [errors, setErrors] = useState({});

  const handleClickShowPassword = (label) => (event) => {
    setShowPassword((prev) => ({ ...prev, [label]: !prev[label] }));
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (label) => (event) => {
    setAuthInputs((prev) => ({
      ...prev,
      [label]: event.target.value,
    }));
  };

  const handleSubmit = (formType) => (event) => {
    event.preventDefault();
    if (checkIfEmpty(authInputs)) {
      setIsEmpty(true);
    } else {
      switch (formType) {
        case "SIGNUP":
          dispatch(setSignup(authInputs))
            .unwrap()
            .then(() => {
              router.push(`/${auth.id}`);
            })
            .catch((e) => setErrors(e.errorMessage));
          break;
        default:
          break;
      }
    }
  };

  const checkIfEmpty = (inputs) => {
    return !Object.keys(inputs).every((key) => inputs[key]);
  };

  const handleFocus = (event) => {
    setIsEmpty(false);
    setErrors({});
  };
  useEffect(() => {
    if (formType === "LOGIN") {
      setAuthInputs({
        email: "",
        password: "",
      });
    }
    if (formType === "SIGNUP") {
      setAuthInputs({
        email: "",
        password: "",
        repassword: "",
      });
    }
    return () => {
      setIsEmpty(false);
      setErrors({});
    };
  }, [formType]);
  return (
    authInputs && (
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          alignItems: "center",
        }}
        onSubmit={handleSubmit(formType)}
        onFocus={handleFocus}
      >
        <FormControl sx={{ mt: "1rem", width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
          <Input
            id="standard-adornment-email"
            type="email"
            value={authInputs.email || ""}
            onChange={handleChange("email")}
            autoComplete="off"
          />
          <FormHelperText error={errors.email}>{errors.email}</FormHelperText>
        </FormControl>
        <FormControl sx={{ mt: "1rem", width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword.password ? "text" : "password"}
            value={authInputs.password || ""}
            onChange={handleChange("password")}
            autoComplete="off"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword("password")}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error={errors.password}>
            {errors.password}
          </FormHelperText>
        </FormControl>
        {formType === "SIGNUP" && (
          <FormControl sx={{ mt: "1rem", width: "25ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-repassword">
              Re-Password
            </InputLabel>
            <Input
              id="standard-adornment-repassword"
              type={showPassword.repassword ? "text" : "password"}
              value={authInputs.repassword || ""}
              onChange={handleChange("repassword")}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword("repassword")}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword.repassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={errors.repassword}>
              {errors.repassword}
            </FormHelperText>
          </FormControl>
        )}
        <Collapse in={isEmpty} timeout={{ appear: 300, enter: 200, exit: 100 }}>
          <Alert
            variant="outlined"
            severity="error"
            sx={{ mt: "1rem", alignItems: "center" }}
          >
            Error: Any field can not be empty!
          </Alert>
        </Collapse>
        <Button
          variant="contained"
          sx={{ mt: "2rem", width: "25ch" }}
          type="submit"
        >
          {formType}
        </Button>
      </Box>
    )
  );
}
