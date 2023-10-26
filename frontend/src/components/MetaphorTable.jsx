import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

function MetaphorTable({ data }) {
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        console.log("on table: ", data);
        setRows(data);
    }, [data]);
    if (data.length > 0) {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Poem</TableCell>
                            <TableCell align="right">Metaphor</TableCell>
                            <TableCell align="right">Poet</TableCell>
                            <TableCell align="right">Source Domain</TableCell>
                            <TableCell align="right">Target Domain</TableCell>
                            <TableCell align="right">Meaning</TableCell>
                            <TableCell align="right">Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            let title = row._source.poem_title;
                            let metaphor = row._source.metaphor;
                            let lyricist = row._source.lyricist;
                            let lyrics = row._source.lyrics;
                            let source_domain = row._source.source_domain;
                            let target_domain = row._source.target_domain;
                            let meaning = row._source.meaning;
                            let year = row._source.year;
                            if (row.highlight) {
                                const x = row.highlight;
                                if (row?.highlight?.lyrics) {
                                    lyrics = row.highlight.lyrics;
                                }
                                if (row?.highlight?.poem_title) {
                                    title = row.highlight.poem_title;
                                }
                                if (row?.highlight?.metaphor) {
                                    metaphor = row.highlight.metaphor;
                                }
                                if (row?.highlight?.lyricist) {
                                    lyricist = row.highlight.lyricist;
                                }
                                if (row?.highlight?.source_domain) {
                                    source_domain = row.highlight.source_domain;
                                }
                                if (row?.highlight?.target_domain) {
                                    target_domain = row.highlight.target_domain;
                                }
                                if (row?.highlight?.meaning) {
                                    meaning = row.highlight.meaning;
                                }
                                if (row?.highlight?.year) {
                                    year = row.highlight.year;
                                }
                                console.log(x);
                            }
                            return (
                                <TableRow
                                    key={row._id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {title}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {lyrics}
                                    </TableCell>
                                    <TableCell align="right">
                                        <p>{metaphor}</p>
                                    </TableCell>
                                    <TableCell align="right">
                                        {lyricist}
                                    </TableCell>
                                    <TableCell align="right">
                                        {source_domain}
                                    </TableCell>
                                    <TableCell align="right">
                                        {target_domain}
                                    </TableCell>
                                    <TableCell align="right">
                                        {meaning}
                                    </TableCell>
                                    <TableCell align="right">{year}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return <Typography>No results</Typography>;
    }
}

export default MetaphorTable;
