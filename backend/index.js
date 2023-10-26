const { Client } = require("@elastic/elasticsearch");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 5001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new Client({
    node: "http://localhost:9200",
});

app.get("/health", async (req, res) => {
    const health = await client.cluster.health();
    res.json(health);
});

app.post("/search", async (req, res, next) => {
    try {
        const { search_term } = req.body;
        const result = await client.search({
            index: "metaphors",
            body: {
                size: 75,
                query: {
                    multi_match: {
                        query: search_term,
                        fields: [
                            "poem_title",
                            "lyricist",
                            "lyrics",
                            "metaphor",
                            "source_domain",
                            "target_domain",
                            "year",
                            "meaning",
                        ],
                    },
                },
                highlight: {
                    fields: {
                        poem_title: {},
                        lyricist: {},
                        lyrics: {},
                        metaphor: {},
                        source_domain: {},
                        target_domain: {},
                        year: {},
                        meaning: {},
                    },
                    pre_tags: ">",
                    post_tags: "<",
                },
            },
        });
        res.json(result.hits.hits);
    } catch (error) {
        res.json([]);
    }
});
app.post("/search-plus", async (req, res, next) => {
    try {
        const { search_term } = req.body;
        const result = await client.search({
            index: "metaphors",
            body: {
                size: 75,
                query: {
                    query_string: {
                        query: search_term,
                        fields: [
                            "poem_title",
                            "lyricist",
                            "lyrics",
                            "metaphor",
                            "source_domain",
                            "target_domain",
                            "year",
                            "meaning",
                        ],
                    },
                },
                highlight: {
                    fields: {
                        poem_title: {},
                        lyricist: {},
                        lyrics: {},
                        metaphor: {},
                        source_domain: {},
                        target_domain: {},
                        year: {},
                        meaning: {},
                    },
                    pre_tags: ">",
                    post_tags: "<",
                },
            },
        });
        res.json(result.hits.hits);
    } catch (error) {
        res.json([]);
    }
});

app.post("/author", async (req, res, next) => {
    try {
        const { search_term } = req.body;
        const result = await client.search({
            index: "metaphors",
            body: {
                size: 75,
                query: {
                    bool: {
                        should: [
                            {
                                match: { lyricist: { query: search_term } },
                            },
                        ],
                    },
                },
            },
        });

        res.json(result.hits.hits);
    } catch (error) {
        res.json([]);
    }
});

app.post("/title", async (req, res, next) => {
    try {
        const { search_term } = req.body;
        const result = await client.search({
            index: "metaphors",
            body: {
                size: 75,
                query: {
                    bool: {
                        should: [
                            {
                                match: { poem_title: { query: search_term } },
                            },
                        ],
                    },
                },
                highlight: {
                    fields: {
                        poem_title: {},
                    },
                    pre_tags: ">",
                    post_tags: "<",
                },
            },
        });

        res.json(result.hits.hits);
    } catch (error) {
        res.json([]);
    }
});
app.post("/year", async (req, res, next) => {
    try {
        const { search_term } = req.body;
        const result = await client.search({
            index: "metaphors",
            body: {
                size: 75,
                query: {
                    bool: {
                        should: [
                            {
                                match: { year: { query: search_term } },
                            },
                        ],
                    },
                },
            },
        });

        res.json(result.hits.hits);
    } catch (error) {
        res.json([]);
    }
});

app.post("/source", async (req, res, next) => {
    try {
        const { search_term } = req.body;
        const result = await client.search({
            index: "metaphors",
            body: {
                size: 75,
                query: {
                    bool: {
                        should: [
                            {
                                match: {
                                    source_domain: { query: search_term },
                                },
                            },
                        ],
                    },
                },
                highlight: {
                    fields: {
                        source_domain: {},
                    },
                    pre_tags: ">",
                    post_tags: "<",
                },
            },
        });
        res.json(result.hits.hits);
    } catch (error) {
        res.json([]);
    }
});

app.post("/target", async (req, res, next) => {
    try {
        const { search_term } = req.body;
        const result = await client.search({
            index: "metaphors",
            body: {
                size: 75,
                query: {
                    bool: {
                        should: [
                            {
                                match: {
                                    target_domain: { query: search_term },
                                },
                            },
                        ],
                    },
                },
                highlight: {
                    fields: {
                        target_domain: {},
                    },
                    pre_tags: ">",
                    post_tags: "<",
                },
            },
        });
        res.json(result.hits.hits);
    } catch (error) {
        res.json([]);
    }
});

app.post("/meaning", async (req, res, next) => {
    try {
        const { search_term } = req.body;
        const result = await client.search({
            index: "metaphors",
            body: {
                size: 75,
                query: {
                    bool: {
                        should: [
                            {
                                match_phrase: {
                                    meaning: {
                                        query: search_term,
                                    },
                                },
                            },
                        ],
                    },
                },
                highlight: {
                    fields: {
                        meaning: {},
                    },
                    pre_tags: ">",
                    post_tags: "<",
                },
            },
        });
        res.json(result.hits.hits);
    } catch (error) {
        res.json([]);
    }
});
app.post("/lyrics", async (req, res, next) => {
    try {
        const { search_term } = req.body;
        const result = await client.search({
            index: "metaphors",
            body: {
                size: 75,
                query: {
                    bool: {
                        should: [
                            {
                                match_phrase: {
                                    lyrics: {
                                        query: search_term,
                                    },
                                },
                            },
                        ],
                    },
                },
                highlight: {
                    fields: {
                        lyrics: {},
                    },
                    pre_tags: ">",
                    post_tags: "<",
                },
            },
        });
        res.json(result.hits.hits);
    } catch (error) {
        res.json([]);
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
