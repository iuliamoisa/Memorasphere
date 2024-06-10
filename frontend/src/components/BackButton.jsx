import { useNavigate } from "react-router-dom";
import "../styles/BackButton.css";


function BackButton() {
  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <button onClick={goBack} className="back-button">&lt;</button>
  );
}

export default BackButton;
