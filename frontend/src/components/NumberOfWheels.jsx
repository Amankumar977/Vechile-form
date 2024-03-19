import React from "react";
import { Input, Button, Label, Radio } from "../components/formComponents"; // Importing necessary components
import { useForm } from "react-hook-form"; // Importing useForm hook

const NumberOfWheels = ({ page, setPage }) => {
  // Destructuring useForm hook to manage form state and validation
  const {
    register, // Function to register inputs with React Hook Form
    handleSubmit, // Function to handle form submission
    formState: { errors }, // Object to track form errors
  } = useForm();

  // Function to handle click on the 'Prev' button
  const handlePrevClick = () => {
    setPage(page - 1); // Decrement page number
  };
  // Function to handle form submission
  const onSubmit = (data) => {
    console.log(data); // Logging form data
    setPage(page + 1); // Increment page number
  };

  return (
    <div>
      <div className="space-y-6">
        {/* Form element */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/** Wheels options */}
          <div className="flex gap-4 items-center text-2xl mb-4">
            {/* Radio button for 2 Wheeler */}
            <Radio
              id={"twoWheels"}
              name={"numberOfWheels"}
              value={"2"} // Value attribute for 2 Wheeler option
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
              value={"4"} // Value attribute for 4 Wheeler option
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
