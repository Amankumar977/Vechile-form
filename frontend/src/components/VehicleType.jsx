import React from "react";
import { useForm } from "react-hook-form";
import { Button, Label } from "../components/formComponents";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setVehicleType } from "../store/reducers/orderData";

const VehicleType = ({ page, setPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Retrieve data from Redux store
  const { vehicleData } = useSelector((state) => state.vehicleData);
  const { numberOfWheels, vehicleType } = useSelector(
    (state) => state.orderData
  );
  const dispatch = useDispatch();
  // Filter vehicleData based on the number of wheels
  const filteredVehicleData = vehicleData.filter(
    (vehicle) =>
      (numberOfWheels === "2" && vehicle.wheelType === "TWO_WHEELER") ||
      (numberOfWheels === "4" && vehicle.wheelType === "FOUR_WHEELER")
  );

  // Extract unique vehicle types
  const uniqueVehicleTypes = [
    ...new Set(filteredVehicleData.map((vehicle) => vehicle.vehicleType)),
  ];
  const handlePrevClick = () => {
    setPage(page - 1); // Decrement page number
  };

  // Function to handle form submission
  const onSubmit = (data) => {
    if (data.vehicleType === "selectVehicle") {
      return toast.error("Please select vehicle type");
    }
    dispatch(setVehicleType(data.vehicleType));
    setPage(page + 1); // Increment page number
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label
          htmlFor={"vehicleType"}
          label={"Vehicle Type"}
          className={"text-2xl"}
        />
        <select
          name="vehicleType"
          id="vehicleType"
          {...register("vehicleType", {
            required: "Please select the vehicle type",
          })}
          className="w-full text-xl bg-gray-300 rounded-md mt-3 px-2 py-1">
          <option value={vehicleType ? vehicleType : "selectVehicle"}>
            {vehicleType ? vehicleType : "Please select the vehicle Type"}
          </option>
          {uniqueVehicleTypes.map((vehicleType) => (
            <option value={vehicleType} key={vehicleType}>
              {vehicleType}
            </option>
          ))}
        </select>
        {errors.vehicleType && (
          <span className="text-red-500">{errors.vehicleType.message}</span>
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

export default VehicleType;
