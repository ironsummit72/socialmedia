import express,{Router} from 'express';

let router = Router()

/* GET users listing. */
router.get('/', function (req, res) {
	res.send('respond with a resource')
})

export default router
