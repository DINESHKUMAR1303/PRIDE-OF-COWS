import React from "react";
import GheeDetails from "./GheeDetails";
import Products from "../Milk/Products/Products"; // Reusing the carousel

const Ghee = () => {
    return (
        <>
            <GheeDetails />
            <div style={{ marginTop: "50px" }}>
                <Products />
            </div>
        </>
    );
};

export default Ghee;
