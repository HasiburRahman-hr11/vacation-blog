const Post = require('../models/Post');



exports.autocompleteSearchController = async (req, res) => {
    const term = req.query.term;
    try {
        let result = await Post.aggregate([
            {
                "$search": {
                    "compound": {
                        "should": [
                            {
                                "autocomplete": {
                                    "query": `${term}`,
                                    "path": "title",
                                    "fuzzy": {
                                        "maxEdits": 2,
                                        "prefixLength": 3
                                    }
                                }
                            },
                            {
                                "autocomplete": {
                                    "query": `${term}`,
                                    "path": "description",
                                    "fuzzy": {
                                        "maxEdits": 2,
                                        "prefixLength": 3
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


exports.searchPostsController = async (req, res) => {
    const term = req.query.term;
    try {

        let results = []
        const posts = await Post.find();
        if (posts) {
            posts.map(post => {
                if (post.title.toLowerCase().includes(term) || post.description.toLowerCase().includes(term)) {
                    results.push(post)
                }

                if(post.categories.length > 0){
                    post.categories.map(cat => {
                        if (cat.toLowerCase().includes(term)) {
                            if(!results.includes(post)){
                                results.push(post)
                            }
                        }
                    })
                }
            })
        }

        res.status(200).json(results);

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message });
    }
}