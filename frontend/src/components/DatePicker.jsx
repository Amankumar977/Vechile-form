import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Label, Button } from "./formComponents";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setStartDate, setEndDate } from "../store/reducers/orderData";
import { getAllOrdersOfVehicle } from "../store/reducers/vehicleData";
const DatePicker = ({ page, setPage }) => {
  const [minEndDate, setMinEndDate] = useState(new Date());
  const { vehicleData, allOrders } = useSelector((state) => state.vehicleData);
  const orderData = useSelector((state) => state.orderData);
  const { vehicleModel } = orderData;
  const selectedVehicle = vehicleData.find(
    (vehicle) => vehicle.vehicleName === vehicleModel
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const startDate = new Date();
  const watchStartDate = watch("startDate");
  useEffect(() => {
    dispatch(getAllOrdersOfVehicle(vehicleModel));
  }, [vehicleModel, dispatch]);
  useEffect(() => {
    const minimumEndDate = new Date(
      watchStartDate ? watchStartDate : startDate
    );
    minimumEndDate.setDate(minimumEndDate.getDate() + 1);
    if (minimumEndDate.getTime() !== minEndDate.getTime()) {
      setMinEndDate(minimumEndDate);
    }
  }, [startDate, minEndDate, watchStartDate]);
  const onSubmit = async (data) => {
    dispatch(setEndDate(data.endDate));
    dispatch(setStartDate(data.startDate));
    if (isDateAvailable(allOrders, data.startDate, data.endDate)) {
      try {
        let finalOrder = {
          ...orderData,
          vehicleId: selectedVehicle._id,
          startDate: data.startDate,
          endDate: data.endDate,
        };
        const orderResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/order/createOrder`,
          { finalOrder }
        );
        localStorage.setItem("orderData", JSON.stringify({}));
        toast.success(`${orderResponse.data.message} ${vehicleModel}`);
        setPage(0); // Move to the next page after selecting the dates
        reset(); // Reset the form fields
        setTimeout(() => {
          window.location.reload(true);
        }, 3000);
      } catch (error) {
        console.error("Error in updating the vehicle Time", error);
        toast.error("Error in creating the order. Please try again later.");
      }
    } else {
      // Display the toast message with the available dates
      toast.error(`We are sorry, selected dates are not available.`);
    }
  };

  const handlePrevClick = () => {
    setPage(page - 1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Start date input field */}
        <Label htmlFor="startDate" label={"Start Date:"} />
        <Input
          type="date"
          id="startDate"
          className={"mb-4"}
          min={startDate.toISOString().split("T")[0]}
          {...register("startDate", {
            required: "Start date is required",
            min: {
              value: startDate.toISOString().split("T")[0], // Set min value to the current date
              message:
                "Start date should be greater than or equal to the provided Current date",
            },
          })}
        />
        {errors.startDate && (
          <span className="text-red-500">{errors.startDate.message}</span>
        )}

        {/* End date input field */}
        <Label htmlFor="endDate" label={"End Date:"} />
        <Input
          type="date"
          id="endDate"
          min={minEndDate.toISOString().split("T")[0]}
          {...register("endDate", {
            required: "End date is required",
            validate: (value) => {
              const endDate = new Date(value);
              if (!startDate) return true; // Return true if "startDate" is not set yet
              if (endDate <= startDate) {
                return "End date should be greater than the start date";
              }
              return true;
            },
          })}
        />
        {errors.endDate && (
          <span className="text-red-500">{errors.endDate.message}</span>
        )}

        <div className="gap-10 flex pt-8">
          {/* Prev button */}
          <Button type={"button"} text={"Prev"} onClick={handlePrevClick} />
          {/* Next or Submit button, depending on the page */}
          <Button type={"submit"} text={"Submit"} />
        </div>
      </form>
    </div>
  );
};
// Function to check if dates are available for any vehicle
const isDateAvailable = (allOrders, startDate, endDate) => {
  if (allOrders.length === 0) {
    return true; // If there are no existing orders, all dates are available
  }

  const startDateTime = new Date(startDate).getTime();
  const endDateTime = new Date(endDate).getTime();

  for (const order of allOrders) {
    const orderStart = new Date(order.startDate).getTime();
    const orderEnd = new Date(order.endDate).getTime();

    // Check if the selected dates overlap with any existing order
    if (
      (startDateTime >= orderStart && startDateTime < orderEnd) ||
      (endDateTime > orderStart && endDateTime <= orderEnd) ||
      (startDateTime <= orderStart && endDateTime >= orderEnd)
    ) {
      return false; // Dates are not available due to overlap with an existing order
    }
  }

  return true; // No overlapping dates found, so the selected dates are available
};

export default DatePicker;
