import {makeStyles} from "@material-ui/core/styles";

/*value         |0px     600px    960px    1280px   1920px*/
/*key           |xs      sm       md       lg       xl*/
/*screen width  |--------|--------|--------|--------|-------->*/
/*range         |   xs   |   sm   |   md   |   lg   |   xl*/

export const useStyles = makeStyles((theme) => ({
    app: {
        textAlign: "center"
    },
    logo: {
        width: "60vw",
        [theme.breakpoints.up('sm')]: {
            width: "30vw",
        },
        [theme.breakpoints.up('md')]: {
            width: "25vw",
        },
        [theme.breakpoints.up('lg')]: {
            width: "20vw",
        },
        [theme.breakpoints.up('xl')]: {
            width: "15vw",
        },
    },
    searchField: {
        width: "60vw",
        [theme.breakpoints.up('sm')]: {
            width: "55vw",
        },
        [theme.breakpoints.up('md')]: {
            width: "45vw",
        },
        [theme.breakpoints.up('lg')]: {
            width: "35vw",
        }

    },
    center: {
        justifyContent: "center",
    },
    paper: {
        padding: 20,
        justifyContent: "center",
    },
    ul: {
        listStyleType: "none",
        paddingInlineStart: 0
    },
    li: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: 'rgba(0,0,0,0.06)',
    },
    month: {
        height: 15
    },
    ausgebucht: {
        color: "indianred",
        fontStyle: "italic"
    },
    link: {
        textDecoration: "none"
    }
}));