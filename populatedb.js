#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const BlogPost = require('./models/post');
const User = require('./models/user');
const Comment = require('./models/comment');

const posts = [];
const users = [];
const comments = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createPosts();
  await createComments();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function postCreate(index, author, title, text, visibility) {
  const post = new BlogPost({
    author,
    title,
    text,
    timestamp: new Date(),
    visibility,
  });
  await post.save();
  posts[index] = post;
};

async function userCreate(index, username, password) {
  const user = new User({
    username,
    password,
  });
  await user.save();
  users[index] = user;
};

async function commentCreate(index, author, post, text) {
  const comment = new Comment({
    author,
    post,
    text,
    timestamp: new Date(),
  });
  await comment.save();
  comments[index] = comment;
}

async function createUsers () {
  console.log("Adding users");
  await Promise.all([
    userCreate(0, 'Testeur1', 'blabla'),
    userCreate(1, 'Testeur2', 'blabla'),
    userCreate(2, 'Testeur3', 'blabla'),
  ])
}

async function createPosts () {
  console.log("Adding posts");
  await Promise.all([
    postCreate(0, users[0], 'Lorem ipsum1', 'Blehblah', 'public'),
    postCreate(1, users[0], 'Lorem ipsum2', 'Blehblah', 'hidden'),
    postCreate(2, users[1], 'Lorem ipsum3', 'Blehblah', 'hidden'),
    postCreate(3, users[1], 'Lorem ipsum4', 'Blehblah', 'public'),
  ])
}

async function createComments () {
  console.log("Adding comments");
  await Promise.all([
    commentCreate(0, users[2], posts[0], 'Commentaire1'),
    commentCreate(1, users[1], posts[1], 'Commentaire2'),
    commentCreate(2, users[2], posts[2], 'Commentaire3'),
    commentCreate(3, users[1], posts[0], 'Commentaire4'),
    commentCreate(4, users[2], posts[1], 'Commentaire5'),
  ])
}