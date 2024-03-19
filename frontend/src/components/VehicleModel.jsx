import React from "react";
import { useForm } from "react-hook-form";
import { Label, Button } from "../components/formComponents";
import { toast } from "react-toastify";
const VehicleModel = ({ page, setPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let fourWheelerModel = [
    "Volkswagen Golf",
    "Ford Fiesta",
    "Toyota Yaris",
    "Hyundai i20",
    "Mazda Mazda3",
    "Chevrolet Spark",
    "Fiat 500",
    "Mini Cooper",
  ];
  let twoWheelerModel = [
    "Harley-Davidson Softail",
    "Indian Scout",
    "Honda Rebel",
    "Yamaha V Star",
    "Suzuki Boulevard",
    "Triumph Bonneville Bobber",
    "Moto Guzzi California",
    "Ducati XDiavel",
  ];
  const handlePrevClick = () => {
    setPage(page - 1); // Decrement page number
  };
  // Function to handle form submission
  const onSubmit = (data) => {
    if (data.vehicleModel === "selectModel") {
      return toast.error("Please select vechile Model");
    }
    console.log(data); // Logging form data
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
          className="w-full text-xl bg-gray-300 rounded-md mt-3">
          <option value="selectModel">Please select the vechile Model</option>
          {twoWheelerModel &&
            twoWheelerModel.map((vechileModel) => (
              <option value={vechileModel} key={vechileModel}>
                {vechileModel}
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
