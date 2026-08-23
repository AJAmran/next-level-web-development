import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AppointmentServices } from "./appointment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const bookAppointment = catchAsync(async (req: Request, res: Response) => {
  const result = await AppointmentServices.bookAppointment();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "appointment book successfully",
    data: result,
  });
});

const bookAppointmentCallback = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.query, "req.query");
    const { executedPaymentResult, redirectUrl } =
      await AppointmentServices.bookAppointmentCallback(req.query);

    console.log({ executedPaymentResult }, "callback controller");

    res.redirect(redirectUrl);
  },
);

export const AppointmentController = {
  bookAppointment,
  bookAppointmentCallback,
};
