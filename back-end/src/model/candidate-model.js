'use strict';

import mongoose from 'mongoose';

const candidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,    
  },  
  acceptance: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
}, { 
  usePushEach: true,
});

export default mongoose.model('candidate', candidateSchema);
