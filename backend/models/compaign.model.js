const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const compaignSchema = new Schema({
   nameCompaign: {
    type: String,
    required: true,
    minlength: [3, 'Name Compaign Name Minimum 3 charachters.'],
  },
  typeCompaign: {
      type: String,
    required: true,
    minlength: [3, 'Type Compaign Minimum 3 charachters.'],
  },

  user: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  
  
  
}, {
  timestamps: true,
});



const Compaign = mongoose.model('Compaign', compaignSchema);

module.exports = Compaign;