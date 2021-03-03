import React, {useEffect, useState} from "react";
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
                    type: prefersDarkMode ? 'light' : 'light',
                    //                      'dark'
                },
            }),
        [prefersDarkMode],
    );

    const classes = useStyles();
    const [events, setEvents] = useState([{
        id: 112,
        beruf: "Kaufmann / Kauffrau",
        region: "Winterthur",
        titel: "KV Informationsnachmittag virtuell",
        datumZeit_start: new Date("2021-03-17 13:30:00"),
        datumZeit_ende: new Date("2021-03-17 15:30:00"),
        beschreibung: "Informationsveranstaltung f&uuml;r Kaufmann/-frau EFZ Privatversicherung -\r\n\r\nAlle Inhalte werden auch am KV Schnuppertag besprochen.\r\n\r\nDie Informationsveranstaltung wird online via Microsoft Teams durchgef&uuml;hrt. Der Link zur Onlineveranstaltung wird in der Woche vor dem Anlass per Mail versendet.",
        adresse: "Microsoft Teams",
        plaetze_frei: 80,
        bewerbung: 0,
        online: 1
    }])

    useEffect(() => {
        const reqOptions = {
            method: 'GET'
        }
        fetch('http://localhost/schnuppi/new/api/events.php', reqOptions)
            .then(res => res.json())
            .then(res => setEvents(res))
            .catch(reason => console.log(reason))

        /*const reqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"test": 'test'})
        }
        fetch('test.php', reqOptions)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(reason => console.log(reason))*/
    }, [])

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
                    <Route component={NoMatch}/>
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