import { useContext } from "react";
import { ThemeContext } from "../services/theme/ThemeContext";
import { Button } from "react-bootstrap";

const ToggleTheme = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    return (
        <div>
        {/* <Button
        onClick={toggleTheme}
        className="mt-4"
        variant={theme === "dark"? "light": "dark"}
        >
            Cambiar a tema {theme === "light"? "oscuro": "claro"}
        </Button> */}
        <label id="switch" className="switch">
            <input className="mt-4" variant={theme === "dark"? "light": "dark"} type="checkbox" onChange={toggleTheme} id="slider"></input>
            <span className="slider round"></span>
        </label>
        </div>
    )

}

export default ToggleTheme;