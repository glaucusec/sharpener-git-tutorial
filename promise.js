const posts = [{'title': 'POST1'}];
const user = {
	name: 'admin', 
  lastactivitytime: ' '
};

function createPost(title) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            posts.push({title: title});
            updateLastUserActivityTime();
            resolve(posts[posts.length - 1])
        }, 1000)
    }) 
}

function updateLastUserActivityTime (){
    return new Promise((resolve, reject) => {
        setTimeout( () => {
          user.lastactivitytime = new Date();
          resolve(user.lastactivitytime);
        }, 1000)
    })
}

Promise.all([createPost('POST2'), updateLastUserActivityTime()])
	.then(([val1, val2]) => {
  	console.log(val1)
    console.log(val2)
  })
