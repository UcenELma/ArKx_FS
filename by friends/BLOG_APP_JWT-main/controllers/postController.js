const products = require("../products.json")
const fs = require("fs")


function saveData(){
    const js_str = JSON.stringify(products, null , 2)
    fs.writeFileSync("./products.json", js_str)
}

const getProducts = (req, res)=>{
    res.send(products)
}

const searchForProduct = (req, res)=>{
    const min = req.query.minPrice
    const max = req.query.maxPrice
    const find_product = products.filter(x=> x.price >= min && x.price <= max)
    res.send(find_product)
}
const getProductById = (req, res)=>{
    const id = req.params.id
    const find_id = products.filter(x => x.id == id)
	if (find_id[0]) res.send(find_id)
    else res.send("this product does not exist")
    res.send(find_id)
}

const creatProduct = (req, res)=>{
    const {name, price} = req.body
	const id = products.length + 1
	const data = { id: id, name : name, price: price}
    products.push(data)
	// console.log(data)
    saveData()
    res.send("created")
}

const updateProduct = (req, res)=>{
    const id_url = req.params.id
    const find_id = products.filter(x => x.id == id_url)
    if (typeof(find_id[0]) != 'object'){
        res.send("this product doesn't exist!")
        return
    }
    const { name, price} = req.body
    find_id[0].name = name
    find_id[0].price = price
    saveData()
    res.send("Updated")
}  

const deletePorduct = (req, res)=>{
    const id_url = req.params.id
	const find_id = products.filter(x=>x.id == id_url)
	if (!find_id[0]) return res.send("this product does not exist")
	const find_ndx = products.findIndex(x=>x == find_id[0])
	products.splice(find_ndx, 1)
	res.json(products)
    res.send("the product was deleted")
    saveData()
}
module.exports = {getProducts, getProductById, searchForProduct, updateProduct,creatProduct, deletePorduct}