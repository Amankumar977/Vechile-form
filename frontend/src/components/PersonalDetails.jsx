import React from "react";
import { useForm } from "react-hook-form";
import { Input, Label, Button } from "./formComponents";
import { useSelector, useDispatch } from "react-redux";
import { setFirstName, setLastName } from "../store/reducers/orderData";
const PersonalDetails = ({ page, setPage }) => {
  // Initialize useForm hook to manage form state and validation
  const {
    register, // Function to register inputs with React Hook Form
    handleSubmit, // Function to handle form submission
    formState: { errors }, // Object to track form errors
  } = useForm();
  const dispatch = useDispatch();
  // Initialize useSelector hook for orderDetails
  const orderData = useSelector((state) => state.orderData);

  // Extract firstName and lastName from orderData
  const { firstName, lastName } = orderData;

  // Function to handle form submission
  const onSubmit = (data) => {
    dispatch(setFirstName(data.firstName));
    dispatch(setLastName(data.lastName));
    setPage(page + 1); // Proceed to the next page
  };

  return (
    <div className="space-y-6">
      {/* Form element */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Username input */}
          <Label
            className={"block text-sm font-medium text-gray-700 pb-2"}
            label={"firstName"}
            htmlFor={"firstName"}
          />
          <Input
            type={"text"}
            name={"firstName"}
            id={"firstName"}
            autoComplete={"firstName"}
            defaultValue={firstName} // Set defaultValue to display firstName
            className={"!text-xl"}
            {...register("firstName", {
              required: "first Name is required",
              maxLength: {
                value: 20,
                message: "first Name cannot be more than 20 characters.",
              },
            })} // Register username input with validation rules
          />
          {/* Display error message if username is required */}
          {errors.firstName && (
            <span className="text-red-500">{errors.username.message}</span>
          )}

          {/* Last Name input */}
          <Label
            className={"block text-sm font-medium text-gray-700 pb-2 mt-3"}
            label={"Last Name"}
            htmlFor={"lastName"}
          />
          <Input
            type={"text"}
            name={"lastName"}
            id={"lastName"}
            autoComplete={"lastName"}
            defaultValue={lastName}
            className={"!text-xl"}
            {...register("lastName", { required: "Last name is required" })} // Register last name input with validation rules
          />
          {/* Display error message if last name is required */}
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}

          {/* Navigation buttons */}
          <div className="gap-10 flex pt-8">
            {/* Prev button */}
            <Button
              type={"button"}
              text={"Prev"}
              className={"bg-gray-300 hover:bg-gray-300"}
              disable={page === 0}
            />
            {/* Next or Submit button, depending on the page */}
            <Button type={"submit"} text={"Next"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
