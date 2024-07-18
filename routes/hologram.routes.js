const router = require("express").Router();
const Hologram = require("../models/Hologram.js");

router.post("/", (req, res) => {
    const { name, weight, superpower, extinctSince } = req.body;

    if (!name || weight === 0 || !superpower || !extinctSince) {
        return res.status(400).json({message: "Please fill in all fields."})
    };

    Hologram.findOne({ name })
      .then(foundHologram => {
        if(foundHologram) {
          res.status(400).json({message: "Hologram already exists."});
          return;
        }

        Hologram.create({ name, weight, superpower, extinctSince })
          .then(createdHologram => {
            const { name, weight, superpower, extinctSince } = createdHologram;
            const hologram = { name, weight, superpower, extinctSince };
            res.status(201).json({ hologram });
          })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal server error." })
      })
    
})

module.exports = router;