import { Schema, model, models } from 'mongoose';



const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.\s])(?!.*[_.\s]{2})[a-zA-Z0-9\s]+(?<![_.\s])$/, "Username invalid, it should contain 8-20 alphanumeric characters with optional spaces!"],
    unique: [true, 'Username already exists!'],
  },
  image: {
    type: String,
  },
  slug:{
      type:String,
      required:true,
      unique:true,
  }
});

UserSchema.pre('save', function (next) {
  this.slug = slugify(this.username, { lower: true });
  next();
});

const User = models.User || model("User", UserSchema);

export default User;
