const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {graphql,buildSchema} = require('graphql');


const myschema = buildSchema(`
	type Query{
		hello:String
		getsekolah(id:Int!):sekolah
		semua:[sekolah]
	}
	type sekolah{
		id:Int
		nama:String
	}
	type Mutation{
		buatpost(id:Int,nama:String):sekolah
	}
`)
let  data = [
	{
		id:22,
		nama:"siswa"
	},
	{
		id:111,
		nama:"abc"
	},
	{
		id:90,
		nama:"roko"
	},
	
]

const root = {
	hello:()=> "hai dunia",
	getsekolah:(params)=>{
		return data.find(p=>p.id === params.id)
	},
	semua:()=> {
		return data;
	},
	buatpost: ({id,nama})=>{
		return data
	}
	};
const app = express();

app.use("/",graphqlHTTP({
	schema:myschema,
	rootValue:root,
	graphiql:true
}))
const PORT = 4000 || process.env.PORT
app.listen(PORT,()=>console.log("server run" + PORT));