import express, {
  type Application,
} from "express";

import { userRoute } from "./modules/users/user.route";
import { profileRoute } from "./modules/profile/profile.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.use("/api/profiles", profileRoute);

export default app;
