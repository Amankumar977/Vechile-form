import React, { useEffect } from "react";
import { Button, Label, Radio } from "../components/formComponents";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setNumberOfWheels } from "../store/reducers/orderData";

const NumberOfWheels = ({ page, setPage }) => {
  // Destructure useForm hook to manage form state and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Select the numberOfWheels value from the Redux store
  const orderData = useSelector((state) => state.orderData);
  const { numberOfWheels } = orderData;
  // Initialize useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch();
  // Function to handle click on the 'Prev' button
  const handlePrevClick = () => {
    setPage(page - 1); // Decrement page number
  };
  // Function to handle form submission
  const onSubmit = (data) => {
    dispatch(setNumberOfWheels(data.numberOfWheels)); // Dispatch action to set numberOfWheels in Redux store
    setPage(page + 1); // Increment page number
  };

  return (
    <div>
      <div className="space-y-6">
        {/* Form element */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Radio buttons for selecting the number of wheels */}
          <div className="flex gap-4 items-center text-2xl mb-4">
            {/* Radio button for 2 Wheeler */}
            <Radio
              id={"twoWheels"}
              name={"numberOfWheels"}
              value={"2"}
              defaultChecked={numberOfWheels === "2"} // Check if numberOfWheels is 2
              {...register("numberOfWheels", {
                required: "Please select the wheels type", // Validation for required selection
              })}
            />
            <Label label={"2 Wheeler"} htmlFor={"twoWheels"} />
          </div>
          <div className="flex gap-4 items-center text-2xl ">
            {/* Radio button for 4 Wheeler */}
            <Radio
              id={"fourWheels"}
              name={"numberOfWheels"}
              value={"4"}
              defaultChecked={numberOfWheels === "4"} // Check if numberOfWheels is 4
              {...register("numberOfWheels", {
                required: "Please select the wheels type", // Validation for required selection
              })}
            />
            <Label label={"4 Wheeler"} htmlFor={"fourWheels"} />
          </div>
          {/* Display error message if wheels type is required */}
          {errors.numberOfWheels && (
            <span className="text-red-500">
              {errors.numberOfWheels.message}
            </span>
          )}
          {/* Navigation buttons */}
          <div className="gap-10 flex pt-8">
            {/* Prev button */}
            <Button type={"button"} text={"Prev"} onClick={handlePrevClick} />
            {/* Next or Submit button, depending on the page */}
            <Button type={"submit"} text={"Next"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NumberOfWheels;
