import {Link} from "react-router-dom";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {niveaus, noten, timeOptions} from "./data/initialValues";
import './Event.css'
import {InfoOutlined, NoteAddOutlined} from "@material-ui/icons";
import InputMask from "react-input-mask";

export default function Event({events, match}) {
    const [values, setValues] = useState({
        anrede: '',
        vorname: '',
        name: '',
        strasse: '',
        postal: '',
        ort: '',
        email: '',
        telefon: '',
        begleitung: false,
        noteDeutsch: '',
        noteMathematik: '',
        noteEnglisch: '',
        noteFranzösisch: '',
        niveauDeutsch: '',
        niveauMathematik: '',
        niveauEnglisch: '',
        niveauFranzösisch: '',
    });
    const [files, setFiles] = useState({
        file1: '',
        file2: '',
        file3: '',
        file4: '',
    })
    const [notenfilter, setNotenfilter] = useState([])

    useEffect(() => {
        //Notenfilter von der API holen
        fetch(`https://co2.it-lehre.ch/events.php?id=${match.params.id}`)
            .then(res => res.json())
            .then(res => setNotenfilter(res))
            .catch(reason => console.log(reason))
    }, [match.params.id])

    function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.name !== "begleitung" ? e.target.value : e.target.checked
        })
    }

    function handleFileChange(e) {
        //Checken ob Filetyp erlaubt ist (Nur accept beim Input reicht nicht)
        let allowed = ["pdf", "docx", "jpg", "jpeg", "png", "tif"];

        let filename = e.target.value.toLowerCase();
        let filename_arr = filename.split(".");

        if (filename !== "" && allowed.indexOf(filename_arr[filename_arr.length - 1]) < 0) {
            alert("Dieser Dateityp ist nicht erlaubt!\n\nGeeignete Dateitypen: ." + allowed.join(", ."));
        } else {
            setFiles({
                ...files,
                [e.target.name]: e.target.files[0]
            })
        }
    }

    //Event mit der id aus dem Link holen
    const event = events.find(event => event.id === parseInt(match.params.id));
    if (!event) {
        return <>
            <br/>
            <h1>Wir konnten diesen Anlass leider nicht finden</h1>
            <Link to={'/'} className={"link"}>
                <Button variant={"contained"} color={"primary"}>zurück</Button>
            </Link>
        </>
    }

    return <>
        <br/>
        <Link to={'/'} className={"link"} tabIndex={-1}>
            <Button variant={"contained"} color={"primary"}>zurück zur Auswahl</Button>
        </Link>
        <Typography variant="h5" component="h2">
            {event.titel}
        </Typography>
        <Typography variant="body2" component="p" style={{whiteSpace: 'pre-line'}}>
            Beruf: {event.beruf}<br/>
            Ort: {event.adresse}<br/>
            Datum: {event.datumZeit_start.toLocaleDateString('de-DE') === event.datumZeit_ende.toLocaleDateString('de-DE') ?
            event.datumZeit_start.toLocaleDateString('de-DE') :
            event.datumZeit_start.toLocaleDateString('de-DE')
            + " bis " +
            event.datumZeit_ende.toLocaleDateString('de-DE')
        }<br/>
            Zeit: {event.datumZeit_start.toLocaleTimeString('de-DE', timeOptions)
        + " bis " +
        event.datumZeit_ende.toLocaleTimeString('de-DE', timeOptions)
        }
        </Typography>
        <form action="/form.php" method='post' encType="multipart/form-data">
            <input type='hidden' name='id' value={event.id}/>
            <div className={"anredediv"}><FormControl required className={"anrede"}>
                <InputLabel id="anrede-label">Anrede</InputLabel>
                <Select
                    labelId="anrede-label"
                    id="anrede"
                    name="anrede"
                    value={values.anrede}
                    onChange={handleChange}
                >
                    <MenuItem value={1}>Herr</MenuItem>
                    <MenuItem value={2}>Frau</MenuItem>
                </Select>
            </FormControl></div>
            <TextField className={"input vorname"}
                       required
                       label={"Vorname"}
                       name={"vorname"}
                       value={values.vorname}
                       onChange={handleChange}/>
            <TextField className={"input"}
                       required
                       label={"Name"}
                       name={"name"}
                       value={values.name}
                       onChange={handleChange}/>
            <TextField className={"input medium"}
                       required
                       label={"Ort"}
                       name={"ort"}
                       value={values.ort}
                       onChange={handleChange}/>
            <TextField className={"input small"}
                       required
                       label={"PLZ"}
                       name={"postal"}
                       value={values.postal}
                       onChange={handleChange}/>
            <TextField className={"input"}
                       required
                       label={"Strasse Nr."}
                       name={"strasse"}
                       value={values.strasse}
                       onChange={handleChange}/>
            <TextField className={"input"}
                       required
                       type={"email"}
                       label={"E-mail"}
                       name={"email"}
                       value={values.email}
                       onChange={handleChange}/>
            <InputMask mask="+41(0) 99 999 99 99"
                       value={values.telefon}
                       onChange={handleChange}>
                {/*TextField mitgeben, dass es gleich aussieht wie die anderen Inputs (InputMask ist eine externe Library)*/}
                {() => <TextField className={"input"}
                                  required
                                  label={"Telefon"}
                                  name={"telefon"}/>}
            </InputMask>

            {event.begleitung === 1 &&
            <div>
                <FormControlLabel
                    control={
                        <Checkbox checked={values.begleitung}
                                  onChange={handleChange}
                                  name="begleitung"
                                  color="primary"/>}
                    label="Eine erwachsene Person nimmt als Begleitung teil."
                />
            </div>}
            {event.bewerbung === 1 ?
                <>
                    <Typography variant="h6" component="h6">
                        Aktuelle Zeugnisnoten
                    </Typography>
                    <Typography variant="body2" component="p">
                        Bitte gib hier die Zeugnisnoten des letzten Semesters ein. Deine Bewerbung kann nur angenommen
                        werden, wenn sie den Mindestanforderungen des Berufs entspricht.
                    </Typography>
                    {/*Alle Notenfilter durchgehen*/}
                    {notenfilter.map((filter, index) =>
                        <div className={"zeugnisnoten"} key={index}>
                            {/*Mindestanforderungen*/}
                            <Tooltip arrow
                                     placement={"right"}
                                     enterTouchDelay={1}
                                     enterDelay={0}
                                     leaveTouchDelay={3000}
                                     title={`Mindestnote: ${filter.note}, Niveau: ${niveaus.find(niveau => niveau.value = filter.stufe).label}`}>
                                <InfoOutlined tabIndex={0} fontSize={"small"} className={"info"}/>
                            </Tooltip>
                            {/*Inputs für Note und Niveau*/}
                            <TextField label={filter.fach} disabled className={"fach"}/>
                            <FormControl required className={"select"}>
                                <InputLabel id="note-label">Note</InputLabel>
                                <Select
                                    labelId="note-label"
                                    id="note"
                                    name={"note" + filter.fach}
                                    value={values["note" + filter.fach]}
                                    onChange={handleChange}
                                >
                                    {noten.map(note =>
                                        <MenuItem key={note.value} value={note.value}>{note.label}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl required className={"selectlarge"}>
                                <InputLabel id="niveau-label">Niveau</InputLabel>
                                <Select
                                    labelId="niveau-label"
                                    id="niveau"
                                    name={"niveau" + filter.fach}
                                    value={values["niveau" + filter.fach]}
                                    onChange={handleChange}
                                >
                                    {niveaus.map(niveau =>
                                        <MenuItem key={niveau.value} value={niveau.value}>{niveau.label}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </div>)}
                    <Typography variant="h6" component="h6">
                        Aktuelles Zeugnis
                    </Typography>
                    <Typography variant="body2" component="p">
                        Bitte lade hier dein Zeugnis der letzten zwei Semester hoch (Vorder- und Rückseite.)
                    </Typography>
                    {["file1", "file2", "file3", "file4"].map(file =>
                        <div key={file}>
                            {/*input type file ist hidden damit man den Button von Material ui verwenden kannn*/}
                            <input type="file" id={file} name={file}
                                   accept="application/pdf, .docx, image/tiff, image/png, image/jpeg"
                                   hidden
                                   onChange={handleFileChange}/>
                            <label htmlFor={file}>
                                <Button variant={"contained"} component={"span"} startIcon={<NoteAddOutlined/>}>
                                    {files[file]?.name || "Hochladen"}
                                </Button>
                            </label>
                        </div>
                    )}
                    <Button type={"submit"} variant={"contained"} color={"primary"}>Bewerbung abschicken</Button>
                </> : <Button type={"submit"} variant={"contained"} color={"primary"}>Anmeldung abschicken</Button>}
        </form>
    </>

}