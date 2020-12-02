const express = require('express');
const router = express.Router();
const {
    Rating
} = require('../models');
const validateSession = require('../middleware/validateSession');

router.get("/myratings",  (req, res) => {
    Rating.findAll()
        .then(rating => res.status(200).json(rating))
        .catch(err => res.status(500).json({
            error: err
        }))
})

router.get("/:id", validateSession, (req, res) => {
    Rating.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(rating => res.status(200).json(rating))
        .catch(err => res.status(500).json({
            error: err
        }))
})

router.post('/createrating', validateSession, (req, res) => {
            // try {
            //     const {rating, movieId} = req.body;

            //     let newRating = await Rating.create({
            //         rating, movieId, userId
            //     });
            //     res.status(200).json({
            //         rating: newRating,
            //         message: "Rating successful!"
            //     })

            // } catch (error) {
            //     console.log(error);
            //     res.status(500).json({
            //         message: "Rating Failed."
            //     })
            //}
            const rating = {
                rating: req.body.rating,
                movieId: req.body.movieId,
                userId: req.user.id
            }
            Rating.create(rating)
                .then(rating => res.status(200).json(rating)
                .catch(err => res.status(500).json({error: err })
                ))

            })
            
            router.put("/myratings/:id", (req, res) => {

                const query = req.params.id;

                Rating.update(req.body, {
                        where: {
                            id: query
                        }
                    })
                    .then((ratingUpdated) => {
                        Rating.findOne({
                                where: {
                                    id: query
                                }
                            })
                            .then((locatedUpdatedRating) => {
                                res.status(200).json({
                                    rating: locatedUpdatedRating,
                                    message: "Rating updated successful",
                                    ratingChanged: ratingUpdated,
                                });
                            });
                    })

                    .catch((err) => res.json(err));
            });

            router.delete('/myratings/:id', (req, res) => {
                Rating.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(rating => res.status(200).json(rating))
                    .catch(err => res.json({
                        error: err
                    })) // OR json(err)
            })

            module.exports = router;