import { client } from "./network";
import { FARMERS } from "./routes";

export async function farmerLogin(phone) {
  const res = await client.post(FARMERS.login, {
    phone,
  });
  return res;
}
export async function farmerSignup(phone, name, location) {
  const res = await client.post(FARMERS.signup, {
    phone,
    name,
    location,
  });
  return res;
}
