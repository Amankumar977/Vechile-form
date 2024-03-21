import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Label, Button } from "./formComponents";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setStartDate, setEndDate } from "../store/reducers/orderData";
const DatePicker = ({ page, setPage }) => {
  const [minEndDate, setMinEndDate] = useState(new Date());
  const { vehicleData } = useSelector((state) => state.vehicleData);
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
    try {
      let finalOrder = {
        ...orderData,
        vehicleId: selectedVehicle._id,
        newOrderStartDate: new Date(data.startDate).toISOString(),
        newOrderEndDate: new Date(data.endDate).toISOString(),
      };
      const orderResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/order/createOrder`,
        {
          finalOrder,
          vehicleId: selectedVehicle._id,
          newOrderStartDate: new Date(data.startDate).toISOString(),
          newOrderEndDate: new Date(data.endDate).toISOString(),
        }
      );
      // Clear orderData from localStorage
      localStorage.setItem("orderData", JSON.stringify({}));
      toast.success(`${orderResponse.data.message} ${vehicleModel}`);
      setPage(0); // Move to the next page after selecting the dates
      reset(); // Reset the form fields
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    } catch (error) {
      console.error(
        "Error in creating the order",
        error.response?.data?.message
      );
      toast.error(
        error.response?.data?.message ||
          "An error occurred while creating the order"
      );
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

export default DatePicker;
