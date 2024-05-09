import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/FilterBar.css";

function FilterBar({ onFilterChange }) {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
  
    // Funcție pentru a gestiona schimbarea lunii
    const handleMonthChange = (event) => {
      const month = event.target.value;
      setSelectedMonth(month);
      onFilterChange(month, selectedYear);
    };
  
    // Funcție pentru a gestiona schimbarea anului
    const handleYearChange = (event) => {
      const year = event.target.value;
      setSelectedYear(year);
      onFilterChange(selectedMonth, year);
    };
  
    return (
      <div className="filter-bar">
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {/* Adăugați opțiunile pentru ani aici, de exemplu: */}
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          {/* Adăugați mai multe opțiuni sau generați dinamic în funcție de nevoi */}
        </select>
      </div>
    );
  }
  
  FilterBar.propTypes = {
    onFilterChange: PropTypes.func.isRequired
  };
  
  export default FilterBar;
