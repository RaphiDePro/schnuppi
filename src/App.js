import React, {useState} from "react";
import Logo from './images/logo_schnupperlehr.png';
import {Container, createMuiTheme, CssBaseline, useMediaQuery} from "@material-ui/core";
import {Route, Switch} from 'react-router-dom';
import {ThemeProvider} from "@material-ui/core/styles";
import {useStyles} from "./css";
import Events from "./Events";
import Infos from "./Infos";
import Event from "./Event";

// value         |0px     600px    960px    1280px   1920px
// key           |xs      sm       md       lg       xl
// screen width  |--------|--------|--------|--------|-------->
// range         |   xs   |   sm   |   md   |   lg   |   xl

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    // type: prefersDarkMode ? 'dark' : 'light',
                    type: 'light'
                },
            }),
        [],
    );

    const classes = useStyles();
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Applikationsentwicklung Schnupperlehre 2021",
            beruf: "Informatik",
            beschreibung: "Lerne den Beruf Informatiker/in Applikationsentwicklung kennen.\n" +
                "Unter Begleitung von Lernenden und einem Berufsbildner lernst du spannende Themen kennen: Programmieren mit Javascript, Mindstorms,  Webseiten produzieren mit HTML und CSS.\n" +
                "Als Höhepunkt entwickelst du ein kleines Projekt zusammen mit anderen Schnupperlernenden. Alle Unterlagen und Ergebnisse kannst darfst du am Schluss mit nach Hause nehmen.\n" +
                "\n" +
                "Gemeinsames Mittagessen wird offeriert.",
            dateTimeFrom: new Date('2021-07-01T08:30'),
            dateTimeTo: new Date('2021-07-02T16:30'),
            eMail: "lehre@axa.ch",
            adress: "Pionierstrasse 3,\n" +
                "8400 Winterthur",
            region: "Winterthur"
        },
        {
            id: 2,
            title: "Kundendialog Schnupperlehre 2021",
            beruf: "Kundendialog",
            beschreibung: "Schnuppertag Fachmann/-frau Kundendialog EFZ -\n" +
                "\n" +
                "Lerne an diesem Tag die Grundbildung Fachmann/-frau Kundendialog EFZ kennen. Erfahre mehr über die AXA und die Tätigkeiten der Fachleuten Kundedialog.\n" +
                "\n" +
                "Gemeinsames Mittagessen wird offeriert.",
            dateTimeFrom: new Date('2021-07-01T08:30'),
            dateTimeTo: new Date('2021-07-02T16:30'),
            eMail: "lehre@axa.ch",
            adress: "Pionierstrasse 3,\n" +
                "8400 Winterthur",
            region: "Zürich"
        },
        {

            id: 3,
            title: "Applikationsentwicklung Schnupperlehre 2021",
            beruf: "Informatik",
            beschreibung: "Lerne den Beruf Informatiker/in Applikationsentwicklung kennen.\n" +
                "Unter Begleitung von Lernenden und einem Berufsbildner lernst du spannende Themen kennen: Programmieren mit Javascript, Mindstorms,  Webseiten produzieren mit HTML und CSS.\n" +
                "Als Höhepunkt entwickelst du ein kleines Projekt zusammen mit anderen Schnupperlernenden. Alle Unterlagen und Ergebnisse kannst darfst du am Schluss mit nach Hause nehmen.\n" +
                "\n" +
                "Gemeinsames Mittagessen wird offeriert.",
            dateTimeFrom: new Date('2021-07-30T08:30'),
            dateTimeTo: new Date('2021-08-01T16:30'),
            eMail: "lehre@axa.ch",
            adress: "Pionierstrasse 3,\n" +
                "8400 Winterthur",
            region: "Winterthur"
        },
        {
            id: 4,
            title: "Applikationsentwicklung Schnupperlehre 2021",
            beruf: "Informatik",
            beschreibung: "Lerne den Beruf Informatiker/in Applikationsentwicklung kennen.\n" +
                "Unter Begleitung von Lernenden und einem Berufsbildner lernst du spannende Themen kennen: Programmieren mit Javascript, Mindstorms,  Webseiten produzieren mit HTML und CSS.\n" +
                "Als Höhepunkt entwickelst du ein kleines Projekt zusammen mit anderen Schnupperlernenden. Alle Unterlagen und Ergebnisse kannst darfst du am Schluss mit nach Hause nehmen.\n" +
                "\n" +
                "Gemeinsames Mittagessen wird offeriert.",
            dateTimeFrom: new Date('2021-04-30T08:30'),
            dateTimeTo: new Date('2021-05-01T16:30'),
            eMail: "lehre@axa.ch",
            adress: "Pionierstrasse 3,\n" +
                "8400 Winterthur",
            region: "Winterthur"
        },
    ])

    /*useEffect(() => {
        const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"test": 'test'})
        }
        fetch('test.php', reqOptions)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(reason => console.log(reason))
    }, [])*/

    return (
        <ThemeProvider theme={theme}>
            <Container className={classes.app}>
                <CssBaseline/>
                <img src={Logo} alt="Logo" className={classes.logo}/>

                <Switch>
                    <Route exact path={'/'}>
                        <Events events={events}/>
                    </Route>
                    <Route exact path={'/infos'}>
                        <Infos/>
                    </Route>
                    <Route exact path={'/events/:id'} component={props => <Event {...props} events={events}/>}>
                    </Route>
                    <Route component={NoMatch} />
                </Switch>

            </Container>
        </ThemeProvider>
    );
}


function NoMatch() {
    return (
        <>
            <h1 className="display-1">404</h1>
            <h2 className="display-1">Wir konnten diese Seite leider nicht finden</h2>
            <a href={'/'}>zurück zur Startseite</a>
        </>
)
}

export default App;