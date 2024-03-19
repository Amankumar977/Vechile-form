import React, { useEffect } from "react";
import Form from "./pages/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLoading, setVehicleData } from "./store/reducers/vehicleData";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let getAllVehicleData = async () => {
      try {
        dispatch(setIsLoading(true));
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/order/getAllVechiles`
        );
        dispatch(setVehicleData(response.data.vehicles));
      } catch (error) {
        console.log(error.messsage);
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    getAllVehicleData();
  }, []);
  return (
    <div className="font-mono">
      <Form />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
