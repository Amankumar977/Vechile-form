import React from "react";
import { useForm } from "react-hook-form";
import { Button, Label } from "../components/formComponents";
import { toast } from "react-toastify";
const VehicleType = ({ page, setPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let fourWheelerData = [
    "Hatchback",
    "Sedan",
    "SUV",
    "Coupe",
    "Hybrid",
    "Luxury Car",
    "Sports Car",
    "Van",
    "Electric Vehicle",
  ];
  let twoWheelerData = [
    "Cruiser",
    "Sportbike",
    "Adventure Bike",
    "Dual-Sport Bike",
    "Electric Motorcycle",
    "Vintage Motorcycle",
    "Supermoto",
  ];
  const handlePrevClick = () => {
    setPage(page - 1); // Decrement page number
  };
  // Function to handle form submission
  const onSubmit = (data) => {
    if (data.vechileType === "selectVechile") {
      return toast.error("Please select vechile type");
    }
    console.log(data); // Logging form data
    setPage(page + 1); // Increment page number
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label
          htmlFor={"vechileType"}
          label={"Vechile Type"}
          className={"text-2xl"}
        />
        <select
          name="vechileType"
          id="vechileType"
          {...register("vechileType", {
            required: "Please select the vechile type",
          })}
          className="w-full text-xl bg-gray-300 rounded-md mt-3">
          <option value="selectVechile">Please select the vechile Type</option>
          {fourWheelerData &&
            fourWheelerData.map((vechileType) => (
              <option value={vechileType} key={vechileType}>
                {vechileType}
              </option>
            ))}
        </select>
        {errors.vechileType && (
          <span className="text-red-500">{errors.vechileType.message}</span>
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
