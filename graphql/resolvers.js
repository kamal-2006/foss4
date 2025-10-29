const Task = require("../models/Task");

const resolvers = {
  Query: {
    tasks: async () => {
      return await Task.find().sort({ createdAt: -1 });
    },
    task: async (_, { id }) => {
      return await Task.findById(id);
    },
  },

  Mutation: {
    createTask: async (_, { input }) => {
      // input.priority is validated by Mongoose enum and GraphQL enum
      const t = new Task({
        title: input.title,
        description: input.description || "",
        priority: input.priority || "MEDIUM",
      });
      return await t.save();
    },

    updateTask: async (_, { id, input }) => {
      // find and update, return the new doc
      const updated = await Task.findByIdAndUpdate(
        id,
        { $set: input },
        { new: true, runValidators: true }
      );
      if (!updated) throw new Error("Task not found");
      return updated;
    },

    deleteTask: async (_, { id }) => {
      const res = await Task.findByIdAndDelete(id);
      return res ? true : false;
    },
  },
};

module.exports = resolvers;
