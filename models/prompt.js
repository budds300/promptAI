import  { Schema, model, models } from "mongoose";
import slugify from "slugify";

const PromptSchema = new Schema ({
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    prompt:{
        type:String,
        required:[true,"Prompt is required"],
    },
    tag:{   
        type:String,
        required:[true,"Tag is required"],
    },
    slug:{
        type:String,
        required:true,
        unique:true

    }

    
})
// Middleware to generate and set the slug before saving
PromptSchema.pre("save", function (next) {
    this.slug = slugify(this.prompt, { lower: true });
    next();
  });

const Prompt = models.Prompt || model("Prompt",PromptSchema);

export  default Prompt