import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardContent,
    Checkbox,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import {ComputerOutlined, Event, LocationOnOutlined, Schedule, Search, Work} from "@material-ui/icons";
import {Autocomplete} from "@material-ui/lab";
import {filtersOptions, timeOptions, zeitraum} from "./data/initialValues";
import {Link} from "react-router-dom";
import useSessionStorage from "./data/useSessionStorage";
import './Events.css'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    bigDateGrid: {
        backgroundColor: theme.palette.primary.main,
    },
}))

function Events({events = [], berufe = [], regionen = [], combinations = []}) {

    const classes = useStyles();
    const [search, setSearch] = useSessionStorage('search', '')
    const [filters, setFilters] = useSessionStorage('filters', {berufe: [], regionen: []})
    const [timeFilter, setTimeFilter] = useSessionStorage('timefilter', [])
    const [eventsToShow, setEventsToShow] = useState(events);

    useEffect(() => {
        setEventsToShow(events.filter(event => event.plaetze_frei > 0)
            .filter(event =>
                event.titel.toLowerCase().includes(search.toLowerCase()) ||
                event.beruf.toLowerCase().includes(search.toLowerCase()) ||
                event.adresse.toLowerCase().includes(search.toLowerCase()) ||
                event.beschreibung.toLowerCase().includes(search.toLowerCase())
            )
            .filter(event => filters.berufe.length === 0 || filters.berufe.includes(event.beruf))
            .filter(event => filters.regionen.length === 0 || filters.regionen.includes(event.region))
            .filter(event =>
                timeFilter.length === 0 ||
                timeFilter.map(month => month.ind).includes(event.datumZeit_start.getMonth() || event.datumZeit_ende.getMonth())
            )
            .sort((a, b) => a.datumZeit_start < b.datumZeit_start ? -1 : a.datumZeit_start > b.datumZeit_start ? 1 : 0))
    }, [events, timeFilter, filters, search])

    return (
        <>
            <Typography>Willkommen beim Angebot der Schnupperlehren und Informationsnachmittage der AXA.
                <br/>
                Alle aktuell verfügbaren Angebote sind hier aufgelistet und werden laufend ergänzt.
                <br/><br/>
                Wähle deinen Anlass aus:</Typography>


            <div className={"sticky"}>
                <Input
                    id="search-field"
                    className={"searchField"}
                    type='search'
                    autoComplete={'off'}
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                    placeholder={'Suchen...'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton tabIndex={-1}>
                                <Search/>
                            </IconButton>
                        </InputAdornment>
                    }/>

                <Grid direction={"row"} container spacing={3} justify={"center"}>
                    {filtersOptions.map((filter, index) =>
                        <Grid key={`grid-${index}`} item xs={11} sm={6} md={4}>
                            <Autocomplete
                                limitTags={2}
                                id={`autocomplete-${index}`}
                                multiple
                                openOnFocus
                                disableCloseOnSelect
                                clearText={"Auswahl Löschen"}
                                closeText={"schliessen"}
                                noOptionsText={"Kein Filter gefunden"}
                                /*getOptionDisabled={option => filters[filter.other].length === 0 ? false : !combinations
                                    .filter(combination => filters[filter.other].includes(combination[filter.otherShort]))
                                    .map(combination => combination[filter.short])
                                    .includes(option)
                                }*/
                                renderOption={(option, {selected}) => (
                                    <React.Fragment>
                                        <Checkbox
                                            color={"primary"}
                                            checked={selected}
                                        />
                                        {filters[filter.other].length === 0 ? option : !combinations
                                            .filter(combination => filters[filter.other].includes(combination[filter.otherShort]))
                                            .map(combination => combination[filter.short])
                                            .includes(option) ?
                                            <p className={"nichtVorhanden"}>{option}</p> : option}
                                        {!events.map(event => event[filter.short]).includes(option) &&
                                        <p className={"ausgebucht"}>(ausgebucht)</p>}
                                    </React.Fragment>
                                )}
                                value={filters[filter.value]}
                                onChange={(event, value) => {
                                    //Neues Objekt mit aktuellen Daten erstellen, sonst wird es nicht aktualisiert(weil gleiches Objekt)
                                    let tempFilters = {
                                        [filtersOptions[0].value]: filters[filtersOptions[0].value],
                                        [filtersOptions[1].value]: filters[filtersOptions[1].value]
                                    }
                                    tempFilters[filter.value] = value
                                    setFilters(tempFilters)
                                }}
                                options={filter.value === "berufe" ? berufe : regionen}
                                renderInput={params =>
                                    <TextField {...params} label={filter.label}/>
                                }
                            />
                        </Grid>
                    )}
                    <Grid key={"grid-monthfilter"} item xs={11} sm={6} md={4}>
                        <Autocomplete
                            limitTags={2}
                            id={"autocomplete-monthfilter"}
                            multiple
                            openOnFocus
                            disableCloseOnSelect
                            clearText={"Auswahl Löschen"}
                            closeText={"schliessen"}
                            noOptionsText={"Kein Filter gefunden"}
                            getOptionLabel={option => option.label}
                            getOptionDisabled={option => !(
                                events.map(event => event.datumZeit_start.getMonth()).includes(option.ind) ||
                                events.map(event => event.datumZeit_ende.getMonth()).includes(option.ind)
                            )}
                            renderOption={option => <p className={"month"}>{option.label}</p>}
                            groupBy={option => option.row}
                            renderGroup={params =>
                                <Grid container direction={"row"} justify={"center"}
                                      key={`grid-month-row-${params.group}`}>
                                    {params.children.map((children, index) =>
                                        <Grid item xs={4} key={`grid-${index}`}>
                                            {children}
                                        </Grid>)}
                                </Grid>}
                            value={timeFilter}
                            onChange={(event, value) => {
                                setTimeFilter(value)
                            }}
                            options={zeitraum}
                            renderInput={params => <TextField {...params} label={"Zeitraum"}/>}
                        />
                    </Grid>
                </Grid>
            </div>

            <Paper className={"paper"} elevation={-1}>
                <ul>
                    {eventsToShow.length > 0 ? eventsToShow.map(event =>
                        <li key={`event${event.id}`}>
                            <Grid container spacing={3} className={"boxShadow"}>
                                <Grid item xs={4} md={1} className={classes.bigDateGrid + " roundedCorners"}> {/*Monats Grid*/}
                                    <Typography variant={"h4"} component={"h2"}>
                                        {event.datumZeit_start.toLocaleDateString('de-De', {
                                            month: 'short',
                                            day: '2-digit'
                                        })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={8} className={"item2 roundedCorners"}> {/*Details Grid*/}
                                    <Typography variant="h5" component="h2">
                                        {event.titel}
                                    </Typography>
                                    <Typography variant="body2" component="p"
                                                style={{whiteSpace: 'pre-line', textAlign: 'left'}}>
                                        {event.beschreibung}
                                    </Typography>
                                    <Link to={`/${event.id}`} className={"link mobileButton"}>
                                        <Button variant="contained" fullWidth
                                                color="primary">{event.bewerbung ? "Bewerben " : "Anmelden "}
                                            {event.plaetze_frei} Plätze frei</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={8} md={3} className={"item3 roundedCorners"}> {/*Anmelden Grid*/}
                                    <Grid container direction={"row"}>
                                        <Grid item xs={2}>
                                            <Typography component="p">
                                                <Work fontSize={"inherit"}/>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography component="p" style={{textAlign: 'left'}}>
                                                {event.beruf}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography component="p">
                                                {event.online ? <ComputerOutlined fontSize={"inherit"}/> :
                                                    <LocationOnOutlined fontSize={"inherit"}/>}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography component="p" style={{textAlign: 'left'}}>
                                                {event.adresse}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography component="p">
                                                <Event fontSize={"inherit"}/>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography component="p" style={{textAlign: 'left'}}>
                                                {event.datumZeit_start.toLocaleDateString('de-DE') === event.datumZeit_ende.toLocaleDateString('de-DE') ?
                                                    event.datumZeit_start.toLocaleDateString('de-DE') :
                                                    event.datumZeit_start.toLocaleDateString('de-DE')
                                                    + " bis " +
                                                    event.datumZeit_ende.toLocaleDateString('de-DE')
                                                }
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography component="p">
                                                <Schedule fontSize={"inherit"}/>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography component="p" style={{textAlign: 'left'}}>
                                                {event.datumZeit_start.toLocaleTimeString('de-DE', timeOptions)
                                                + " bis " +
                                                event.datumZeit_ende.toLocaleTimeString('de-DE', timeOptions)
                                                }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Link to={`/${event.id}`} className={"link desktopButton"}>
                                        <Button variant="contained"
                                                color="primary">{event.bewerbung ? "Bewerben" : "Anmelden"}<br/>
                                            {event.plaetze_frei} Plätze frei</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </li>
                    ) : <li>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Keinen Anlass gefunden
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Entweder gibt es den ausgewählten Beruf in der ausgewählten Region nicht oder alle
                                    Anlässe sind ausgebucht.<br/>
                                    Anlässe werden laufend ergänzt.<br/>
                                    Aber es gibt Ausschreibungsdaten:<br/>
                                    TODO Ausschreibungsdaten
                                </Typography>
                            </CardContent>
                        </Card>
                    </li>}
                </ul>
            </Paper>
        </>
    );
}

export default Events;
