import mongoose from "mongoose";
// { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } }
export const MindMapNodeSchema = new mongoose.Schema({
    position: {
        x: {type:Number, required:true},
        y: {type:Number, required:true}
    },
    type: { type:String, required:true,default:"default"},
    data: {
        label: {type:String, required:true, default: 'New Node'},
        information:{
            type:String,
            required:false,
            default:""
        }
    }
},{ timestamps: true });
