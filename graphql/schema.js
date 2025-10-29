const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum Priority {
    LOW
    MEDIUM
    HIGH
  }

  type Task {
    id: ID!
    title: String!
    description: String
    priority: Priority!
    completed: Boolean!
    createdAt: String
    updatedAt: String
  }

  input CreateTaskInput {
    title: String!
    description: String
    priority: Priority
  }

  input UpdateTaskInput {
    title: String
    description: String
    priority: Priority
    completed: Boolean
  }

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    deleteTask(id: ID!): Boolean!   # returns true if deleted
  }
`;

module.exports = typeDefs;
