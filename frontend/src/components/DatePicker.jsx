import React from "react";
import { useForm } from "react-hook-form";
import { Input, Label, Button } from "./formComponents";
import { toast } from "react-toastify";
const DatePicker = ({ page, setPage }) => {
  let startDate = new Date();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // You can handle the selected dates here
    setPage(0); // Move to the next page after selecting the dates
    toast.success("Your Booking is succefull");
  };

  const startValue = watch("startDate"); // Get the current value of the "startDate" field

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Start date input field */}
        <Label htmlFor="startDate" label={"Start Date:"} />
        <Input
          type="date"
          id="startDate"
          className={"mb-4"}
          {...register("startDate", {
            required: "Start date is required",
            min: {
              value: startDate.toISOString().split("T")[0], // Set min value to the current date
              message:
                "Start date should be greater than or equal to the provided start date",
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
          {...register("endDate", {
            required: "End date is required",
            validate: (value) => {
              const endDate = new Date(value);
              if (!startValue) return true; // Return true if "startDate" is not set yet
              const startDate = new Date(startValue);
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
          <Button
            type={"button"}
            text={"Prev"}
            className={"bg-gray-300 hover:bg-gray-300"}
          />
          {/* Next or Submit button, depending on the page */}
          <Button
            type={"submit"}
            text={"Next"} // Change button text to "Submit" on the last page
          />
        </div>
      </form>
    </div>
  );
};

export default DatePicker;
