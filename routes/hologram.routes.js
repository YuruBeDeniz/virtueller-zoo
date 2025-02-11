const router = require("express").Router();
const Hologram = require("../models/Hologram.js");

router.post("/", (req, res) => {
    const { name, weight, superpower, extinctSince } = req.body;

    if (!name || weight === 0 || !superpower || !extinctSince) {
        return res.status(400).json({message: "Bitte füllen Sie alle Felder aus."})
    };

    Hologram.findOne({ name: name.toLowerCase() })
      .then(foundHologram => {
        if(foundHologram) {
          res.status(400).json({message: "Das Hologramm existiert bereits."});
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
    
});

router.get("/getHolograms", (req, res) => {
  Hologram.find()
      .then(holograms => res.status(200).json(holograms))
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal server error." })
      })
});

router.put("/:id", (req, res) => {
  const { name, weight, superpower, extinctSince } = req.body;

  if (!name || weight === 0 || !superpower || !extinctSince) {
    return res.status(400).json({message: "Bitte füllen Sie alle Felder aus."})
  };

  Hologram.findByIdAndUpdate(req.params.id, { name, weight, superpower, extinctSince }, { new: true })
  .then(hologram => {
    if (!hologram) {
      return res.status(404).json({ message: "Hologram nicht gefunden." });
    }
    res.status(200).json(hologram);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  });
});

router.get("/details/:id", (req, res) => {
  Hologram.findById(req.params.id)
    .then(hologramFromDB => {
      if (!hologramFromDB) {
        return res.status(404).json({ message: "Hologram nicht gefunden." });
      }
      res.status(200).json(hologramFromDB);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error." });
    });
});

router.delete("/:id", (req, res) => {
  Hologram.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Hologramm gelöscht." });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error." });
    });
});

router.get("/getSearchedHolograms", (req, res) => {
  const { q = "" } = req.query;
  Hologram.find({ name: { $regex: new RegExp(q, "i") }})
   .then(filteredHolograms => {
    res.status(200).json(filteredHolograms);
   })
   .catch(err => {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  });
})

module.exports = router;