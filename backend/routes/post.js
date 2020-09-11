const router = require("express").Router();
const Post = require("../models/post");
router.route('/createPost').post((req,res) => {
    Post({title:req.body.title,body:req.body.body}).save().then(()=>res.json("Post Created")).catch(err=>res.json(err));
});
router.route('/posts').get((_req, res)=>{
    Post.find().then((posts)=>{
        return res.json(posts)}).catch(err=>err.data);
})

router.route("/search").get((req,res)=>{
    Post.aggregate([
        {
          $search: {
            "autocomplete": {
                "query": req.query.search,
                "path": "title",  
              }
          }
        },
        {
          $limit: 5
        },
        {
          $project: {
            "_id": 0,
            "title": 1,
            "body": 1
          }
        }
      ]).then((posts)=>res.json(posts)).catch((e)=>res.json(e))
});
module.exports=router;