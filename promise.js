const posts = [{ title: "POST1" }];
const user = { name: "admin", lastActivityTime: "" };

const createPost = (title) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = { title: title };
      resolve(post);
    }, 1000);
  });
};

const updateLastUserActivityTime = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const now = new Date();
      resolve(now);
    }, 1000);
  });
};

const deletePost = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deletedPost = posts.pop();
      resolve(deletedPost);
    }, 1000);
  });
};

const preTasks = async (title) => {
  const [createdPost, lastActivityTime] = await Promise.all([
    createPost(title),
    updateLastUserActivityTime(),
  ]);

  const deletedPost = await deletePost();

  return [createdPost, lastActivityTime, deletedPost];
};


preTasks("POST2")
  .then(([createdPost, lastActivityTime, deletedPost]) => {
    console.log(createdPost);
    console.log(lastActivityTime);
    console.log(deletedPost);
  })
  .catch((error) => console.error(error));
