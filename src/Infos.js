import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {useStyles} from "./css";

export default function Infos() {
    const classes = useStyles();
    return <>
        <br/>
        <Link to={'/'} className={classes.link}><Button variant={"contained"} color={"primary"}>zurück</Button></Link>
        <h1>Hier werden alle Infos zu den Berufen in den jeweiligen Regionen angezeigt.</h1>
    </>
}