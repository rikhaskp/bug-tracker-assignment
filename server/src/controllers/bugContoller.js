import Bug from "../models/bugModel.js";

export default {
  addBug: (req, res) => {
    const newBug = new Bug({
      title: req.body.title,
      description: req.body.description,
      due_date: new Date(),
      project: req.body.project,
      reporter: req.body.reporter,
      fileUrl: req.body.fileUrl,
    });
    newBug
      .save()
      .then((bug) => {
        res.status(200).json({ message: "Bug created", bug: bug });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },
  getAllBugs: (req, res) => {
    Bug.find()
      .then((bugs) => {
        res.status(200).json({ bugs: bugs });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },

  getBugDetails: (req, res) => {
    Bug.findOne({ _id: req.params.id })
      .then((bugs) => {
        res.status(200).json({ bugs: bugs });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },

  updateBug: (req, res) => {
    Bug.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          due_date: new Date(),
          project: req.body.project,
          reporter: req.body.reporter,
          fileUrl: req.body.fileUrl,
        },
      }
    )
      .then(() => {
        res.status(200).json({ message: "Updated Successfully" });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },

  deleteBug: (req, res) => {
    Bug.findOneAndDelete(
      { _id: req.params.id }
    )
      .then(() => {
        res.status(200).json({ message: "Deleted Successfully" });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },
};
