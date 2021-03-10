import React, {useEffect, useState} from "react";
import Logo from './images/logo_schnupperlehr.png';
import {Button, Container, createMuiTheme, CssBaseline, useMediaQuery} from "@material-ui/core";
import {Route, Switch, useHistory} from 'react-router-dom';
import {ThemeProvider} from "@material-ui/core/styles";
import Events from "./Events";
import Event from "./Event";
import "./App.css"
import {standardBerufe, standardRegionen} from "./data/initialValues";

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    background: {
                        paper: "#fafafa"
                    },
                    type: prefersDarkMode ? 'light' : 'light',
                    //                      'dark'
                },
                overrides: {
                    MuiTooltip: {
                        tooltip: {
                            fontSize: "1em",
                        }
                    }
                }
            }),
        [prefersDarkMode],
    );

    const [combinations, setCombinations] = useState([])
    const [berufe, setBerufe] = useState(standardBerufe)
    const [regionen, setRegionen] = useState(standardRegionen)
    const [events, setEvents] = useState([
        {
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
            begleitung: 1,
            online: 1
        },
        {
            id: 113,
            beruf: "Kaufmann / Kauffrau",
            region: "Winterthur",
            titel: "KV Informationsnachmittag virtuell",
            datumZeit_start: new Date("2021-03-17 13:30:00"),
            datumZeit_ende: new Date("2021-03-17 15:30:00"),
            beschreibung: "Informationsveranstaltung f&uuml;r Kaufmann/-frau EFZ Privatversicherung -\r\n\r\nAlle Inhalte werden auch am KV Schnuppertag besprochen.\r\n\r\nDie Informationsveranstaltung wird online via Microsoft Teams durchgef&uuml;hrt. Der Link zur Onlineveranstaltung wird in der Woche vor dem Anlass per Mail versendet.",
            adresse: "Microsoft Teams",
            plaetze_frei: 80,
            bewerbung: 1,
            begleitung: 0,
            online: 1
        },])

    useEffect(() => {
        const reqOptions = {
            method: 'GET'
        }
        fetch('https://co2.it-lehre.ch/events.php', reqOptions)
            .then(res => res.json())
            .then(res => {
                // In Javascript Datum umwandeln
                res.forEach(event => {
                    event["datumZeit_start"] = new Date(event.datumZeit_start)
                    event["datumZeit_ende"] = new Date(event.datumZeit_ende)
                })
                setEvents(res)
            })
            .catch(reason => console.log(reason))
        fetch('https://co2.it-lehre.ch/berufe.php', reqOptions)
            .then(res => res.json())
            .then(res => setBerufe(res))
            .catch(reason => console.log(reason))
        fetch('https://co2.it-lehre.ch/regionen.php', reqOptions)
            .then(res => res.json())
            .then(res => setRegionen(res))
            .catch(reason => console.log(reason))
        fetch('https://co2.it-lehre.ch/combinations.php', reqOptions)
            .then(res => res.json())
            .then(res => setCombinations(res))
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
            <Container className={"app"}>
                <CssBaseline/>
                <img src={Logo} alt="Logo" className={"logo"}/>

                <Switch>
                    <Route exact path={'/'}>
                        <Events events={events} berufe={berufe} regionen={regionen} combinations={combinations}/>
                    </Route>
                    <Route exact path={'/:id'} component={props => <Event {...props} events={events}/>}>
                    </Route>
                    <Route component={NoMatch}/>
                </Switch>

            </Container>
        </ThemeProvider>
    );
}


function NoMatch() {
    const history = useHistory();
    return (
        <>
            <h1 className="display-1">404</h1>
            <h2 className="display-1">Wir konnten diese Seite leider nicht finden</h2>
            <Button variant={"contained"} color={"primary"} onClick={() => history.goBack()}>zurück</Button>
        </>
    )
}

export default App;