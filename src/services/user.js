import { httpAxios } from "../helper/httpHelper";
export async function signup(formData) {
  console.log("signup");
  try {
    const result = await httpAxios
      .post("/api/signup", formData)
      .then((response) => response);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function login(formData) {
  console.log("login");
  try {
    const result = await httpAxios
      .post("/api/login", formData)
      .then((response) => response);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function currentUser(data) {
  console.log("current");
  const result = await httpAxios
    .post("/api/currentUser", { data })
    .then((response) => response.data);
  return result;
}

export async function sendOtp(data) {
  console.log("otp");
  const result = await httpAxios
    .post("/api/send-email-otp", data)
    .then((response) => response.data);
  return result;
}

export async function verifyOtp(data) {
  console.log("verify");
  const result = await httpAxios
    .post("/api/verify-email-otp", data)
    .then((response) => response.data);
  return result;
}

export async function logout() {
  const result = await httpAxios
    .post("/api/logout")
    .then((response) => response.data);
  return result;
}
