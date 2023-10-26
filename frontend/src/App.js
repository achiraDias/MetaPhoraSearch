import logo from "./logo.svg";
import "./App.css";
import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import MetaphorTable from "./components/MetaphorTable";
import axios from "axios";

function App() {
    const [filter, setFilter] = useState("search");
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const onSearchBarChange = (event) => {
        setSearch(event.target.value);
    };
    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    useEffect(() => {
        setEndTime(Date.now());
        setStartTime(Date.now());
        const request = { search_term: search };
        console.log(search, filter);

        const fetchData = async () => {
            const result = await axios.post(
                `http://localhost:5001/${filter}`,
                request
            );
            console.log("fetched: ", result);
            setData(result.data);
            setEndTime(Date.now());
        };

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [search, filter]);

    return (
        <Container>
            <Grid item container xs={12} textAlign={"center"} maxWidth={800}>
                <Grid item xs={12}>
                    <Typography variant="h1">MetaPhoraSearch</Typography>
                </Grid>
                <Grid item xs={12} p={3}>
                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        fullWidth
                        onChange={onSearchBarChange}
                        helperText={`Search results for ${search}...  ${
                            data.length
                        } results in ${endTime - startTime} ms`}
                    />
                </Grid>
                <Grid item xs={6} pl={3} pr={3} pb={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Field
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter}
                            label="Field"
                            onChange={handleChange}
                        >
                            <MenuItem value={"search"}>All</MenuItem>
                            <MenuItem value={"search-plus"}>
                                Advanced Search
                            </MenuItem>
                            <MenuItem value={"author"}>Poet</MenuItem>
                            <MenuItem value={"title"}>Title</MenuItem>
                            <MenuItem value={"source"}>Source Domain</MenuItem>
                            <MenuItem value={"target"}>Target Domain</MenuItem>
                            <MenuItem value={"meaning"}>Meaning</MenuItem>
                            <MenuItem value={"year"}>Year</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} pl={3} pr={3}>
                    <MetaphorTable data={data} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
