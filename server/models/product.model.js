import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your product name"],
        default: ""
    },
    image: {
        type: Array,
        required: [true, "Please add your product image"],
        default: []
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "category",
          
        }
    ]
       
    ,
    subCategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "subCategory",
        }
    ],
    unit: {
        type: String,
        default: ""
    },
    stock:{
        type:Number,
        default:null
    },
    price:{
        type:Number,
        default:null
    },
    discount:{
        type:Number,
        default:null
    },
    description:{
        type:String,
        default:""
    },
    more_details:{
        type:Object,
        default:{}
    },
    publish:{
        type:Boolean,
        default:true
    },
},{
    timestamps:true
})