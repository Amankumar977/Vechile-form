import React, { useEffect } from "react";
import Form from "./pages/Form"; // Importing the Form component
import { ToastContainer } from "react-toastify"; // Importing the ToastContainer component from react-toastify library
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for react-toastify
import axios from "axios"; // Importing axios for making HTTP requests
import { useDispatch } from "react-redux"; // Importing useDispatch hook from react-redux for dispatching actions
import { setIsLoading, setVehicleData } from "./store/reducers/vehicleData"; // Importing action creators for setting loading state and vehicle data

// Main App component
function App() {
  const dispatch = useDispatch(); // Initializing useDispatch hook

  // Fetch vehicle data on component mount
  useEffect(() => {
    // Async function to fetch vehicle data
    let getAllVehicleData = async () => {
      try {
        dispatch(setIsLoading(true)); // Set loading state to true
        // Make HTTP GET request to fetch all vehicles
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/order/getAllVechiles`
        );
        // Dispatch action to set vehicle data in Redux store
        dispatch(setVehicleData(response.data.vehicles));
      } catch (error) {
        console.log(error.message); // Log any errors that occur during fetching
      } finally {
        dispatch(setIsLoading(false)); // Set loading state to false after fetching
      }
    };
    getAllVehicleData(); // Call the function to fetch vehicle data
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  // JSX rendering
  return (
    <div className="font-mono">
      <Form /> {/* Render the Form component */}
      {/* Render the ToastContainer for displaying toast notifications */}
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

export default App; // Export the App component
