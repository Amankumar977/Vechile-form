import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Label, Button } from "./formComponents";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setStartDate, setEndDate } from "../store/reducers/orderData";
const DatePicker = ({ page, setPage }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [minEndDate, setMinEndDate] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);
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
  const date = new Date();
  const startDate = new Date();
  const watchStartDate = watch("startDate");
  useEffect(() => {
    const getAllOrdersOfVehicle = async () => {
      try {
        let response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/order/getAllOrders/${vehicleModel}`
        );
        setAllOrders(response.data.orders);
      } catch (error) {
        console.log("Error while fetching the orders", error);
      }
    };
    getAllOrdersOfVehicle();
  }, []);
  useEffect(() => {
    const minimumEndDate = new Date(
      watchStartDate ? watchStartDate : startDate
    );
    minimumEndDate.setDate(minimumEndDate.getDate() + 1);
    if (minimumEndDate.getTime() !== minEndDate.getTime()) {
      setMinEndDate(minimumEndDate);
    }
  }, [startDate, minEndDate, watchStartDate]);
  // console.log(allOrders);
  const onSubmit = async (data) => {
    dispatch(setEndDate(data.endDate));
    dispatch(setStartDate(data.startDate));

    if (
      isDateAvailable(
        allOrders,
        data.startDate,
        data.endDate,
        setAvailableDates
      )
    ) {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/order/updateVehicleDate`,
          {
            id: selectedVehicle._id,
            startDate: data.startDate,
            endDate: data.endDate,
          }
        );
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
        toast.success(`Your Booking is successful for ${vehicleModel}`);
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
      let start = new Date(data.startDate);
      let end = new Date(data.endDate);

      // Initialize an array to store the formatted dates
      const formattedDates = [];

      // Iterate over the properties of availableDates
      for (let key in availableDates) {
        if (Object.hasOwnProperty.call(availableDates, key)) {
          const dateStart = new Date(availableDates[key].dateStart);
          const dateEnd = new Date(availableDates[key].dateEnd);
          const endDateofDateEnd = new Date(
            availableDates[key].endDateofDateEnd
          );

          // Check if the current available date range overlaps with the selected date range
          if (dateEnd.getTime() !== end.getTime()) {
            const remainingEndDate = new Date(
              end.getTime() - dateEnd.getTime()
            );

            // Push the formatted date strings into the array
            formattedDates.push(
              `${dateStart.toLocaleDateString()} to ${dateEnd.toLocaleDateString()}`
            );
            formattedDates.push(
              `${endDateofDateEnd.toLocaleDateString()} to ${end.toLocaleDateString()}`
            );
          } else {
            // Push the formatted date string for the non-overlapping available date range
            formattedDates.push(
              `${dateStart.toLocaleDateString()} to ${dateEnd.toLocaleDateString()}`
            );
          }
        }
      }

      // Join the formatted dates into a single string
      const formattedDatesString = formattedDates.join(", ");

      // Display the toast message with the available dates
      toast.error(
        `We are sorry, selected dates are not available. The available dates are: ${formattedDatesString}`
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
// Function to check if dates are available for any vehicle
let isDateAvailable = (allOrders, startDate, endDate, setAvailableDates) => {
  if (allOrders.length <= 1) {
    return true;
  }
  let LastOrderEndDate = new Date(allOrders[0].endDate).getTime();
  let LastOrderStartDate = new Date(allOrders[0].startDate).getTime();

  let startDateTime = new Date(startDate).getTime();
  let endDateTime = new Date(endDate).getTime();
  if (startDateTime >= LastOrderStartDate && endDateTime >= LastOrderEndDate) {
    return true;
  }
  let availableDates = [];
  console.log(allOrders);
  for (let i = 0; i < allOrders.length - 1; i++) {
    let currentEndDate = new Date(allOrders[i].endDate).getTime();
    let nextStartDate = new Date(allOrders[i + 1].startDate).getTime();

    if (nextStartDate > currentEndDate) {
      availableDates.push({
        dateStart: allOrders[i].endDate,
        dateEnd: allOrders[i + 1].startDate,
        endDateofDateEnd: allOrders[i + 1].endDate,
      });
    }
  }
  for (let dates of availableDates) {
    let currentStartDateTime = new Date(dates.dateStart).getTime();
    let currentEndDateTime = new Date(dates.dateEnd).getTime();

    if (
      (startDateTime >= currentStartDateTime &&
        endDateTime <= currentEndDateTime) ||
      (startDateTime >= currentStartDateTime &&
        endDateTime >= currentEndDateTime)
    ) {
      return true;
    }
  }
  setAvailableDates(availableDates);
  return false;
};

export default DatePicker;
