import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#000000',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class TeenyUI extends Component {
    constructor() {
        super();

        this.state = {
            value: "",
            teenyUrl: ""
        };

        this.createTeeny = this.createTeeny.bind(this);

    }

    componentDidMount() {
        // fetch('http://localhost:8080/teeny/1').then(result => {
        //   return result.json();
        // }).then(data => {
        //   this.setState({
        //     value: data.url
        //   })
        //   console.log(data);
        // })
    }

    createTeeny() {
        let baseUrl = window.location.origin.toString();
        // console.log("holaaa ", baseUrl);
        let data = {};
        data["url"] = this.state.value;
        fetch('http://34.71.57.140:43256/teeny/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            this.setState({
                value: "",
                teenyUrl: baseUrl + '/redirect/' + data.id
            })
            // console.log(data);
        })
    }
    render() {
        const classes = useStyles;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        T
        </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Teeny Url
        </Typography>

                    <TextField
                        id="url"
                        margin="normal"
                        fullWidth
                        label="URL"
                        name="url"
                        value={this.state.value}
                        onChange={e => this.setState({ value: e.target.value })}
                        autoFocus
                        variant="filled" />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.createTeeny}
                    >
                        Just Do it
          </Button>

                    <TextField
                        id="teenyUrl"
                        margin="normal"
                        disabled
                        fullWidth
                        label="TeenyUrl"
                        name="teenyUrl"
                        value={this.state.teenyUrl}
                        autoFocus />

                </div>
            </Container>
        );
    }
}

export default TeenyUI;