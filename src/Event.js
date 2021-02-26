import {Link} from "react-router-dom";
import {Button, Typography} from "@material-ui/core";
import {useStyles} from "./css";
import React from "react";
import {timeOptions} from "./data/initialValues";

export default function Event({events, match}) {
    const classes = useStyles();
    const event = events.find(event => event.id === parseInt(match.params.id));
    if (!event) {
        return <>
            <br/>
            <Link to={'/'} className={classes.link}>
                <Button variant={"contained"} color={"primary"}>zurück</Button>
            </Link>
            <h1>Wir konnten diesen Anlass leider nicht finden</h1>
        </>
    }

    return <>
        <br/>
        <Link to={'/'} className={classes.link}>
            <Button variant={"contained"} color={"primary"}>zurück zur Auswahl</Button>
        </Link>
        <Typography variant="h5" component="h2">
            {event.title}
        </Typography>
        <Typography variant="body2" component="p" style={{whiteSpace: 'pre-line'}}>
            Beruf: {event.beruf}<br/>
            Ort: {event.adress}<br/>
            Datum: {event.dateTimeFrom.toLocaleDateString('de-DE')
        + " bis " +
        event.dateTimeTo.toLocaleDateString('de-DE')
        }<br/>
            Zeit: {event.dateTimeFrom.toLocaleTimeString('de-DE', timeOptions)
        + " bis " +
        event.dateTimeTo.toLocaleTimeString('de-DE', timeOptions)
        }
        </Typography>
    </>

}