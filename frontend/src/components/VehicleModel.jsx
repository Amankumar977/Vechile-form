import React from "react";
import { useForm } from "react-hook-form";
import { Label, Button } from "../components/formComponents";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setVehicleModel } from "../store/reducers/orderData";
const VehicleModel = ({ page, setPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { vehicleData } = useSelector((state) => state.vehicleData);
  const { vehicleType, vehicleModel } = useSelector((state) => state.orderData);
  const selectedVehicleType = vehicleData.filter(
    (vehicle) => vehicle.vehicleType === vehicleType
  );
  const dispatch = useDispatch();
  const handlePrevClick = () => {
    setPage(page - 1); // Decrement page number
  };
  // Function to handle form submission
  const onSubmit = (data) => {
    if (data.vehicleModel === "selectModel") {
      return toast.error("Please select vechile Model");
    }
    dispatch(setVehicleModel(data.vehicleModel));
    setPage(page + 1); // Increment page number
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label
          htmlFor={"vehicleModel"}
          label={"Vechile Model"}
          className={"text-2xl"}
        />
        <select
          name="vehicleModel"
          id="vehicleModel"
          {...register("vehicleModel", {
            required: "Please select the vechile type",
          })}
          className="w-full text-xl bg-gray-300 rounded-md mt-3 px-2 py-1">
          <option value={vehicleModel ? vehicleModel : "selectModel"}>
            {vehicleModel ? vehicleModel : "Please select the vechile Model"}
          </option>
          {selectedVehicleType &&
            selectedVehicleType.map((vehicle) => (
              <option value={vehicle.vehicleName} key={vehicle.vehicleName}>
                {vehicle.vehicleName}
              </option>
            ))}
        </select>
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
