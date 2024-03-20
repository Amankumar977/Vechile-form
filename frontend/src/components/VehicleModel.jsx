import React from "react";
import { useForm } from "react-hook-form";
import { Label, Button } from "../components/formComponents";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setVehicleModel } from "../store/reducers/orderData";

const VehicleModel = ({ page, setPage }) => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redux state access
  const { vehicleData } = useSelector((state) => state.vehicleData);
  const { vehicleType, vehicleModel } = useSelector((state) => state.orderData);

  // Filter vehicle data based on selected vehicle type
  const selectedVehicleType = vehicleData.filter(
    (vehicle) => vehicle.vehicleType === vehicleType
  );

  // Redux dispatch function
  const dispatch = useDispatch();

  // Function to handle previous button click
  const handlePrevClick = () => {
    setPage(page - 1); // Decrement page number
  };

  // Function to handle form submission
  const onSubmit = (data) => {
    // Check if vehicle model is selected
    if (data.vehicleModel === "selectModel") {
      return toast.error("Please select vehicle Model");
    }

    // Dispatch action to set selected vehicle model
    dispatch(setVehicleModel(data.vehicleModel));

    setPage(page + 1); // Increment page number
  };

  // JSX rendering
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Vehicle model selection */}
        <Label
          htmlFor={"vehicleModel"}
          label={"Vehicle Model"}
          className={"text-2xl"}
        />
        <select
          name="vehicleModel"
          id="vehicleModel"
          {...register("vehicleModel", {
            required: "Please select the vehicle type",
          })}
          className="w-full text-xl bg-gray-300 rounded-md mt-3 px-2 py-1">
          {/* Default option */}
          <option value={vehicleModel ? vehicleModel : "selectModel"}>
            {vehicleModel ? vehicleModel : "Please select the vehicle Model"}
          </option>
          {/* Iterate through selected vehicle type options */}
          {selectedVehicleType &&
            selectedVehicleType.map((vehicle) => (
              <option value={vehicle.vehicleName} key={vehicle.vehicleName}>
                {vehicle.vehicleName}
              </option>
            ))}
        </select>
        {/* Display error message if vehicle model is not selected */}
        {errors.vechileModel && (
          <span className="text-red-500">{errors.vechileModel.message}</span>
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
  );
};

export default VehicleModel;
