import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardActions,
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
import {ComputerOutlined, Event, LocationOnOutlined, Schedule, Search, WorkOutline} from "@material-ui/icons";
import {Autocomplete} from "@material-ui/lab";
import {filtersOptions, timeOptions, zeitraum} from "./data/initialValues";
import {useStyles} from "./css";
import {Link} from "react-router-dom";
import useSessionStorage from "./data/useSessionStorage";
import './Events.css'

function Events({events = []}) {

    const classes = useStyles();
    const [search, setSearch] = useSessionStorage('search', '')
    const [filters, setFilters] = useSessionStorage('filters', {berufe: [], regionen: []})
    const [timeFilter, setTimeFilter] = useSessionStorage('timefilter', [])
    const [eventsToShow, setEventsToShow] = useState(events);

    /*window.addEventListener("scroll", ev => {
        if (window.pageYOffset > 300) {
            document.getElementById("filterButton").style.visibility = true;
        } else {
            this.setState({
                is_visible: false
            });
        }
    })*/

    useEffect(() => {
        setEventsToShow(events.filter(event => event.titel.includes(search) || event.beruf.includes(search) || event.beschreibung.includes(search))
            .filter(event => filters.berufe.length === 0 || filters.berufe.includes(event.beruf))
            .filter(event => filters.regionen.length === 0 || filters.regionen.includes(event.region))
            .filter(event => timeFilter.length === 0 || timeFilter.map(month => month.ind).includes(event.datumZeit_start.getMonth() || event.datumZeit_ende.getMonth()))
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
                    className={classes.searchField}
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
                                // getOptionDisabled={option => !events.map(event => event[filter.short]).includes(option)}
                                renderOption={(option, {selected}) => (
                                    <React.Fragment>
                                        <Checkbox
                                            color={"primary"}
                                            checked={selected}
                                        />
                                        {option === 'Informatik' ? option + " (Nur Winterthur)" : option}
                                        {!events.map(event => event[filter.short]).includes(option) &&
                                        <p className={classes.ausgebucht}>(ausgebucht)</p>}
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
                                options={filter.options}
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
                                events.map(event => event.dateTimeFrom.getMonth()).includes(option.ind) ||
                                events.map(event => event.dateTimeTo.getMonth()).includes(option.ind)
                            )}
                            renderOption={option => <p className={classes.month}>{option.label}</p>}
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

            <Paper className={classes.paper} elevation={3}>
                <ul className={classes.ul}>
                    {eventsToShow.length > 0 ? eventsToShow.map(event =>
                        <li key={`event${event.id}`} className={classes.li}>
                            <Grid container spacing={3}>
                                <Grid item xs={4} md={1} style={{backgroundColor: "#3f51b5"}}>
                                    <Typography variant={"h4"} component={"h2"}>
                                        {event.datumZeit_start.toLocaleDateString('de-De', {
                                            month: 'short',
                                            day: '2-digit'
                                        })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={8} className={classes.item2}>
                                    <Typography variant="h5" component="h2">
                                        {event.titel}
                                    </Typography>
                                    <Typography variant="body2" component="p"
                                                style={{whiteSpace: 'pre-line', textAlign: 'left'}}>
                                        {event.beschreibung}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} md={3} className={classes.item3}>
                                    <Grid container direction={"row"}>
                                        <Grid item xs={2}>
                                            <Typography component="p">
                                                <WorkOutline fontSize={"inherit"}/>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography component="p" className={classes.textLeft}>
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
                                            <Typography component="p" className={classes.textLeft}>
                                                {event.adresse}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography component="p">
                                                <Event fontSize={"inherit"}/>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography component="p" className={classes.textLeft}>
                                                {event.datumZeit_start.toLocaleDateString('de-DE')
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
                                            <Typography component="p" className={classes.textLeft}>
                                                {event.datumZeit_start.toLocaleTimeString('de-DE', timeOptions)
                                                + " bis " +
                                                event.datumZeit_ende.toLocaleTimeString('de-DE', timeOptions)
                                                }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Link to={`/events/${event.id}`} className={classes.link}>
                                        <Button variant="contained" color="primary">Bewerben<br/>
                                            {event.plaetze_frei} Plätze frei</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                            {/*<Card className={classes.card}>
                                <CardContent>
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
                                    }<br/>
                                        {event.beschreibung}
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.center}>
                                    <Link to={`/events/${event.id}`} className={classes.link}>
                                        <Button variant="contained" color="primary">Bewerben<br/>###
                                            Plätze frei</Button>
                                    </Link>
                                </CardActions>
                            </Card>*/}
                        </li>
                    ) : <li>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Keinen Anlass gefunden
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Anlässe werden laufend ergänzt.<br/><br/>
                                    Es gibt Ausschreibungsdaten:
                                </Typography>
                            </CardContent>
                            <CardActions className={classes.center}>
                                <Link to={'/infos'} className={classes.link}>
                                    <Button variant="contained" color="primary" type={"submit"}>Ansehen</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </li>}
                </ul>
            </Paper>
        </>
    );
}

export default Events;
