import React from "react";
import { useForm } from "react-hook-form";
import { Input, Label, Button } from "./formComponents";
import { useSelector, useDispatch } from "react-redux";
import { setFirstName, setLastName } from "../store/reducers/orderData";

const PersonalDetails = ({ page, setPage }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orderData);
  const { firstName, lastName } = orderData;

  const onSubmit = (data) => {
    dispatch(setFirstName(data.firstName));
    dispatch(setLastName(data.lastName));
    setPage(page + 1);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label
            className={"block text-sm font-medium text-gray-700 pb-2"}
            label={"First Name"}
            htmlFor={"firstName"}
          />
          <Input
            type={"text"}
            name={"firstName"}
            id={"firstName"}
            autoComplete={"firstName"}
            defaultValue={firstName}
            className={"!text-xl"}
            {...register("firstName", {
              required: "First name is required",
              maxLength: {
                value: 20,
                message: "First name cannot be more than 20 characters.",
              },
            })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}

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
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}

          <div className="gap-10 flex pt-8">
            <Button
              type={"button"}
              text={"Prev"}
              className={"bg-gray-300 hover:bg-gray-300"}
              disable={page === 0}
            />
            <Button type={"submit"} text={"Next"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
