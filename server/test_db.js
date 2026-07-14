import mongoose from 'mongoose';

const uri = 'mongodb+srv://ucab_admin:Ks5tj34i9p@cluster0.gdhsm5p.mongodb.net/ucab?retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
  console.log('Attempting to connect...');
  try {
    await mongoose.connect(uri);
    console.log('Connected! readyState:', mongoose.connection.readyState);
    
    // Define a simple schema
    const TestSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', TestSchema);
    
    console.log('Attempting to query...');
    const doc = await TestModel.findOne({});
    console.log('Query resolved:', doc);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

testConnection();
