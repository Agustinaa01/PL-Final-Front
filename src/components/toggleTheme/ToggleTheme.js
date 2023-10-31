import { useContext } from "react";
import { ThemeContext } from "../services/theme/ThemeContext";
import { Button } from "react-bootstrap";

const ToggleTheme = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    return (
        <Button
        onClick={toggleTheme}
        className="mt-4"
        variant={theme === "dark"? "light": "dark"}
        >
            Cambiar a tema {theme === "light"? "oscuro": "light"}
        </Button>
    )

}

export default ToggleTheme;