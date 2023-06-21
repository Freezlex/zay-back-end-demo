const express = require('express');
const fs = require("fs");
const router = express.Router();

const postDataFilePath = './data/posts.json';

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const raw = fs.readFileSync(postDataFilePath);
  // Read the existing data from the JSON file
  const data = JSON.parse(raw);

  res.send(data);
});

router.post('/', async (req, res, next) => {
  // Get the post data from the request body
  const postData = req.body;

  const raw = fs.readFileSync(postDataFilePath);
  // Read the existing data from the JSON file
  const data = JSON.parse(raw);

  // Add the new post to the data array
  data.push(postData);

  // Write the updated data back to the JSON file
  fs.writeFileSync(postDataFilePath, JSON.stringify(data));

  // Send a response indicating success
  res.send('Post added successfully');
});

router.put('/:id', async (req, res, next) => {
  const postId = req.params.id;
  const updatedPostData = req.body;

  // Read the existing data from the JSON file
  const data = JSON.parse(fs.readFileSync(postDataFilePath));

  // Find the index of the post with the corresponding ID
  const postIndex = data.findIndex((post) => post.id === postId);

  if (postIndex === -1) {
    return res.status(404).send('Post not found');
  }

  // Update the post data with the new values
  data[postIndex] = { ...data[postIndex], ...updatedPostData };

  // Write the updated data back to the JSON file
  fs.writeFileSync('posts.json', JSON.stringify(data));

  // Send a response indicating success
  res.send('Post updated successfully');
})

router.delete('/:id', async (req, res, next) => {
  const postId = req.params.id;

  // Read the existing data from the JSON file
  const data = JSON.parse(fs.readFileSync('posts.json'));

  // Find the index of the post with the corresponding ID
  const postIndex = data.findIndex((post) => post.id === postId);

  if (postIndex === -1) {
    return res.status(404).send('Post not found');
  }

  // Remove the post from the data array
  data.splice(postIndex, 1);

  // Write the updated data back to the JSON file
  fs.writeFileSync('posts.json', JSON.stringify(data));

  // Send a response indicating success
  res.send('Post deleted successfully');
})

module.exports = router;
